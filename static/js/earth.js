define(['three'], function (THREE) {
    'use strict';

    var surface = THREE.ImageUtils.loadTexture('static/images/build/jpg/earth_texture.jpg'),
        bumpMap = THREE.ImageUtils.loadTexture('static/images/build/jpg/earth_bump.jpg'),
        specularMap = THREE.ImageUtils.loadTexture('static/images/build/jpg/earth_specular.jpg'),
        materialOptions = {
            map: surface,
            overdraw: 0.5,
            bumpMap: bumpMap,
            bumpScale: 1,
            specularMap: specularMap,
            specular: new THREE.Color('grey')
        };

    //surface.minFilter = THREE.NearestFilter;
    var earthGeometry = new THREE.SphereGeometry(20, 64, 64),
        earthMaterial = new THREE.MeshPhongMaterial(materialOptions);

    return new THREE.Mesh(earthGeometry, earthMaterial);
});