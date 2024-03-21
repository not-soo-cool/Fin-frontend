import React, { useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { SvgIcon } from '@mui/material';


const Home = (props) => {

  const { isAdminAuthenticated, loading, isInvestorAuthenticated, investorLoading, isCustomerAuthenticated, customerLoading, customer } = props

  const [tab, setTab] = useState('');
  const [logo1, setLogo1] = useState('favicon-32x32.png')
  const [homeImg, setHomeImg] = useState('assets/landing/home-img.png')

  const handleHome = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleAbout = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  const handleContact = () => {
    window.scrollTo({
      top: 2*window.innerHeight,
      behavior: 'smooth'
    })
  }

  // useEffect(() => {
  //   dispatch(loadAdmin());
  // }, [dispatch]);

  // useEffect(() => {
  //   setTab(window.location.pathname)
  // }, []);

  // const {isAdminAuthenticated, loading} = useSelector(state => state.adminAuth)


  return (
    <div className='home-div'>
      <section className="home-section">
        <header className='home-header'>
          <nav className="navbar">
            <div className="logo" >
              {/* <SvgIcon> */}
                <img src={logo1} alt="" style={{
                  height: '64px',
                  width: '64px',
                  marginTop: '15px',
                  marginLeft: '20px'
                }}/>
              {/* </SvgIcon> */}
            </div>
            <ul className="menu" style={{
              marginLeft: '30px',
            }}>
            <li onClick={handleHome}><a href="#">Home</a></li>
            <li onClick={handleAbout}><a href="#">About</a></li>
            <li onClick={handleContact}><a href="#">Contact</a></li>
            </ul>
            <div className="buttons" >
              {
                !loading && !investorLoading && !customerLoading &&
                (<>
                <a href={isAdminAuthenticated ? "/dashboard/account" : isInvestorAuthenticated ? "/investors/account" : isCustomerAuthenticated ? `customers/${customer._id}` : "/auth/login"}>
                  <input type="button" value={isAdminAuthenticated || isInvestorAuthenticated || isCustomerAuthenticated ? "Profile" : "Login"}/>
                </a>
                </>)
                // (
                // <a href="/auth/login">
                //   <input type="button" value="Login"/>
                // </a>
                // )
              }
            </div>
          </nav>
          <div className="text-content">
            <div className="text-area">
              <h2>Worried about Stock ?<br/>We got that for you!!</h2>
              <p>Effortlessly manage your product inventory with our intuitive stock tracking platform. Stay informed, avoid stockouts, and boost efficiency with real-time updates on your diverse range of products.</p>
              {/* <Link to='login' onClick={()=>setTab("../login")} style={{
                textDecoration: 'none'
              }}> */}
              <button className='mui-btn' style={{
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
              }} onClick={handleAbout}>
                Know More &nbsp; <ArrowForwardIcon fontSize='small' sx={{color: 'white'}} />
              </button>
              {/* </Link> */}
            </div>

            <div className="text-image">
              <img src={homeImg} alt="" />
            </div>

          </div>
        </header>
      </section>
    </div>
  )
}

export default Home
