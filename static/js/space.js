define(['three'], function (THREE) {
    'use strict';

    var spaceImage = THREE.ImageUtils.loadTexture('static/images/build/jpg/space_back.jpg'),
        spaceSphere = new THREE.SphereGeometry(150, 24, 24),
        spaceMaterial = new THREE.MeshBasicMaterial({
            map: spaceImage,
            side: THREE.BackSide
        });

    return new THREE.Mesh(spaceSphere, spaceMaterial);
});