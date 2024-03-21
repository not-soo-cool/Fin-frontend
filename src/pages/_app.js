import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from 'src/redux/store';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { loadAdmin } from 'src/redux/Actions/AdminActions';
import 'src/sections/styling/Landing.css'
import 'src/sections/styling/Home.css'
import 'src/sections/styling/About.css'
import 'src/sections/styling/Contact.css'
import 'react-toastify/dist/ReactToastify.css';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App1 = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  // const dispatch = useDispatch();
  // const { loading, error, admin, isAdminAuthenticated } = useSelector(state => state.adminAuth)

  // useEffect(()=> {
  //   dispatch(loadAdmin());
  // }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        // transition: Zoom,
      />
      <Head>
        <title>
          Finance Kit
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* <AuthProvider> */}
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <AuthConsumer> */}
              {
                // (auth) => auth.isLoading
                // !isAdminAuthenticated
                //   ? <SplashScreen />
                //   : 
                  getLayout(<Component {...pageProps} />)
              }
            {/* </AuthConsumer> */}
          </ThemeProvider>
        {/* </AuthProvider> */}
      </LocalizationProvider>
    </CacheProvider>
  );
};

const App = (props) => (
  <Provider store={store}>
    <App1 {...props} />
  </Provider>
)

export default App;
