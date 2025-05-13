export function initThreeEnvironment(container) {
    const THREE = window.ThreeModule.THREE;
    if (!THREE) {
        console.error("THREE.js not loaded");
        return null;
    }

    const environment = {
        scene: null,
        camera: null,
        renderer: null,
        controls: null,
        cameraControls: null,
        viewCube: null,
        container: container,
        modelMesh: null,
        viewCubeUpdateCount: 0
    };

    environment.scene = new THREE.Scene();
    environment.scene.add(new THREE.AxesHelper(5));

    const light = new THREE.SpotLight();
    light.position.set(20, 20, 20);
    environment.scene.add(light);

    const width = container.clientWidth;
    const height = container.clientHeight;
    environment.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    environment.camera.position.z = 3;

    environment.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    environment.renderer.setSize(width, height);
    environment.renderer.setClearColor(0x303030);
    environment.renderer.autoClear = false;
    container.appendChild(environment.renderer.domElement);

    environment.controls = new THREE.OrbitControls(environment.camera, environment.renderer.domElement);
    environment.controls.enableDamping = true;

    environment.cameraControls = new THREE.SimpleCameraControls(environment.camera);
    environment.cameraControls.setControls(environment.controls);

    environment.viewCube = new THREE.ViewCubeGizmo(environment.camera, environment.renderer, {
        pos: THREE.ObjectPosition.RIGHT_TOP,
        dimension: 150,
        hoverColor: 0xFFFF00,
        outlineColor: 0xFFFFFF,
        fontSize: 40
    });

    environment.viewCube.addEventListener('change', (event) => {
        environment.cameraControls.flyTo(event.quaternion);
    });

    return environment;
}

export function startAnimationLoop(environment) {
    let animationId = null;

    function animate() {
        animationId = requestAnimationFrame(animate);

        environment.controls.update();
        environment.cameraControls.update();

        environment.renderer.clear();
        environment.renderer.render(environment.scene, environment.camera);

        environment.viewCube.update();

        if (environment.viewCubeUpdateCount < 10) {
            environment.viewCubeUpdateCount++;
        }
    }

    animate();

    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    };
}

export function cleanupThreeEnvironment(environment) {
    if (!environment) return;

    if (environment.viewCube) {
        environment.viewCube.dispose();
        environment.viewCube = null;
    }

    if (environment.controls) {
        environment.controls.dispose();
        environment.controls = null;
    }

    if (environment.renderer) {
        if (environment.renderer.domElement && environment.renderer.domElement.parentNode) {
            environment.renderer.domElement.remove();
        }
        environment.renderer.dispose();
        environment.renderer = null;
    }

    environment.scene = null;
    environment.camera = null;
    environment.cameraControls = null;
    environment.modelMesh = null;
}