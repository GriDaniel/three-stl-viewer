import { faceQuaternions, MODEL_PATH } from './utils//constants.js';
import { initThreeEnvironment, startAnimationLoop, cleanupThreeEnvironment } from './core/three-environment.js';
import { loadMdl } from './core/model-handler.js';
import { initResize, cleanupResize } from './features/resize-handler.js';
import { resetBBox } from './features/bounding-box.js';
import { initToolbar } from './toolbar/toolbar-builder.js';
import { cleanupPopups } from './toolbar/popups.js';

let env, stopAnimLoop, toolbar;

function initSTLViewer() {
    const cont = document.getElementById('three-container');
  
    env = initThreeEnvironment(cont);
    initResize(cont, env.renderer, env.camera);

  
    loadMdl(MODEL_PATH, env, () => {
        toolbar = initToolbar(cont, env, faceQuaternions);
        stopAnimLoop = startAnimationLoop(env);
    });
}

function cleanupSTLViewer() {
    stopAnimLoop?.();
    toolbar?.dispose();

    cleanupPopups();
    cleanupResize();
    resetBBox();
    if (env) { 
        cleanupThreeEnvironment(env);
    }

    env = stopAnimLoop = toolbar = null;
}

window.initSTLViewer = initSTLViewer;
window.cleanupSTLViewer = cleanupSTLViewer;