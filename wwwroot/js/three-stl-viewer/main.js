import { initThreeEnvironment, startAnimationLoop, cleanupThreeEnvironment } from './core/three-environment.js';
import { loadModel } from './core/model-handler.js';
import { initResizeHandler, cleanupResizeHandler } from './features/resize-handler.js';
import { resetBoundingBox } from './features/bounding-box.js';
import { initToolbar } from './toolbar/toolbar-builder.js';
import { cleanupPopups } from './toolbar/popups.js';
import { createFaceQuaternions } from './utils/constants.js';

let environment = null;
let stopAnimation = null;
let toolbar = null;

function initializeThreeSTLViewer() {
    const container = document.getElementById('three-container');
    if (!container) {
        console.error('three-container div not found');
        return;
    }

    container.classList.add('three-container');

    environment = initThreeEnvironment(container);
    if (!environment) {
        console.error('environemnt setup failure');
        return;
    }

    initResizeHandler(container, environment.renderer, environment.camera);

    const THREE = window.ThreeModule.THREE;
    const faceQuaternions = createFaceQuaternions(THREE);

    loadModel('/js/three-stl-viewer/assets/test.stl', environment, () => {
        toolbar = initToolbar(container, environment, faceQuaternions);
        stopAnimation = startAnimationLoop(environment);
    });
}

function cleanupThreeScene() {
    if (stopAnimation) {
        stopAnimation();
    }

    if (toolbar) {
        toolbar.dispose();
        toolbar = null;
    }

    cleanupPopups();
    cleanupResizeHandler();
    resetBoundingBox();
    cleanupThreeEnvironment(environment);

    environment = null;
    stopAnimation = null;
}

// Export functions for Blazor interop
window.initializeThreeSTLViewer = initializeThreeSTLViewer;
window.cleanupThreeScene = cleanupThreeScene;