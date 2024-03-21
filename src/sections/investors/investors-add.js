import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Tabs,
  Tab
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addInvestor } from 'src/redux/Actions/AdminActions';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const states = [
  {
    value: 'U.P.',
    label: 'U.P.'
  },
  {
    value: 'M.P.',
    label: 'M.P.'
  }
];

const maritals = [
    {
        value: 'Single',
        label: 'Single'
    },
    {
        value: 'Married',
        label: 'Married'
    },
    {
        value: 'Others',
        label: 'Others'
    }
]

const genders = [
    {
        value: 'Male',
        label: 'Male'
    },
    {
        value: 'Female',
        label: 'Female'
    },
    {
        value: 'NA',
        label: 'NA'
    }
]

export const AddInvestors = (props) => {

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const { investors, onWithdraw } = props;
  const [noWithdraw, setNoWithdraw] = useState(false);
  const [temp, setTemp] = useState();
  const [addTemp, setAddTemp] = useState();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mob: '',
    street: '',
    city: '',
    state: 'U.P.',
    country: '',
    postal: '',
    dob: '2006-01-01',
    gender: 'Male',
    marital: 'Single',
    aadhar: '',
    invest: '',
  });

  const [withdraw, setWithdraw] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mob: '',
    aadhar: '',
    amountRem: '',
    withdrawn: '',
  });

  const dispatch = useDispatch();
  const [method, setMethod] = useState('add');

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    if(e.target.name === 'email'){
      setAddTemp(investors.find(investor =>  investor.email === e.target.value ));
      // setInvestor(search);
    }
  }

  const handleWithChange = (e) => {
    setWithdraw((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    if(e.target.name === 'email'){
      setTemp(investors.find(investor =>  investor.email === e.target.value ));
      // setInvestor(search);
    }
  }

  useEffect(() => {
    if(addTemp){
      const arr = addTemp.name.split(" ")
      const dateDob = new Date(addTemp.dob);
      const DOB = format(dateDob, 'yyyy-MM-dd')
      setValues((prevState) => ({
        ...prevState,
        mob: addTemp.mob,
        firstName: arr[0],
        lastName: arr[1],
        street: addTemp.address.street,
        city: addTemp.address.city,
        state: addTemp.address.state,
        country: addTemp.address.country,
        postal: addTemp.address.postal,
        dob: DOB,
        marital: addTemp.marital,
        gender: addTemp.gender,
        aadhar: addTemp.aadhar,
      }))
    } else {
      setNoWithdraw(true)
      setValues((prevState) => ({
        ...prevState,
        mob: '',
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: 'U.P.',
        country: '',
        postal: '',
        dob: '2006-01-01',
        marital: 'Single',
        gender: 'Male',
        aadhar: ''
      }))
    }
  }, [addTemp])

  useEffect(() => {
    if(temp){
      if(temp.current.moneyRem <= 0){
        toast.error(`No money to withdraw`, toastOptions);
        setNoWithdraw(true)
      } else {
        setNoWithdraw(false)
      }
      const arr = temp.name.split(" ")
      setWithdraw((prevState) => ({
        ...prevState,
        mob: temp.mob,
        firstName: arr[0],
        lastName: arr[1],
        aadhar: temp.aadhar,
        amountRem: temp.current.moneyRem <= 0 ? 0 : temp.current.moneyRem
      }))
    } else {
      setWithdraw((prevState) => ({
        ...prevState,
        mob: '',
        firstName: '',
        lastName: '',
        aadhar: '',
        amountRem: ''
      }))
    }
  }, [temp])

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if(method === 'add'){
      if(values.firstName==='' || values.lastName==='' || values.email==='' || values.mob==='' || values.street==='' || values.city==='' || values.country==='' || values.postal==='' || values.aadhar==='' || values.invest===''){
        toast.error("Fill details correctly", toastOptions);
      } else {
        dispatch(addInvestor(values.firstName, values.lastName, values.email, values.mob, values.street, values.city, values.state, values.country, values.postal, values.dob, values.gender, values.marital, values.aadhar, values.invest));
        props.onAddInvestorData(false);
      }
    } else {
      if(withdraw.amountRem===''){
        toast.error("Investor details not matched", toastOptions);
      } else if(withdraw.withdrawn===''){
        toast.error("Enter withdrawl amount correctly", toastOptions);
      } else if(withdraw.amountRem < withdraw.withdrawn) {
        toast.error("You don't have enough money to withdraw", toastOptions);
      } else {
        onWithdraw(withdraw);
      }
    }
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
          sx={{ mx: 0, color: 'rgb(99,102,241)', '& .MuiCardHeader-subheader' : { fontWeight: 'bold'} }}
        />
        <CardContent sx={{ pt: 0 }}>
        <Tabs
          onChange={handleMethodChange}
          sx={{ mb: 2, mx: 2, mt: -0.5 }}
          value={method}
        >
          <Tab
            label="Add Investor"
            value="add"
          />
          <Tab
            label="Withdraw"
            value="withdraw"
          />
        </Tabs>
          {method === 'add' && (
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={2}
            >
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type='email'
                  onChange={handleChange}
                  required={true}
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                  InputProps={{readOnly: addTemp ? true : false}}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                  InputProps={{readOnly: addTemp ? true : false}}
                />
              </Grid>
              
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="mob"
                  required
                  onChange={handleChange}
                  value={values.mob}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 10,
                    readOnly: addTemp ? true : false
                  }}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  onChange={handleChange}
                  value={values.street}
                  InputProps={{readOnly: addTemp ? true : false}}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  required
                  onChange={handleChange}
                  value={values.city}
                  InputProps={{readOnly: addTemp ? true : false}}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select={addTemp ? false : true}
                  SelectProps={{ native: true }}
                  value={values.state}
                  InputProps={{readOnly: addTemp ? true : false}}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  required
                  onChange={handleChange}
                  value={values.country}
                  InputProps={{readOnly: addTemp ? true : false}}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Postal"
                  name="postal"
                  required
                  onChange={handleChange}
                  value={values.postal}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 6,
                    readOnly: addTemp ? true : false
                  }}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="DOB"
                  name="dob"
                  type='date'
                  onChange={handleChange}
                  required
                  value={values.dob}
                  InputProps={{readOnly: addTemp ? true : false}}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                  required
                  select={addTemp ? false : true}
                  SelectProps={{ native: true }}
                  value={values.gender}
                  InputProps={{readOnly: addTemp ? true : false}}
                >
                  {genders.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              {/* <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Marital Status"
                  name="marital"
                  onChange={handleChange}
                  required
                  select={addTemp ? false : true}
                  SelectProps={{ native: true }}
                  value={values.marital}
                  InputProps={{readOnly: addTemp ? true : false}}
                >
                  {maritals.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid> */}
              <Grid 
              xs={6}
              md={4}>
                <TextField
                  fullWidth
                  label="Aadhar Id"
                  name="aadhar"
                  required
                  onChange={handleChange}
                  value={values.aadhar}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 12,
                    readOnly: addTemp ? true : false
                  }}
                />
            </Grid>
            </Grid>
          <Divider sx={{ borderColor: 'neutral.400', mt: 2.5, mb: 0 }} />
          <CardHeader
            subheader="Financial Information"
            sx={{ mx: 0, mt: -1, '& .MuiCardHeader-subheader' : { fontWeight: 'bold', color: 'rgb(99,102,241)'} }}
          />
          <Grid 
            container 
            spacing={1.5}
          >
            
            <Grid 
            xs={6}
            md={4}>
                <TextField
                  fullWidth
                  label="Invested Amount"
                  name="invest"
                  required
                  onChange={handleChange}
                  value={values.invest}
                />
            </Grid>
          </Grid>
          </Box>
          )}
          {method === 'withdraw' && (
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={2}
            >
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type='email'
                  onChange={handleWithChange}
                  required={true}
                  value={withdraw.email}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  onChange={handleWithChange}
                  required
                  value={withdraw.firstName}
                  InputProps={{readOnly: temp ? true : false}}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleWithChange}
                  required
                  value={withdraw.lastName}
                  InputProps={{readOnly: temp ? true : false}}
                />
              </Grid>

              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="mob"
                  required
                  onChange={handleWithChange}
                  value={withdraw.mob}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 10,
                    readOnly: temp ? true : false
                  }}
                />
              </Grid>
              <Grid 
                xs={6}
                md={4}>
                <TextField
                  fullWidth
                  label="Aadhar Id"
                  name="aadhar"
                  required
                  onChange={handleWithChange}
                  value={withdraw.aadhar}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 12,
                    readOnly: temp ? true : false
                  }}
                />
              </Grid>
              <Grid 
                xs={6}
                md={4}>
                <TextField
                  fullWidth
                  label="Amount Remaining"
                  name="amountRem"
                  required
                  onChange={handleWithChange}
                  value={withdraw.amountRem}
                  InputProps={{readOnly: temp ? true : false}}
                />
              </Grid>
            </Grid>
          <Divider sx={{ borderColor: 'neutral.400', mt: 3.5, mb: 0 }} />
          <CardHeader
            subheader="Financial Information"
            sx={{ mx: 0, mt: 0, '& .MuiCardHeader-subheader' : { fontWeight: 'bold', color: 'rgb(99,102,241)'} }}
          />
          <Grid 
            container 
            spacing={2}
          >
            {/* <Grid 
            xs={6}
            md={4}>
                <TextField
                  fullWidth
                  label="Aadhar Id"
                  name="aadhar"
                  required
                  onChange={handleChange}
                  value={values.aadhar}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 12,
                  }}
                />
            </Grid>
            <Grid 
            xs={6}
            md={4}>
                <TextField
                  fullWidth
                  label="Amount Remaining"
                  name="amountRem"
                  required
                  onChange={handleChange}
                  value={values.amountRem}
                />
            </Grid> */}
            <Grid 
            xs={6}
            md={4}>
              <TextField
                fullWidth
                label="Withdrawl Amount"
                name="withdrawn"
                required
                onChange={handleWithChange}
                value={values.withdrawn}
              />
            </Grid>
          </Grid>
          </Box>
          )}

        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'center' }}>
          {method === 'add' ?
          (<Button variant="contained" sx={{mb: 1.5}} type='submit'
          >
            Save details
          </Button>) : (
          <Button variant="contained" sx={{mb: 1.5}} type='submit' disabled={method==='withdraw' && noWithdraw}
          >
            Withdraw
          </Button>)}
        </CardActions>
      </Card>
    </form>
  );
};
