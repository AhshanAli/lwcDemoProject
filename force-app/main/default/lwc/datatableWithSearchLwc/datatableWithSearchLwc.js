import { LightningElement,track,wire } from 'lwc';
//import retrieveAccounts from '@salesforce/apex/DatatableWithSearchLwcController.retrieveAccounts';
import getContactList from '@salesforce/apex/DatatableWithSearchLwcController.getContactList';

/*const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type' },
    //{ label: 'Email', fieldName: 'Email__c', type: 'email' },
    { label: 'BillingCountry', fieldName: 'BillingCountry' },
    { label: 'Industry', fieldName: 'Industry' },
];*/

const columns = [{
    label: 'First Name',
    fieldName: 'FirstName',
    type: 'text',
    sortable: true
},
{
    label: 'Last Name',
    fieldName: 'LastName',
    type: 'text',
    sortable: true
},
 { label: "Account Name", fieldName: "recordLink", type: "Lookup",
typeAttributes: {label: {fieldName: "AccountName"}, tooltip: "Name", /*target: "_blank",*/ linkify: true} },
{
    label: 'Phone',
    fieldName: 'Phone',
    type: 'phone',
    sortable: true
},
{
    label: 'Email',
    fieldName: 'Email',
    type: 'url',
    sortable: true
}

];

export default class DatatableWithSearchLwc extends LightningElement {

    @track data;
    @track error;
    @track columns = columns;
    @track searchString;
    @track initialRecords;
 
    //@wire(retrieveAccounts)
    @wire(getContactList)
    wiredContacts({ error, data }) {
        if (data) {
            console.log(data);
            this.data = data;
            this.initialRecords = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
 
    

    //this is for Search Bar
    handleSearch(event) {
        const searchKey = event.target.value.toLowerCase();
 
        if (searchKey) {
            this.data = this.initialRecords;
 
            if (this.data) {
                let searchRecords = [];
 
                for (let record of this.data) {
                    let valuesArray = Object.values(record);
 
                    for (let val of valuesArray) {
                        console.log('val is ' + val);
                        let strVal = String(val);
 
                        if (strVal) {
 
                            if (strVal.toLowerCase().includes(searchKey)) {
                                searchRecords.push(record);
                                break;
                            }
                        }
                    }
                }
 
                console.log('Matched Accounts are ' + JSON.stringify(searchRecords));
                this.data = searchRecords;
            }
        } else {
            this.data = this.initialRecords;
        }
    }
}

    //Create a LWC component to show related contact of an account in datatable.
    // Account will be a searchable field
     //on top where I can change the value.