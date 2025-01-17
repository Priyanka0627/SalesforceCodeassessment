import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/FinancialAccountServicesList.getAccountList';

export default class FinancialAccountServicesList extends LightningElement {
    headings = ["Account Name", "Account Owner", "Phone", "Website", "AnnualRevenue"];
    fullTableData = [];
    filteredData = [];
    timer;
    filterBy = "Name";
    sortedBy = 'Name';
    sortDirection = 'asc';

    @wire(getAccountList)
    accountHandler({ data, error }) {
        if (data) {
            console.log(data);

            // Add accountLink to each record dynamically
            this.fullTableData = data.map(account => ({
                ...account,
                accountLink: `/lightning/r/Account/${account.Id}/view`, // Generate URL to the Account record
                OwnerName: account.Owner.Name  // Ensure OwnerName is accessible
            }));

            this.filteredData = this.fullTableData;
        }
        if (error) {
            console.log(error);
        }
    }

    // Filter options
    get FilterByOptions() {
        return [
            { label: 'Name', value: 'Name' }
            /* Uncomment if you need additional filter options:
            { label: 'OwnerName', value: 'OwnerName' },
            { label: 'Phone', value: 'Phone' },
            { label: 'Website', value: 'Website' },
            { label: 'AnnualRevenue', value: 'AnnualRevenue' }
            */
        ];
    }

    // Sorting options
    get SortByOptions() {
        return [
            { label: 'Name', value: 'Name' },
            { label: 'OwnerName', value: 'OwnerName' }
        ];
    }

    filterbyHandler(event) {
        this.filterBy = event.target.value;
    }

    filterHandler(event) {
        const { value } = event.target;
        const lowerCaseValue = value.toLowerCase();
        window.clearTimeout(this.timer);
        if (value) {
            this.timer = window.setTimeout(() => {
                console.log('Filtering eachObj:' + value);
                this.filteredData = this.fullTableData.filter(eachObj => {
                    const val = eachObj[this.filterBy] ? eachObj[this.filterBy] : '';
                    if (val && typeof val === 'string') {
                        return val.toLowerCase().includes(lowerCaseValue);
                    }
                    return false;
                });
            }, 500);
        } else {
            this.filteredData = [...this.fullTableData];
        }
    }

    // Sorting logic
    sortHandler(event) {
        this.sortedBy = event.target.value;
        this.filteredData = [...this.sortBy(this.filteredData)];
    }

    sortBy(data) {
        const cloneData = [...data];
        cloneData.sort((a, b) => {
            if (a[this.sortedBy] === b[this.sortedBy]) {
                return 0;
            }
            return this.sortDirection === 'desc' ?
                a[this.sortedBy] > b[this.sortedBy] ? -1 : 1 :
                a[this.sortedBy] < b[this.sortedBy] ? -1 : 1;
        });
        return cloneData;
    }

    // Define columns for the lightning datatable, including a URL for the account name
    get columns() {
        return [
            {
                label: 'Account Name',
                fieldName: 'accountLink',  // Custom field containing the URL
                type: 'url',
                typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' }  // Open in new tab
            },
            { label: 'Account Owner', fieldName: 'OwnerName' },
            { label: 'Phone', fieldName: 'Phone' },
            { label: 'Website', fieldName: 'Website' },
            { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' }
        ];
    }
}