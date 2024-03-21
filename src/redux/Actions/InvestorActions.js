import axios from "axios"

// const serverUrl = "http://localhost:8080/api/v1/investor"
const serverUrl = "https://fin-backend-14d0.onrender.com/api/v1/investor"

export const loginInvestor = (email, password) => async(dispatch) =>{

    try {
        dispatch({
            type: "InvestorLoginRequest"
        });

        const {data} = await axios.post(`${serverUrl}/login`, {email, password}, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        dispatch({
            type: "InvestorLoginSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "InvestorLoginFailure",
            payload: error.response.data.message
        })
        
    }
}

export const logoutInvestor = () => async(dispatch) => {
    try {
        dispatch({
            type: "LogoutInvestorRequest",
        });

        const {data} = await axios.get(`${serverUrl}/logout`, {
            withCredentials: true,
        });

        dispatch({
            type: "LogoutInvestorSuccess",
        })
        
    } catch (error) {

        dispatch({
            type: "LogoutInvestorFailure",
            payload: error.response.data.message
        })
    }
}

export const loadInvestor = () => async(dispatch) => {
    try {
        dispatch({
            type: "LoadInvestorRequest",
        });

        const {data} = await axios.get(`${serverUrl}/me`, {
            withCredentials: true,
        });

        dispatch({
            type: "LoadInvestorSuccess",
            payload: data.investor
        })
    } catch (error) {
        dispatch({
            type: "LoadInvestorFailure",
            payload: error.response.data.message
        })
    }
}

export const updateInvestor = (name, email, mob, street, city, state, country, postal) => async(dispatch) => {
    try {
        dispatch({
            type: "UpdateInvestorRequest",
        });

        const {data} = await axios.put(`${serverUrl}/update/profile`, {name, email, mob, street, city, state, country, postal}, {
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

export const updateInvestorPass = (newPass, confirmPass) => async(dispatch) => {
    try {
        dispatch({
            type: "UpdateInvestorPasswordRequest",
        });

        const {data} = await axios.put(`${serverUrl}/update/password`, {newPass, confirmPass}, {
            withCredentials: true,
        });

        dispatch({
            type: "UpdateInvestorPasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "UpdateInvestorPasswordFailure",
            payload: error.response.data.message
        })
    }
}