import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {}

const AdminLoginRequest = createAction('AdminLoginRequest');
const AdminLoginSuccess = createAction('AdminLoginSuccess');
const AdminLoginFailure = createAction('AdminLoginFailure');

const LoadAdminRequest = createAction('LoadAdminRequest');
const LoadAdminSuccess = createAction('LoadAdminSuccess');
const LoadAdminFailure = createAction('LoadAdminFailure');

const LogoutAdminRequest = createAction('LogoutAdminRequest');
const LogoutAdminSuccess = createAction('LogoutAdminSuccess');
const LogoutAdminFailure = createAction('LogoutAdminFailure');

const UpdateAdminRequest = createAction('UpdateAdminRequest');
const UpdateAdminSuccess = createAction('UpdateAdminSuccess');
const UpdateAdminFailure = createAction('UpdateAdminFailure');

const UpdateCustomerRequest = createAction('UpdateCustomerRequest');
const UpdateCustomerSuccess = createAction('UpdateCustomerSuccess');
const UpdateCustomerFailure = createAction('UpdateCustomerFailure');

const UpdateInvestorRequest = createAction('UpdateInvestorRequest');
const UpdateInvestorSuccess = createAction('UpdateInvestorSuccess');
const UpdateInvestorFailure = createAction('UpdateInvestorFailure');

const UpdateAdminPasswordRequest = createAction('UpdateAdminPasswordRequest');
const UpdateAdminPasswordSuccess = createAction('UpdateAdminPasswordSuccess');
const UpdateAdminPasswordFailure = createAction('UpdateAdminPasswordFailure');

const DueUserRequest = createAction('DueUserRequest');
const DueUserSuccess = createAction('DueUserSuccess');
const DueUserFailure = createAction('DueUserFailure');

const AddInvestorRequest = createAction('AddInvestorRequest');
const AddInvestorSuccess = createAction('AddInvestorSuccess');
const AddInvestorFailure = createAction('AddInvestorFailure');

const GetAllInvestorsRequest = createAction('GetAllInvestorsRequest');
const GetAllInvestorsSuccess = createAction('GetAllInvestorsSuccess');
const GetAllInvestorsFailure = createAction('GetAllInvestorsFailure');

const GetInvestorRequest = createAction('GetInvestorRequest');
const GetInvestorSuccess = createAction('GetInvestorSuccess');
const GetInvestorFailure = createAction('GetInvestorFailure');

const AddCustomerRequest = createAction('AddCustomerRequest');
const AddCustomerSuccess = createAction('AddCustomerSuccess');
const AddCustomerFailure = createAction('AddCustomerFailure');

const GetAllCustomersRequest = createAction('GetAllCustomersRequest');
const GetAllCustomersSuccess = createAction('GetAllCustomersSuccess');
const GetAllCustomersFailure = createAction('GetAllCustomersFailure');

const GetCustomerRequest = createAction('GetCustomerRequest');
const GetCustomerSuccess = createAction('GetCustomerSuccess');
const GetCustomerFailure = createAction('GetCustomerFailure');


const AddWithdrawlRequest = createAction('AddWithdrawlRequest');
const AddWithdrawlSuccess = createAction('AddWithdrawlSuccess');
const AddWithdrawlFailure = createAction('AddWithdrawlFailure');

const GetWithdrawlsRequest = createAction('GetWithdrawlsRequest');
const GetWithdrawlsSuccess = createAction('GetWithdrawlsSuccess');
const GetWithdrawlsFailure = createAction('GetWithdrawlsFailure');

const GetUserWithdrawlsRequest = createAction('GetUserWithdrawlsRequest');
const GetUserWithdrawlsSuccess = createAction('GetUserWithdrawlsSuccess');
const GetUserWithdrawlsFailure = createAction('GetUserWithdrawlsFailure');

const GetWithdrawlRequest = createAction('GetWithdrawlRequest');
const GetWithdrawlSuccess = createAction('GetWithdrawlSuccess');
const GetWithdrawlFailure = createAction('GetWithdrawlFailure');

const AddInstalmentRequest = createAction('AddInstalmentRequest');
const AddInstalmentSuccess = createAction('AddInstalmentSuccess');
const AddInstalmentFailure = createAction('AddInstalmentFailure');

const GetInstalmentsRequest = createAction('GetInstalmentsRequest');
const GetInstalmentsSuccess = createAction('GetInstalmentsSuccess');
const GetInstalmentsFailure = createAction('GetInstalmentsFailure');

const GetUserInstalmentsRequest = createAction('GetUserInstalmentsRequest');
const GetUserInstalmentsSuccess = createAction('GetUserInstalmentsSuccess');
const GetUserInstalmentsFailure = createAction('GetUserInstalmentsFailure');

const GetInstalmentRequest = createAction('GetInstalmentRequest');
const GetInstalmentSuccess = createAction('GetInstalmentSuccess');
const GetInstalmentFailure = createAction('GetInstalmentFailure');

const UpdatePrevAdminRequest = createAction('UpdatePrevAdminRequest');
const UpdatePrevAdminSuccess = createAction('UpdatePrevAdminSuccess');
const UpdatePrevAdminFailure = createAction('UpdatePrevAdminFailure');

const UpdatePrevInvestorsRequest = createAction('UpdatePrevInvestorsRequest');
const UpdatePrevInvestorsSuccess = createAction('UpdatePrevInvestorsSuccess');
const UpdatePrevInvestorsFailure = createAction('UpdatePrevInvestorsFailure');

const GetNotificationRequest = createAction('GetNotificationRequest');
const GetNotificationSuccess = createAction('GetNotificationSuccess');
const GetNotificationFailure = createAction('GetNotificationFailure');

