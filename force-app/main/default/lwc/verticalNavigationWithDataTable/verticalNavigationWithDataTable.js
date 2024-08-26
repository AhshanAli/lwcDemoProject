import { LightningElement, track, wire } from 'lwc';
import fetchAccountList from '@salesforce/apex/AccountController.fetchAccountList';
export default class VerticalNavigationWithDataTable extends LightningElement {

accounts = false;
@track error;

    @wire (fetchAccountList)
    wiredAccounts({data, error}){
		if(data) {
			this.accounts =data;
			this.error = undefined;
		}else {
			this.accounts =undefined;
			this.error = error;
		}
	}
    getAccountLists(event){
        this.accounts = event.target.checked;
      }
}