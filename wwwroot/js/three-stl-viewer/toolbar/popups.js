let currentPopup = null;
let currentPopupButton = null;

export function createColorPickerPopup(parent, colors, onSelect) {
    const existingPopup = document.getElementById('color-picker-popup');
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement('div');
    popup.id = 'color-picker-popup';
    popup.classList.add('color-picker-container');

    const swatchContainer = document.createElement('div');
    swatchContainer.classList.add('color-picker-swatch-container');

    colors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.classList.add('color-picker-swatch');
        swatch.style.backgroundColor = color.hex;
        swatch.onclick = () => {
            onSelect(color.value);
            popup.remove();
            if (currentPopup === popup) {
                currentPopup = null;
                currentPopupButton = null;
            }
        };
        swatchContainer.appendChild(swatch);
    });

    const customColorContainer = document.createElement('div');
    customColorContainer.classList.add('color-picker-custom-container');

    const label = document.createElement('span');
    label.textContent = 'Custom:';
    label.classList.add('color-picker-label');

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#0088ff';
    colorInput.classList.add('color-picker-input');

    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply';
    applyButton.classList.add('color-picker-apply');
    applyButton.onclick = () => {
        const colorValue = parseInt(colorInput.value.slice(1), 16);
        onSelect(colorValue);
        popup.remove();
        if (currentPopup === popup) {
            currentPopup = null;
            currentPopupButton = null;
        }
    };

    customColorContainer.appendChild(label);
    customColorContainer.appendChild(colorInput);
    customColorContainer.appendChild(applyButton);

    popup.appendChild(swatchContainer);
    popup.appendChild(customColorContainer);
    parent.appendChild(popup);

    const handleOutsideClick = (e) => {
        if (!popup.contains(e.target)) {
            popup.remove();
            if (currentPopup === popup) {
                currentPopup = null;
                currentPopupButton = null;
            }
            document.removeEventListener('click', handleOutsideClick);
        }
    };

    setTimeout(() => document.addEventListener('click', handleOutsideClick), 100);

    currentPopup = popup;
    currentPopupButton = parent;

    return popup;
}

export function togglePopup(button, createPopupFn) {
    if (currentPopup && currentPopupButton === button) {
        currentPopup.remove();
        currentPopup = null;
        currentPopupButton = null;
        return false;
    } else {
        if (currentPopup) currentPopup.remove();
        createPopupFn();
        return true;
    }
}

export function cleanupPopups() {
    if (currentPopup) {
        currentPopup.remove();
        currentPopup = null;
        currentPopupButton = null;
    }
}