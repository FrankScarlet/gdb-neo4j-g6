# README

> 本项目的初衷，参考资料的第一条

## 格式

目标格式

```javascript
const data = {
  // 点集
  nodes: [
    {
      id: "node1",
      x: 100,
      y: 200,
    },
    {
      id: "node2",
      x: 300,
      y: 200,
    },
  ],
  // 边集
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      source: "node1",
      target: "node2",
    },
  ],
};
```

## cheatsheet

```bash
npm install @antv/graphin@latest --save
npm install @antv/graphin-components@latest --save
npm install @antv/graphin-icons --save
```

## 资料

1. [neo4j-g6 讨论](https://github.com/neo4j-contrib/neovis.js/issues/192) 
2. [neovis](https://github.com/neo4j-contrib/neovis.js/blob/master/src/neovis.js) 
3. [motif](https://neo4j.com/developer-blog/creating-a-neo4j-react-app-with-use-neo4j-hooks/) 
4. [neo4j-graphist](https://neo4j.com/graphgists/)
5. [graphin](https://graphin.antv.vision/)
