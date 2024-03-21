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

export const EditInvestor = (props) => {

  const { investor, onEditInvestor } = props;
//   const [investor, setInvestor] = useState();
  const [temp, setTemp] = useState();

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
    aadhar: '',
    invest: '',
    withdraw: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }


  useEffect(() => {
    if(investor){
        const arr = investor.name.split(" ")
        setValues((prevState) => ({
            ...prevState,
            firstName: arr[0],
            lastName: arr[1],
            email: investor.email,
            mob: investor.mob,
            street: investor.address.street,
            city: investor.address.city,
            state: investor.address.state,
            country: investor.address.country,
            postal: investor.address.postal,
            aadhar: investor.aadhar,
            invest: investor.current.moneyInvest,
            withdraw: investor.lifetime.withdrawn
        }))
    }
  }, [investor])



  const handleSubmit = (e) => {
      e.preventDefault();
      if(values.firstName==='' || values.lastName==='' || values.email==='' || values.mob==='' || values.street==='' || values.city==='' || values.state==='' || values.country==='' || values.postal==='' || values.aadhar===''){
        console.log('Fill al the details')
      } else {
        onEditInvestor(values)
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
        {/* <Tabs
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
        </Tabs> */}
          {/* {method === 'add' &&  */}
          
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
                //   helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
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
                />
              </Grid>
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
                  required
                  value={values.email}
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
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
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
                  }}
                />
              </Grid>
              {/* <Grid
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
                  select
                  SelectProps={{ native: true }}
                  value={values.gender}
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
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Marital Status"
                  name="marital"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.marital}
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
                  label="Invested Amount"
                  name="invest"
                  required
                  onChange={handleChange}
                  value={values.invest}
                  InputProps={{readOnly: true}}
                />
            </Grid>
            <Grid 
            xs={6}
            md={4}>
                <TextField
                  fullWidth
                  label="Withdrawl Amount"
                  name="withdraw"
                  required
                  onChange={handleChange}
                  value={values.withdraw}
                  InputProps={{readOnly: true}}
                />
            </Grid>
          </Grid>
          </Box>

        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" sx={{mb: 1.5}} type='submit'
          >
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
