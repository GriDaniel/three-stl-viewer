let mode = false;              
let dragging = false;          
let startY = 0;                
let startHeight = 0;          
let handle = null;         

let env = {
    container: null,           
    renderer: null,            
    camera: null               
};
export function initResizeHandler(container, renderer, camera) {
    env = { container, renderer, camera };
    handle = document.querySelector('.resize-handle') || document.createElement('div');

    if (!handle.parentNode) {
        handle.classList.add('resize-handle');
        container.appendChild(handle);
    }

    handle.style.display = 'none';
    handle.addEventListener('mousedown', startResize);
    window.addEventListener('resize', updateRendererSize);

    return { updateRendererSize };
}

export function toggleResizeMode() {
    mode = !mode;
    handle.style.display = mode ? 'block' : 'none';
    return mode;
}

function startResize(e) {
    if (!mode) return;
    dragging = true;
    startY = e.clientY;
    startHeight = env.container.clientHeight;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
}

function resize(e) {
    if (!dragging) return;
    env.container.style.height = `${startHeight + (e.clientY - startY)}px`;
    updateRendererSize();
}

function stopResize() {
    dragging = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}

export function updateRendererSize() {
    const { clientWidth: w, clientHeight: h } = env.container;
    if (w <= 0 || h <= 0) return;
    env.camera.aspect = w / h;
    env.camera.updateProjectionMatrix();
    env.renderer.setSize(w, h);
}

export function cleanupResizeHandler() {
    handle?.parentNode?.removeChild(handle);
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
    mode = dragging = false;
    handle = null;
    env = { container: null, renderer: null, camera: null };
}