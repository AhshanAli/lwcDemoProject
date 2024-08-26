import { LightningElement,track,wire } from 'lwc';
import retrieveCase from '@salesforce/apex/DisplayCaseCommentController.retrieveCase';
export default class DisplayCaseComment extends LightningElement {

    //this is for Case Object
@track columns1 = [
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
        label: 'Case Comments',
        fieldName: 'Comments',
        type: 'text',
        sortable: true
}
    ];

    handleChangeCaseNumber(event){
        this.currentCaseNumber = event.target.value;
        }
        handleCaseSearch(){
        this.searchName = this.currentName;
        }
    
    //display case Data table
    @track caseList ;
@wire(retrieveCase)
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
}