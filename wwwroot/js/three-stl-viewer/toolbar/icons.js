const createSvgIcon = (pathData, viewBox = '0 0 24 24', fill = 'white') => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', viewBox);
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.style.fill = fill;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    svg.appendChild(path);

    return svg;
};

const createMultiPathSvg = (paths, viewBox = '0 0 24 24') => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', viewBox);
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');

    paths.forEach(pathInfo => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathInfo.d);
        if (pathInfo.fill) path.setAttribute('fill', pathInfo.fill);
        if (pathInfo.stroke) path.setAttribute('stroke', pathInfo.stroke);
        if (pathInfo.strokeWidth) path.setAttribute('stroke-width', pathInfo.strokeWidth);
        svg.appendChild(path);
    });

    return svg;
};

export const frontIcon = createSvgIcon('M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5H5z');
export const backIcon = createSvgIcon('M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4h10v10H7V7z');
export const topIcon = createSvgIcon('M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2H4V5zm16 4H4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z');
export const bottomIcon = createSvgIcon('M4 9h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9zm0-4v2h16V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z');
export const leftIcon = createSvgIcon('M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h4V5H5z');
export const rightIcon = createSvgIcon('M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 2v14h4V5h-4z');

export const resetSizeIcon = createSvgIcon('M21 9l-9-7-9 7h3v8h3v-6h6v6h3V9h3zm-13 4h-2v5h2v-5zm10 0h-2v5h2v-5zm-5-9.8l6 4.5v10.3H5V7.7l6-4.5z');
export const resetPositionIcon = createSvgIcon('M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z');

export const borderVisibleIcon = createSvgIcon('M3 3v18h18V3H3zm2 2h14v14H5V5zm2 2v4h4V7H7zm6 0v4h4V7h-4zm-6 6v4h4v-4H7zm6 0v4h4v-4h-4z');
export const borderHiddenIcon = createMultiPathSvg([
    { d: 'M3 3v18h18V3H3zm2 2h14v14H5V5zm2 2v4h4V7H7zm6 0v4h4V7h-4zm-6 6v4h4v-4H7zm6 0v4h4v-4h-4z', fill: 'white' },
    { d: 'M2 4.27L3.27 3L21 20.73L19.73 22L2 4.27z', fill: 'red' }
]);
export const colorPickerIcon = createMultiPathSvg([
    { d: 'M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67 0 1.38-1.12 2.5-2.5 2.5zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5 0-.16-.08-.28-.14-.35-.41-.46-.63-1.05-.63-1.65 0-1.38 1.12-2.5 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z', fill: 'white' },
    { d: 'M6.5 10c.8 0 1.5.7 1.5 1.5S7.3 13 6.5 13 5 12.3 5 11.5 5.7 10 6.5 10zm3-4C10.3 6 11 6.7 11 7.5S10.3 9 9.5 9 8 8.3 8 7.5 8.7 6 9.5 6zm5 0c.8 0 1.5.7 1.5 1.5S15.3 9 14.5 9 13 8.3 13 7.5 13.7 6 14.5 6zm3 4c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z', fill: '#f44336' }
]);

export function createBorderToggleIcon(isVisible) {
    return isVisible ? borderVisibleIcon : borderHiddenIcon;
}