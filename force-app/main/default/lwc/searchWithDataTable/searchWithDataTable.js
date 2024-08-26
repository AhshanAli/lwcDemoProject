import { LightningElement,wire,track, api } from 'lwc';
import {fetchAccounts,selectedOption } from '@salesforce/apex/AccountController.fetchAccounts';
//import selectedOption from 'salesforce/apex/AccountController.selectedOption';
import { NavigationMixin } from 'lightning/navigation';
const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
];
 
const columns = [   
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Is Active?', fieldName: 'Active__c', type: 'boolean' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class SearchWithDataTable extends NavigationMixin(LightningElement) {

    availableAccounts=false;
    error;
    columns = columns;
    searchString;
    initialRecords;

    @wire( fetchAccounts )  
    wiredAccount( { error, data } ) {

        if ( data ) {

            this.availableAccounts = data;
            this.initialRecords = data;
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.availableAccounts = undefined;

        }

    }

    handleRowAction( event ) {

        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch ( actionName ) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Account',
                        actionName: 'edit'
                    }
                });
                break;
            default:
        }

    }

    handleSearchChange( event ) {

        this.searchString = event.detail.value;
        console.log( 'Updated Search String is ' + this.searchString );

    }

    handleSearch( event ) {

        const searchKey = event.target.value.toLowerCase();
        console.log( 'Search String is ' + searchKey );

        if ( searchKey ) {

            this.availableAccounts = this.initialRecords;
            console.log( 'Account Records are ' + JSON.stringify( this.availableAccounts ) );
            
            if ( this.availableAccounts ) {

                let recs = [];
                
                for ( let rec of this.availableAccounts ) {

                    console.log( 'Rec is ' + JSON.stringify( rec ) );
                    let valuesArray = Object.values( rec );
                    console.log( 'valuesArray is ' + JSON.stringify( valuesArray ) );
 
                    for ( let val of valuesArray ) {

                        console.log( 'val is ' + val );
                        let strVal = String( val );
                        
                        if ( strVal ) {

                            if ( strVal.toLowerCase().includes( searchKey ) ) {

                                recs.push( rec );
                                break;
                        
                            }

                        }

                    }
                    
                }

                console.log( 'Matched Accounts are ' + JSON.stringify( recs ) );
                this.availableAccounts = recs;

             }
 
        }  else {

            this.availableAccounts = this.initialRecords;

        }        

    }

    //for combobox
    @track selectedValue ;
get options() {
    return [
             { label: '5', value: '5' },
             { label: '10', value: '10' },
             { label: '20', value: '20' },
           ];
}

// handleComboChange(event) {
//         this.selectedValue = event.detail.value;
//         if(this.selectedValue==='5'){
//             this.availableAccounts=true;

//             console.log(this.availableAccounts);
//         }
//         else{
//             this.availableAccounts = false;
//         }
//         if(this.selectedValue=='10'){

//             this.availableAccounts=true;
//             console.log(this.availableAccounts);
//         }
//         else{
//             this.availableAccounts=false;
//         }
//      }

@api recordSize;
@api lineToQuery;
/*@wire selectedOption({recordSize},{lineToQuery})
handleComboChange(event){
    this.selectedValue = event.target.value;
    console.log("Selected value is::"+this.selectedValue);
    this.selectedValue= event.target.availableAccounts;
    console.log("displayin the data is::"+this.selectedValue);
}*/

//from here is starting with Dropdown Controller for get the Number of records
handleComboChange(event){
    this.selectedValue = event.target.value;
    selectedOption({ recordSize: this.selectedValue },{lineToQuery: this.selectedValue})
    .then(result => { 
        this.accounts = result;
        this.error = undefined;
    })
    .catch(error => {
        this.error = error;
        this.accounts = undefined;
    })
}

}