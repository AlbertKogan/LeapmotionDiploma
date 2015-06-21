define([
    'leapjs',
    'riggedHand',
    'handHold',
    './scene.js',
    './space.js',
    './earth.js'
], function (Leap, RiggedHand, handHold, Scene, Space, Earth) {
    'use strict';

    var MODES = {
        ui: 'UI mode',
        camera: 'camera mode'
    };

    var $content = $('.js-content'),
        $currentMode = $('.is-current-mode'),
        $jsInfo = $('.js-info'),
        $menuLink = $('.js-link');

    var controllerOptions = {
            enableGestures: true,
            frameEventName: 'animationFrame'
        },
        $cursor = $('.js-cursor'),
        controller = new Leap.Controller(controllerOptions);

    Scene.init([Earth]);
    Scene.add(Space);

    $menuLink.on('click', function (e) {
        $jsInfo.toggleClass('is-hidden');
    });

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

    function isHover ($el, $cursor) {
        var targetPosition = $el.get(0).getBoundingClientRect(),
            cursorPosition = $cursor.get(0).getBoundingClientRect();

        return targetPosition.top < cursorPosition.top &&
                targetPosition.right > cursorPosition.right &&
                targetPosition.bottom > cursorPosition.bottom &&
                targetPosition.left < cursorPosition.left;
    }

    function scale (hands, Earth) {
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
    }

    function moveCamera (Scene, normalizedHandPosition, $cursor) {
        $cursor.addClass('is-hidden');
        Scene.camera.position.x = normalizedHandPosition[0];
        Scene.camera.position.y = normalizedHandPosition[1];
        Scene.camera.position.z = normalizedHandPosition[2];
    }

    function moveCursor (normalizedPoint, frameHeight, frameWidth, $cursor) {
        $cursor.removeClass('is-hidden');
        $cursor.offset({
            top: (1 - normalizedPoint[1]) * frameHeight,
            left: normalizedPoint[0] * frameWidth
        });

        return false;
    }

    controller.use('riggedHand', {
            materialOptions: {
                opacity: 1
            }
        }).use('handHold')
        .on('frame', function (frame) {
            if (frame.valid && frame.gestures.length && frame.hands.length) {
                var handMesh = frame.hands[0].data('riggedHand.mesh');

                frame.gestures.forEach(function (gesture) {
                    switch (gesture.type) {
                        case "keyTap":
                            if (!isHover($menuLink, $cursor)) {
                                $content.toggleClass('js-hover');

                                if ($content.hasClass('js-hover')) {
                                    $currentMode.html(MODES.ui);
                                    handMesh.material.opacity = 0;
                                } else {
                                    $currentMode.html(MODES.camera);
                                    handMesh.material.opacity = 1;
                                }
                            } else {
                                $jsInfo.toggleClass('is-hidden');
                            }
                            console.log("Key Tap Gesture");
                            break;
                    }
                });
            }

            if (frame.valid && frame.hands.length) {
                var hands = frame.hands,
                    frameHeight = window.innerHeight,
                    frameWidth = window.innerWidth,
                    iBox = frame.interactionBox,
                    pointable = frame.pointables[0],
                    leapPoint = pointable.stabilizedTipPosition,
                    normalizedPoint = iBox.normalizePoint(leapPoint, true),
                    normalizedHandPosition = normilizedPosition(leapPoint, iBox);

                // Scale
                if (hands.length == 2) {
                    scale(hands, Earth);
                } else if (hands.length == 1) {
                    if (hands[0].fingers[1].extended && $content.hasClass('js-hover')) {
                        moveCursor(normalizedPoint, frameHeight, frameWidth, $cursor);
                        $menuLink.toggleClass('is-menu-hover', isHover($menuLink, $cursor));
                    } else if (!$content.hasClass('js-hover')) {
                        moveCamera(Scene, normalizedHandPosition, $cursor);
                    }
                }
            }
        });

    controller.connect();
});