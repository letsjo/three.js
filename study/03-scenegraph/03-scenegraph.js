import * as THREE from '../../build/three.module.js';

class App {
  constructor() {
    const divContainer = document.querySelector("#webgl-container");
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);
    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);

    camera.position.z = 25;

    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this._scene.add(light);
  }

  _setupModel() {
    const solarSystem = new THREE.Object3D();
    this._scene.add(solarSystem);

    const radius = 1;
    const widthSegments = 12;
    const heightSegments = 12;

    // 구의 geometry 생성
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    // 태양의 재질 생성 (색상: 노란색)
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00, flatShading: true });

    // 태양 Mesh 생성
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(3, 3, 3);
    solarSystem.add(sunMesh);

    // object3D 타입의 지구 Orbit 객체 생성
    const earthOrbit = new THREE.Object3D();
    solarSystem.add(earthOrbit);

    // 지구에 대한 재질 생성
    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244, flatShading: true });

    // 지구 Mesh 생성
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.position.x = 10;
    earthOrbit.add(earthMesh);

    // object3D 타입의 달 Orbit 객체 생성
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    // 달에 대한 재질 생성
    const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222, flatShading: true });

    // 달 Mesh 생성
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.5, 0.5, 0.5);
    moonOrbit.add(moonMesh);

    // solarSystem을 다른 메서드에서 참조할 수 있도록 함.
    this._solarSystem = solarSystem;
    this._earthOrbit = earthOrbit;
    this._moonOrbit = moonOrbit;
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  render(time) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    time *= 0.001; // second unit

    this._solarSystem.rotation.y = time / 2;
    this._earthOrbit.rotation.y = time * 2;
    this._moonOrbit.rotation.y = time * 5;
  }
}

window.onload = function () {
  new App();
}