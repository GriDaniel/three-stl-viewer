import {
    POPUP_ID_COLOR_PICKER,
    DEFAULT_CUSTOM_COLOR,
    MAX_SWATCHES
} from '../utils/constants.js';

let curPopupEl = null;
let curPopupBtn = null;
let curOutsideClickHandler = null;
let curOnSelectCb = null;
function _applyColorsToSwatches(popupEl, colors) {
    const swatchCont = popupEl.querySelector('.color-picker-swatch-container');
    if (!swatchCont) return;
    const allSwatches = swatchCont.querySelectorAll('.color-picker-swatch');

    for (let i = 0; i < MAX_SWATCHES; i++) {
        const swatch = allSwatches[i];
        if (!swatch) continue;

        if (i < colors.length) {
            const colorData = colors[i];
            swatch.style.backgroundColor = colorData.hex;
            swatch.onclick = () => {
                if (curOnSelectCb) curOnSelectCb(colorData.value);
                _hideAndResetPicker(popupEl);
            };
            swatch.style.display = '';
        } else {
            swatch.style.display = 'none';
            swatch.onclick = null;
        }
    }
}
function _setupCustomColor(popupEl) {
    const colorInput = popupEl.querySelector('.color-picker-input');
    const applyBtn = popupEl.querySelector('.color-picker-apply');

    if (colorInput) colorInput.value = DEFAULT_CUSTOM_COLOR;

    if (applyBtn && colorInput) {
        applyBtn.onclick = () => {
            const colorVal = parseInt(colorInput.value.slice(1), 16);
            if (curOnSelectCb) curOnSelectCb(colorVal);
            _hideAndResetPicker(popupEl);
        };
    }
}
function _showAndConfigPicker(trigBtn, colorsData, onSelCb) {
    const popupEl = document.getElementById(POPUP_ID_COLOR_PICKER);
    if (!popupEl) {
        console.error('Color picker popup element not found in DOM.');
        return;
    }

    curOnSelectCb = onSelCb;
    _applyColorsToSwatches(popupEl, colorsData);
    _setupCustomColor(popupEl);

    popupEl.style.display = 'flex';

    curOutsideClickHandler = (e) => {
        if (popupEl && !popupEl.contains(e.target) && e.target !== trigBtn && !trigBtn.contains(e.target)) {
            _hideAndResetPicker(popupEl);
        }
    };
    requestAnimationFrame(() => {
        document.addEventListener('click', curOutsideClickHandler);
    });

    curPopupEl = popupEl;
    curPopupBtn = trigBtn;
}
function _hideAndResetPicker(popupElToHide) {
    if (popupElToHide) popupElToHide.style.display = 'none';

    if (curOutsideClickHandler) {
        document.removeEventListener('click', curOutsideClickHandler);
        curOutsideClickHandler = null;
    }

    if (curPopupEl === popupElToHide) {
        curPopupEl = null;
        curPopupBtn = null;
        curOnSelectCb = null;
    }
}
export function togglePopup(btn, getDataFn) {
    if (curPopupEl && curPopupBtn === btn) {
        _hideAndResetPicker(curPopupEl);
        return false;
    } else {
        if (curPopupEl) _hideAndResetPicker(curPopupEl);

        const popupData = getDataFn();
        if (popupData && popupData.colors && popupData.onSelect) {
            _showAndConfigPicker(btn, popupData.colors, popupData.onSelect);
        } else {
            console.error("Popup data not provided correctly by getDataFn");
        }
        return true;
    }
}
export function cleanupPopups() {
    if (curPopupEl) {
        _hideAndResetPicker(curPopupEl);
    }
}
