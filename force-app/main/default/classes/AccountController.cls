public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getFinancialServicesAccounts(String filter) {
        List<Account> accounts = [SELECT Id, Name, OwnerId, Phone, Website, Owner.Name, AnnualRevenue, Industry
                                   FROM Account 
                                   WHERE Industry = 'Financial Services'];
        System.debug('Accounts Retrieved: ' + accounts);
        return accounts;
    }
}