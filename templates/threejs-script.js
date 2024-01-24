// threejs-script.js

let camera, scene, renderer, book;

function init() {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Create a renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('scene').appendChild(renderer.domElement);

  // Create a book
  const geometry = new THREE.BoxGeometry(1, 1, 0.2);
  const material = new THREE.MeshBasicMaterial({ color: 0x5527a0 });
  book = new THREE.Mesh(geometry, material);
  scene.add(book);

  // Set up event listeners for WASD controls
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
}

function animate() {
  requestAnimationFrame(animate);

  // Perform animations or updates here

  renderer.render(scene, camera);
}

function onKeyDown(event) {
  // Handle key down events (e.g., WASD controls)
  switch (event.key) {
    case 'w':
      book.position.y += 0.1;
      break;
    case 's':
      book.position.y -= 0.1;
      break;
    case 'a':
      book.position.x -= 0.1;
      break;
    case 'd':
      book.position.x += 0.1;
      break;
  }
}

function onKeyUp(event) {
  // Handle key up events if needed
}

// Initialize the scene
init();

// Start the animation loop
animate();
