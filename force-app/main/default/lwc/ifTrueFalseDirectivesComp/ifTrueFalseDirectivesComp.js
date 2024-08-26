import { LightningElement } from 'lwc';

export default class IfTrueFalseDirectivesComp extends LightningElement {
    areDetailsVisible=false;

    handleChange(event) {
        this.areDetailsVisible = event.target.checked;
    }
}