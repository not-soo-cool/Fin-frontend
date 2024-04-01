import axios from "axios"

// const serverUrl = "http://localhost:8080/api/v1/admin"
const serverUrl = "https://fin-backend-14d0.onrender.com/api/v1/admin"

export const loginAdmin = (email, password) => async(dispatch) =>{

    try {
        dispatch({
            type: "AdminLoginRequest"
        });

        const {data} = await axios.post(`${serverUrl}/login`, {email, password}, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        dispatch({
            type: "AdminLoginSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "AdminLoginFailure",
            payload: error.response.data.message
        })
        
    }
}

export const logoutAdmin = () => async(dispatch) => {
    try {
        dispatch({
            type: "LogoutAdminRequest",
        });

        const {data} = await axios.get(`${serverUrl}/logout`, {
            withCredentials: true,
        });

        dispatch({
            type: "LogoutAdminSuccess",
        })
        
    } catch (error) {

        dispatch({
            type: "LogoutAdminFailure",
            payload: error.response.data.message
        })
    }
}

export const loadAdmin = () => async(dispatch) => {
    try {
        dispatch({
            type: "LoadAdminRequest",
        });

        const {data} = await axios.get(`${serverUrl}/me`, {
            withCredentials: true,
        });

        dispatch({
            type: "LoadAdminSuccess",
            payload: data.admin
        })
    } catch (error) {
        dispatch({
            type: "LoadAdminFailure",
            payload: error.response.data.message
        })
    }
}

export const dueUsers = () => async(dispatch) => {
    try {
        dispatch({
            type: "DueUserRequest",
        });

        const {data} = await axios.get(`${serverUrl}/due/customers`, {
            withCredentials: true,
        });

        dispatch({
            type: "DueUserSuccess",
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: "DueUserFailure",
            payload: error.response.data.message
        })
    }
}

export const getInstalments = () => async(dispatch) => {
    try {
        dispatch({
            type: "GetInstalmentsRequest",
        });

        const {data} = await axios.get(`${serverUrl}/get/instalments`, {
            withCredentials: true,
        });

        dispatch({
            type: "GetInstalmentsSuccess",
            payload: data.instalments
        })
    } catch (error) {
        dispatch({
            type: "GetInstalmentsFailure",
            payload: error.response.data.message
        })
    }
}

export const getUserInstalments = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "GetUserInstalmentsRequest",
        });

        const {data} = await axios.get(`${serverUrl}/user/instalments/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "GetUserInstalmentsSuccess",
            payload: data.instalments
        })
    } catch (error) {
        dispatch({
            type: "GetUserInstalmentsFailure",
            payload: error.response.data.message
        })
    }
}

export const addInvestor = (firstName, lastName, email, mob, street, city, state, country, postal, dob, gender, marital, aadhar, invest) => async(dispatch) => {
    try {
        dispatch({
            type: "AddInvestorRequest",
        });

        const {data} = await axios.post(`${serverUrl}/add/investor`, {firstName, lastName, email, mob, street, city, state, country, postal, dob, gender, marital, aadhar, invest}, {
            withCredentials: true,
        });

        dispatch({
            type: "AddInvestorSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "AddInvestorFailure",
            payload: error.response.data.message
        })
    }
}

export const getAllInvestors = () => async(dispatch) => {
    try {
        dispatch({
            type: "GetAllInvestorsRequest",
        });

        const {data} = await axios.get(`${serverUrl}/get/investors`, {
            withCredentials: true,
        });

        dispatch({
            type: "GetAllInvestorsSuccess",
            payload: data.investors
        })
    } catch (error) {
        dispatch({
            type: "GetAllInvestorsFailure",
            payload: error.response.data.message
        })
    }
}

export const getInvestor = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "GetInvestorRequest",
        });

        const {data} = await axios.get(`${serverUrl}/get/investor/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "GetInvestorSuccess",
            payload: data.investor
        })
    } catch (error) {
        dispatch({
            type: "GetInvestorFailure",
            payload: error.response.data.message
        })
    }
}

export const addCustomer = (firstName, lastName, email, mob, street, city, state, country, postal, dob, gender, aadhar, emiDate, guarantorName, guarantorAdd, guarantorPh, prodName, prodPrice, downPay, finAmount, mon, roi, invEmail) => async(dispatch) => {
    try {
        dispatch({
            type: "AddCustomerRequest",
        });

        const {data} = await axios.post(`${serverUrl}/add/customer`, {firstName, lastName, email, mob, street, city, state, country, postal, dob, gender, aadhar, emiDate, guarantorName, guarantorAdd, guarantorPh, prodName, prodPrice, downPay, finAmount, mon, roi, invEmail}, {
            withCredentials: true,
        });

        dispatch({
            type: "AddCustomerSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "AddCustomerFailure",
            payload: error.response.data.message
        })
    }
}

export const getAllCustomers = () => async(dispatch) => {
    try {
        dispatch({
            type: "GetAllCustomersRequest",
        });

        const {data} = await axios.get(`${serverUrl}/get/customers`, {
            withCredentials: true,
        });

        dispatch({
            type: "GetAllCustomersSuccess",
            payload: data.customers
        })
    } catch (error) {
        dispatch({
            type: "GetAllCustomersFailure",
            payload: error.response.data.message
        })
    }
}

