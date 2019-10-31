import { PolymerElement, html } from "@polymer/polymer/polymer-element";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status";
import {dom} from '@polymer/polymer/lib/legacy/polymer.dom.js';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tabs/paper-tabs'
import '@polymer/iron-icons';

const PaperTabElement = customElements.get('paper-tab');
const PaperTabsElement = customElements.get('paper-tabs');

class EditorTabElement extends PaperTabElement {
    constructor(){
        super();
        // afterNextRender(this, () => {
        //     this.appendChild((html`<iron-icon icon="close"></iron-icon>`).content.firstElementChild);
        // });
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