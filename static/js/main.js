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
        controller = new Leap.Controller(controllerOptions),
        $cursor = $('.js-cursor');


    // Earth.position.set(100, 100, 100);
    Scene.init([Earth]);
    Scene.add(Space);

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

/*            var crossProduct = Leap.vec3.create();
            var direction = hand.direction;
            var normal = hand.palmNormal;

            Leap.vec3.cross(crossProduct, direction, normal);*/



            var hands = frame.hands,
                palmPosition = hand.palmPosition;

            // Scale
            if (hands.length == 2) {
                var stabilizedLeft = hands[0].stabilizedPalmPosition,
                    stabilizedRight = hands[1].stabilizedPalmPosition;

                var delta = (stabilizedLeft[0] - stabilizedRight[0])/100;
                delta = delta.toFixed(2);
                delta = Math.abs(parseFloat(delta));
//console.log('delta ', delta);
                Earth.scale.set(delta, delta, delta);
            } else if (hands.length == 1){
                Earth.position.setX(hands[0].palmPosition[0]/2);
                Earth.position.setY(hands[0].palmPosition[1]/2);

                console.log('X',  hands[0].palmPosition[1]);
                var d1 = hands[0].indexFinger.proximal.direction(),
                    d2 = hands[0].thumb.proximal.direction();

                var angle = Math.acos(Leap.vec3.dot(d1, d2));
                angle = (angle * 180 / Math.PI).toPrecision(2);

                if (angle >= 60) {
                    console.log('angle', angle);
                }
            }
        }

        //Screen tap custom gesture
        frame.hands.isRight && console.log('right hand');

    });

    controller.use('riggedHand');
    controller.use('handHold');
    controller.connect();

});