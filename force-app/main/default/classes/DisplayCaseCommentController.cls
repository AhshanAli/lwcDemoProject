public with sharing class DisplayCaseCommentController {
    
    @AuraEnabled(cacheable=true)
public static List<Case> retrieveCase(string keySearch){
List<Case> myCasetList = [SELECT Id, CaseNumber, Comments FROM Case Where CaseNumber=:keySearch];
return myCasetList;
}
}