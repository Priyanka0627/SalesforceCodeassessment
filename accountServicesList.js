import { LightningElement, wire, track } from 'lwc';
import getFinancialServicesAccounts from '@salesforce/apex/FinancialServicesAccountController.getFinancialServicesAccounts';

export default class FinancialServicesAccountList extends LightningElement {
    @track accounts = [];
    @track error;
    @track filterText = '';  
    @track sortedBy = 'Name'; 
    @track sortDirection = 'asc'; 

    // Defining the columns for the datatable
    columns = [
        {
            label: 'Account Name',
            fieldName: 'accountLink',  
            type: 'url',
            typeAttributes: {
                label: { fieldName: 'Name' }, 
                target: '_blank',
                tooltip: 'Go to Account Detail'
            }
        },
        {
            label: 'Account Owner',
            fieldName: 'OwnerName',  
            type: 'text', 
            sortable: true
        },
        {
            label: 'Phone',
            fieldName: 'Phone',  
            type: 'phone',
            sortable: true
        },
        {
            label: 'Website',
            fieldName: 'Website',  
            type: 'url',
            typeAttributes: { label: { fieldName: 'Website' } },
            sortable: true
        },
        {
            label: 'Annual Revenue',
            fieldName: 'AnnualRevenue',  
            type: 'currency',
            sortable: true
        }
    ];

    // Apex method to get filtered and sorted accounts
    @wire(getFinancialServicesAccounts, { 
        filterText: '$filterText', 
        sortedBy: '$sortedBy', 
        sortDirection: '$sortDirection' 
    })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
            console.log('Accounts received: ', JSON.stringify(this.accounts));  
        } else if (error) {
            this.error = error;
            this.accounts = [];
        }
    }

    handleFilterChange(event) {
        this.filterText = event.target.value;  
    }

    handleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        this.sortedBy = sortedBy;  
        this.sortDirection = sortDirection;  
    }
}
