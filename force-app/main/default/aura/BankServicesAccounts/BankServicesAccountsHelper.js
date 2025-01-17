({
    fetchAccounts: function(component, filterName) {
        const action = component.get("c.getFinancialServicesAccounts");
        action.setParams({ filterName: filterName });

        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.accounts", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    sortAccounts: function(component, sortBy) {
        let accounts = component.get("v.accounts");
        if (sortBy === "AccountName") {
            accounts.sort((a, b) => a.Name.localeCompare(b.Name));
        } else if (sortBy === "AccountOwner") {
            accounts.sort((a, b) => a.Owner.Name.localeCompare(b.Owner.Name));
        }
        component.set("v.accounts", accounts);
    },
})