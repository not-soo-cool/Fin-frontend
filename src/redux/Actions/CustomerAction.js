import axios from "axios"

// const serverUrl = "http://localhost:8080/api/v1/customer"
const serverUrl = "https://fin-backend-14d0.onrender.com/api/v1/customer"

export const loginCustomer = (email, password) => async(dispatch) =>{

    try {
        dispatch({
            type: "CustomerLoginRequest"
        });

        const {data} = await axios.post(`${serverUrl}/login`, {email, password}, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        console.log(data)

        dispatch({
            type: "CustomerLoginSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "CustomerLoginFailure",
            payload: error.response.data.message
        })
        
    }
}

export const logoutCustomer = () => async(dispatch) => {
    try {
        dispatch({
            type: "LogoutCustomerRequest",
        });

        const {data} = await axios.get(`${serverUrl}/logout`, {
            withCredentials: true,
        });

        dispatch({
            type: "LogoutCustomerSuccess",
            payload: data.message
        })
        
    } catch (error) {

        dispatch({
            type: "LogoutCustomerFailure",
            payload: error.response.data.message
        })
    }
}

export const loadCustomer = () => async(dispatch) => {
    try {
        dispatch({
            type: "LoadCustomerRequest",
        });

        const {data} = await axios.get(`${serverUrl}/me`, {
            withCredentials: true,
        });

        // console.log(data);

        dispatch({
            type: "LoadCustomerSuccess",
            payload: data.customer
        })
    } catch (error) {
        dispatch({
            type: "LoadCustomerFailure",
            payload: error.response.data.message
        })
    }
}