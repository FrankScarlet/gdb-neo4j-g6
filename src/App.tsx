import { Record} from 'neo4j-driver';
import { isNode, isRelationship} from 'neo4j-driver-core'
import React from 'react';
import { useReadCypher } from 'use-neo4j'
import './App.css';

export const buildNode =(n: any) =>{
  console.log('get a node')
}

export const buildEdge = (e: any) => {
  console.log('get a edge')
}

export const toG6Format = (records: Record[])  => {
  let nodes = {}
  let edges= {}
  // console.log(records)

  records.forEach((record) => {
    Object.values(record.toObject()).map(async (v) => {
      if (isNode(v)) {
        let node = buildNode(v);
        
      } else if (isRelationship(v)) {
        let edge = buildEdge(v);
      } else if (v instanceof Array) {
        for (let obj of v) {
          if (isNode(obj)) {
            let node = buildNode(obj);
          } else if (isRelationship(obj)) {
            let edge = buildEdge(obj);
          }
        }
      } else {
        console.log('invalid format')
      }
    })
  })
} 

function App() {
  // const { cypher, error, loading, first} = useReadCypher('MATCH (n) RETURN count(n) AS count')
  const { cypher, error, loading, first, records} = useReadCypher('MATCH (n:Person)-[re]-(b) RETURN n, re, b LIMIT 10')
  // Default to Loading Message
  let result = (<div className="ui active dimmer">Loading...</div>)

  // Was there an error om the query?
  if ( error ) {
    result = (<div className="ui negative message">{ error.message }</div>)
  }
  else if ( !loading ) {
    // Get the count
    // console.log(records)
    if (records instanceof Array) {
      toG6Format(records)
    }

    // const count = first?.get('count').toNumber()
    const count = 114514 
    result = (<div>There are {count} nodes in the database.</div>)
  }

  return (
    <div className="App">
      <pre>{cypher}</pre>
      {result}
    </div>
  );
}

export default App;
