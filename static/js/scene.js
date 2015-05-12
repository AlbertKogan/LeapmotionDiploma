define(['three'], function (THREE) {
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
});