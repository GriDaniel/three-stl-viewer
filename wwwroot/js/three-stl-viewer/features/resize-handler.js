let isResizeMode = false;
let isResizing = false;
let startY = 0;
let startHeight = 0;
let resizeHandle = null;

export function initResizeHandler(container, renderer, camera) {
    resizeHandle = document.createElement('div');
    resizeHandle.classList.add('resize-handle');
    resizeHandle.style.display = 'none';
    container.appendChild(resizeHandle);

    resizeHandle.addEventListener('mousedown', e => startResize(e, container, renderer, camera));
    window.addEventListener('resize', () => updateRendererSize(container, renderer, camera));

    return { updateRendererSize: () => updateRendererSize(container, renderer, camera) };
}

export function toggleResizeMode() {
    isResizeMode = !isResizeMode;
    if (resizeHandle) {
        resizeHandle.style.display = isResizeMode ? 'block' : 'none';
    }
    return isResizeMode;
}

function startResize(e, container, renderer, camera) {
    if (!isResizeMode) return;

    isResizing = true;
    startY = e.clientY;
    startHeight = container.clientHeight;

    document.addEventListener('mousemove', e => resize(e, container, renderer, camera));
    document.addEventListener('mouseup', () => stopResize(renderer, camera));
}

function resize(e, container, renderer, camera) {
    if (!isResizing) return;

    const newHeight = startHeight + (e.clientY - startY);
    container.style.height = `${newHeight}px`;
    updateRendererSize(container, renderer, camera);
}

function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}

export function updateRendererSize(container, renderer, camera) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width <= 0 || height <= 0) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

export function cleanupResizeHandler() {
    if (resizeHandle && resizeHandle.parentNode) {
        resizeHandle.parentNode.removeChild(resizeHandle);
    }

    isResizeMode = false;
    isResizing = false;
    resizeHandle = null;
}