import { LightningElement,api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class LightningRecordFormEditExampleLWC extends LightningElement {

    @api recordId;
    @api objectApiName;
    accountObject = ACCOUNT_OBJECT;
    myFields = [NAME_FIELD, WEBSITE_FIELD];

    handleAccountCreated(event){
        // console.log('Account detail : ',event.detail.myFields);
        // console.log('Account name : ',event.detail.myFields.NAME_FIELD);
        const evt = new ShowToastEvent({
            title: 'Toast Success',
            message: 'Record Created sucessful',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}