define([
    'leapjs',
    'riggedHand',
    'handHold',
    './scene.js',
    './space.js',
    './earth.js'
], function (Leap, RiggedHand, handHold, Scene, Space, Earth) {
    'use strict';

    var controllerOptions = {
            enableGestures: true,
            frameEventName: 'animationFrame'
        },
        $cursor = $('.js-cursor'),
        controller = new Leap.Controller(controllerOptions);

    Scene.init([Earth]);
    Scene.add(Space);

    controller.on('frame', function (frame) {
        if (frame.valid && frame.gestures.length > 0) {
            frame.gestures.forEach(function (gesture) {
                if (gesture.type == 'keyTap') {

                }
            });
        }

        if (frame.valid && frame.hands.length) {
            var hands = frame.hands;

            // Scale
            if (hands.length == 2) {
                var stabilizedLeft = hands[0].stabilizedPalmPosition,
                    stabilizedRight = hands[1].stabilizedPalmPosition,
                    delta = (stabilizedLeft[0] - stabilizedRight[0])/100;

                delta = delta.toFixed(2);
                delta = Math.abs(parseFloat(delta));
                Earth.scale.set(delta, delta, delta);
            } else if (hands.length == 1){

                if (hands[0].fingers[1].extended) {
                    $cursor.offset({
                        top: -hands[0].indexFinger.dipPosition[1] + window.innerHeight/2,
                        left: hands[0].indexFinger.dipPosition[0] + window.innerWidth/2 - 50
                    });

                    return false;
                }

                var d1 = hands[0].indexFinger.proximal.direction(),
                    d2 = hands[0].thumb.proximal.direction(),
                    angle = Math.acos(Leap.vec3.dot(d1, d2));

                angle = (angle * 180 / Math.PI).toPrecision(2);
                Scene.camera.position.x = hands[0].palmPosition[0] - 20;
                Scene.camera.position.y = hands[0].palmPosition[1] - 20;
                // Scene.camera.position.z = hands[0].palmPosition[2]/3;
            }
        }

        //Screen tap custom gesture
        frame.hands.isRight && console.log('right hand');

    });

    controller.use('riggedHand');
    controller.use('handHold');
    controller.connect();

});