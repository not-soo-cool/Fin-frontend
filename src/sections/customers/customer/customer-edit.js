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
import { addCustomer } from 'src/redux/Actions/AdminActions';

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

export const EditCustomer = (props) => {

  const { customer, onEditCustomer } = props;
//   const [customer, setCustomer] = useState();
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
    nextEmi: '',
    amountDue: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }


  useEffect(() => {
    if(customer){
        const arr = customer.name.split(" ")
        setValues((prevState) => ({
            ...prevState,
            firstName: arr[0],
            lastName: arr[1],
            email: customer.email,
            mob: customer.mob,
            street: customer.address.street,
            city: customer.address.city,
            state: customer.address.state,
            country: customer.address.country,
            postal: customer.address.postal,
            aadhar: customer.aadhar,
            nextEmi: customer.netNextEMI,
            amountDue: customer.amountDue
        }))
    }
  }, [customer])



  const handleSubmit = (e) => {
      e.preventDefault();
      if(values.firstName==='' || values.lastName==='' || values.email==='' || values.mob==='' || values.street==='' || values.city==='' || values.state==='' || values.country==='' || values.postal==='' || values.aadhar===''){
        console.log('Fill al the details')
      } else {
        onEditCustomer(values)
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
            label="Add Customer"
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
                  label="Next EMI"
                  name="invest"
                  required
                  onChange={handleChange}
                  value={values.nextEmi}
                  InputProps={{readOnly: true}}
                />
            </Grid>
            <Grid 
            xs={6}
            md={4}>
                <TextField
                  fullWidth
                  label="Amount Due"
                  name="invest"
                  required
                  onChange={handleChange}
                  value={values.amountDue}
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
