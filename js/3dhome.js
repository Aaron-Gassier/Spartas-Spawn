document.getElementById('back-to-game-button').addEventListener('click', function() {
    window.location.href = 'game.html';
});

let scene, camera, renderer;
let cube;
const gridSize = 12;
const gridSpacing = 1;

init();
animate();

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const container = document.getElementById('3d-container');
    container.appendChild(renderer.domElement);

    // Adjust renderer size based on container size
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    // Grid
    const gridHelper = new THREE.GridHelper(gridSize * gridSpacing, gridSize);
    scene.add(gridHelper);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Event listener for window resize
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onKeyDown, false);
}

function onWindowResize() {
    const container = document.getElementById('3d-container');
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onKeyDown(event) {
    switch(event.key) {
        case 'ArrowUp':
            cube.position.z -= gridSpacing;
            break;
        case 'ArrowDown':
            cube.position.z += gridSpacing;
            break;
        case 'ArrowLeft':
            cube.position.x -= gridSpacing;
            break;
        case 'ArrowRight':
            cube.position.x += gridSpacing;
            break;
    }
}
