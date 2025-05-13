export class Toolbar {
    constructor(container, options = {}) {
        this.container = container;
        this.options = Object.assign({}, options);
        this.sections = [];
        this.toolbarElement = null;
        this.overlayElement = null;

        setTimeout(() => this._createToolbar(), 100);
    }

    _createToolbar() {
        const canvas = this.container.querySelector('canvas');
        if (!canvas) {
            console.error('Canvas element not found in container');
            return;
        }

        this.overlayElement = document.createElement('div');
        this.overlayElement.classList.add('toolbar-container');

        this.toolbarElement = document.createElement('div');
        this.toolbarElement.classList.add('toolbar-main');

        this.overlayElement.appendChild(this.toolbarElement);

        if (canvas.nextSibling) {
            this.container.insertBefore(this.overlayElement, canvas.nextSibling);
        } else {
            this.container.appendChild(this.overlayElement);
        }
    }

    addSection(label) {
        if (!this.toolbarElement) {
            setTimeout(() => this.addSection(label), 150);
            return null;
        }

        const sectionContainer = document.createElement('div');
        sectionContainer.classList.add('toolbar-section');

        const header = document.createElement('div');
        header.classList.add('toolbar-section-header');
        header.textContent = label;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('toolbar-button-container');

        sectionContainer.appendChild(header);
        sectionContainer.appendChild(buttonContainer);
        this.toolbarElement.appendChild(sectionContainer);

        const section = {
            label,
            buttons: [],
            element: buttonContainer
        };
        this.sections.push(section);

        return section;
    }

    addButton(label, icon, onClick, customStyles = {}, sectionLabel = null) {
        if (!this.toolbarElement) {
            setTimeout(() => this.addButton(label, icon, onClick, customStyles, sectionLabel), 150);
            return null;
        }

        let section = this.sections.find(s => s.label === sectionLabel);
        if (!section && sectionLabel) {
            section = this.addSection(sectionLabel);
        }

        const button = document.createElement('button');
        button.classList.add('toolbar-button');

        Object.assign(button.style, customStyles);

        if (icon) {
            if (typeof icon === 'string') {
                button.innerHTML = icon;
            } else {
                button.appendChild(icon.cloneNode(true));
            }
            button.title = label;
        } else {
            button.textContent = label;
        }

        button.addEventListener('click', onClick);

        const targetContainer = section ? section.element : this.toolbarElement;
        targetContainer.appendChild(button);

        if (section) {
            section.buttons.push(button);
        } else {
            this.sections.push({ label: null, buttons: [button], element: this.toolbarElement });
        }

        return button;
    }

    addSeparator(sectionLabel = null) {
        if (!this.toolbarElement) {
            setTimeout(() => this.addSeparator(sectionLabel), 150);
            return;
        }

        let section = this.sections.find(s => s.label === sectionLabel);
        if (!section && sectionLabel) {
            section = this.addSection(sectionLabel);
        }

        const separator = document.createElement('div');
        separator.classList.add('toolbar-separator');

        const targetContainer = section ? section.element : this.toolbarElement;
        targetContainer.appendChild(separator);
    }

    dispose() {
        this.sections.forEach(section => {
            section.buttons.forEach(button => {
                button.onclick = null;
            });
        });

        if (this.overlayElement && this.overlayElement.parentNode) {
            this.overlayElement.parentNode.removeChild(this.overlayElement);
        }

        this.sections = [];
        this.toolbarElement = null;
        this.overlayElement = null;
    }
}