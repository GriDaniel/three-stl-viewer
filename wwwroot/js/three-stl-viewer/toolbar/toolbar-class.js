import { TB_OVERLAY_ID, TB_MAIN_ID } from '../utils/constants.js';

export class Toolbar {
    constructor(cont, opts = {}) {
        this.cont = cont;
        this.opts = { ...opts };
        this.sects = [];
        this.globBtns = [];

        this.overlayEl = document.getElementById(TB_OVERLAY_ID);
        this.barEl = document.getElementById(TB_MAIN_ID);

        if (!this.overlayEl || !this.barEl) {
            console.error('Toolbar DOM elements (overlay or main) not found.');
        }
    }

    getSect(lbl) {
        if (!this.barEl || !lbl) return null;

        let sect = this.sects.find(s => s.lbl === lbl);
        if (sect) return sect;

        const sectEl = this.barEl.querySelector(`.toolbar-section[data-section-label="${lbl}"]`);
        if (!sectEl) return null;

        const btnContEl = sectEl.querySelector(`.toolbar-button-container`);
        if (!btnContEl) return null;

        sect = { lbl, btns: [], el: btnContEl };
        this.sects.push(sect);
        return sect;
    }

    addBtn(id, lbl, icon, onClick, styles = {}, sectLbl = null) {
        if (!this.barEl) return null;

        let targetCont;
        let sectStore;

        if (sectLbl) {
            const sect = this.getSect(sectLbl);
            if (sect) {
                targetCont = sect.el;
                sectStore = sect.btns;
            } else {
                targetCont = this.barEl;
                sectStore = this.globBtns;
            }
        } else {
            targetCont = this.barEl;
            sectStore = this.globBtns;
        }

        if (!targetCont) return null;

        const btn = targetCont.querySelector(`.toolbar-button[data-button-id="${id}"]`);
        if (!btn) return null;

        Object.assign(btn.style, styles);

        if (icon) {
            btn.innerHTML = icon;
            if (lbl) btn.title = lbl;
        } else if (lbl) {
            btn.textContent = lbl;
            btn.title = lbl;
        }

        btn.addEventListener('click', onClick);
        sectStore.push({ el: btn, handler: onClick });
        return btn;
    }

    addSep(id, sectLbl = null) {
        if (!this.barEl) return;

        let targetCont;
        if (sectLbl) {
            const sect = this.getSect(sectLbl);
            targetCont = sect ? sect.el : this.barEl;
        } else {
            targetCont = this.barEl;
        }

        if (!targetCont) return;
        const sep = targetCont.querySelector(`.toolbar-separator[data-separator-id="${id}"]`);
    }

    dispose() {
        this.sects.forEach(sect => {
            sect.btns.forEach(b => b.el.removeEventListener('click', b.handler));
            sect.btns = [];
        });
        this.globBtns.forEach(b => b.el.removeEventListener('click', b.handler));

        this.sects = [];
        this.globBtns = [];
    }
}