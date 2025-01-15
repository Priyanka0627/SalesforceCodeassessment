({
    doInit : function(component, event, helper) {
        helper.fetchAccounts(component);
    },

    handleFilterChange : function(component, event, helper) {
        component.set("v.filter", event.getSource().get("v.value"));
        helper.fetchAccounts(component);
    },

    sortByName : function(component, event, helper) {
        helper.sortAccounts(component, 'Name');
    },

    sortByOwner : function(component, event, helper) {
        helper.sortAccounts(component, 'Owner.Name');
    },

    handleRowAction : function(component, event, helper) {
        const actionName = event.getParam('action').name;
        const row = event.getParam('row');
        switch (actionName) {
            case 'edit':
                // Logic to edit the record can be added here
                break;
            default:
                break;
        }
    }
})