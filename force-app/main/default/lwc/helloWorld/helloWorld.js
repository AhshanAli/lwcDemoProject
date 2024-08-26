import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    message = 'Hello World';

    changeHandler(event){

        this.message = this.target.value;
    }
}