export const getCustomer = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "GetCustomerRequest",
        });

        const {data} = await axios.get(`${serverUrl}/get/customer/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "GetCustomerSuccess",
            payload: data.customer
        })
    } catch (error) {
        dispatch({
            type: "GetCustomerFailure",
            payload: error.response.data.message
        })
    }
}

export const updateAdmin = (name, email, mob, street, city, state, country, postal) => async(dispatch) => {
    try {
        dispatch({
            type: "UpdateAdminRequest",
        });

        const {data} = await axios.put(`${serverUrl}/update/profile`, {name, email, mob, street, city, state, country, postal}, {
            withCredentials: true,
        });

        dispatch({
            type: "UpdateAdminSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "UpdateAdminFailure",
            payload: error.response.data.message
        })
    }
}

export const updateAdminPass = (newPass, confirmPass) => async(dispatch) => {
    try {
        dispatch({
            type: "UpdateAdminPasswordRequest",
        });

        const {data} = await axios.put(`${serverUrl}/update/password`, {newPass, confirmPass}, {
            withCredentials: true,
        });

        dispatch({
            type: "UpdateAdminPasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "UpdateAdminPasswordFailure",
            payload: error.response.data.message
        })
    }
}

export const contactUs = (name, email, num, subj, msg) => async(dispatch) => {
    try {
        dispatch({
            type: "ContactRequest",
        });

        const {data} = await axios.post(`${serverUrl}/contact`, {name, email, num, subj, msg}, {
            withCredentials: true,
        }, {
            headers: {
                'Content-Type': "application/json"
            }
        });

        dispatch({
            type: "ContactSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "ContactFailure",
            payload: error.response.data.message
        })
    }
}

export const addWithdrawl = (email, amount) => async(dispatch) => {
    try {
        dispatch({
            type: "AddWithdrawlRequest",
        });

        const {data} = await axios.post(`${serverUrl}/add/withdrawl`, {email, amount}, {
            withCredentials: true,
        });

        dispatch({
            type: "AddWithdrawlSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "AddWithdrawlFailure",
            payload: error.response.data.message
        })
    }
}

export const getUserWithdrawls = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "GetUserWithdrawlsRequest",
        });

        const {data} = await axios.get(`${serverUrl}/user/withdrawls/${id}`, {
            withCredentials: true,
        });


        dispatch({
            type: "GetUserWithdrawlsSuccess",
            payload: data.withdrawls
        })
    } catch (error) {
        dispatch({
            type: "GetUserWithdrawlsFailure",
            payload: error.response.data.message
        })
    }
}

export const getAllWithdrawls = () => async(dispatch) => {
    try {
        dispatch({
            type: "GetWithdrawlsRequest",
        });

        const {data} = await axios.get(`${serverUrl}/get/withdrawls`, {
            withCredentials: true,
        });

        dispatch({
            type: "GetWithdrawlsSuccess",
            payload: data.withdrawls
        })
    } catch (error) {
        dispatch({
            type: "GetWithdrawlsFailure",
            payload: error.response.data.message
        })
    }
}

export const getWithdrawl = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "GetWithdrawlRequest",
        });

        const {data} = await axios.get(`${serverUrl}/get/withdrawl/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "GetWithdrawlSuccess",
            payload: data.withdrawl
        })
    } catch (error) {
        dispatch({
            type: "GetWithdrawlFailure",
            payload: error.response.data.message
        })
    }
}

export const addInstalment = (email, month, year, amount, checked) => async(dispatch) => {
    try {
        dispatch({
            type: "AddInstalmentRequest",
        });

        const {data} = await axios.post(`${serverUrl}/add/instalment`, {email, month, year, amount, checked}, {
            withCredentials: true,
        });

        dispatch({
            type: "AddInstalmentSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "AddInstalmentFailure",
            payload: error.response.data.message
        })
    }
}

export const updateCustomer = (firstName, lastName, email, mob, street, city, state, country, postal, aadhar, id) => async(dispatch) => {
    try {
        dispatch({
            type: "UpdateCustomerRequest",
        });

        const {data} = await axios.put(`${serverUrl}/update/customer`, {firstName, lastName, email, mob, street, city, state, country, postal, aadhar, id}, {
            withCredentials: true,
        });

        dispatch({
            type: "UpdateCustomerSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "UpdateCustomerFailure",
            payload: error.response.data.message
        })
    }
}

export const updateAdInvestor = (firstName, lastName, email, mob, street, city, state, country, postal, aadhar, id) => async(dispatch) => {
    try {
        dispatch({
            type: "UpdateInvestorRequest",
        });

        const {data} = await axios.put(`${serverUrl}/update/investor`, {firstName, lastName, email, mob, street, city, state, country, postal, aadhar, id}, {
            withCredentials: true,
        });

        dispatch({
            type: "UpdateInvestorSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "UpdateInvestorFailure",
            payload: error.response.data.message
        })
    }
}

export const updatePrevAdmin = () => async(dispatch) => {
    try {
        dispatch({
            type: "UpdatePrevAdminRequest",
        });

        const {data} = await axios.get(`${serverUrl}/up/admin`, {
            withCredentials: true,
        });

        dispatch({
            type: "UpdatePrevAdminSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "UpdatePrevAdminFailure",
            payload: error.response.data.message
        })
    }
}

export const updatePrevInvestors = () => async(dispatch) => {
    try {
        dispatch({
            type: "UpdatePrevInvestorsRequest",
        });

        const {data} = await axios.get(`${serverUrl}/up/investors`, {
            withCredentials: true,
        });

        dispatch({
            type: "UpdatePrevInvestorsSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "UpdatePrevInvestorsFailure",
            payload: error.response.data.message
        })
    }
}