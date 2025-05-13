export const borderColors = [
    { name: 'Blue', hex: '#0088ff', value: 0x0088ff },
    { name: 'Red', hex: '#ff0000', value: 0xff0000 },
    { name: 'Green', hex: '#00ff00', value: 0x00ff00 },
    { name: 'Yellow', hex: '#ffff00', value: 0xffff00 },
    { name: 'Magenta', hex: '#ff00ff', value: 0xff00ff },
    { name: 'Cyan', hex: '#00ffff', value: 0x00ffff },
    { name: 'White', hex: '#ffffff', value: 0xffffff }
];

export const backgroundColors = [
    { name: 'Dark Gray', hex: '#303030', value: 0x303030 },
    { name: 'Black', hex: '#000000', value: 0x000000 },
    { name: 'Navy Blue', hex: '#001a33', value: 0x001a33 },
    { name: 'Dark Green', hex: '#0a3300', value: 0x0a3300 },
    { name: 'Dark Purple', hex: '#1a0033', value: 0x1a0033 },
    { name: 'White', hex: '#ffffff', value: 0xffffff }
];

export function createFaceQuaternions(THREE) {
    return {
        FRONT: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0, 'XYZ')),
        BACK: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0, 'XYZ')),
        TOP: new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0, 'XYZ')),
        BOTTOM: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0, 'XYZ')),
        LEFT: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI / 2, 0, 'XYZ')),
        RIGHT: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 2, 0, 'XYZ'))
    };
}

export const defaultMaterial = {
    color: 0xb2ffc8,
    metalness: 0.25,
    roughness: 0.1,
    opacity: 1.0,
    transparent: true,
    transmission: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25
};