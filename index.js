import * as THREE from 'https://cdn.skypack.dev/three@0.130.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/loaders/GLTFLoader.js';

var scene,camera,renderer;

function init(){
    scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0x000000,0.1,10);

    camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    new OrbitControls(camera,renderer.domElement);
}

function loadModel(){

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load("./baked.jpg",(texture)=>{
        texture.flipY = false;
        texture.encoding = THREE.sRGBEncoding;

        var material = new THREE.MeshBasicMaterial({map: texture});

        var loader = new GLTFLoader();
        loader.load("./custom scene grave.glb",(gltf)=>{

            gltf.scene.traverse((child)=>{
                if(child.type=="Mesh"){
                    child.material = material;
                }
            });

            scene.add(gltf.scene);
        });
    });


}

function addLights(){
    var ambientLight = new THREE.AmbientLight(0x412D1D,0.3);
    scene.add(ambientLight);

    var PointLight = new THREE.PointLight();
    scene.add(PointLight);
}

function render(){
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

init();
loadModel();
// addLights();
render();

