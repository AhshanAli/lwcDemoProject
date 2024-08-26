public with sharing class AccountController {
    @AuraEnabled( cacheable = true )
    public static List< Account > fetchAccounts() {
     
        return [
            SELECT Id, Name, Industry, Active__c
            FROM Account
            LIMIT 50
        ];
         
    }
    
//this method is used to fetch the List of Account Object
    @AuraEnabled( cacheable = true )
    public static List<Account> fetchAccountList(){
        return [SELECT Id,Name,AccountNumber FROM Account LIMIT 5];
    }
    //this method is used to Dropdown by using this get the number of records
    @AuraEnabled
    public static List<Account>  selectedOption(Integer recordSize, String lineToQuery){
        String queryString=lineToQuery+'limit'+recordSize;
        List<SObject> sobList=Database.query(queryString);
        return sobList;

    }
}
