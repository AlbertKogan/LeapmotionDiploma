define([
    'three'
], function (THREE) {
    'use strict';

    return {
        CAMERA_POSITION: 500,
        AMBIENT_LIGHT_COLOR: 0xededed,

        onWindowResize: function (camera, renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        },

        animate: function (camera, scene, group, renderer) {
            var self = this;

            requestAnimationFrame(self.animate.bind(self, camera, scene, group, renderer));
            self.renderScene(camera, scene, group, renderer);
        },

        renderScene: function (camera, scene, group, renderer) {
            camera.lookAt(scene.position);
            group.rotation.y -= 0.0005;
            renderer.render(scene, camera);
        },

        init: function (obj) {
            var self = this,
                container = document.getElementById('container'),
                aspect = window.innerWidth / window.innerHeight,
                camera = new THREE.PerspectiveCamera(60, aspect, 1, 2000),
                scene = new THREE.Scene(),
                group = new THREE.Group(),
                light = new THREE.AmbientLight(self.AMBIENT_LIGHT_COLOR),
                renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: true
                });

            camera.position.z = self.CAMERA_POSITION;
            group.add(obj);
            scene.add(group);
            scene.add(light);
            renderer.setClearColor(0xffffff);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
            window.addEventListener('resize', self.onWindowResize.bind(self, camera, renderer), false);
            self.animate(camera, scene, group, renderer);

            return self;
        }
    }
});