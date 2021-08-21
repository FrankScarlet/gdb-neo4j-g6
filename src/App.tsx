import React from "react";
import { useReadCypher } from "use-neo4j";
import "./App.css";
import NeoG6 from "./neog6";
import Graphin from "@antv/graphin";
import { Toolbar } from "@antv/graphin-components";

function App() {
  // const { cypher, error, loading, first} = useReadCypher('MATCH (n) RETURN count(n) AS count')
  const { cypher, error, loading, first, records } = useReadCypher(
    "MATCH (n:Person)-[re]-(b) RETURN n, re, b LIMIT 10"
  );
  // Default to Loading Message
  let result = <div className="ui active dimmer">Loading...</div>;
  let g6 = new NeoG6();
  let temp;
  // Was there an error om the query?
  if (error) {
    result = <div className="ui negative message">{error.message}</div>;
  } else if (!loading) {
    if (records instanceof Array) {
      g6.toG6Format(records)
    }
    // Get the count
    const count = first?.get('count').toNumber()
    result = (
      <div>
        There are {count} nodes in the database.
        <Graphin data={g6.data} layout={{ name: "concentric" }}>
          <Toolbar />
        </Graphin>
      </div>
    );
  }

  return (
    <div className="App">
      <pre>{cypher}</pre>
      {result}
    </div>
  );
}

export default App;
