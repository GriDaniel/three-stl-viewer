const svgStr = (pData, vb = '0 0 24 24', fill = 'currentColor', w = '24', h = '24') => {
    return `<svg width="${w}" height="${h}" viewBox="${vb}" fill="${fill}" xmlns="http://www.w3.org/2000/svg">
                <path d="${pData}"></path>
            </svg>`;
};

const multiPathSvgStr = (paths, vb = '0 0 24 24', w = '24', h = '24') => {
    const pathElements = paths.map(pInfo => {
        let attrs = `d="${pInfo.d}"`;
        if (pInfo.fill) attrs += ` fill="${pInfo.fill}"`;
        else attrs += ` fill="currentColor"`; 
        if (pInfo.stroke) attrs += ` stroke="${pInfo.stroke}"`;
        if (pInfo.strokeWidth) attrs += ` stroke-width="${pInfo.strokeWidth}"`;
        return `<path ${attrs}></path>`;
    }).join('');
    return `<svg width="${w}" height="${h}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">
                ${pathElements}
            </svg>`;
};

export const frontIcon = svgStr('M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5H5z', '0 0 24 24', 'white');
export const backIcon = svgStr('M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4h10v10H7V7z', '0 0 24 24', 'white');
export const topIcon = svgStr('M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2H4V5zm16 4H4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z', '0 0 24 24', 'white');
export const bottomIcon = svgStr('M4 9h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9zm0-4v2h16V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z', '0 0 24 24', 'white');
export const leftIcon = svgStr('M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h4V5H5z', '0 0 24 24', 'white');
export const rightIcon = svgStr('M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 2v14h4V5h-4z', '0 0 24 24', 'white');

export const resetSizeIcon = svgStr('M21 9l-9-7-9 7h3v8h3v-6h6v6h3V9h3zm-13 4h-2v5h2v-5zm10 0h-2v5h2v-5zm-5-9.8l6 4.5v10.3H5V7.7l6-4.5z', '0 0 24 24', 'white');
export const resetPositionIcon = svgStr('M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z', '0 0 24 24', 'white');

const borderVisibleIconStr = svgStr('M3 3v18h18V3H3zm2 2h14v14H5V5zm2 2v4h4V7H7zm6 0v4h4V7h-4zm-6 6v4h4v-4H7zm6 0v4h4v-4h-4z', '0 0 24 24', 'white');
const borderHiddenIconStr = multiPathSvgStr([
    { d: 'M3 3v18h18V3H3zm2 2h14v14H5V5zm2 2v4h4V7H7zm6 0v4h4V7h-4zm-6 6v4h4v-4H7zm6 0v4h4v-4h-4z', fill: 'white' },
    { d: 'M2 4.27L3.27 3L21 20.73L19.73 22L2 4.27z', fill: 'red' } // Ensure 'red' is desired, not 'currentColor'
]);
export const colorPickerIcon = multiPathSvgStr([
    { d: 'M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67 0 1.38-1.12 2.5-2.5 2.5zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5 0-.16-.08-.28-.14-.35-.41-.46-.63-1.05-.63-1.65 0-1.38 1.12-2.5 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z', fill: 'white' },
    { d: 'M6.5 10c.8 0 1.5.7 1.5 1.5S7.3 13 6.5 13 5 12.3 5 11.5 5.7 10 6.5 10zm3-4C10.3 6 11 6.7 11 7.5S10.3 9 9.5 9 8 8.3 8 7.5 8.7 6 9.5 6zm5 0c.8 0 1.5.7 1.5 1.5S15.3 9 14.5 9 13 8.3 13 7.5 13.7 6 14.5 6zm3 4c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z', fill: '#f44336' } // Explicit fill color
]);

export function createBorderToggleIcon(isVisible) {
    return isVisible ? borderVisibleIconStr : borderHiddenIconStr;
}