import { RESIZE_HANDLE_ID } from '../utils/constants.js';

let isActive = false;
let isDragging = false;
let startY = 0;
let startHeight = 0;
let handleEl = null;

let dragCtx = { cont: null, rend: null, cam: null };
let currentMouseMoveHandler = null;
let currentMouseUpHandler = null;

function onMouseDown(e, cont, rend, cam) {
    if (!isActive) return;
    isDragging = true;
    startY = e.clientY;
    startHeight = cont.clientHeight;
    dragCtx = { cont, rend, cam }; 

    currentMouseMoveHandler = (ev) => onMouseMove(ev); 
    currentMouseUpHandler = () => onMouseUp();

    document.addEventListener('mousemove', currentMouseMoveHandler);
    document.addEventListener('mouseup', currentMouseUpHandler);
    e.preventDefault();
}

function onMouseMove(e) { 
    if (!isDragging) return;
    dragCtx.cont.style.height = `${startHeight + (e.clientY - startY)}px`;
    updateSize(dragCtx.cont, dragCtx.rend, dragCtx.cam);
}

function onMouseUp() { 
    isDragging = false;
    document.removeEventListener('mousemove', currentMouseMoveHandler);
    document.removeEventListener('mouseup', currentMouseUpHandler);
    currentMouseMoveHandler = null;
    currentMouseUpHandler = null;
    dragCtx = { cont: null, rend: null, cam: null };
}

export function updateSize(cont, rend, cam) {
    if (!cont || !rend || !cam) return; 
    const w = cont.clientWidth;
    const h = cont.clientHeight;
    if (w <= 0 || h <= 0) return;

    cam.aspect = w / h;
    cam.updateProjectionMatrix();
    rend.setSize(w, h);
}

export function initResize(cont, rend, cam) {
    handleEl = document.getElementById(RESIZE_HANDLE_ID);

    if (!handleEl) {
        console.error('Resize handle element not found in DOM.');
        return { updateSize: () => updateSize(cont, rend, cam) };
    }

    handleEl.style.display = 'none';

    handleEl.addEventListener('mousedown', (e) => onMouseDown(e, cont, rend, cam));
    window.addEventListener('resize', () => updateSize(cont, rend, cam));

    return { updateSize: () => updateSize(cont, rend, cam) };
}

export function toggleResize() {
    if (!handleEl) return isActive;
    isActive = !isActive;
    handleEl.style.display = isActive ? 'block' : 'none';
    return isActive;
}

export function cleanupResize() {
    if (handleEl) {
        handleEl.style.display = 'none';
    }
   
    if (currentMouseMoveHandler) document.removeEventListener('mousemove', currentMouseMoveHandler);
    if (currentMouseUpHandler) document.removeEventListener('mouseup', currentMouseUpHandler);

    isActive = isDragging = false;
    startY = startHeight = 0;
    currentMouseMoveHandler = null;
    currentMouseUpHandler = null;
    dragCtx = { cont: null, rend: null, cam: null };
}