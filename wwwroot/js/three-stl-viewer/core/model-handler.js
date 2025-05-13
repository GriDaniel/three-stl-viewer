import { defaultMaterial } from '../utils/constants.js';
import { createBoundingBox, getBoundingBoxSize } from '../features/bounding-box.js';

let modelState = {
    originalScale: null,
    originalPosition: null,
    modelSize: null,
    initialCameraPosition: null,
    initialCameraTarget: null
};

export function createMaterial(options = {}) {
    const THREE = window.ThreeModule.THREE;
    if (!THREE) return null;

    const materialProps = { ...defaultMaterial, ...options };
    return new THREE.MeshPhysicalMaterial(materialProps);
}

export function loadModel(url, environment, onLoadComplete = null) {
    const THREE = window.ThreeModule.THREE;
    if (!THREE) return;

    const { scene, camera, controls } = environment;

    const material = createMaterial();

    modelState.originalScale = new THREE.Vector3(1, 1, 1);
    modelState.originalPosition = new THREE.Vector3(0, 0, 0);
    modelState.modelSize = new THREE.Vector3();
    modelState.initialCameraPosition = new THREE.Vector3();
    modelState.initialCameraTarget = new THREE.Vector3(0, 0, 0);

    const loader = new THREE.STLLoader();
    loader.load(
        url,
        (geometry) => {
            geometry.computeBoundingBox();
            const center = new THREE.Vector3();
            geometry.boundingBox.getCenter(center);
            geometry.translate(-center.x, -center.y, -center.z);

            environment.modelMesh = new THREE.Mesh(geometry, material);

            modelState.originalPosition.copy(environment.modelMesh.position);
            modelState.originalScale.copy(environment.modelMesh.scale);

            scene.add(environment.modelMesh);

            createBoundingBox(scene, environment.modelMesh, 0x0088ff);

            const size = getBoundingBoxSize();
            if (size) {
                modelState.modelSize.copy(size);

                const maxDim = Math.max(size.x, size.y, size.z);
                camera.position.set(0, 0, maxDim * 2);
                camera.lookAt(0, 0, 0);

                modelState.initialCameraPosition.copy(camera.position);

                if (controls) {
                    controls.target.copy(modelState.initialCameraTarget);
                    controls.update();
                }
            }

            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);

            if (onLoadComplete) onLoadComplete(environment);
        },
        (xhr) => {
            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log(`${percentComplete.toFixed(0)}% loaded`);
        },
        (error) => {
            console.error("STL load error:", error);
        }
    );
}

export function resetModelPosition(environment) {
    if (!environment || !environment.modelMesh) return;

    environment.modelMesh.position.copy(modelState.originalPosition);

    const maxDim = Math.max(modelState.modelSize.x, modelState.modelSize.y, modelState.modelSize.z);
    environment.camera.position.set(0, 0, maxDim * 2);
    environment.camera.lookAt(0, 0, 0);

    if (environment.controls) {
        environment.controls.target.set(0, 0, 0);
        environment.controls.update();
    }
}

export function resetCameraView(environment) {
    if (!environment) return;

    environment.camera.position.copy(modelState.initialCameraPosition);

    if (environment.controls) {
        environment.controls.target.copy(modelState.initialCameraTarget);
        environment.controls.update();
    }
}