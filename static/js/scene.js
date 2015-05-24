define([
    'three'
], function (THREE) {
    'use strict';

    return {
        CAMERA_POSITION: 160,
        AMBIENT_LIGHT_COLOR: 0xededed,
        scene: null,
        camera: null,
        group: null,
        light: null,
        renderer: null,

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

        init: function (objList) {
            var self = this,
                container = document.getElementById('container'),
                aspect = window.innerWidth / window.innerHeight;

            self.camera = new THREE.PerspectiveCamera(45, aspect, 0.01, 1000),
            self.scene = new THREE.Scene(),
            self.group = new THREE.Group(),
            self.light = new THREE.AmbientLight(self.AMBIENT_LIGHT_COLOR),
            self.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });

            self.camera.position.z = self.CAMERA_POSITION;
            objList.forEach(function (obj) {
                self.group.add(obj);
            });
            self.scene.add(self.group);
            self.scene.add(self.light);
            self.renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(self.renderer.domElement);
            window.addEventListener('resize', self.onWindowResize.bind(self, self.camera, self.renderer), false);
            self.animate(self.camera, self.scene, self.group, self.renderer);

            return self;
        },

        add: function (obj) {
            if (this.scene) {
                this.scene.add(obj);
            }
        }
    }
});