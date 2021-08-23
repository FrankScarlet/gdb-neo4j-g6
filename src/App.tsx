import React from "react";
import { useReadCypher } from "use-neo4j";
import "./App.css";
import NeoG6 from "./neog6";
import Graphin from "@antv/graphin";
import { Toolbar, MiniMap } from "@antv/graphin-components";

// ES5 compile error
// import {
//   ZoomOutOutlined,
//   ZoomInOutlined,
//   PieChartOutlined,
//   DeleteOutlined,
//   VideoCameraAddOutlined
// } from "@ant-design/icons"; 


// const handleClick = (graphinContext, config) => {
//   const { apis } = graphinContext;
//   const { handleZoomIn, handleZoomOut } = apis;
//   if (config.key === "zoomIn") {
//     handleZoomIn();
//   } else if (config.key === "zoomOut") {
//     handleZoomOut();
//   }
// };

// const options = [
//   {
//     key: "zoomOut",
//     name: (
//       <span>
//         放大 <ZoomInOutlined />
//       </span>
//     ),
//     icon: <ZoomInOutlined />
//   },
//   {
//     key: "zoomIn",
//     name: <ZoomOutOutlined />
//   },
//   {
//     key: "visSetting",
//     name: <PieChartOutlined />
//   },
//   {
//     key: "clearCanvas",
//     name: <DeleteOutlined />
//   },
//   {
//     key: "showHideElement",
//     name: <VideoCameraAddOutlined />
//   }
// ];


function App() {
  // const { cypher, error, loading, first} = useReadCypher('MATCH (n) RETURN count(n) AS count')
  const { cypher, error, loading, records } = useReadCypher(
    "MATCH (n:Person)-[re]-(b) RETURN n, re, b LIMIT 10"
  );
  // Default to Loading Message
  let result = <div className="ui active dimmer">Loading...</div>;
  let g6 = new NeoG6();
  // Was there an error om the query?
  if (error) {
    result = <div className="ui negative message">{error.message}</div>;
  } else if (!loading) {
    if (records instanceof Array) {
      g6.toG6Format(records)
    }
    // Get the count
    // const count = first?.get('count').toNumber()
    const count = 114514
    result = (
      <div>
        There are {count} nodes in the database.
        <Graphin height={600} data={g6.data} layout={{ name: "concentric" }}>
        {/* <Toolbar options={options} onChange={handleClick} /> */}
        <MiniMap visible/>
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
