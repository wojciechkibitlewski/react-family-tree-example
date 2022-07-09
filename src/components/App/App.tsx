import React, { useState, useEffect, useCallback } from 'react';
import { Node, ExtNode } from 'relatives-tree/lib/types';
import ReactFamilyTree from 'react-family-tree';
import PinchZoomPan from '../PinchZoomPan/PinchZoomPan';
import FamilyNode from '../FamilyNode/FamilyNode';

import family from '../../family.json';

import styles from './App.module.css';

const WIDTH = 300;
const HEIGHT = 340;

const DEFAULT_SOURCE = 'family.json'

type Source = Array<Node>

const SOURCES: { [key: string]: Source } = {
  'family.json': family as Source

}

const URL = 'URL (Gist, Paste.bin, ...)'

export default React.memo<{}>(
  function App() {
    
    const [source, setSource] = useState<string>(DEFAULT_SOURCE);
    const [nodes, setNodes] = useState<Source>([]);
    const [myId, setMyId] = useState<string>('');
    const [rootId, setRootId] = useState<string>('');

    useEffect(() => {
      const loadData = async () => {
        let newNodes;

        if (source === URL) {
          const response = await fetch(prompt('Paste the url to load:') || '');

          newNodes = await response.json()
        } else {
          newNodes = SOURCES[source];
        }

        if (newNodes) {
          setNodes([]); // Avoid invalid references to unknown nodes
          setRootId(newNodes[0].id);
          setMyId(newNodes[0].id);
          setNodes(newNodes);
        }
      }

      loadData();
    }, [source])

    const onResetClick = useCallback(() => setRootId(myId), [myId]);
    const onSetSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSource(event.target.value)
    }
 
    const sources = {
      ...SOURCES,
      [URL]: []
    }
    
    //const sources = family;

    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Drzewo genealogiczne Grzeszczyk od 1766 roku
          </h1>

          

          
        </header>
        <React.StrictMode>
        {nodes.length > 0 && (
          <PinchZoomPan
            min={0.1}
            max={1.5}
            captureWheel
            className={styles.wrapper}
          >
            <ReactFamilyTree
              nodes={nodes as Node[]}
              rootId={rootId}
              width={WIDTH}
              height={HEIGHT}
              className={styles.tree}
              renderNode={(node) => (
                <FamilyNode
                  key={node.id}
                  node={node}
                  isRoot={node.id === rootId}
                  onSubClick={setRootId}
                  style={{
                    width: WIDTH,
                    height: HEIGHT,
                    transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                  }}
                />
              )}
            />
          </PinchZoomPan>
        )}
        </React.StrictMode>
        {rootId !== myId && (
          <div className={styles.reset} onClick={onResetClick}>
            Reset
          </div>
        )}
        
      </div>
    );
  }
);
