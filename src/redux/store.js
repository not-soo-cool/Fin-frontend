import { configureStore } from '@reduxjs/toolkit'
import { addCustomerReducer, addInstalmentReducer, addInvestorReducer, addWithdrawlReducer, adminAuthReducer, contactReducer, dueUserReducer, getAllCustomersReducer, getAllInvestorsReducer, getCustomerReducer, getInstalmentsReducer, getInvestorReducer, getWithdrawlsReducer, updateAdInvestorReducer, updateAdminReducer, updateCustomerReducer, updatePrevAdminReducer, updatePrevInvestorsReducer } from './Reducers/AdminReducer'
import { investorAuthReducer, updateInvestorReducer } from './Reducers/InvestorReducer';
import { customerAuthReducer } from './Reducers/CustomerReducer';


const store = configureStore({
    reducer: {
        adminAuth: adminAuthReducer,
        dueUsers: dueUserReducer,
        getInstalments: getInstalmentsReducer,
        investors: addInvestorReducer,
        getInvestors: getAllInvestorsReducer,
        getInvestor: getInvestorReducer,
        customers: addCustomerReducer,
        getCustomers: getAllCustomersReducer,
        getCustomer: getCustomerReducer,
        updateAdmin: updateAdminReducer,
        contact: contactReducer,
        addWithdrawl: addWithdrawlReducer,
        getWithdrawls: getWithdrawlsReducer,
        investorAuth: investorAuthReducer,
        customerAuth: customerAuthReducer,
        updateInvestor: updateInvestorReducer,
        addInstalments: addInstalmentReducer,
        updateCustomer: updateCustomerReducer,
        updateAdInvestor: updateAdInvestorReducer,
        updatePrevAdmin: updatePrevAdminReducer,
        updatePrevInvestors: updatePrevInvestorsReducer,
    }
});

export default store;