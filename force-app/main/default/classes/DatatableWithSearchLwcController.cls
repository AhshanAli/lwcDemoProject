public with sharing class DatatableWithSearchLwcController {
    
    /*@AuraEnabled (cacheable=true)
    public static List<Account> retrieveAccounts(){
        return [SELECT Id, Name, Type,BillingCountry, Industry
                FROM Account LIMIT 20];
    }  */

    //this is for related contacts of an Accounts
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, FirstName, LastName, Account.Name, email
            FROM Contact];
    }
}