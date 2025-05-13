import { Toolbar } from './toolbar-class.js';
import * as Icons from './icons.js';
import { createColorPickerPopup, togglePopup, cleanupPopups } from './popups.js';
import { borderColors, backgroundColors } from '../utils/constants.js';
import { toggleBoundingBox, changeBoundingBoxColor } from '../features/bounding-box.js';
import { toggleResizeMode } from '../features/resize-handler.js';
import { resetModelPosition, resetCameraView } from '../core/model-handler.js';

export function initToolbar(container, environment, faceQuaternions) {
    const toolbar = new Toolbar(container);

    addViewOrientationButtons(toolbar, environment, faceQuaternions);
    addResetButtons(toolbar, environment);
    addBorderButtons(toolbar, environment);
    addBackgroundButtons(toolbar, environment);
    addResizeButtons(toolbar);
}

function addViewOrientationButtons(toolbar, environment, faceQuaternions) {
    const { cameraControls } = environment;

    toolbar.addButton('Front', Icons.frontIcon, () => {
        cameraControls.flyTo(faceQuaternions.FRONT);
    }, {}, 'View Orientations');

    toolbar.addButton('Back', Icons.backIcon, () => {
        cameraControls.flyTo(faceQuaternions.BACK);
    }, {}, 'View Orientations');

    toolbar.addButton('Top', Icons.topIcon, () => {
        cameraControls.flyTo(faceQuaternions.TOP);
    }, {}, 'View Orientations');

    toolbar.addButton('Bottom', Icons.bottomIcon, () => {
        cameraControls.flyTo(faceQuaternions.BOTTOM);
    }, {}, 'View Orientations');

    toolbar.addButton('Left', Icons.leftIcon, () => {
        cameraControls.flyTo(faceQuaternions.LEFT);
    }, {}, 'View Orientations');

    toolbar.addButton('Right', Icons.rightIcon, () => {
        cameraControls.flyTo(faceQuaternions.RIGHT);
    }, {}, 'View Orientations');

    toolbar.addSeparator('View Orientations');
}

function addResetButtons(toolbar, environment) {
    toolbar.addButton('Reset Size', Icons.resetSizeIcon, () => {
        resetCameraView(environment);
    }, {}, 'Reset');

    toolbar.addButton('Reset Position', Icons.resetPositionIcon, () => {
        resetModelPosition(environment);
    }, {}, 'Reset');

    toolbar.addSeparator('Reset');
}

function addBorderButtons(toolbar, environment) {
    const { scene } = environment;
    const { modelMesh } = environment;

    let borderToggleButton = toolbar.addButton(
        'Toggle Border',
        Icons.createBorderToggleIcon(false),
        () => {
            const isVisible = toggleBoundingBox(scene);
            if (borderToggleButton && borderToggleButton.innerHTML) {
                borderToggleButton.innerHTML = '';
                borderToggleButton.appendChild(Icons.createBorderToggleIcon(isVisible));
            }
        },
        {},
        'Border'
    );

    toolbar.addButton('Change Border Color', Icons.colorPickerIcon, (e) => {
        const button = e.currentTarget || e.target;
        togglePopup(button, () => {
            return createColorPickerPopup(
                toolbar.toolbarElement,
                borderColors,
                (color) => changeBoundingBoxColor(scene, modelMesh, color)
            );
        });
        e.stopPropagation();
    }, {}, 'Border');

    toolbar.addSeparator('Border');
}

function addBackgroundButtons(toolbar, environment) {
    const { renderer } = environment;

    toolbar.addButton('Change Background', Icons.colorPickerIcon, (e) => {
        const button = e.currentTarget || e.target;
        togglePopup(button, () => {
            return createColorPickerPopup(
                toolbar.toolbarElement,
                backgroundColors,
                (color) => renderer.setClearColor(color)
            );
        });
        e.stopPropagation();
    }, {}, 'Background');

    toolbar.addSeparator('Background');
}

function addResizeButtons(toolbar) {
    toolbar.addButton('Resize', Icons.resetSizeIcon, () => {
        toggleResizeMode();
    }, {}, 'Resize');
}