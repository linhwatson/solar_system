/* =============================== Set up Mediapipe video ============================= */

const videoElement = document.getElementsByClassName('input_video')[0];

/* =============================== Set up THREEJS ===================================== */

const scene = new THREE.Scene;
const camera3 = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const parameters = {
  count: 1000,
  size: 0.02
};

let geometryg = null;
let materialg = null;
let points = null;
let radius = 2;
let angle = 1.57;

camera3.position.x = radius * Math.cos(angle);
camera3.position.z = radius * Math.sin(angle);

/* =============================== Set up Audio ============================= */

const listener = new THREE.AudioListener();
camera3.add(listener);

const sound = new THREE.Audio( listener );

const audioLoader = new THREE.AudioLoader();
audioLoader.load( "/home/linhwatson/immersive/mvp/soundtrack.mp3", function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});

/* ================================= Generate Galaxy ================================== */

const generateGalaxy = () => {
  geometryg = new THREE.BufferGeometry;
  let b = new Float32Array(3 * parameters.count);

  for (let c = 0; c < parameters.count; c++) {
    let d = 3 * c;
    b[d + 0] = 10 * (Math.random() - 0.5);
    b[d + 1] = 10 * (Math.random() - 0.5);
    b[d + 2] = 10 * (Math.random() - 0.5);
  }

  geometryg.setAttribute('position', new THREE.BufferAttribute(b, 3));

  materialg = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: !0,
    depthWrite: !1,
    blending: THREE.AdditiveBlending,
    color: 0x7A7A7A
  });

  points = new THREE.Points(geometryg, materialg);
  points.name = 'pts'
};

generateGalaxy();

/* ================================== Create Light ======================================= */

const pointLight = new THREE.PointLight(16501857);
pointLight.position.set(0, 0, 50);

const ambientLight = new THREE.AmbientLight(16777215);
scene.add(ambientLight);

/* =================================== Create Planets ===================================== */

const earthTexture = new THREE.TextureLoader().load('https://media.istockphoto.com/id/182058785/photo/world-topographic-map.jpg?s=612x612&w=0&k=20&c=eWrcGjNB9o-KrzW4TC2yxUII7k5E26QIqlN3JEJu1e4=');
const normalTexture = (new THREE.TextureLoader).load('https://svs.gsfc.nasa.gov/vis/a000000/a002800/a002894/link.0684.png');

// earth
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture
  })
);
earth.position.z = 0;

// jupiter
const jupiterTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/b/be/Solarsystemscope_texture_2k_jupiter.jpg');
const jupiter = new THREE.Mesh(new THREE.SphereGeometry(40, 32, 32), new THREE.MeshStandardMaterial({ map: jupiterTexture }));
jupiter.position.z = -100;

// neptune
const neptuneTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/1/1e/Solarsystemscope_texture_2k_neptune.jpg');
const neptune = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 32), new THREE.MeshStandardMaterial({ map: neptuneTexture }));
neptune.position.y = 50;
neptune.position.x = 50;

// venus
const venusTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/1/19/Cylindrical_Map_of_Venus.jpg');
const venus = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32), new THREE.MeshStandardMaterial({ map: venusTexture }));
venus.position.z = 50

// mercury
const mercuryTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Solarsystemscope_texture_2k_mercury.jpg/640px-Solarsystemscope_texture_2k_mercury.jpg');
const mercury = new THREE.Mesh(new THREE.SphereGeometry(6, 32, 32), new THREE.MeshStandardMaterial({ map: mercuryTexture }));
mercury.position.x = 30;
mercury.position.y = -20;

// pluto
const plutoTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/6/69/Pluto_-_Surface_Diversity.jpg');
const pluto = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32), new THREE.MeshStandardMaterial({ map: plutoTexture }));
pluto.position.z = -30;
pluto.position.y = -40;

// sun
const sunTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/c/cb/Solarsystemscope_texture_2k_sun.jpg');
const sun = new THREE.Mesh(new THREE.SphereGeometry(200, 32, 32), new THREE.MeshStandardMaterial({ map: sunTexture }));
sun.position.z = 400;


/* ===================================== Create Hand Object ===================================== */

let obj = new THREE.Object3D;

for (let i = 0; i < 21; i++) {
  let b = new THREE.SphereGeometry(0.01, 32, 16);
  let c = new THREE.MeshNormalMaterial;
  let a = new THREE.Mesh(b, c);
  a.rotation.x = Math.PI;
  obj.add(a);
}

for (let i = 0; i < 21; i++) {
  let b = new THREE.BoxGeometry(0.02, 0.02, 0.02);
  let c = new THREE.MeshNormalMaterial;
  let a = new THREE.Mesh(b, c);
  a.rotation.x = Math.PI;
  obj.add(a);
}

scene.add(obj);

const b = new THREE.Geometry;
const c = new THREE.LineBasicMaterial({
  color: 10783210
});

let line1 = new THREE.Line(b, c);

var rank = new Array(0,1,2,3,4,3,2,5,6,7,8,7,6,5,9,10,11,12,11,10,9,13,14,15,16,15,14,13,17,18,19,20,19,18,17,0,21,22,23,24,25,24,23,26,27,28,29,28,27,26,30,31,32,33,32,31,30,34,35,36,37,36,35,34,38,39,40,41,40,39,38,21);

