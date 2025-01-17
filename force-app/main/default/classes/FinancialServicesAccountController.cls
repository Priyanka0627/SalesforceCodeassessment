public class FinancialServicesAccountController {
    public class AccountWrapper {
        @AuraEnabled public String Id;
        @AuraEnabled public String Name;
        @AuraEnabled public String OwnerName;
        @AuraEnabled public String Phone;
        @AuraEnabled public String Website;
        @AuraEnabled public Decimal AnnualRevenue;
        @AuraEnabled public String accountLink;

        public AccountWrapper(Account acc) {
            this.Id = acc.Id;
            this.Name = acc.Name;
            this.OwnerName = acc.Owner.Name;
            this.Phone = acc.Phone;
            this.Website = acc.Website;
            this.AnnualRevenue = acc.AnnualRevenue;
            
            // Construct the URL
            this.accountLink = 'https://d5i00000ahpycea1-dev-ed.lightning.force.com/lightning/r/Account/' + acc.Id + '/view';

        }
    }

    @AuraEnabled(cacheable=true)
    public static List<AccountWrapper> getFinancialServicesAccounts(String filterText, String sortedBy, String sortDirection) {
        String query = 'SELECT Id, Name, Owner.Name, Phone, Website, AnnualRevenue FROM Account WHERE Industry = \'Financial Services\'';

        if (String.isNotBlank(filterText)) {
            query += ' AND Name LIKE :\'%' + filterText + '%\'';
        }

        if (String.isNotBlank(sortedBy)) {
            query += ' ORDER BY ' + sortedBy + ' ' + sortDirection;
        } else {
            query += ' ORDER BY Name ASC';
        }

        List<Account> accounts = Database.query(query);
        List<AccountWrapper> accountWrappers = new List<AccountWrapper>();

        for (Account acc : accounts) {
            accountWrappers.add(new AccountWrapper(acc));
        }

        return accountWrappers;
    }
}