import * as THREE from '../../build/three.module.js';
// three.js 파일을 모듈로 불러오게 된다.

class App {
  constructor() {
    // #webgl-container 인 div 요소를 얻어와서 divContainer 에 저장한다.
    const divContainer = document.querySelector("#webgl-container");
    // divContainer 를 다른 메서드에서 참조 할 수 있도록 하기 위해서 field로 정의한다.
    this._divContainer = divContainer;

    // renderer 객체는 three.js 의 WebGLRenderer라는 클래스로 생성할 수 있다.
    // 생성할 때 옵션 설정 가능하다.
    // antialias 옵션이 true이면, 3차원 장면이 오브젝트들의 경계선이 계단 현상 없이 부드럽게 표현됩니다.
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer 객체에 setPixelRatio 호출해서 ratio 값을 설정해준다.
    // window.devicePixelRatio (예:1.5): 디스플레이 설정 > 배율 및 레이아웃 > 텍스트, 앱 및 기타 항목의 크기변경 > 150% > 1.5
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer의 domElement를 id가 webgl-container인 divContainer의 자식으로 추가한다.
    // renderer.domElement 는 canvas 타입의 dom객체입니다.
    divContainer.appendChild(renderer.domElement);
    // renderer가 다른 method에서 참조할 수 있도록 field로 정의해준다.
    this._renderer = renderer;

    // scene 객체를 생성한다. three.js 라이브러리에서 Scene 클래스로 간단히 생성할 수 있다.
    const scene = new THREE.Scene();
    // scene 객체를 field화 시켜서 App 클래스의 다른 method에서도 참조할 수 있도록 한다.
    this._scene = scene;

    // 카메라(Camera) 객체를 설정하는 메서드 호출
    this._setupCamera();
    // 광원(Light) 객체를 설정하는 메서드 호출
    this._setupLight();
    // 3차원 모델(model) 객체를 설정하는 메서드 호출
    this._setupModel();

    // 창 크기가 변경되면 발생하는 onresize 이벤트에 resize method를 지정해준다.
    // resize 이벤트가 필요한 이유는 renderer나 camera는 창 크기가 변경될 때 마다 크기에 맞게 속성 값을 재 설정 해줘야한다.
    window.onresize = this.resize.bind(this);
    // resize()를 생성자에서 호출하는 이유는 renderer나 camera를 창 크기에 맞게 설정해주게 된다.
    this.resize();

    // render method를 requestAnimationFrame이라는 API에 넘겨줘서 호출한다.
    // render method는 실제로 3차원 그래픽 장면을 만들어주는 method이다.
    // 이 method를 requestAnimationFrame에 넘겨줌으로서 적당한 시점에 또한 최대한 빠르게 render method를 호출해준다.
    requestAnimationFrame(this.render.bind(this));
  }

  // 카메라(Camera) 객체를 설정하는 메서드
  _setupCamera() {
    // three.js 가 3차원 그래픽을 출력할 영역에 대한 가로와 세로에 대한 크기를 얻어온다.
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    // 해당 크기를 이용해서 카메라 객체를 생성하고 있다.
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 2;
    // 생성된 객체를 다른 field에서 사용할 수 있도록 정의한다.
    this._camera = camera;
  }

  // 광원(Light) 객체를 설정하는 메서드
  _setupLight() {
    // 광원의 색상 설정
    const color = 0xffffff;
    // 광원의 세기
    const intensity = 1;
    // 해당 값으로 광원을 생성하고 있다.
    const light = new THREE.DirectionalLight(color, intensity);
    // 광원의 위치를 설정해준다.
    light.position.set(-1, 2, 4);
    // 생성된 광원을 scene 객체에 추가해준다.
    this._scene.add(light);
  }

  // 3차원 모델(model) 객체를 설정하는 메서드
  _setupModel() {
    // 형상을 정의하기 위한 코드 (BoxGeometry 클래스를 이용 (가로,세로,깊이))
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 재질을 정의하기 위한 코드 (MeshPhongMaterial 클래스를 이용 {color: 파란색})
    const material = new THREE.MeshPhongMaterial({ color: 0x44a88 });

    // cube라는 상수에 geometry객체와 material객체로 Mesh 객체를 생성한다.
    const cube = new THREE.Mesh(geometry, material);

    // 생성된 Mesh를 scene 객체에 추가해준다.
    this._scene.add(cube);
    // 생성된 Mesh 객체를 다른 field에서 사용할 수 있도록 정의한다.
    this._cube = cube;
  }

  // 창 크기가 변경될 때 발생하는 이벤트를 통해서 호출되는 메서드
  resize() {
    // _divContainer 의 크기를 받아온다.
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    // 카메라의 속성값을 재 설정해준다.
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    // renderer의 크기를 재 설정해준다.
    this._renderer.setSize(width, height);
  }

  // time : 렌더링이 처음 시작된 이후 경과된 시간값 (단위 milli-second)
  // time 인자를 통해서 scene의 애니메이션에 이용할 수 있다.
  render(time) {
    // renderer가 scene을 카메라의 시점으로 렌더링하라는 코드이다.
    this._renderer.render(this._scene, this._camera);
    // update 메서드에 time 인자값을 넘겨주면서 호출
    this.update(time);
    // 이 method를 requestAnimationFrame에 넘겨줌으로서 적당한 시점에 또한 최대한 빠르게 render method를 호출해준다.
    requestAnimationFrame(this.render.bind(this));
  }

  // 어떠한 속성 값을 변경함으로써 애니메이션 효과를 발생시킨다. 
  update(time) {
    // time의 milli-second 단위를 second 단위로 변환시켜준다.
    time *= 0.001; // second unit
    // Mesh 객체릐 회전값을 time 인자를 통해서 값을 지정해준다.
    this._cube.rotation.x = time;
    this._cube.rotation.y = time;
    this._cube.rotation.z = time;
  }
}

window.onload = function () {
  new App();
}