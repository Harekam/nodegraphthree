var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight;

var FOV = 75,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 1000;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);

camera.position.z = 3;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});
controls = new THREE.OrbitControls(camera,renderer.domElement);
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
	color: 0xffff00
});
var cube = new THREE.Mesh(geometry, material);
var cubeB = new THREE.Mesh(geometry, material);
cubeB.position.x = 10;
cube.position.x = -5;
var materialLine = new THREE.LineBasicMaterial({
    color: 0x0000ff
});

var geometryLine = new THREE.Geometry();
geometryLine.vertices.push(
    cube.position,
    cubeB.position
);

var line = new THREE.Line( geometryLine, materialLine );
scene.add(cube);
scene.add(cubeB);
scene.add( line );

var animate = function () {
	requestAnimationFrame(animate);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.005;

	renderer.render(scene, camera);
};

animate();