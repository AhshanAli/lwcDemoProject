import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class LwcBasicComp extends LightningElement {
    //this is for Error Tost Message
    handleErrorTost() {
        const evt = new ShowToastEvent({
            title: 'Toast Error',
            message: 'Some unexpected error',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    //this is for warning tost Message
    showWarningToast(){
        const evt = new ShowToastEvent({
            title: 'Tost Warning',
            message: 'something went wrong',
            variant: 'warning',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    //this is for success Tost Message
    showSuccessToast(){
        const evt =new  ShowToastEvent({
            title: 'Toast Success',
            message: 'Good Job',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    showInfoToast(){
        const evt =new  ShowToastEvent({
            title: 'Toast Info',
            message: 'Operation will run in background',
            variant: 'info',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    
}