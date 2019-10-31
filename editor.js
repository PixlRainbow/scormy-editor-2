import { PolymerElement, html } from "@polymer/polymer/polymer-element";
import '@polymer/iron-pages';
import '@polymer/paper-tabs';
import '@polymer/paper-fab';
import '@polymer/iron-icons';

class EditorElement extends PolymerElement{

    ready(){
        super.ready();
        this.addEventListener('selected-changed', this._selectedChanged);
    }

    static get properties(){
        return {
            selected: {
                type: Number,
                value: 0,
                notify: true,
                reflectToAttribute: true
            },
        }
    }

    _selectedChanged(event) {
        console.dir("New tab value: "+ event.detail["value"]);
    }

    static get template(){
        return html`
        <style>
            :host {
                display: block;
            }
            paper-tabs {
                background-color: var(--tabs-background-colour, mediumslateblue);
                --paper-tabs-selection-bar-color: var(--tabs-colour, white);
                color: var(--tabs-colour, white);
            }
            paper-fab {
                position: fixed;
                top: 20px;
                right: 24px;
            }
            #pages > div {
                height: 70vh;
                text-align: center;
            }

            #pages > div > iframe {
                height:100%;
                width:100%;
            }
        </style>
        <paper-tabs id="tabs" selected="{{selected}}">
            <paper-tab>Tab 1</paper-tab>
            <paper-tab>Tab 2</paper-tab>
            <paper-tab>Tab 3</paper-tab>
        </paper-tabs>
        
        <iron-pages id="pages" selected="{{selected}}">
            <div><iframe style="display: block;"></iframe></div>
            <div><iframe style="display: block;"></iframe></div>
            <div><iframe style="display: block;"></iframe></div>
        </iron-pages>
        <paper-fab icon="add" on-click="add_tab"></paper-fab>
        `;
    }
    add_tab(){
        let n = this.$.tabs.childElementCount + 1;
        this.selectedTab.insertAdjacentHTML('afterend',
            `<paper-tab>Tab ${n}</paper-tab>`
        );
        this.selectedPage.insertAdjacentHTML('afterend',
            `<div><iframe style="display: block;"></iframe></div>`
        );
        this.selected++;
    }
    get selectedTab(){
        return this.$.tabs.children[this.selected];
    }
    get selectedPage(){
        return this.$.pages.children[this.selected];
    }
}
customElements.define('scorm-editor', EditorElement);