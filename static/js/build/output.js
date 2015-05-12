webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(6),
	    __webpack_require__(7)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (Leap, Scene) {
	    'use strict';

	    //var controllerOptions = {
	    //        enableGestures: true,
	    //        frameEventName: 'animationFrame'
	    //    },
	    //    controller = new Leap.Controller(controllerOptions),
	    //    $cursor = $('.js-cursor');
	    //
	    //
	    //controller.on('frame', function (frame) {
	    //    if (frame.valid && frame.gestures.length > 0) {
	    //        frame.gestures.forEach(function (gesture) {
	    //            switch (gesture.type) {
	    //                case "circle":
	    //                    console.log("Circle Gesture");
	    //                    break;
	    //                case "keyTap":
	    //                    console.log("Key Tap Gesture");
	    //                    break;
	    //                case "screenTap":
	    //                    console.log("Screen Tap Gesture");
	    //                    break;
	    //                case "swipe":
	    //                    console.log("Swipe Gesture");
	    //                    break;
	    //            }
	    //        });
	    //    }
	    //
	    //    if (frame.valid && frame.hands.length) {
	    //        var hand = frame.hands[0],
	    //            finger = hand.fingers[0],
	    //            position = finger.dipPosition;
	    //
	    //        //$cursor.offset({
	    //        //    top: window.innerHeight / 2 + position[1],
	    //        //    left: window.innerWidth / 2 + position[0]
	    //        //});
	    //
	    //        var crossProduct = Leap.vec3.create();
	    //        var direction = hand.direction;
	    //        var normal = hand.palmNormal;
	    //
	    //        Leap.vec3.cross(crossProduct, direction, normal);
	    //    }
	    //
	    //    //Screen tap custom gesture
	    //    frame.hands.isRight && console.log('right hand');
	    //
	    //});
	    //
	    //controller.connect();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (THREE) {
	    'use strict';

	    var CAMERA_POSITION = 500,
	        CANVAS_SIZE = [128, 128];

	    var container,
	        stats,
	        camera,
	        scene,
	        renderer,
	        group,
	        mouseX = 0,
	        mouseY = 0,
	        windowHalfX = window.innerWidth / 2,
	        windowHalfY = window.innerHeight / 2;

	    init();
	    animate();

	    function init () {
	        container = document.getElementById('container');

	        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
	        camera.position.z = CAMERA_POSITION;

	        scene = new THREE.Scene();
	        group = new THREE.Group();
	        scene.add(group);

	        // earth

	        var loader = new THREE.TextureLoader();
	        loader.load('static/images/build/jpg/earth_texture.jpg', function (texture) {
	            var geometry = new THREE.SphereGeometry(200, 20, 20),
	                materialOptions = {
	                    map: texture,
	                    overdraw: 0.5,
	                    bumpMap: THREE.ImageUtils.loadTexture('static/images/build/jpg/earth_bump.jpg'),
	                    bumpScale: 1,
	                    specularMap: THREE.ImageUtils.loadTexture('static/images/build/jpg/earth_specular.jpg'),
	                    specular: new THREE.Color('grey')
	                },
	                material = new THREE.MeshPhongMaterial(materialOptions),
	                mesh = new THREE.Mesh(geometry, material);
	            group.add(mesh);
	        });

	        var geometry = new THREE.PlaneBufferGeometry(300, 300, 3, 3),
	            material = new THREE.MeshBasicMaterial({
	                overdraw: 0.5
	            }),
	            mesh = new THREE.Mesh(geometry, material);

	        mesh.position.y = -250;
	        mesh.rotation.x = -Math.PI / 2;
	        group.add(mesh);

	        renderer = new THREE.CanvasRenderer();
	        renderer.setClearColor(0xffffff);
	        renderer.setPixelRatio(window.devicePixelRatio);
	        renderer.setSize(window.innerWidth, window.innerHeight);
	        container.appendChild(renderer.domElement);

	        //stats = new Stats();
	        //stats.domElement.style.position = 'absolute';
	        //stats.domElement.style.top = '0px';
	        //container.appendChild(stats.domElement);

	        //document.addEventListener('mousemove', onDocumentMouseMove, false);
	        window.addEventListener('resize', onWindowResize, false);
	    }

	    function onWindowResize () {
	        windowHalfX = window.innerWidth / 2;
	        windowHalfY = window.innerHeight / 2;
	        camera.aspect = window.innerWidth / window.innerHeight;
	        camera.updateProjectionMatrix();
	        renderer.setSize(window.innerWidth, window.innerHeight);
	    }

	    function onDocumentMouseMove (event) {
	        mouseX = ( event.clientX - windowHalfX );
	        mouseY = ( event.clientY - windowHalfY );
	    }

	    function animate () {
	        requestAnimationFrame(animate);
	        render();
	        //stats.update();
	    }

	    function render () {
	        //camera.position.x += ( mouseX - camera.position.x ) * 0.05;
	        //camera.position.y += ( -mouseY - camera.position.y ) * 0.05;
	        camera.lookAt(scene.position);
	        group.rotation.y -= 0.005;
	        renderer.render(scene, camera);
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }

});