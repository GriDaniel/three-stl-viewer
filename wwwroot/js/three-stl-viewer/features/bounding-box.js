let boxHelper = null;
let borderVisible = false;
let currentBorderColor = 0x0088ff;
let modelBox = null;

export function createBoundingBox(scene, mesh, color = 0x0088ff) {
    const THREE = window.ThreeModule.THREE;
    if (!THREE) return null;

    if (boxHelper) scene.remove(boxHelper);

    modelBox = new THREE.Box3().setFromObject(mesh);
    boxHelper = new THREE.Box3Helper(modelBox, color);
    boxHelper.visible = borderVisible;
    scene.add(boxHelper);

    currentBorderColor = color;
    return boxHelper;
}

export function toggleBoundingBox() {
    if (!boxHelper) return false;

    borderVisible = !borderVisible;
    boxHelper.visible = borderVisible;

    return borderVisible;
}

export function changeBoundingBoxColor(scene, mesh, color) {
    if (!mesh) return;

    currentBorderColor = color;

    if (boxHelper) scene.remove(boxHelper);
    createBoundingBox(scene, mesh, color);
    boxHelper.visible = borderVisible;
}

export function getBoundingBoxSize() {
    if (!modelBox) return null;

    const THREE = window.ThreeModule.THREE;
    if (!THREE) return null;

    const size = new THREE.Vector3();
    return modelBox.getSize(size);
}
export function getBoundingBoxState() {
    return {
        visible: borderVisible,
        color: currentBorderColor,
        box: modelBox
    };
}

export function resetBoundingBox() {
    boxHelper = null;
    borderVisible = false;
    modelBox = null;
}