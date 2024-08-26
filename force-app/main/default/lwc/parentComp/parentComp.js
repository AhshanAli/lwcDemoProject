import { LightningElement } from 'lwc';

export default class ParentComp extends LightningElement {
    message="Hello Lightning web Component I am from Parent class";

    hndleClick(event){

        this.message='Messaged Changed';
    }
}