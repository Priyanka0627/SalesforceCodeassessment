public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getFinancialServicesAccounts(String filter) {
        
        return [SELECT Id, Name,OwnerId,Phone, Website, AnnualRevenue, Industry
                FROM Account 
                WHERE Industry = 'Financial Services' ];
    }
}