import * as THREE from "../../build/three.module.js";
import { FontLoader } from '../../examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from '../../examples/jsm/geometries/TextGeometry.js';
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


    camera.position.x = -15;
    // z축 카메라와 시점의 사이 거리
    camera.position.z = 15;
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this._scene.add(light);
  }

  /////////////////////////////////////////////////////////////////
  // Shape 선 그리기 클래스의 이해
  /////////////////////////////////////////////////////////////////
  // _setupModel() {
  //   const shape = new THREE.Shape();
  //   // 1,1 좌표로 이동
  //   shape.moveTo(1, 1);
  //   // 1,-1 좌표로 선을 그으면서 이동
  //   shape.lineTo(1, -1);
  //   shape.lineTo(-1, -1);
  //   shape.lineTo(-1, 1);
  //   // 시작점과 끝점을 이어서 도형을 완성시킨다.
  //   shape.closePath();

  //   const x = -2.5, y = -5;
  //   shape.moveTo(x + 2.5, y + 2.5);
  //   shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
  //   shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
  //   shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
  //   shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
  //   shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
  //   shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

  //   const geometry = new THREE.BufferGeometry();
  //   const points = shape.getPoints();
  //   geometry.setFromPoints(points);

  //   const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
  //   const line = new THREE.Line(geometry, material);

  //   this._scene.add(line);
  // }

  /////////////////////////////////////////////////////////////////
  // 2차원형태 Shape 평면 모델링 
  /////////////////////////////////////////////////////////////////
  // _setupModel() {
  //  // 하트모양 2차원 평면 shape
  //   const shape = new THREE.Shape();

  //   const x = -2.5, y = -5;
  //   shape.moveTo(x + 2.5, y + 2.5);
  //   shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
  //   shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
  //   shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
  //   shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
  //   shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
  //   shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

  //   const geometry = new THREE.ShapeGeometry(shape);

  //   const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
  //   const cube = new THREE.Mesh(geometry, fillMaterial);

  //   const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
  //   const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

  //   const group = new THREE.Group();
  //   group.add(cube);
  //   group.add(line);

  //   this._scene.add(group);
  //   this._cube = group;
  // }

  /////////////////////////////////////////////////////////////////
  // Curve 선 그리기 클래스의 이해
  /////////////////////////////////////////////////////////////////
  // _setupModel() {
  //   class CustomSinCurve extends THREE.Curve {
  //     constructor(scale) {
  //       super();
  //       this.scale = scale;
  //     }

  //     getPoint(t) {
  //       const tx = t * 3 - 1.5;
  //       const ty = Math.sin(2 * Math.PI * t);
  //       const tz = 0;
  //       return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  //     }
  //   }

  //   const path = new CustomSinCurve(4);

  //   const geometry = new THREE.BufferGeometry();
  //   // 커브를 구성하는 좌표의 갯수 기본값(5)
  //   const points = path.getPoints();
  //   geometry.setFromPoints(points);

  //   const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
  //   const line = new THREE.Line(geometry, material);

  //   this._scene.add(line);
  // }

  /////////////////////////////////////////////////////////////////
  // // 3차원형태 Curve 튜브모양 모델링
  /////////////////////////////////////////////////////////////////
  // _setupModel() {
  //   class CustomSinCurve extends THREE.Curve {
  //     constructor(scale) {
  //       super();
  //       this.scale = scale;
  //     }

  //     getPoint(t) {
  //       const tx = t * 3 - 1.5;
  //       const ty = Math.sin(2 * Math.PI * t);
  //       const tz = 0;
  //       return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  //     }
  //   }

  //   const path = new CustomSinCurve(4);
  //   // 3차원형태 튜브모양 5개 인자
  //   // (모양, 튜브진행방향 세그먼트수(64), 원통의 반지름의 크기(1), 원통에 대한 세그먼트수(8), 원통끝단개방(false))
  //   const geometry = new THREE.TubeGeometry(path, 20);

  //   const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
  //   const cube = new THREE.Mesh(geometry, fillMaterial);

  //   const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
  //   const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

  //   const group = new THREE.Group();
  //   group.add(cube);
  //   group.add(line);

  //   this._scene.add(group);
  //   this._cube = group;
  // }


  /////////////////////////////////////////////////////////////////
  // LatheGeometry를 위한 선그리기
  /////////////////////////////////////////////////////////////////
  // _setupModel() {
  //   const points = [];
  //   for(let i = 0; i < 10; ++i){
  //     points.push(new THREE.Vector2(Math.sign(i * 0.2)*3 +3,(i-5)*.8)); 
  //   }

  //   const geometry = new THREE.BufferGeometry();
  //   geometry.setFromPoints(points);

  //   const material = new THREE.LineBasicMaterial({color: 0xffff00});
  //   const line = new THREE.Line(geometry, material);

  //   this._scene.add(line);
  // }

  /////////////////////////////////////////////////////////////////
  // 3차원형태 LatheGeometry : y축으로 회전하여 얻어지는 3차원 Mesh
  /////////////////////////////////////////////////////////////////
  // _setupModel() {
  //   const points = [];
  //   for (let i = 0; i < 10; ++i) {
  //     points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
  //   }

  //   // 3차원 LatheGeometry 4개 인자
  //   // (생성자의 인자로 회전시킬 대상에 대한 좌표 배열, 회전하는 방향의 세그먼트수(12), 시작각도, 연장각도)
  //   const geometry = new THREE.LatheGeometry(points, 32, 0, Math.PI);

  //   const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
  //   const cube = new THREE.Mesh(geometry, fillMaterial);

  //   const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
  //   const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

  //   const group = new THREE.Group();
  //   group.add(cube);
  //   group.add(line);

  //   this._scene.add(group);
  //   this._cube = group;
  // }

  /////////////////////////////////////////////////////////////////
  // ExtrudeGeometry: 평면 Shape에 깊이 값을 부여해주고, 윗면과 밑면을 비스듬하게 처리해줌
  // 베벨링 : 비스듬하게 처리해주는 것
  /////////////////////////////////////////////////////////////////
  // _setupModel() {
  //   // 하트모양 2차원 평면 shape
  //   const shape = new THREE.Shape();

  //   const x = -2.5, y = -5;
  //   shape.moveTo(x + 2.5, y + 2.5);
  //   shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
  //   shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
  //   shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
  //   shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
  //   shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
  //   shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

  //   // ExtrudeGeometry 생성시 설정값
  //   // steps : 깊이방향으로의 세그먼트 수(1)
  //   // depth : 깊이 값 (100)
  //   // bevelEnabled : 베벨링처리 할 것인지?(true)
  //   // bevelThickness : 베벨링의 두께값(6)
  //   // bevelSize : shape의 외각선으로 부터 얼마나 멀리 베벨링 할 것인지에 대한 거리(2)
  //   // bevelSegments : 베벨링 단계수(3)

  //   const settings = {
  //     steps: 2,
  //     depth: 4,
  //     bevelEnabled: true,
  //     bevelThickness: 1.6,
  //     bevelSize: 1.5,
  //     bevelSegments: 6,
  //   }

  //   const geometry = new THREE.ExtrudeGeometry(shape, settings);

  //   const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
  //   const cube = new THREE.Mesh(geometry, fillMaterial);

  //   const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
  //   const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

  //   const group = new THREE.Group();
  //   group.add(cube);
  //   group.add(line);

  //   this._scene.add(group);
  //   this._cube = group;
  // }


  /////////////////////////////////////////////////////////////////
  // ExtrudeGeometry 의 파생 클래스
  // TextGeometry : TTF 등과 같은 폰트파일을 Three.js 에서 폰트로 사용할 수 있는 포맷으로 변경해 사용합니다.
  // 형식은 json 인터넷을 통해 쉽게 변경할 수 있고, 한글도 가능하다.
  // 폰트를 로드하기 위해서 FontLoader 클래스가 필요하다.
  /////////////////////////////////////////////////////////////////
  _setupModel() {
    const fontLoader = new FontLoader();

    async function loadFont(that) {
      const url = '../../examples/fonts/helvetiker_regular.typeface.json';
      const font = await new Promise((resolve, reject) => {
        fontLoader.load(url, resolve, undefined, reject);
      });

      // TextGeometry 생성자 인자값 2개
      // (생성할 문자열, 속성값)
      // 속성값 셋팅
      // font: fontLoader로 가져온 폰트객체
      // size: font 사이즈 (100)
      // height: 깊이 값 (50)
      // curveSegments: 커브 구성하는 정점갯수 (12)
      // // setting for ExtrudeGeometry
      // bevelEnabled: true,
      // bevelThickness: 0.7,
      // bevelSize: .7,
      // bevelSegments: 2,

      const geometry = new TextGeometry('GIS', {
        font: font,
        size: 9,
        height: 1.8,
        curveSegments: 5,
        // setting for ExtrudeGeometry
        bevelEnabled: true,
        bevelThickness: 1.5,
        bevelSize: 1.7,
        bevelSegments: 7,
      });

      const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
      const cube = new THREE.Mesh(geometry, fillMaterial);

      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
      const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

      const group = new THREE.Group();
      group.add(cube);
      group.add(line);

      that._scene.add(group);
      that._cube = group;
    }
    loadFont(this);
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