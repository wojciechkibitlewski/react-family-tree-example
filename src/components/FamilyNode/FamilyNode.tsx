import React from 'react';
import classNames from 'classnames';
import { ExtNode } from 'relatives-tree/lib/types';
import styles from './FamilyNode.module.css';

interface Props {
  node: ExtNode;
  isRoot: boolean;
 onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

export default React.memo<Props>(

  function FamilyNode({ node, isRoot, onSubClick, style }) {
    
    return (
      <div className={styles.root} style={style} title={node.id} id={node.id} >
        <div
          className={classNames(
            styles.familyCard,
            styles[node.gender],
            isRoot && styles.isRoot,
          )}
        >
          <img src={node.image} title={node.name} />
          
          <h2>{node.name}</h2>
          
          <div className ={styles.dateHd}>
              <div><p>Ur.</p></div>
              <div><p>Śm.</p></div>
          </div>
          <div className={styles.date}>
              <div>
                <p><b>{node.birth}</b></p>
                {node.birthPlace === '?' ? <p>{node.birthPlace}</p>: <p><a href={node.birthPlace} title={node.birthPlace}>{node.birthPlace}</a></p> }
                  
              </div>
              <div>
                <p><b>{node.death}</b></p>
                {node.deathPlace === '?' ? <p>{node.deathPlace}</p>: <p><a href={node.deathPlace} title={node.deathPlace}>{node.deathPlace}</a></p> }

            
              </div>
          </div>
          
          <div className={styles.info}>
            {node.info}
          </div>
          
        </div>
        {node.hasSubTree && (
          <div
            className={classNames(styles.sub, styles[node.gender])}
            onClick={() => onSubClick(node.id)}
          />
        )}
      </div>
    );
  }
);
