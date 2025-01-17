({
    doInit: function(component, event, helper) {
        helper.fetchAccounts(component);
    },

    handleFilterChange: function(component, event, helper) {
        const filterValue = component.get("v.filterName");
        helper.fetchAccounts(component, filterValue);
    },

    sortByName: function(component, event, helper) {
        helper.sortAccounts(component, "AccountName");
    },

    sortByOwner: function(component, event, helper) {
        helper.sortAccounts(component, "AccountOwner");
    },

    handleRowAction: function(component, event, helper) {
        const actionName = event.getParam('action').name;
        const row = event.getParam('row');
        if (actionName === 'edit') {
            // Logic to edit the record
            console.log('Edit record:', row);
        } else if (actionName === 'view') {
            const url = '/lightning/r/Account/' + row.Id + '/view';
            window.open(url, '_blank');
        }
    },
})