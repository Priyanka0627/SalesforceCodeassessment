({
    doInit : function(component, event, helper) {
        console.log("Component is initializing!");
        helper.fetchAccounts(component);
    },

    handleFilterChange : function(component, event, helper) {
        let filterValue = event.getSource().get("v.value");
        console.log("Filter changed to: " + filterValue);
        component.set("v.filter", filterValue);
        helper.fetchAccounts(component);
    },

    sortByName : function(component, event, helper) {
        console.log("Sorting by Name");
        helper.sortAccounts(component, 'Name');
    },

    sortByOwner : function(component, event, helper) {
        console.log("Sorting by OwnerId");
        helper.sortAccounts(component, 'OwnerId');
    },

    handleRowAction : function(component, event, helper) {
        const actionName = event.getParam('action').name;
        const row = event.getParam('row');
        console.log("Row action triggered: " + actionName);
        
        switch (actionName) {
            case 'edit':
                console.log("Edit action for row: ", row);
                // Add your edit logic here
                break;
            default:
                console.log("No action defined for: " + actionName);
                break;
        } 
    }
})