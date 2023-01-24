const videoElement = document.getElementsByClassName('input_video')[0];


const scene = new THREE.Scene;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const parameters = {
  count: 1000,
  size: 0.02
};

let geometry = null;
let material = null;
let points = null;
let radius = 2;
let angle = 1.57;

camera.position.x = radius * Math.cos(angle);
camera.position.z = radius * Math.sin(angle);


const generateGalaxy = () => {
  geometry = new THREE.BufferGeometry;
  let positions = new Float32Array(3 * parameters.count);

  for (let i = 0; i < parameters.count; i++) {
    let i3 = 3 * i;
    positions[i3 + 0] = 10 * (Math.random() - 0.5);
    positions[i3 + 1] = 10 * (Math.random() - 0.5);
    positions[i3 + 2] = 10 * (Math.random() - 0.5);
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: !0,
    depthWrite: !1,
    blending: THREE.AdditiveBlending,
    color: 0x7A7A7A
  });

  points = new THREE.Points(geometry, material);
  points.name = 'pts'
};

generateGalaxy();


const pointLight = new THREE.PointLight(16501857);
pointLight.position.set(0, 0, 50);

const ambientLight = new THREE.AmbientLight(16777215);
scene.add(ambientLight);


const createPlanet = (textureImage, a, b, c) => {
  const texture = new THREE.TextureLoader().load(textureImage);
  const planet = new THREE.Mesh(new THREE.SphereGeometry(a, b, c), new THREE.MeshStandardMaterial({ map: texture }))
  return planet;
};

const earthTexture = new THREE.TextureLoader().load('https://media.istockphoto.com/id/182058785/photo/world-topographic-map.jpg?s=612x612&w=0&k=20&c=eWrcGjNB9o-KrzW4TC2yxUII7k5E26QIqlN3JEJu1e4=');
const normalTexture = (new THREE.TextureLoader).load('https://svs.gsfc.nasa.gov/vis/a000000/a002800/a002894/link.0684.png');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture
  })
);
earth.position.z = 0;

const jupiter = createPlanet('https://upload.wikimedia.org/wikipedia/commons/b/be/Solarsystemscope_texture_2k_jupiter.jpg', 40, 32, 32);
jupiter.position.z = -100;

const neptune = createPlanet('https://upload.wikimedia.org/wikipedia/commons/1/1e/Solarsystemscope_texture_2k_neptune.jpg', 20, 32, 32);
neptune.position.y = 50;
neptune.position.x = 50;

const venus = createPlanet('https://upload.wikimedia.org/wikipedia/commons/1/19/Cylindrical_Map_of_Venus.jpg', 10, 32, 32);
venus.position.z = 50

const mercury = createPlanet('https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Solarsystemscope_texture_2k_mercury.jpg/640px-Solarsystemscope_texture_2k_mercury.jpg', 6, 32, 32);
mercury.position.x = 30;
mercury.position.y = -20;

const pluto = createPlanet('https://upload.wikimedia.org/wikipedia/commons/6/69/Pluto_-_Surface_Diversity.jpg', 10, 32, 32);
pluto.position.z = -30;
pluto.position.y = -40;

const sun = createPlanet('https://upload.wikimedia.org/wikipedia/commons/c/cb/Solarsystemscope_texture_2k_sun.jpg', 200, 32, 32);
sun.position.z = 400;


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

let line = new THREE.Line(b, c);

var rank = new Array(0, 1, 2, 3, 4, 3, 2, 5, 6, 7, 8, 7, 6, 5, 9, 10, 11, 12, 11, 10, 9, 13, 14, 15, 16, 15, 14, 13, 17, 18, 19, 20, 19, 18, 17, 0, 21, 22, 23, 24, 25, 24, 23, 26, 27, 28, 29,28, 27, 26, 30, 31, 32, 33, 32, 31, 30, 34, 35, 36, 37, 36, 35, 34, 38, 39, 40, 41, 40, 39, 38, 21);

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
    (angle -= 0.03, camera.position.y = radius * Math.cos(angle), camera.position.z = radius * Math.sin(angle));
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
      (angle += 0.05, camera.position.x = radius * Math.cos(angle), camera.position.y = radius * Math.sin(angle))
    }
    else {
    (angle += 0.03, camera.position.x = radius * Math.cos(angle), camera.position.z = radius * Math.sin(angle))
    }
  }

  if (results.multiHandLandmarks.length === 1) {
    for (let i = 0; i < 21; i++) {
      obj.children[i].position.x = -results.multiHandLandmarks[0][i].x,
      obj.children[i].position.y = -results.multiHandLandmarks[0][i].y,
      obj.children[i].position.z = 1;
    }

    for (let j of results.multiHandLandmarks) {
      finger1 = results.multiHandLandmarks[0][4];
      finger2 = results.multiHandLandmarks[0][12];
      finger3 = results.multiHandLandmarks[0][8];
      dist12 = Math.sqrt(Math.pow(finger1.x - finger2.x, 2) + Math.pow(finger1.y - finger2.y, 2) + Math.pow(finger1.z - finger2.z, 2));
      dist13 = Math.sqrt(Math.pow(finger1.x - finger3.x, 2) + Math.pow(finger1.y - finger3.y, 2) + Math.pow(finger1.z - finger3.z, 2));

      dist12 < 0.1 && setTimeout(void(dist13 < 0.1 && (null == scene.getObjectByName('pts') ? scene.add(points) : (scene.add(pluto), scene.add(earth), scene.add(jupiter), scene.add(neptune), scene.add(venus), scene.add(mercury), scene.add(sun), scene.add(pointLight)))), 700);

      for (let k = 0; k < 21; k++) {
        obj.children[k].position.x = -j[k].x;
        obj.children[k].position.y = -j[k].y;
        obj.children[k].position.z = 0.6 + j[k].z;
      }
    }
  }
}

line = new THREE.Line(b, c);
scene.add(line);

const hands = new Hands({ locateFile: file =>`https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });

hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

hands.onResults(onResults);


const video = new Camera(
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
  camera.lookAt(0,0,0);
  b.verticesNeedUpdate = !0;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

video.start();
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
camera.lookAt(0, 0, 0);

requestAnimationFrame(animate);
