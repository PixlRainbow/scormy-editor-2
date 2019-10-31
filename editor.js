import { PolymerElement, html } from "@polymer/polymer/polymer-element";
import '@polymer/iron-pages';
import '@polymer/paper-tabs';
import '@polymer/paper-fab';
import '@polymer/iron-icons';
import './editor-tabs'

class EditorElement extends PolymerElement{
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
            <editor-tab>Tab 1</editor-tab>
            <editor-tab>Tab 2</editor-tab>
            <editor-tab>Tab 3</editor-tab>
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
        this.selectedTab.insertAdjacentHTML('afterend',
            `<editor-tab>Tab ${n}</editor-tab>`
        );
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
    get selectedTab(){
        return this.$.tabs.children[this.selected];
    }
    get selectedPage(){
        return this.$.pages.children[this.selected];
    }
}
customElements.define('scorm-editor', EditorElement);