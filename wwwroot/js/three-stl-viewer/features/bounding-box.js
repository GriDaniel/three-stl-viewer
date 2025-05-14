import { THREE, DEFAULT_BB_COLOR } from '../utils/constants.js'; 

let bHlp = null; 
let isVis = false; 
let curClr = DEFAULT_BB_COLOR; 
let mBox = null; 
function _addBox(scn, msh, clr) {
    if (bHlp) scn.remove(bHlp);
    mBox = new THREE.Box3().setFromObject(msh);
    bHlp = new THREE.Box3Helper(mBox, clr);
    bHlp.visible = isVis; 
    scn.add(bHlp);
    curClr = clr;
}
export function initBBox(scn, msh, clr = curClr) { 
    if (!msh || !scn) return null; 

    _addBox(scn, msh, clr);
    return bHlp;
}
export function toggleBBox(scn, msh) { 
    if (!bHlp && msh && scn) _addBox(scn, msh, curClr); 
    if (!bHlp) return isVis; 

    isVis = !isVis;
    bHlp.visible = isVis;
    return isVis;
}
export function setBBoxClr(scn, msh, clr) {
    if (!msh || !scn) return; 

    _addBox(scn, msh, clr);
}
export function getBBoxSize() {

    return mBox?.getSize(new THREE.Vector3());
}
export function getBBoxState() {
    return { vis: isVis, clr: curClr, box: mBox };
}
export function resetBBox(scn) {
    if (bHlp && scn) scn.remove(bHlp); 
    bHlp = mBox = null;
    isVis = false;
}