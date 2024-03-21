import React, { useEffect, useState } from 'react'
import Home from 'src/sections/landing/home/Home'
import About from 'src/sections/landing/about/About'
// import 'src/sections/styling/Landing.css'
import Contact from 'src/sections/landing/contact/Contact'
import { useDispatch, useSelector } from 'react-redux'
import { loadAdmin } from 'src/redux/Actions/AdminActions'
import { loadInvestor } from 'src/redux/Actions/InvestorActions'
import { loadCustomer } from 'src/redux/Actions/CustomerAction'

const Landing = () => {
    const[isClient, setIsClient] = useState(false)
    const {isAdminAuthenticated, loading} = useSelector(state => state.adminAuth)
    const {isInvestorAuthenticated, loading: investorLoading} = useSelector(state => state.investorAuth)
    const {isCustomerAuthenticated, customer, loading: customerLoading} = useSelector(state => state.customerAuth)

    const dispatch = useDispatch()

    useEffect(() => {
      setIsClient(true);
      dispatch(loadAdmin());
      dispatch(loadInvestor());
      dispatch(loadCustomer());
    }, []);

    // useEffect(() => {
    //   if(!loading){
    //     if(!isAdminAuthenticated){
    //       dispatch(loadCustomer());
    //     }
    //   }
    //   if(!customerLoading){
    //     if(!isAdminAuthenticated && !isCustomerAuthenticated){
    //       dispatch(loadInvestor());
    //     }
    //   }
    // }, [loading, customerLoading])

  return (
    isClient && 
    <div className='landing'>
        <div className="multi-circle">
            <Home 
              isAdminAuthenticated={isAdminAuthenticated}
              loading={loading}
              isCustomerAuthenticated={isCustomerAuthenticated}
              customerLoading={customerLoading}
              isInvestorAuthenticated={isInvestorAuthenticated}
              investorLoading={investorLoading}
              customer={customer}
            />
            <About />
            <Contact />
        </div>
    </div>
  )
}

export default Landing
