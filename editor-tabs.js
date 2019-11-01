import { PolymerElement, html } from "@polymer/polymer/polymer-element";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status";
import {dom} from '@polymer/polymer/lib/legacy/polymer.dom.js';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/iron-icons';
import 'interactjs/dist/interact';

const PaperTabElement = customElements.get('paper-tab');
const PaperTabsElement = customElements.get('paper-tabs');

class EditorTabElement extends PaperTabElement {
    constructor(){
        super();
        afterNextRender(this, () => {
            this.addEventListener('dblclick', this.rename_tab);

            interact(this)
                .draggable({
                    modifiers: [
                        interact.modifiers.restrictRect({
                            restriction: 'parent',
                            endOnly: true
                        })
                    ],
                    autoScroll: true,
                    onmove: EditorTabElement._tabMove,
                    onend: EditorTabElement._tabDropped
                })
                .dropzone({
                    accept: 'editor-tab',
                    overlap: 0.5,
                    ondragenter: EditorTabElement._enableHighlight,
                    ondragleave: EditorTabElement._disableHighlight,
                    ondropdeactivate: EditorTabElement._disableHighlight
                });
        });
    }
    static get template(){
        return html`
        ${super.template}
        <iron-icon icon="close" on-click="_closeTab"></iron-icon>
        `;
    }
    get index(){
        return Array.from(this.parentElement.children).indexOf(this);
    }
    _closeTab(){
        //this.parentNode.removeChild(this);
        this.dispatchEvent(new CustomEvent('closeclicked', {
            bubbles: true,
            detail: {index: this.index}
        }));
    }
    static _tabMove(ev){
        let target = ev.target;
        let x = (parseFloat(target.getAttribute('data-x')) || 0) + ev.dx;
        let y = (parseFloat(target.getAttribute('data-y')) || 0) + ev.dy;
        target.style.webkitTransform = target.style.transform =
            `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
    static _tabDropped(ev){
        /** @type {EditorTabElement} */
        let dragged = ev.target;
        let origin = dragged.index;
        /** @type {EditorTabElement} */
        let dropZone = ev.relatedTarget;
        dragged.style.webkitTransform = dragged.style.transform = '';
        dragged.setAttribute('data-x', 0);
        dragged.setAttribute('data-y', 0);
        if(!dropZone)
            return;
        dropZone.insertAdjacentElement(
            dragged.index > dropZone.index ? 'beforebegin' : 'afterend',
            dragged
        );
        dragged.parentElement.dispatchEvent(new CustomEvent('tabmoved', {
            bubbles: true,
            detail: {from: origin, to: dragged.index}
        }));
    }
    static _enableHighlight(ev){
        ev.target.classList.add('drag-hover');
    }
    static _disableHighlight(ev){
        ev.target.classList.remove('drag-hover');
    }
    rename_tab() {
        let newName = prompt('Enter Slide Name', this.textContent) || this.textContent;
        this.textContent = newName;
    }
}

class EditorTabsElement extends PaperTabsElement {
    static get properties(){
        let prop = super.properties;
        prop.selectable = {type: String, value: 'editor-tab'};
        return prop;
    }
    _noinkChanged(noink) {
        var childTabs = dom(this).querySelectorAll('editor-tab');
        childTabs.forEach(
            noink ? this._setNoinkAttribute : this._removeNoinkAttribute);
    }
}

customElements.define('editor-tab', EditorTabElement);
customElements.define('editor-tabs', EditorTabsElement);