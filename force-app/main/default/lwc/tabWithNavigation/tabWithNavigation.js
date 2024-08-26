import { LightningElement,api,track,wire } from 'lwc';
import getAccountList from '@salesforce/apex/TabWithnavigationDatatable.getAccountList';
import getContactList from '@salesforce/apex/TabWithnavigationDatatable.getContactList';
import getCaseList from '@salesforce/apex/TabWithnavigationDatatable.getCaseList';
import getOpportunityList from '@salesforce/apex/TabWithnavigationDatatable.getOpportunityList';
export default class TabWithNavigation extends LightningElement {

    //This is for Account Object
    @track columns1 = [{
        label: 'Account name',
        fieldName: 'Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'Type',
        fieldName: 'Type',
        type: 'text',
        sortable: true
    },
    {
        label: 'Annual Revenue',
        fieldName: 'AnnualRevenue',
        type: 'Currency',
        sortable: true
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        sortable: true
    },
    {
        label: 'Website',
        fieldName: 'Website',
        type: 'url',
        sortable: true
    },
    {
        label: 'Rating',
        fieldName: 'Rating',
        type: 'test',
        sortable: true
    }
];

@track error;
@track accList ;
@wire(getAccountList)
wiredAccounts({
    error,
    data
}) {
    if (data) {
        this.accList = data;
    } else if (error) {
        this.error = error;
    }
}


//this is for Contact Object
@track columns2 = [{
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
{
    label: 'Phone',
    fieldName: 'Phone',
    type: 'phone',
    sortable: true
},
{
    label: 'Email',
    fieldName: 'Email',
    type: 'email',
    sortable: true
},
];
@track conList ;
@wire(getContactList)
wiredContacts({
    error,
    data
}) {
    if (data) {
        this.conList = data;
    } else if (error) {
        this.error = error;
    }
}

//this is for Case Object
@track columns3 = [
{
    label:'Case Type',
    fieldName: 'Type',
    type: 'text',
    sortable: true
},
{
        label: 'Case Number',
        fieldName: 'CaseNumber',
        type: 'Number',
        sortable: true
},
{
        label: 'Contact Mobile',
        fieldName: 'ContactMobile', 
        type: 'Number',
        sortable:true
},
{
    label: 'Email',
    fieldName: 'ContactEmail',
    type: 'Email',
    sortable: true
},
/*{
    type: "button", 
        typeAttributes: {  
            label: actions.label,  
            name: 'View',  
            title: 'View Case',  
            variant: 'brand',
            disabled: false,  
            value: 'view',  
            iconPosition: 'left',
            rowAction: actions,
    }
},*/

];
@track caseList ;
@wire(getCaseList)
wiredCase({
    error,
    data
}) {
    if (data) {
        this.caseList = data;
    } else if (error) {
        this.error = error;
    }
}


//this is for Contact Object
@track columns4 = [{
    label: 'Opportunity Name',
    fieldName: 'Name',
    type: 'text',
    sortable: true
},
{
    label: 'Stage Name',
    fieldName: 'StageName',
    type: 'text',
    sortable: true
},
{
    label: 'Tracking Number',
    fieldName: 'TrackingNumber__c',
    type: 'Number',
    sortable: true
},
];
@track oppList ;
@wire(getOpportunityList)
wiredOpportunity({
    error,
    data
}) {
    if (data) {
        this.oppList = data;
    } else if (error) {
        this.error = error;
    }
}

//sorting coding is started here
@track sortBy;
@track sortDirection;
doSorting(event) {
    this.sortBy = event.detail.fieldName;
    this.sortDirection = event.detail.sortDirection;
    this.sortData(this.sortBy, this.sortDirection);
}

sortData(fieldname, direction) {
    let parseData = JSON.parse(JSON.stringify(this.accList));
    // Return the value stored in the field
    let keyValue = (a) => {
        return a[fieldname];
    };
    // cheking reverse direction
    let isReverse = direction === 'asc' ? 1: -1;
    // sorting data
    parseData.sort((x, y) => {
        x = keyValue(x) ? keyValue(x) : ''; // handling null values
        y = keyValue(y) ? keyValue(y) : '';
        // sorting values based on direction
        return isReverse * ((x > y) - (y > x));
    });
    this.accList = parseData;
}    


// show The Datatable Details like Hide or Unhide
//areDataVisible = true;
//toggleIconName='utility:preview';
/*handleShowAccountData(event) {
    this.areDataVisible = event.target.value;
    
}*/
//this is for Hiding the Account Details 
areDataVisible = false;
    handleChange(event) {
        this.areDataVisible = event.target.checked;
    }

    //this is for Hiding the Contact Object
    toggleIconName= 'utility:preview';
    showDetailsOfContact = false;
    actionButtonLabel = 'Show Details';
    toggleDetails(event) {
        this.showDetailsOfContact = !this.showDetailsOfContact;
        this.actionButtonLabel = this.showDetailsOfContact ? 'Hide Details' : 'Show Details';
        console.log(this.showDetailsOfContact);
    }


    // Js Properties start
    activeTab = '1';
    get bDisableBackBtn(){
        return Number(this.activeTab) == 1 ? true : false;
    }
    get bDisableNextBtn(){
        return Number(this.activeTab) == 4 ? true : false;
    }
    // JS functions start 
    handleActive(event) {
     this.activeTab = event.target.value;
    }
    
    goBack(){
        let activeTabValue = Number(this.activeTab) - 1;
        this.activeTab = activeTabValue.toString();
      }
    goNext(){
      let activeTabValue = Number(this.activeTab) + 1;
      this.activeTab = activeTabValue.toString();
    }
    // JS functions end 
}