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
    camera.position.z = 7;
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this._scene.add(light);
  }

  // ///////////////////////////////////////////////////////////
  // // Point 에 대한 Object 3D 재질
  // ///////////////////////////////////////////////////////////
  // _setupModel() {
  //   const vertices = [];
  //   for (let i = 0; i < 10000; i++) {
  //     // 10000개의 좌표 x,y,z 를 -5 ~ 5 사이의 난수값으로 지정하여 vertices 배열에 추가
  //     const x = THREE.MathUtils.randFloatSpread(5);
  //     const y = THREE.MathUtils.randFloatSpread(5);
  //     const z = THREE.MathUtils.randFloatSpread(5);

  //     vertices.push(x, y, z);
  //   }

  //   // 좌표들을 이용해 geometry를 생성하기 위한 코드
  //   const geometry = new THREE.BufferGeometry();
  //   // geometry의 setAttribute를 이용해 속성을 변경하는데,
  //   // position 이라는 속성에 vertices 배열을 Float32BufferAttribute 로 랩핑되어 전달됨
  //   // Float32BufferAttribute(vertices, 3) : vertices 의 좌표 x,y,z로 3개씩 잘라서 적용됨
  //   geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));


  //   ///////////////////////////////////////////////////////////
  //   // point 만들기 
  //   ///////////////////////////////////////////////////////////
  //   // color: Point의 색상값 ("0xff0000", "yellow", "#00ffff")
  //   // size: Point의 크기
  //   // sizeAttenuation: Point가 카메라 시점에 의해서 변경될지? 
  //   ///////////////////////////////////////////////////////////
  //   // const material = new THREE.PointsMaterial({
  //   //   color: "yellow",
  //   //   size: 5,
  //   //   sizeAttenuation: false,
  //   // });

  //   ///////////////////////////////////////////////////////////
  //   // 이미지를 가져와서 Point 객체로 추가하기 
  //   ///////////////////////////////////////////////////////////
  //   // map: 이미지
  //   // alphaTest: 이미지의 픽셀값 중 alphaTest 값보다 클때만 픽셀이 렌더링 된다.
  //   ///////////////////////////////////////////////////////////
  //   const sprite = new THREE.TextureLoader().load('../../examples/textures/sprites/disc.png');
  //   const material = new THREE.PointsMaterial({
  //     map: sprite,
  //     alphaTest: 0.5,
  //     color: "yellow",
  //     size: 0.1,
  //     sizeAttenuation: true,
  //   });

  //   // Points Object3D 객체를 추가
  //   const points = new THREE.Points(geometry, material);

  //   // Points 객체를 scene에 추가함.
  //   this._scene.add(points);
  // }


  // /////////////////////////////////////////////////////////
  // Line 에 대한 Object 3D 재질
  // /////////////////////////////////////////////////////////
  _setupModel() {
    const vertices = [
      -1, 1, 0,
      1, 1, 0,
      -1, -1, 0,
      1, -1, 0,
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // LineBasicMaterial : 선에 대한 색상 값만 옵션으로 받을 수 있다.
    // const material = new THREE.LineBasicMaterial({ color: 0xffff00 });

    // LineDashedMaterial : 점선으로 그려준다.
    // 선의 길이를 참조해서 재질이 적용된다.
    // 선의 길이를 계산해줘야한다.
    // color: 선의 색상
    // dashSize: 점선의 길이
    // gapSize: 점선들 사이 거리
    // scale: 점선 영역에 대한 표현 횟수를 몇배로 할 것인지
    const material = new THREE.LineDashedMaterial({
      color: 0xffff00,
      dashSize: 0.2,
      gapSize: 0.1,
      scale: 1,
    });

    // Line : 점마다 순서대로 한 줄을 씩 그으면서 그려줌
    // LineSegments : 점 2개에 한 줄씩 그으면서 그려줌
    // LineLoop : Line과 같이 그으면서 마지막점에서 시작점과 이어줌
    const line = new THREE.Line(geometry, material);
    this._scene.add(line);
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