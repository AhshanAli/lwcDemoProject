public with sharing class TabWithnavigationDatatable {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Type, Rating,
                Phone, Website, AnnualRevenue
            FROM Account LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(){
        return [SELECT Id, FirstName, LastName, Phone,Email
                FROM Contact LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Case> getCaseList(){
        return [SELECT Type ,CaseNumber, ContactMobile, ContactEmail 
                FROM Case LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunityList(){
        return [SELECT  Name, StageName, TrackingNumber__c, CloseDate 
        FROM Opportunity LIMIT 10];
    }
}