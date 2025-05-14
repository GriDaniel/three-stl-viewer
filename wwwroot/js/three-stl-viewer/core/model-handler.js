import { THREE, DEFAULT_MATERIAL_PROPS, DEFAULT_BB_COLOR } from '../utils/constants.js';
import { initBBox, getBBoxSize } from '../features/bounding-box.js'; 

let oPos = null, oScl = null;
let mSize = null; 
let iCamPos = null, iCamTgt = null; 

function _centerGeo(geo) {
    geo.computeBoundingBox();
    const center = new THREE.Vector3();
    geo.boundingBox.getCenter(center);
    geo.translate(-center.x, -center.y, -center.z);
}

function _setupCam(cam, ctrls, modelSizeVec) {
    const maxD = Math.max(modelSizeVec.x, modelSizeVec.y, modelSizeVec.z);
    const camDist = maxD > 0 ? maxD * 2 : 10; 

    cam.position.set(0, 0, camDist);
    cam.lookAt(0, 0, 0);

    iCamPos.copy(cam.position);
    iCamTgt.set(0, 0, 0); 

    if (ctrls) {
        ctrls.target.copy(iCamTgt);
        ctrls.update();
    }
}
export function createMat(opts = {}) { 
    const props = { ...DEFAULT_MATERIAL_PROPS, ...opts };
    return new THREE.MeshPhysicalMaterial(props);
}

export function loadMdl(url, env, onDone = null) { 

    const { scene, camera, controls } = env; 
    const mat = createMat();

    oPos = oPos || new THREE.Vector3();
    oScl = oScl || new THREE.Vector3(1, 1, 1); 
    mSize = mSize || new THREE.Vector3();
    iCamPos = iCamPos || new THREE.Vector3();
    iCamTgt = iCamTgt || new THREE.Vector3();

    const loader = new THREE.STLLoader();
    loader.load(
        url,
        (geo) => {
            _centerGeo(geo);
            env.modelMesh = new THREE.Mesh(geo, mat); 

            oPos.copy(env.modelMesh.position); 
            oScl.copy(env.modelMesh.scale);    

            scene.add(env.modelMesh);
            initBBox(scene, env.modelMesh, DEFAULT_BB_COLOR); 

            const curMSize = getBBoxSize();
            if (curMSize) {
                mSize.copy(curMSize);
                _setupCam(camera, controls, mSize);
            }

            if (!scene.getObjectByProperty('type', 'AmbientLight')) { 
                scene.add(new THREE.AmbientLight(0x404040));
            }

            if (onDone) onDone(env);
        },
        (xhr) => console.log(`${(xhr.loaded / xhr.total * 100).toFixed(0)}% loaded`),
        (err) => console.error("STL load error:", err)
    );
}

export function resetMdlPos(env) { 
    if (!env?.modelMesh || !oPos) return;

    env.modelMesh.position.copy(oPos);
    if (mSize && env.camera) { 
        _setupCam(env.camera, env.controls, mSize); 
    }
}

export function resetCamView(env) { 
    if (!env?.camera || !iCamPos || !iCamTgt) return;

    env.camera.position.copy(iCamPos);
    if (env.controls) {
        env.controls.target.copy(iCamTgt);
        env.controls.update();
    }
}