import '../styles/index.css';
import ForceGraph3D from '3d-force-graph';
import dataset from '../datasets/sample_pcap.json';

function craftNodeJson(jsonData) {
	const graphNodes = {
		nodes: [],
		links: []
	};
	jsonData.forEach((rawData) => {
		const source = {
			id: `${rawData["No."]}-${rawData.Source}`,
			group: rawData["No."]
		};
		const destination = {
			id: `${rawData["No."]}-${rawData.Destination}`,
			group: rawData["No."]
		};
		graphNodes.nodes.push(source, destination);
		graphNodes.links.push({
			source: source.id,
			target: destination.id,
			value: rawData.Length,
			protocol: rawData.Protocol,
			time: rawData.Time
		});
	});
	return graphNodes;
}
const graphNodes = craftNodeJson(dataset);

const Graph = ForceGraph3D()(document.getElementById('3d-graph'))
	.graphData(graphNodes)
	.width('100%')
	.height('100%')
	.nodeLabel('id')
	.nodeAutoColorBy('group')
	.linkLabel(d => d.protocol)
	.linkAutoColorBy(d => d.protocol)
	.linkDirectionalArrowLength(3.5)
	.linkDirectionalArrowRelPos(1)
	.linkDirectionalParticles(d => d.value / 10)
	.linkDirectionalParticleSpeed(d => d.time * 0.001).onNodeClick(node => {
		// Aim at node from outside it
		const distance = 40;
		const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

		Graph.cameraPosition({
				x: node.x * distRatio,
				y: node.y * distRatio,
				z: node.z * distRatio
			}, // new position
			node, // lookAt ({ x, y, z })
			3000 // ms transition duration
		);
	});