const GetAllNotificationsRequest = createAction('GetAllNotificationsRequest');
const GetAllNotificationsSuccess = createAction('GetAllNotificationsSuccess');
const GetAllNotificationsFailure = createAction('GetAllNotificationsFailure');

const ContactRequest = createAction('ContactRequest');
const ContactSuccess = createAction('ContactSuccess');
const ContactFailure = createAction('ContactFailure');

const clearErrors = createAction('clearErrors');
const clearMessage = createAction('clearMessage');

export const adminAuthReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(AdminLoginRequest, (state) => {
        state.loading = true;
    })
    .addCase(AdminLoginSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isAdminAuthenticated = true;
    })
    .addCase(AdminLoginFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAdminAuthenticated = false;
    })
    .addCase(LoadAdminRequest, (state) => {
        state.loading = true;
    })
    .addCase(LoadAdminSuccess, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.isAdminAuthenticated = true;
    })
    .addCase(LoadAdminFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAdminAuthenticated = false;
    })
    .addCase(LogoutAdminRequest, (state) => {
        state.loading = true;
    })
    .addCase(LogoutAdminSuccess, (state, action) => {
        state.loading = false;
        state.admin = null;  
        state.isAdminAuthenticated = false;
        state.message = action.payload
    })
    .addCase(LogoutAdminFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAdminAuthenticated = true;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const updateAdminReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(UpdateAdminRequest, (state) => {
        state.loading = true;
    })
    .addCase(UpdateAdminSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(UpdateAdminFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(UpdateAdminPasswordRequest, (state) => {
        state.loading = true;
    })
    .addCase(UpdateAdminPasswordSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(UpdateAdminPasswordFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const dueUserReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(DueUserRequest, (state) => {
        state.loading = true;
    })
    .addCase(DueUserSuccess, (state, action) => {
        state.loading = false;
        state.users = action.payload;
    })
    .addCase(DueUserFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
})

export const addInvestorReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(AddInvestorRequest, (state) => {
        state.loading = true;
    })
    .addCase(AddInvestorSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(AddInvestorFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const getAllInvestorsReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(GetAllInvestorsRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetAllInvestorsSuccess, (state, action) => {
        state.loading = false;
        state.investors = action.payload;
    })
    .addCase(GetAllInvestorsFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const getInvestorReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(GetInvestorRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetInvestorSuccess, (state, action) => {
        state.loading = false;
        state.investor = action.payload;
    })
    .addCase(GetInvestorFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const addCustomerReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(AddCustomerRequest, (state) => {
        state.loading = true;
    })
    .addCase(AddCustomerSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(AddCustomerFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const getAllCustomersReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(GetAllCustomersRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetAllCustomersSuccess, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
    })
    .addCase(GetAllCustomersFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const getCustomerReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(GetCustomerRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetCustomerSuccess, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
    })
    .addCase(GetCustomerFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const contactReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(ContactRequest, (state) => {
        state.loading = true;
    })
    .addCase(ContactSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload
    })
    .addCase(ContactFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const addWithdrawlReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(AddWithdrawlRequest, (state) => {
        state.loading = true;
    })
    .addCase(AddWithdrawlSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(AddWithdrawlFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const getWithdrawlsReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(GetWithdrawlsRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetWithdrawlsSuccess, (state, action) => {
        state.loading = false;
        state.withdrawls = action.payload;
    })
    .addCase(GetWithdrawlsFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(GetUserWithdrawlsRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetUserWithdrawlsSuccess, (state, action) => {
        state.loading = false;
        state.withdrawls = action.payload;
    })
    .addCase(GetUserWithdrawlsFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(GetWithdrawlRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetWithdrawlSuccess, (state, action) => {
        state.loading = false;
        state.withdrawl = action.payload;
    })
    .addCase(GetWithdrawlFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
})

export const addInstalmentReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(AddInstalmentRequest, (state) => {
        state.loading = true;
    })
    .addCase(AddInstalmentSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(AddInstalmentFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const getInstalmentsReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(GetInstalmentsRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetInstalmentsSuccess, (state, action) => {
        state.loading = false;
        state.instalments = action.payload;
    })
    .addCase(GetInstalmentsFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(GetUserInstalmentsRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetUserInstalmentsSuccess, (state, action) => {
        state.loading = false;
        state.instalments = action.payload;
    })
    .addCase(GetUserInstalmentsFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(GetInstalmentRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetInstalmentSuccess, (state, action) => {
        state.loading = false;
        state.instalment = action.payload;
    })
    .addCase(GetInstalmentFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
})

export const updateCustomerReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(UpdateCustomerRequest, (state) => {
        state.loading = true;
    })
    .addCase(UpdateCustomerSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(UpdateCustomerFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const updateAdInvestorReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(UpdateInvestorRequest, (state) => {
        state.loading = true;
    })
    .addCase(UpdateInvestorSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(UpdateInvestorFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const updatePrevAdminReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(UpdatePrevAdminRequest, (state) => {
        state.loading = true;
    })
    .addCase(UpdatePrevAdminSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(UpdatePrevAdminFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const updatePrevInvestorsReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(UpdatePrevInvestorsRequest, (state) => {
        state.loading = true;
    })
    .addCase(UpdatePrevInvestorsSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(UpdatePrevInvestorsFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const getAllNotificationsReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(GetAllNotificationsRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetAllNotificationsSuccess, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
    })
    .addCase(GetAllNotificationsFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const getNotificationReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(GetNotificationRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetNotificationSuccess, (state, action) => {
        state.loading = false;
        state.notification = action.payload;
    })
    .addCase(GetNotificationFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})