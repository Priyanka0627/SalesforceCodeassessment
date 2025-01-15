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
        helper.sortAccounts(component, 'OwnerId');
    },

    handleRowAction : function(component, event, helper) {
        const actionName = event.getParam('action').name;
        const row = event.getParam('row');
        switch (actionName) {
            case 'edit':
                break;
            default:
                break;
        }
    }
})
