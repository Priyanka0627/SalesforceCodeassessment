public with sharing class FinancialAccountServicesList {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        // Query to fetch the Financial Services related records
        List<Account> accounts = [SELECT Id, Name, OwnerId, Phone, Website, 
                                  Owner.Name, AnnualRevenue, Industry 
                                  FROM Account 
                                  WHERE Industry = 'Financial Services'];

        
        System.debug('Accounts Retrieved: ' + accounts);

        
        return accounts;
    }
}