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
    // 2차원 원판모양 4개 인자
    // CircleGeometry (원판의 크기(1), 세그먼트수(8), 시작각도(0pi), 연장각도(2pi) )
    // const geometry = new THREE.CircleGeometry(0.9, 16, Math.PI / 2, Math.PI / 2);

    // 원뿔모양 7개 인자
    // ConeGeometry (밑면 반지름크기(1), 원뿔의 높이(1), 원뿔의 둘레 세그먼트수(8), 원뿔 높이에 대한 세그먼트수(1), 원뿔밑면 개방여부(false), 원뿔의 시작각도(0pi), 원뿔의 연장각도(2pi) )
    // const geometry = new THREE.ConeGeometry(0.5, 1.6, 16, 9, true, 0, Math.PI);

    // 원통모양 8개 인자
    // CylinderGeometry (윗면 반지름크기(1), 아랫면 반지름크기(1), 원통의 높이(1), 원통의 둘레 세그먼트수(8), 원통 높이에 대한 세그먼트수(1), 원통윗면아랫면 개방여부(false), 원뿔의 시작각도(0pi), 원뿔의 연장각도(2pi))
    // const geometry = new THREE.CylinderGeometry(0.9, 0.9, 1.6, 32, 12, true, 0, Math.PI / 2);

    // 구모양 7개 인자
    // SphereGeometry (구의 반지름크기(1), 수평방향 세그먼트수(32), 수직방향 세그먼트수(16), 수평방향의 시작각도(0), 수평방향의 연장각도(2pi), 수직방향의 시작각도(0), 수직방향의 연장각도(2pi))
    // const geometry = new THREE.SphereGeometry(0.9, 32, 32, 0, Math.PI, 0, Math.PI);

    // 2차원형태 반지모양 6개 인자
    // RingGeometry (내부 반지름값(0.5), 외부 반지름값(1), 가장자리 둘레방향 세그먼트수(8), 내부 방향에 대한 세그먼트수(1), 시작각도(0), 연장각도(2pi))
    // const geometry = new THREE.RingGeometry(0.2, 1, 6, 2, 0, Math.PI);

    // 2차원형태 평면 사각형 4개 인자
    // 지리 정보 시스템 GIS 3차원 지형들을 표현하는데 사용됨
    // PlaneGeometry (너비에 대한 길이(1), 높이에 대한 길이(1), 너비 세그먼트수(1), 높이 세그먼트수(1))
    // const geometry = new THREE.PlaneGeometry(1, 1.4, 3, 2);

    // 3차원형태 반지모양 5개 인자
    // 긴 원통으로 360도 방향을 돌아서 이어진 모양
    // TorusGeometry (반지름값(1), 원통에 반지름값(0.4), 방사 방향에 대한 세그먼트수(8), 원통 세그먼트수(6), 연장각도(2pi))
    // const geometry = new THREE.TorusGeometry(0.9, 0.4, 24, 32, Math.PI);

    // 3차원형태 고리모양 5개 인자
    // 활용도가 떨어짐
    // TorusKnotGeometry (크기의 반지름, 원통의 반지름, 크기의 세그먼트수, 원통의 세그먼트수, 반복횟수, 반복횟수)
    const geometry = new THREE.TorusKnotGeometry(0.6, 0.1, 64, 32, 4, 6);
    const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
    const cube = new THREE.Mesh(geometry, fillMaterial);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

    const group = new THREE.Group();
    group.add(cube);
    group.add(line);

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