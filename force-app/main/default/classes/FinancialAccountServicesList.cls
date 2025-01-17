public with sharing class FinancialAccountServicesList {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        // Correct the SOQL query syntax
        List<Account> accounts = [SELECT Id, Name, OwnerId, Phone, Website, 
                                  Owner.Name, AnnualRevenue, Industry 
                                  FROM Account 
                                  WHERE Industry = 'Financial Services'];

        // Debug the retrieved accounts
        System.debug('Accounts Retrieved: ' + accounts);

        // Return the list of accounts
        return accounts;
    }
}