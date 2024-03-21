import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginAdmin } from 'src/redux/Actions/AdminActions';
import { loginInvestor } from 'src/redux/Actions/InvestorActions';
import { loadCustomer, loginCustomer } from 'src/redux/Actions/CustomerAction';

const Page = () => {
  
  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('admin');
  const dispatch = useDispatch();
  const [details, setDetails] = useState({ email: "", password: ""})
  const [inDetails, setInDetails] = useState({ email: "", password: ""})
  const [cuDetails, setCuDetails] = useState({ email: "", password: ""})
  const { error, message, isAdminAuthenticated } = useSelector(state => state.adminAuth);
  const { isInvestorAuthenticated } = useSelector(state => state.investorAuth);
  const { isCustomerAuthenticated, customer } = useSelector(state => state.customerAuth);
  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123!',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        dispatch(loginAdmin(details.email, details.password));
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(method === 'admin'){
      setDetails((prev) => {
        return {...prev, [name]: value}
      })
    } else if(method === 'investor'){
      setInDetails((prev) => {
        return {...prev, [name]: value}
      })
    } else {
      setCuDetails((prev) => {
        return {...prev, [name]: value}
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(method === 'admin'){
      dispatch(loginAdmin(details.email, details.password));
    } else if(method === 'investor'){
      dispatch(loginInvestor(inDetails.email, inDetails.password))
    } else {
      dispatch(loginCustomer(cuDetails.email, cuDetails.password))
    }
  }

  useEffect(() => {
    dispatch(loadCustomer());
    if(error){
        // toast.error(error, toastOptions);
        dispatch({type: "clearErrors"})
    }
    if(message){
        // toast.success(message, toastOptions)
        dispatch({type: "clearMessage"})
    }
    if(isAdminAuthenticated){
      router.push('/dashboard/account')
    }
    if(isInvestorAuthenticated){
      router.push('/investors/account')
    }
    if(customer){
      router.push(`/customers/${customer._id}`)
    }
  }, [error, message, dispatch, isAdminAuthenticated, isInvestorAuthenticated, isCustomerAuthenticated, customer, router]);

  return (
    <>
      <Head>
        <title>
          Login | Finance Kit
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              {/* <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography> */}
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Admin"
                value="admin"
              />
              <Tab
                label="Investor"
                value="investor"
              />
              <Tab
                label="Customer"
                value="customer"
              />
            </Tabs>
            {method === 'admin' && (
              <form
                noValidate
                // onSubmit={formik.handleSubmit}
                onSubmit={handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    value={details.email}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={details.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
                {/* <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleSkip}
                >
                  Skip authentication
                </Button> */}
              </form>
            )}
            {method === 'investor' && (
              <form
                noValidate
                onSubmit={handleSubmit}
                // onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={inDetails.email}
                    onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    // value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={inDetails.password}
                    onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    // value={formik.values.password}
                  />
                </Stack>
                {/* <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText> */}
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
              </form>
            )}
            {method === 'customer' && (
              <form
                noValidate
                onSubmit={handleSubmit}
                // onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={cuDetails.email}
                    onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    // value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={cuDetails.password}
                    onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    // value={formik.values.password}
                  />
                </Stack>
                {/* <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText> */}
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
                {/* <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleSkip}
                >
                  Skip authentication
                </Button> */}
                {/* <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                  </div>
                </Alert> */}
              </form>
            )}
            <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can login as <b>Admin</b> , <b>Investor</b> or <b>Customer</b>
                  </div>
                </Alert>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
