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

    // Try to improve cursor location
    function normilizedPosition (leapPoint, iBox) {
        var normalized = iBox.normalizePoint(leapPoint, false),
            z = normalized[2],
            y = normalized[1] * 100,
            x = normalized[0] + 0.5;

        z += 0.5;
        x *= 100;
        z *= 100;

        return Leap.vec3.fromValues(x, y, z);
    }

    controller.use('riggedHand', {
            materialOptions: {
                opacity: 0
            }
        }).use('handHold')
        .on('frame', function (frame) {
            if (frame.valid && frame.gestures.length > 0) {
                frame.gestures.forEach(function (gesture) {
                    if (gesture.type == 'keyTap') {

                    }
                });
            }

            if (frame.valid && frame.hands.length) {
                console.log(frame);
                var hands = frame.hands,
                    frameHeight = window.innerHeight,
                    frameWidth = window.innerWidth,
                    iBox = frame.interactionBox,
                    pointable = frame.pointables[0],
                    leapPoint = pointable.stabilizedTipPosition,
                    normalizedPoint = iBox.normalizePoint(leapPoint, true),
                    normalizedHandPosition = normilizedPosition(leapPoint, iBox);

                //hands.forEach(function (hand) {
                //    var handMesh = hand.data('riggedHand.mesh');
                //
                //    handMesh.material.opacity = 0;
                //});

                // Scale
                if (hands.length == 2) {
                    var stabilizedLeft = hands[0].stabilizedPalmPosition,
                        stabilizedRight = hands[1].stabilizedPalmPosition,
                        delta = (stabilizedLeft[0] - stabilizedRight[0])/100;

                    hands.forEach(function (hand) {
                        var handMesh = hand.data('riggedHand.mesh');

                        handMesh.material.opacity = 0.7;
                    });

                    delta = delta.toFixed(2);
                    delta = Math.abs(parseFloat(delta));
                    Earth.scale.set(delta, delta, delta);
                } else if (hands.length == 1) {

                    if (hands[0].fingers[1].extended) {
                        $cursor.offset({
                            top: (1 - normalizedPoint[1]) * frameHeight,
                            left: normalizedPoint[0] * frameWidth
                        });

                        return false;
                    }

                    //var d1 = hands[0].indexFinger.proximal.direction(),
                    //    d2 = hands[0].thumb.proximal.direction(),
                    //    angle = Math.acos(Leap.vec3.dot(d1, d2));
                    //
                    //angle = (angle * 180 / Math.PI).toPrecision(2);

                    //Scene.camera.position.x = normalizedHandPosition[0];
                    //Scene.camera.position.y = normalizedHandPosition[1];
                    //Scene.camera.position.z = normalizedHandPosition[2];
                }
            }
        });

    controller.connect();

});