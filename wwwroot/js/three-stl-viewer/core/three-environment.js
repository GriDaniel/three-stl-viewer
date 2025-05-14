import { THREE } from '../utils/constants.js';

export function initThreeEnvironment(container) {
    const env = {
        scene: new THREE.Scene(),
        camera: null,
        renderer: null,
        controls: null,
        cameraControls: null,
        viewCube: null,
        container,
        modelMesh: null,
    };

    env.scene.add(new THREE.AxesHelper(5));
    const light = new THREE.SpotLight();
    light.position.set(20, 20, 20);
    env.scene.add(light);

    const { clientWidth: width, clientHeight: height } = container;
    env.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    env.camera.position.z = 3;

    env.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    env.renderer.setSize(width, height);
    env.renderer.setClearColor(0x303030);
    env.renderer.autoClear = false;
    container.appendChild(env.renderer.domElement);

    env.controls = new THREE.OrbitControls(env.camera, env.renderer.domElement);
    env.controls.enableDamping = true;
    env.cameraControls = new THREE.SimpleCameraControls(env.camera);
    env.cameraControls.setControls(env.controls);

    env.viewCube = new THREE.ViewCubeGizmo(env.camera, env.renderer, {
        pos: THREE.ObjectPosition.RIGHT_TOP,
        dimension: 150,
        hoverColor: 0xFFFF00,
        outlineColor: 0xFFFFFF,
        fontSize: 40
    });
    env.viewCube.addEventListener('change', e => env.cameraControls.flyTo(e.quaternion));

    return env;
}

export function startAnimationLoop(env) {
    let id = null;

    (function animate() {
        id = requestAnimationFrame(animate);

        env.controls.update();
        env.cameraControls.update();

        env.renderer.clear();
        env.renderer.render(env.scene, env.camera);

        env.viewCube.update();
    })();

    return () => id && cancelAnimationFrame(id);
}

export function cleanupThreeEnvironment(env) {
    if (!env) return;

    ['viewCube', 'controls'].forEach(prop => {
        if (env[prop]) {
            env[prop].dispose();
            env[prop] = null;
        }
    });

    if (env.renderer) {
        if (env.renderer.domElement?.parentNode) {
            env.renderer.domElement.remove();
        }
        env.renderer.dispose();
        env.renderer = null;
    }

    env.scene = env.camera = env.cameraControls = env.modelMesh = null;
}