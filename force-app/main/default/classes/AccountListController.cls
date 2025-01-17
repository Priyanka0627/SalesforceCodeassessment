public with sharing class AccountListController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getFinancialServicesAccounts(String searchName, String sortBy, Boolean isAscending) {
        String query = 'SELECT Id, Name, OwnerId, Phone, Website, AnnualRevenue FROM Account WHERE Industry = \'Financial Services\'';
        
        // Add search condition
        if (String.isNotEmpty(searchName)) {
            query += ' AND Name LIKE \'%' + String.escapeSingleQuotes(searchName) + '%\'';
        }
        
        // Add sorting
        if (sortBy == 'AccountName') {
            query += ' ORDER BY Name ' + (isAscending ? 'ASC' : 'DESC');
        } else if (sortBy == 'AccountOwner') {
            query += ' ORDER BY Owner.Name ' + (isAscending ? 'ASC' : 'DESC');
        }
        
        // Execute the query and return the results
        return Database.query(query);
    }
    
    @AuraEnabled
    public static void updateAccount(Account account) {
        update account;
    }
}