import { PolymerElement, html } from "@polymer/polymer/polymer-element";
import '@polymer/iron-pages';
import '@polymer/paper-tabs';

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
            paper-tabs {
                background-color: var(--tabs-background-colour, mediumslateblue);
                --paper-tabs-selection-bar-color: var(--tabs-colour, white);
                color: var(--tabs-colour, white);
            }
        </style>
        <paper-tabs selected="{{selected}}">
            <paper-tab>Tab 1</paper-tab>
            <paper-tab>Tab 2</paper-tab>
            <paper-tab>Tab 3</paper-tab>
        </paper-tabs>
        
        <iron-pages selected="{{selected}}">
            <div>Page 1</div>
            <div>Page 2</div>
            <div>Page 3</div>
        </iron-pages>
        `;
    }
}
customElements.define('scorm-editor', EditorElement);