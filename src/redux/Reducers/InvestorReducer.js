import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {}

const InvestorLoginRequest = createAction('InvestorLoginRequest');
const InvestorLoginSuccess = createAction('InvestorLoginSuccess');
const InvestorLoginFailure = createAction('InvestorLoginFailure');


const LoadInvestorRequest = createAction('LoadInvestorRequest');
const LoadInvestorSuccess = createAction('LoadInvestorSuccess');
const LoadInvestorFailure = createAction('LoadInvestorFailure');

const LogoutInvestorRequest = createAction('LogoutInvestorRequest');
const LogoutInvestorSuccess = createAction('LogoutInvestorSuccess');
const LogoutInvestorFailure = createAction('LogoutInvestorFailure');

const UpdateInvestorRequest = createAction('UpdateInvestorRequest');
const UpdateInvestorSuccess = createAction('UpdateInvestorSuccess');
const UpdateInvestorFailure = createAction('UpdateInvestorFailure');

const UpdateInvestorPasswordRequest = createAction('UpdateInvestorPasswordRequest');
const UpdateInvestorPasswordSuccess = createAction('UpdateInvestorPasswordSuccess');
const UpdateInvestorPasswordFailure = createAction('UpdateInvestorPasswordFailure');

const clearErrors = createAction('clearErrors');
const clearMessage = createAction('clearMessage');

export const investorAuthReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(InvestorLoginRequest, (state) => {
        state.loading = true;
    })
    .addCase(InvestorLoginSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isInvestorAuthenticated = true;
    })
    .addCase(InvestorLoginFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isInvestorAuthenticated = false;
    })
    .addCase(LoadInvestorRequest, (state) => {
        state.loading = true;
    })
    .addCase(LoadInvestorSuccess, (state, action) => {
        state.loading = false;
        state.investor = action.payload;
        state.isInvestorAuthenticated = true;
    })
    .addCase(LoadInvestorFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isInvestorAuthenticated = false;
    })
    .addCase(LogoutInvestorRequest, (state) => {
        state.loading = true;
    })
    .addCase(LogoutInvestorSuccess, (state, action) => {
        state.loading = false;
        state.investor = null;  
        state.isInvestorAuthenticated = false;
        state.message = action.payload
    })
    .addCase(LogoutInvestorFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isInvestorAuthenticated = true;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const updateInvestorReducer = createReducer(initialState, (builder) => {
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
    .addCase(UpdateInvestorPasswordRequest, (state) => {
        state.loading = true;
    })
    .addCase(UpdateInvestorPasswordSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(UpdateInvestorPasswordFailure, (state, action) => {
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