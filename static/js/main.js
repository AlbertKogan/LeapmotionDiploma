define([
    'leapjs',
    'riggedHand',
    './scene.js',
    './earth.js'
], function (Leap, RiggedHand, Scene, Earth) {
    'use strict';

    var controllerOptions = {
            enableGestures: true,
            frameEventName: 'animationFrame'
        },
        controller = new Leap.Controller(controllerOptions),
        $cursor = $('.js-cursor');


    Scene.init(Earth);

    controller.on('frame', function (frame) {
        if (frame.valid && frame.gestures.length > 0) {
            frame.gestures.forEach(function (gesture) {
                switch (gesture.type) {
                    case "circle":
                        console.log("Circle Gesture");
                        break;
                    case "keyTap":
                        console.log("Key Tap Gesture");
                        break;
                    case "screenTap":
                        console.log("Screen Tap Gesture");
                        break;
                    case "swipe":
                        console.log("Swipe Gesture");
                        break;
                }
            });
        }

        if (frame.valid && frame.hands.length) {
            var hand = frame.hands[0],
                finger = hand.fingers[0],
                position = finger.dipPosition;

            //$cursor.offset({
            //    top: window.innerHeight / 2 + position[1],
            //    left: window.innerWidth / 2 + position[0]
            //});

            var crossProduct = Leap.vec3.create();
            var direction = hand.direction;
            var normal = hand.palmNormal;

            Leap.vec3.cross(crossProduct, direction, normal);
        }

        //Screen tap custom gesture
        frame.hands.isRight && console.log('right hand');

    });

    controller.use('riggedHand');
    controller.connect();

});