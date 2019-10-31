import { PolymerElement, html } from "@polymer/polymer/polymer-element";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status";
import '@polymer/iron-pages';
import '@polymer/paper-tabs';
import '@polymer/paper-fab';
import '@polymer/iron-icons';
import './editor-tabs'

class EditorElement extends PolymerElement{
    constructor(){
        super();
    }
    static get properties(){
        return {
            selected: {
                type: Number,
                value: 0,
                notify: true,
                reflectToAttribute: true
            }
        }
    }
    static get template(){
        return html`
        <style>
            :host {
                display: block;
            }
            paper-tabs, editor-tabs {
                background-color: var(--tabs-background-colour, mediumslateblue);
                --paper-tabs-selection-bar-color: var(--tabs-colour, white);
                color: var(--tabs-colour, white);
            }
            paper-fab {
                position: fixed;
                top: 20px;
                right: 24px;
            }
        </style>
        <editor-tabs id="tabs" selected="{{selected}}" on-closeclicked="close_tab">
            <editor-tab on-dblclick="rename_tab">Tab 1</editor-tab>
            <editor-tab on-dblclick="rename_tab">Tab 2</editor-tab>
            <editor-tab on-dblclick="rename_tab">Tab 3</editor-tab>
        </editor-tabs>
        
        <iron-pages id="pages" selected="{{selected}}">
            <div>Page 1</div>
            <div>Page 2</div>
            <div>Page 3</div>
        </iron-pages>
        <paper-fab icon="add" on-click="add_tab"></paper-fab>
        `;
    }
    add_tab(){
        let n = this.$.tabs.childElementCount + 1;
        let newTab = document.createElement('editor-tab');
        newTab.textContent = `Tab ${n}`;
        newTab.addEventListener('dblclick', this.rename_tab);
        this.selectedTab.insertAdjacentElement('afterend', newTab);
        this.selectedPage.insertAdjacentHTML('afterend',
            `<div>Page ${n}</div>`
        );
        this.selected++;
    }
    /**
     * @param {CustomEvent} ev 
     */
    close_tab(ev){
        let i = ev.detail.index;
        this.$.tabs.children[i].remove();
        this.$.pages.children[i].remove();
    }
    /**
     * @param {Event} ev 
     */
    rename_tab(ev) {
        let tab = ev.target;
        let newName = prompt('Enter Slide Name', tab.textContent) || tab.textContent;
        tab.textContent = newName;
    }
    get selectedTab(){
        return this.$.tabs.children[this.selected];
    }
    get selectedPage(){
        return this.$.pages.children[this.selected];
    }
}
customElements.define('scorm-editor', EditorElement);