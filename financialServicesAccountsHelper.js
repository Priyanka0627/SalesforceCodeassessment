({
    fetchAccounts : function(component) {
        const action = component.get("c.getFinancialServicesAccounts");
        action.setParams({ filter: component.get("v.filter") });

        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.accounts", response.getReturnValue());
                component.set("v.error", undefined);
            } else if (state === "ERROR") {
                const errors = response.getError();
                component.set("v.error", errors[0].message);
                component.set("v.accounts", undefined);
            }
        });
        $A.enqueueAction(action);
    },

    sortAccounts : function(component, fieldName) {
        const accounts = component.get("v.accounts");
        const sortedAccounts = accounts.slice().sort((a, b) => {
            return a[fieldName].localeCompare(b[fieldName]);
        });
        component.set("v.accounts", sortedAccounts);
    }
})