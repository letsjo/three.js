import * as THREE from '../../build/three.module.js';
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
    camera.position.z = 3;
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this._scene.add(light);
  }

  // Mesh에 대한 재질
  _setupModel() {
    // // Material의 공통 속성
    // visible: 렌더링시에 Mesh가 보일지 안보일지 (true)
    // transparent: 재질에 대한 불투명도(opacity) 옵션을 사용할지 말지 (false) 
    // opacity: transparent가 true일 때, 불투명도 설정 0~1 (1)
    // depthTest: 렌더링 되고 있는 mesh의 픽셀 위치의 z값을 깊이 버퍼값을 검사할지 여부(true)
    // depthWrite: 렌더링 되고 있는 mesh의 픽셀 위치의 z값을 깊이 버퍼에 기록할지에 대한 여부(true)
    // side: THREE.FrontSide , THREE.BackSide , THREE.DoubleSide
    // mesh를 구성하는 삼각형 면에 대해 앞면만 렌더링 할 것인지, 뒷면만 렌더링 할것인지 아니면 모두 할 것인지를 지정한다. 
    // side는 광원의 영향을 받는 재질에서는 차이를 파악할 수 있다.

    // Depth Buffer 란? 깊이 버퍼이고 Z Buffer 라고도 합니다. 
    // Z buffer는 3차원 객체를 카메라를 통해 좌표를 변환시켜 화면상에 렌더링 될 때, 
    // 해당 3차원 객체를 구성하는 각 픽셀에 대한 z값 좌표값을 0~1로 정규화시킵니다.
    // 이 정규화된 z값이 저장된 버퍼가 z 버퍼 입니다. 
    // 이 값이 작을수록 카메라에서 가까운 3차원 객체의 픽셀입니다.

    // 가까울 수록 어둡고 멀수록 밝아진다.
    // Z 버퍼는 주로 더 멀리 있는 3차원 객체가 가까운 객체를 덮어서 렌더링되지 않기 위해 사용된다.

    /////////////////////////////////////////////////////////////////////////////
    // MeshBasicMaterial: Mesh에 대한 기본적인 재질
    // color: 재질의 색상값
    // wireframe: Mesh를 선형태로 렌더링할지의 여부 (false)
    /////////////////////////////////////////////////////////////////////////////
    // const material = new THREE.MeshBasicMaterial({
    //   visible: true,
    //   transparent: false,
    //   opacity: 1,
    //   depthTest: true,
    //   depthWrite: true,
    //   side: THREE.FrontSide,

    //   color: 0xffff00,
    //   wireframe: true,
    // });

    /////////////////////////////////////////////////////////////////////////////
    // MeshLambertMaterial: Mesh에 구성하는 정점에서 광원의 영향을 계산하는 재질
    // color: 재질의 색상값
    // wireframe: Mesh를 선형태로 렌더링할지의 여부 (false)
    // emissive: 광원에 영향을 받지 않는 재질 자체에서 방출하는 색상 값 기본값 검정색 (0x000000)
    /////////////////////////////////////////////////////////////////////////////
    // const material = new THREE.MeshLambertMaterial({
    //   transparent: true,
    //   opacity: 0.5,
    //   side: THREE.DoubleSide,

    //   color: 0xff0000,
    //   emissive: 0x555500,
    //   wireframe: false,
    // });

    /////////////////////////////////////////////////////////////////////////////
    // MeshPhongMaterial: Mesh에 렌더링되는 픽셀 단위로 광원의 영향을 계산하는 재질
    // color: 재질의 색상값
    // wireframe: Mesh를 선형태로 렌더링할지의 여부 (false)
    // emissive: 광원에 영향을 받지 않는 재질 자체에서 방출하는 색상 값 기본값 검정색 (0x000000)
    // specular: 광원에 의해서 반사되는 색상값 기본값 연한 회색
    // shininess: 반사되는 정도
    // flatShading: Mesh를 구성하는 면에대해서 평편하게 렌더링 할지에 대한 여부(false)
    /////////////////////////////////////////////////////////////////////////////
    // const material = new THREE.MeshPhongMaterial({
    //   color: 0xff0000,
    //   emissive: 0x000000,
    //   specular: 0xffff00,
    //   shininess: 10,
    //   flatShading: true,
    //   wireframe: false,
    // });

    /////////////////////////////////////////////////////////////////////////////
    // MeshStandardMaterial: 물리기반 렌더링 PBR을 위한 재질
    // color: 재질의 색상값
    // wireframe: Mesh를 선형태로 렌더링할지의 여부 (false)
    // emissive: 광원에 영향을 받지 않는 재질 자체에서 방출하는 색상 값 기본값 검정색 (0x000000)
    // flatShading: Mesh를 구성하는 면에대해서 평편하게 렌더링 할지에 대한 여부(false)
    // roughness: 거칠기 정도 (0: 거칠기가 전혀없는 표면이 거울과 같은 상태)
    // 거칠기 값이 커질수록 광원에 대한 반사가 희미해지다가 1이되면 빛 자체가 반사되지 않습니다.
    // metalness: 금속성 정도 (0: 마치 돌처럼 전혀 금속성이 없다는 것 / 1: 완전한 금속성)
    // roughness가 1이면 금속성 정도를 표현하기가 어렵다.
    /////////////////////////////////////////////////////////////////////////////
    // const material = new THREE.MeshStandardMaterial({
    //   color: 0xff0000,
    //   emissive: 0x000000,
    //   roughness: 0.25,
    //   metalness: 1,
    //   flatShading: false,
    //   wireframe: false,
    // });

    /////////////////////////////////////////////////////////////////////////////
    // MeshPhysicalMaterial: MeshStandardMaterial보다 발전된 물리기반 렌더링 재질
    // 재질의 표면에 코팅 효과를 줄 수 있고, 실제 유리같은 효과를 표현할 수 있다.
    // color: 재질의 색상값
    // wireframe: Mesh를 선형태로 렌더링할지의 여부 (false)
    // emissive: 광원에 영향을 받지 않는 재질 자체에서 방출하는 색상 값 기본값 검정색 (0x000000)
    // flatShading: Mesh를 구성하는 면에대해서 평편하게 렌더링 할지에 대한 여부(false)
    // roughness: 거칠기 정도 (0: 거칠기가 전혀없는 표면이 거울과 같은 상태)
    // 거칠기 값이 커질수록 광원에 대한 반사가 희미해지다가 1이되면 빛 자체가 반사되지 않습니다.
    // metalness: 금속성 정도 (0: 마치 돌처럼 전혀 금속성이 없다는 것 / 1: 완전한 금속성)
    // roughness가 1이면 금속성 정도를 표현하기가 어렵다.
    // clearcoat: 코팅의 정도 (0: 코팅이 전혀 안되어 있는 재질 / 1: 코팅의 효과 최대)
    // 코딩이 되면 광원에 대한 반사효과가 나타남
    // clearcoatRoughness: 코팅에 대한 거칠기 값 (0: 거칠기가 전혀없다 / 1: 거칠기가 최대)
    /////////////////////////////////////////////////////////////////////////////
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xff0000,
      emissive: 0x000000,
      roughness: 1,
      metalness: 0,
      clearcoat: 0,
      clearcoatRoughness: 0,
      flatShading: false,
      wireframe: false,
    });

    const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
    box.position.set(-1, 0, 0);
    this._scene.add(box);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), material);
    sphere.position.set(1, 0, 0);
    this._scene.add(sphere);
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

  }
}

window.onload = function () {
  new App();
}