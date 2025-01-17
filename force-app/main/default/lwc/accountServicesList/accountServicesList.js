import { LightningElement, wire, track } from 'lwc';
import getFinancialServicesAccounts from '@salesforce/apex/FinancialServicesAccountController.getFinancialServicesAccounts';

export default class FinancialServicesAccountList extends LightningElement {
    @track accounts = [];
    @track error;
    @track filterText = '';  // Stores the current filter text for Name field
    @track sortedBy = 'Name'; // Default sorting field
    @track sortDirection = 'asc'; // Default sorting direction (ascending)

    // Define the columns for the datatable
    columns = [
        {
            label: 'Account Name',
            fieldName: 'accountLink',  // This is the URL field
            type: 'url',
            typeAttributes: {
                label: { fieldName: 'Name' },  // Display Account Name as the label
                target: '_blank',  // Open in a new tab
                tooltip: 'Go to Account Detail'
            }
        },
        {
            label: 'Account Owner',
            fieldName: 'OwnerName',  // The Owner is a related field
            type: 'text', // Display as text
            sortable: true
        },
        {
            label: 'Phone',
            fieldName: 'Phone',  // Phone field (String)
            type: 'phone',
            sortable: true
        },
        {
            label: 'Website',
            fieldName: 'Website',  // Website (URL field)
            type: 'url',
            typeAttributes: { label: { fieldName: 'Website' } },
            sortable: true
        },
        {
            label: 'Annual Revenue',
            fieldName: 'AnnualRevenue',  // Annual Revenue (Currency field)
            type: 'currency',
            sortable: true
        }
    ];

    // Wire the Apex method to get filtered and sorted accounts
    @wire(getFinancialServicesAccounts, { 
        filterText: '$filterText', 
        sortedBy: '$sortedBy', 
        sortDirection: '$sortDirection' 
    })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
            console.log('Accounts received: ', JSON.stringify(this.accounts));  // Debug the data
        } else if (error) {
            this.error = error;
            this.accounts = [];
        }
    }

    // Handle filter input change
    handleFilterChange(event) {
        this.filterText = event.target.value;  // Update filter text
    }

    // Handle sorting event from the datatable
    handleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        this.sortedBy = sortedBy;  // Set the sorting field
        this.sortDirection = sortDirection;  // Set the sorting direction
    }
}