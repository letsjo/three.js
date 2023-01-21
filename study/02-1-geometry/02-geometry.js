import * as THREE from "../../build/three.module.js";
// 마우스로 컨트롤 하기 위한 클래스
import { OrbitControls } from "../../examples/jsm/controls/OrbitControls.js";

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
    // 컨트롤들을 설정하는데 사용하는 메서드
    this._setupControls();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupControls() {
    // 카메라 객체와 divContainer 객체를 가져와 마우스로 원하는 시점으로 변경할 수 있도록 한다. 
    new OrbitControls(this._camera, this._divContainer);
  }

  _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 2;
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
    // 가로 세로 깊이가 1인 정육면체에 회색생상의 재질을 이용하여 Mesh 오브젝트 생성
    // (가로, 세로, 깊이, 가로분할수, 세로분할수, 깊이분할수 )
    const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
    const cube = new THREE.Mesh(geometry, fillMaterial);

    // 노란색 선에 대한 재질을 만들고, 앞써 만들어 놓은 geometry를 이용해서 Line 타입의 오브젝트를 생성
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    // WireframeGeometry는 와이어프레임 형태로 지오메트리를 표현하기 위해 사용됨
    const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

    // mesh 와 Line 를 하나의 오브젝트로 다루기 위해 group으로 묶음.
    const group = new THREE.Group();
    group.add(cube);
    group.add(line);

    // 그룹객체를 scene 추가
    this._scene.add(group);
    this._cube = group;
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


    // this._cube.rotation.x = time;
    // this._cube.rotation.y = time;
    // this._cube.rotation.z = time;
  }
}

window.onload = function () {
  new App();
};