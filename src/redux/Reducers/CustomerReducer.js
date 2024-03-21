import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {}

const CustomerLoginRequest = createAction('CustomerLoginRequest');
const CustomerLoginSuccess = createAction('CustomerLoginSuccess');
const CustomerLoginFailure = createAction('CustomerLoginFailure');

const LoadCustomerRequest = createAction('LoadCustomerRequest');
const LoadCustomerSuccess = createAction('LoadCustomerSuccess');
const LoadCustomerFailure = createAction('LoadCustomerFailure');

const LogoutCustomerRequest = createAction('LogoutCustomerRequest');
const LogoutCustomerSuccess = createAction('LogoutCustomerSuccess');
const LogoutCustomerFailure = createAction('LogoutCustomerFailure');

const clearErrors = createAction('clearErrors');
const clearMessage = createAction('clearMessage');

export const customerAuthReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(CustomerLoginRequest, (state) => {
        state.loading = true;
    })
    .addCase(CustomerLoginSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isCustomerAuthenticated = true;
    })
    .addCase(CustomerLoginFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isCustomerAuthenticated = false;
    })
    .addCase(LoadCustomerRequest, (state) => {
        state.loading = true;
    })
    .addCase(LoadCustomerSuccess, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
        state.isCustomerAuthenticated = true;
    })
    .addCase(LoadCustomerFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isCustomerAuthenticated = false;
    })
    .addCase(LogoutCustomerRequest, (state) => {
        state.loading = true;
    })
    .addCase(LogoutCustomerSuccess, (state, action) => {
        state.loading = false;
        state.customer = null;  
        state.isCustomerAuthenticated = false;
        state.message = action.payload
    })
    .addCase(LogoutCustomerFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isCustomerAuthenticated = true;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})