for (i = 0; i < rank.length; i++) {
  b.vertices.push(obj.children[rank[i]].position);
}

function onResults(results) {
  if (results.multiHandLandmarks.length === 2) {
    for (let e = 0; e < 21; e++) {
      obj.children[e].position.x = -results.multiHandLandmarks[0][e].x,
      obj.children[e].position.y = -results.multiHandLandmarks[0][e].y,
      obj.children[e].position.z = .6 + results.multiHandLandmarks[0][e].z,
      obj.children[e + 21].position.x = -results.multiHandLandmarks[1][e].x,
      obj.children[e + 21].position.y = -results.multiHandLandmarks[1][e].y,
      obj.children[e + 21].position.z = .6 + results.multiHandLandmarks[0][e].z;
    }

    if (
    results.multiHandLandmarks[0][7].y > results.multiHandLandmarks[0][5].y &&
    results.multiHandLandmarks[0][0].y > results.multiHandLandmarks[0][7].y &&
    results.multiHandLandmarks[0][19].y > results.multiHandLandmarks[0][17].y &&
    results.multiHandLandmarks[0][0].y > results.multiHandLandmarks[0][19].y &&
    results.multiHandLandmarks[1][7].y > results.multiHandLandmarks[1][5].y &&
    results.multiHandLandmarks[1][0].y > results.multiHandLandmarks[1][7].y &&
    results.multiHandLandmarks[1][19].y > results.multiHandLandmarks[1][17].y &&
    results.multiHandLandmarks[1][0].y > results.multiHandLandmarks[1][19].y) {
    (angle -= 0.03, camera3.position.y = radius * Math.cos(angle), camera3.position.z = radius * Math.sin(angle));
    } else if (
    results.multiHandLandmarks[0][7].y > results.multiHandLandmarks[0][5].y &&
    results.multiHandLandmarks[0][0].y > results.multiHandLandmarks[0][7].y &&
    results.multiHandLandmarks[0][19].y > results.multiHandLandmarks[0][17].y &&
    results.multiHandLandmarks[0][0].y > results.multiHandLandmarks[0][19].y &&
    results.multiHandLandmarks[1][7].y <= results.multiHandLandmarks[1][5].y &&
    results.multiHandLandmarks[1][0].y <= results.multiHandLandmarks[1][7].y &&
    results.multiHandLandmarks[1][19].y <= results.multiHandLandmarks[1][17].y &&
    results.multiHandLandmarks[1][0].y <= results.multiHandLandmarks[1][19].y)
    {
      (angle += 0.05, camera3.position.x = radius * Math.cos(angle), camera3.position.y = radius * Math.sin(angle))
    }
    else {
    (angle += 0.03, camera3.position.x = radius * Math.cos(angle), camera3.position.z = radius * Math.sin(angle))
    }
  }

  if (results.multiHandLandmarks.length === 1) {
    for (let g = 0; g < 21; g++) {
      obj.children[g].position.x = -results.multiHandLandmarks[0][g].x,
      obj.children[g].position.y = -results.multiHandLandmarks[0][g].y,
      obj.children[g].position.z = 1;
    }

    for (let h of results.multiHandLandmarks) {
      finger1 = results.multiHandLandmarks[0][4];
      finger2 = results.multiHandLandmarks[0][12];
      finger3 = results.multiHandLandmarks[0][8];
      dist12 = Math.sqrt(Math.pow(finger1.x - finger2.x, 2) + Math.pow(finger1.y - finger2.y, 2) + Math.pow(finger1.z - finger2.z, 2));
      dist13 = Math.sqrt(Math.pow(finger1.x - finger3.x, 2) + Math.pow(finger1.y - finger3.y, 2) + Math.pow(finger1.z - finger3.z, 2));

      dist12 < 0.1 && setTimeout(void(dist13 < 0.1 && (null == scene.getObjectByName('pts') ? scene.add(points) : (scene.add(pluto), scene.add(earth), scene.add(jupiter), scene.add(neptune), scene.add(venus), scene.add(mercury), scene.add(sun), scene.add(pointLight)))), 700);

      for (let f = 0; f < 21; f++) {
        obj.children[f].position.x = -h[f].x;
        obj.children[f].position.y = -h[f].y;
        obj.children[f].position.z = 0.6 + h[f].z;
      }
    }
  }
}

line1 = new THREE.Line(b, c);
scene.add(line1);

const hands = new Hands({ locateFile: file =>`https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });

hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

hands.onResults(onResults);


/* ========================================== Rendering ======================================== */

const camera = new Camera(
  videoElement,
  {
    onFrame: async () => {
      await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720
  }
);

function animate() {
  camera3.lookAt(0,0,0);
  b.verticesNeedUpdate = !0;
  renderer.render(scene, camera3);
  requestAnimationFrame(animate);
}

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.start();
camera3.position.x = 0;
camera3.position.y = 0;
camera3.position.z = 2;
camera3.lookAt(0, 0, 0);

requestAnimationFrame(animate);
