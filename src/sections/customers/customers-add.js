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
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer } from 'src/redux/Actions/AdminActions';
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

export const AddCustomers = (props) => {

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

  const [revMonths, setRevMonths] = useState([{"Jan": 0}, {"Feb": 1}, {"Mar": 2}, {"Apr": 3}, {"May": 4}, {"Jun": 5}, {"Jul": 6}, {"Aug": 7}, {"Sep": 8}, {"Oct": 9}, {"Nov": 10}, {"Dec": 11}])

  const { investors, customers, onAddInstal, onAddCustomerData  } = props;
  const [temp, setTemp] = useState();
  const [invTemp, setInvTemp] = useState();
  const [flag, setFlag] = useState(false);
  const [noMoney, setNoMoney] = useState(false);
  const [noEMI, setNoEMI] = useState(false);
  const [inv, setInv] = useState(false);
  const [inTemp, setInTemp] = useState();
  const [months, setMonths] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
  // const [flag, setFlag] = useState(false)
  // const [nowDate, setNowDate] = useState(new Date());

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mob: '',
    street: '',
    city: 'Madhogarh',
    state: 'U.P.',
    country: 'India',
    postal: 285126,
    dob: '2006-01-01',
    gender: 'Male',
    aadhar: 555555555555,
    emiDate: '2023-09-01',
    guarantorName: '',
    guarantorAdd: '',
    guarantorPh: '',
    prodName: '',
    prodPrice: '',
    downPay: '',
    finAmount: '',
    mon: '',
    roi: '',
    invEmail: 'investor2@gmail.co',
    invFirstName: '',
    invLastName: '',
    invMob: '',
    invMoneyRem: '',
  });

  const [instalData, setInstalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mob: '',
    aadhar: '',
    nextEMI: '',
    month: '',
    monNum: '',
    year: '',
    amount: '',
    flag: false
  });

  const dispatch = useDispatch();
  const [method, setMethod] = useState('user');

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    if(e.target.name === 'email'){
      setTemp(customers.find(customer =>  customer.email === e.target.value ));
    } else if(e.target.name === 'invEmail'){
      setInvTemp(investors.find(investor => investor.email === e.target.value))
    }
  }

  const handleInstalChange = (e) => {
    if(e.target.name === 'amount'){
      setInstalData((prevState) => ({
        ...prevState,
        [e.target.name]: Number(e.target.value)
      }));
    } else {
      setInstalData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    }
    if(e.target.name === 'email'){
      setInTemp(customers.find(customer =>  customer.email === e.target.value ));
    }
  }

  useEffect(() => {
    if(temp){
      const arr = temp.name.split(" ")
      const dateDob = new Date(temp.dob);
      const DOB = format(dateDob, 'yyyy-MM-dd')
      setValues((prevState) => ({
        ...prevState,
        mob: temp.mob,
        firstName: arr[0],
        lastName: arr[1],
        street: temp.address.street,
        city: temp.address.city,
        state: temp.address.state,
        country: temp.address.country,
        postal: temp.address.postal,
        dob: DOB,
        aadhar: temp.aadhar,
        gender: temp.gender,
      }))
    } else {
      setValues((prevState) => ({
        ...prevState,
        mob: '',
        firstName: '',
        lastName: '',
        street: '',
        city: 'Madhogarh',
        state: 'U.P.',
        country: 'India',
        postal: 285126,
        dob: '2006-01-01',
        aadhar: 555555555555,
        gender: 'Male',
      }))
    }
  }, [temp])

  useEffect(() => {
    if(values.finAmount!=='' && values.invMoneyRem!==''){
      if(values.finAmount > values.invMoneyRem){
        toast.error("Not enough money to finance", toastOptions);
        setNoMoney(true);
      }
    }
  }, [values.invMoneyRem])

  useEffect(() => {
    if(values.finAmount!=='' && values.invMoneyRem!==''){
      if(values.finAmount > values.invMoneyRem){
        setNoMoney(true);
      } else {
        setNoMoney(false);
      }
    }
  }, [values.finAmount])

  useEffect(() => {
    if(invTemp){
      const arr = invTemp.name.split(" ")
      setValues((prevState) => ({
        ...prevState,
        invFirstName: arr[0],
        invLastName: arr[1],
        invMob: invTemp.mob,
        invMoneyRem: invTemp.current.moneyRem,
      }))
    } else {
      setValues((prevState) => ({
        ...prevState,
        invFirstName: '',
        invLastName: '',
        invMob: '',
        invMoneyRem: '',
      }))
    }
  })

  useEffect(() => {
    if(inTemp){
      if(inTemp.amountDue <= 0){
        setNoEMI(true);
        toast.info("No amount due", toastOptions);
      } else {
        setNoEMI(false)
      }

      const arr = inTemp.name.split(" ")
      const nowDate = new Date();
      const date = new Date(inTemp.nextEMIDate);
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      // if(nowDate.getMonth() !== date.getMonth() || nowDate.getFullYear() !== date.getFullYear()){
      //   toast.info(`No current month instalment`, toastOptions);
      //   setNoEMI(true);
      // } else {
      //   setNoEMI(false)
      // }

      setInstalData((prevState) => ({
        ...prevState,
        mob: inTemp.mob,
        firstName: arr[0],
        lastName: arr[1],
        aadhar: inTemp.aadhar,
        nextEMI: inTemp.amountDue <= 0 ? 0 : inTemp.netNextEMI - inTemp.buffer + inTemp.penalty,
        month: month,
        year: year,
        monNum: revMonths[month]
      }))
    } else {
      setNoEMI(true);
      setInstalData((prevState) => ({
        ...prevState,
        mob: '',
        firstName: '',
        lastName: '',
        aadhar: '',
        nextEMI: '',
        month: '',
        year: ''
      }))
    }
  }, [inTemp])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(method === 'user'){
      if(inv){
        if(values.firstName==='' || values.lastName==='' || values.email==='' || values.mob==='' || values.street==='' || values.city==='' || values.country==='' || values.postal==='' || values.aadhar==='' || values.guarantorName==='' || values.guarantorAdd==='' || values.guarantorPh==='' || values.prodName==='' || values.prodPrice==='' || values.downPay==='' || values.finAmount==='' || values.mon==='' || values.roi===''){
          toast.error("Fill details correctly", toastOptions);
        } else if(values.invEmail==='' || values.invFirstName==='' || values.invLastName==='' || values.invMob==='' || values.invMoneyRem===''){
          toast.error("Fill investor details correctly", toastOptions);
        } else {
          onAddCustomerData(values);
        }
      } else {
        if(values.firstName==='' || values.lastName==='' || values.email==='' || values.mob==='' || values.street==='' || values.city==='' || values.country==='' || values.postal==='' || values.aadhar==='' || values.prodName==='' || values.prodPrice==='' || values.downPay==='' || values.finAmount==='' || values.mon==='' || values.roi===''){
          toast.error("Fill details correctly", toastOptions);
        } else {
          setInv(true);
        }
      }
    } else {
      if(instalData.nextEMI===''){
        toast.error("Customer details not matched", toastOptions);
      } else if(instalData.amount===''){
        toast.error("Enter instalment amount correctly", toastOptions);
      } else if(instalData.amount.toString() !== instalData.nextEMI.toString()) {
        toast.error("Enter amount correctly", toastOptions)
      } else {
        onAddInstal(instalData);
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
          sx={{ mx: 0, mt: -1.5, color: 'rgb(99,102,241)', '& .MuiCardHeader-subheader' : { fontWeight: 'bold'} }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Tabs
            onChange={handleMethodChange}
            sx={{ mb: 2, mx: 2 }}
            value={method}
          >
            <Tab
              label="Add Customer"
              value="user"
            />
            <Tab
              label="Add Instalment"
              value="instal"
            />
          </Tabs>
          {method === 'user' &&
          <Box sx={{ m: -1 }}>
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
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
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
                  onChange={handleChange}
                  required
                  value={values.lastName}
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
                  onChange={handleChange}
                  value={values.mob}
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
                md={4}
              >
                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  onChange={handleChange}
                  value={values.street}
                  InputProps={{readOnly: temp ? true : false}}
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
                  InputProps={{readOnly: temp ? true : false}}
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
                  select={temp ? false : true}
                  SelectProps={{ native: true }}
                  value={values.state}
                  InputProps={{readOnly: temp ? true : false}}
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
                  InputProps={{readOnly: temp ? true : false}}
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
                    readOnly: temp ? true : false
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
                  InputProps={{readOnly: temp ? true : false}}
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
                  select={temp ? false : true}
                  SelectProps={{ native: true }}
                  value={values.gender}
                  InputProps={{readOnly: temp ? true : false}}
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
                  label="Aadhar Id"
                  name="aadhar"
                  required
                  onChange={handleChange}
                  value={values.aadhar}
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
                md={4}
              >
                <TextField
                  fullWidth
                  label="Start Date"
                  name="emiDate"
                  type='date'
                  onChange={handleChange}
                  required
                  value={values.emiDate}
                  InputProps={{readOnly: temp ? true : false}}
                />
              </Grid>

              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Guarantor Name"
                  name="guarantorName"
                  required
                  onChange={handleChange}
                  value={values.guarantorName}
                  InputProps={{readOnly: temp ? true : false}}
                />
              </Grid>

              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Guarantor Address"
                  name="guarantorAdd"
                  required
                  onChange={handleChange}
                  value={values.guarantorAdd}
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
                  name="guarantorPh"
                  required
                  onChange={handleChange}
                  value={values.guarantorPh}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 10,
                    readOnly: temp ? true : false
                  }}
                />
              </Grid>
            </Grid>
          <Divider sx={{ borderColor: 'neutral.400', mt: 2.5, mb: 0 }} />
          <CardHeader
            subheader="Financial Information"
            sx={{ mx: 0, '& .MuiCardHeader-subheader' : { fontWeight: 'bold', color: 'rgb(99,102,241)'} }}
          />
          <Grid 
            container 
            spacing={2}
          >
            <Grid 
            xs={6}
            md={4}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="prodName"
                  required
                  onChange={handleChange}
                  value={values.prodName}
                />
            </Grid>
            <Grid 
            xs={6}
            md={4}>
                <TextField
                  fullWidth
                  label="Product Price"
                  name="prodPrice"
                  type='number'
                  required
                  onChange={handleChange}
                  value={values.prodPrice}
                />
            </Grid>
            <Grid 
            xs={6}
            md={4}>
                <TextField
                  fullWidth
                  label="Down Payment"
                  name="downPay"
                  type='number'
                  required
                  onChange={handleChange}
                  value={values.downPay}
                />
            </Grid>
            <Grid 
            xs={6}
            md={4}>
                <TextField
                  fullWidth
                  label="Principal Amount"
                  name="finAmount"
                  type='number'
                  required
                  onChange={handleChange}
                  value={values.finAmount}
                />
            </Grid>
            <Grid 
            xs={6}
            md={4}>
                <TextField
                  fullWidth
                  label="Interest Rate (%)"
                  name="roi"
                  type='number'
                  required
                  onChange={handleChange}
                  value={values.roi}
                />
            </Grid>
            <Grid 
            xs={6}
            md={4}>
                <TextField
                  fullWidth
                  label="Time (months)"
                  name="mon"
                  type='number'
                  required
                  onChange={handleChange}
                  value={values.mon}
                />
            </Grid>
          </Grid>
          {inv && 
          <>
            <Divider sx={{ borderColor: 'neutral.400', mt: 2.5, mb: 0 }} />
            <CardHeader
              subheader="Investor Details"
              sx={{ mx: 0, '& .MuiCardHeader-subheader' : { fontWeight: 'bold', color: 'rgb(99,102,241)'} }}
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
                    label="Investor Email"
                    name="invEmail"
                    required
                    onChange={handleChange}
                    value={values.invEmail}
                  />
              </Grid>
              <Grid 
              xs={6}
              md={4}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="invFirstName"
                    required
                    value={values.invFirstName}
                    inputProps={{readOnly: true}}
                  />
              </Grid>
              <Grid 
              xs={6}
              md={4}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="invLastName"
                    required
                    value={values.invLastName}
                    inputProps={{readOnly: true}}
                  />
              </Grid>
              <Grid 
              xs={6}
              md={4}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="invMob"
                    required
                    value={values.invMob}
                    inputProps={{readOnly: true}}
                  />
              </Grid>
              <Grid 
              xs={6}
              md={4}>
                  <TextField
                    fullWidth
                    label="Available Amount"
                    name="invMoneyRem"
                    required
                    value={values.invMoneyRem}
                    inputProps={{readOnly: true}}
                  />
              </Grid>
              <Grid 
              xs={6}
              md={4}>
                  <TextField
                    fullWidth
                    label="Amount"
                    name="invAmount"
                    required
                    value={values.finAmount}
                    inputProps={{readOnly: true}}
                  />
              </Grid>
            </Grid>
          </>}
          </Box>}
          {method === 'instal' &&
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
                  onChange={handleInstalChange}
                  required
                  value={instalData.email}
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
                  onChange={handleInstalChange}
                  required
                  value={instalData.firstName}
                  InputProps={{readOnly: inTemp ? true : false}}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  onChange={handleInstalChange}
                  required
                  value={instalData.lastName}
                  InputProps={{readOnly: inTemp ? true : false}}
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
                  onChange={handleInstalChange}
                  value={instalData.mob}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 10,
                    readOnly: inTemp ? true : false
                  }}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Aadhar Id"
                  name="aadhar"
                  required
                  onChange={handleInstalChange}
                  value={instalData.aadhar}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 12,
                    readOnly: inTemp ? true : false
                  }}
                />
              </Grid>
              <Grid
                xs={6}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Next EMI"
                  name="nextEMI"
                  required
                  onChange={handleInstalChange}
                  value={instalData.nextEMI}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 12,
                    readOnly: inTemp ? true : false
                  }}
                />
              </Grid>
            </Grid>
          <Divider sx={{ borderColor: 'neutral.400', mt: 2.5 }} />
          <CardHeader
            subheader="Financial Information"
            sx={{ mx: 0, mt: 0, '& .MuiCardHeader-subheader' : { fontWeight: 'bold', color: 'rgb(99,102,241)'} }}
          />
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
                label="Month"
                name="month"
                required
                onChange={handleInstalChange}
                value={instalData.month}
                InputProps={{readOnly: inTemp ? true : false}}
              />
            </Grid>
            <Grid 
              xs={6}
              md={4}
            >
              <TextField
                fullWidth
                label="Year"
                name="year"
                type='number'
                required
                onChange={handleInstalChange}
                value={instalData.year}
                InputProps={{readOnly: inTemp ? true : false}}
              />
            </Grid>
            <Grid 
            xs={6}
            md={4}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  type='number'
                  required
                  onChange={handleInstalChange}
                  value={instalData.amount}
                />
            </Grid>
          </Grid>
          </Box>}

        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" sx={{mt: -1}} type='submit' disabled={(method==="instal" && noEMI) || (method==="user" && noMoney)}
          >
            {method==="user" && !inv ? "Select Investor.." : "Save details"}
            {/* Save details */}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
