export const THREE = window.ThreeModule.THREE;

export const borderColors = [
    { name: 'Blue', hex: '#0088ff', value: 0x0088ff },
    { name: 'Red', hex: '#ff0000', value: 0xff0000 },
    { name: 'Green', hex: '#00ff00', value: 0x00ff00 },
    { name: 'Yellow', hex: '#ffff00', value: 0xffff00 },
    { name: 'Magenta', hex: '#ff00ff', value: 0xff00ff },
    { name: 'Cyan', hex: '#00ffff', value: 0x00ffff },
    { name: 'White', hex: '#ffffff', value: 0xffffff }
];

export const TB_OVERLAY_ID = 'stl-viewer-toolbar-overlay'; 
export const TB_MAIN_ID = 'stl-viewer-toolbar-main';      

export const backgroundColors = [
    { name: 'Dark Gray', hex: '#303030', value: 0x303030 },
    { name: 'Black', hex: '#000000', value: 0x000000 },
    { name: 'Navy Blue', hex: '#001a33', value: 0x001a33 },
    { name: 'Dark Green', hex: '#0a3300', value: 0x0a3300 },
    { name: 'Dark Purple', hex: '#1a0033', value: 0x1a0033 },
    { name: 'White', hex: '#ffffff', value: 0xffffff }
];

export const faceQuaternions = {
        FRONT: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0, 'XYZ')),
        BACK: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0, 'XYZ')),
        TOP: new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0, 'XYZ')),
        BOTTOM: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0, 'XYZ')),
        LEFT: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI / 2, 0, 'XYZ')),
        RIGHT: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 2, 0, 'XYZ'))
   
}

export const MODEL_PATH = '/js/three-stl-viewer/assets/test.stl';

export const DEFAULT_MATERIAL_PROPS = {
    color: 0xb2ffc8,
    metalness: 0.25,
    roughness: 0.1,
    opacity: 1.0,
    transparent: true,
    transmission: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25
};
export const VC_OPTS = {
    pos: THREE.ObjectPosition.RIGHT_TOP, 
    dimension: 150,
    hoverColor: 0xFFFF00,
    outlineColor: 0xFFFFFF,
    fontSize: 40
};
export const AXES_SIZE = 5; 
export const SPOT_LIGHT_POS = { x: 20, y: 20, z: 20 };

export const DEF_CAM_FOV = 75;
export const DEF_CAM_NEAR = 0.1;
export const DEF_CAM_FAR = 1000;
export const DEF_CLEAR_COLOR = 0x303030;


export const DEFAULT_BB_COLOR = 0x0088FF; 

export const RESIZE_HANDLE_ID = 'three-viewer-resize-handle';

export const POPUP_ID_COLOR_PICKER = 'global-color-picker-popup';
export const DEFAULT_CUSTOM_COLOR = '#0088FF';
export const MAX_SWATCHES = 12; 
export const BTN_ID_VIEW_FRONT = "btnViewFront";
export const BTN_ID_VIEW_BACK = "btnViewBack";
export const BTN_ID_VIEW_TOP = "btnViewTop";
export const BTN_ID_VIEW_BOTTOM = "btnViewBottom";
export const BTN_ID_VIEW_LEFT = "btnViewLeft";
export const BTN_ID_VIEW_RIGHT = "btnViewRight";

export const BTN_ID_RESET_SIZE = "btnResetSize";
export const BTN_ID_RESET_POS = "btnResetPos";

export const BTN_ID_TOGGLE_BORDER = "btnToggleBorder";
export const BTN_ID_BORDER_COLOR = "btnBorderColor";

export const BTN_ID_BG_COLOR = "btnBgColor";

export const BTN_ID_RESIZE_MODE = "btnResizeMode";

export const SEP_ID_VIEW_ORIENT = "sepViewOrient";
export const SEP_ID_RESET = "sepReset";
export const SEP_ID_BORDER = "sepBorder";
export const SEP_ID_BG_COLOR = "sepBgColor"; 
