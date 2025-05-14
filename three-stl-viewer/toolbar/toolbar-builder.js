import { Toolbar } from './toolbar-class.js';
import * as Icons from './icons.js';
import { togglePopup } from './popups.js';
import {
    borderColors, backgroundColors, faceQuaternions,
    BTN_ID_VIEW_FRONT, BTN_ID_VIEW_BACK, BTN_ID_VIEW_TOP, BTN_ID_VIEW_BOTTOM, BTN_ID_VIEW_LEFT, BTN_ID_VIEW_RIGHT,
    BTN_ID_RESET_SIZE, BTN_ID_RESET_POS,
    BTN_ID_TOGGLE_BORDER, BTN_ID_BORDER_COLOR,
    BTN_ID_BG_COLOR,
    BTN_ID_RESIZE_MODE
} from '../utils/constants.js';
import { toggleBBox, setBBoxClr } from '../features/bounding-box.js';
import { toggleResize } from '../features/resize-handler.js';
import { resetMdlPos, resetCamView } from '../core/model-handler.js';
export function initToolbar(cont, env) {
    const tb = new Toolbar(cont);

    addOrientationBtns(tb, env);
    addResetBtns(tb, env);
    addBorderBtns(tb, env);
    addBackgroundBtns(tb, env);
    addResizeBtns(tb);
    return tb;
}
function addOrientationBtns(tb, env) {
    const { cameraControls: camCtrl } = env;
    const sectLbl = 'View Orientations';

    tb.addBtn(BTN_ID_VIEW_FRONT, 'Front', Icons.frontIcon, () => camCtrl.flyTo(faceQuaternions.FRONT), {}, sectLbl);
    tb.addBtn(BTN_ID_VIEW_BACK, 'Back', Icons.backIcon, () => camCtrl.flyTo(faceQuaternions.BACK), {}, sectLbl);
    tb.addBtn(BTN_ID_VIEW_TOP, 'Top', Icons.topIcon, () => camCtrl.flyTo(faceQuaternions.TOP), {}, sectLbl);
    tb.addBtn(BTN_ID_VIEW_BOTTOM, 'Bottom', Icons.bottomIcon, () => camCtrl.flyTo(faceQuaternions.BOTTOM), {}, sectLbl);
    tb.addBtn(BTN_ID_VIEW_LEFT, 'Left', Icons.leftIcon, () => camCtrl.flyTo(faceQuaternions.LEFT), {}, sectLbl);
    tb.addBtn(BTN_ID_VIEW_RIGHT, 'Right', Icons.rightIcon, () => camCtrl.flyTo(faceQuaternions.RIGHT), {}, sectLbl);
}

function addResetBtns(tb, env) {
    const sectLbl = 'Reset';
    tb.addBtn(BTN_ID_RESET_SIZE, 'Reset Size', Icons.resetSizeIcon, () => resetCamView(env), {}, sectLbl);
    tb.addBtn(BTN_ID_RESET_POS, 'Reset Position', Icons.resetPositionIcon, () => resetMdlPos(env), {}, sectLbl);
}

function addBorderBtns(tb, env) {
    const { scene, modelMesh } = env;
    const sectLbl = 'Border';
    let borderToggleBtnEl;

    borderToggleBtnEl = tb.addBtn(
        BTN_ID_TOGGLE_BORDER, 'Toggle Border', Icons.createBorderToggleIcon(false),
        () => {
            const isVisible = toggleBBox(scene);
            if (borderToggleBtnEl) {
                borderToggleBtnEl.innerHTML = Icons.createBorderToggleIcon(isVisible);
            }
        }, {}, sectLbl
    );

    tb.addBtn(BTN_ID_BORDER_COLOR, 'Change Border Color', Icons.colorPickerIcon, (e) => {
        const btn = e.currentTarget || e.target;
        togglePopup(btn, () => ({ 
            colors: borderColors, 
            onSelect: (colorValue) => setBBoxClr(scene, modelMesh, colorValue)
        }));
        e.stopPropagation();
    }, {}, sectLbl);
}

function addBackgroundBtns(tb, env) {
    const { renderer: rend } = env;
    const sectLbl = 'Background';

    tb.addBtn(BTN_ID_BG_COLOR, 'Change Background', Icons.colorPickerIcon, (e) => {
        const btn = e.currentTarget || e.target;
        togglePopup(btn, () => ({
            colors: backgroundColors,
            onSelect: (colorValue) => rend.setClearColor(colorValue)
        }));
        e.stopPropagation();
    }, {}, sectLbl);
}

function addResizeBtns(tb) {
    const sectLbl = 'Resize';
    tb.addBtn(BTN_ID_RESIZE_MODE, 'Resize', Icons.resetSizeIcon, toggleResize, {}, sectLbl);
}