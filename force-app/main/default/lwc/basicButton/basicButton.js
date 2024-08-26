import { LightningElement,track } from 'lwc';

export default class BasicButton extends LightningElement {
    @track fullname = "Salesforce Troop";
    @track title = "Salesforce developer";
   
    data="Hi..How can I help you";
    showDetails="click me";
    changeHandler(event) {
      this[event.target.name] = event.target.value;
    }
    handleClick(event){
        this.showDetails=event.target.value;

    }
    
}