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
  Unstable_Grid2 as Grid
} from '@mui/material';

const states = [
  {
    value: 'U.P.',
    label: 'U.P.'
  },
  {
    value: 'M.P.',
    label: 'M.P.'
  },
];

export const AccountProfileDetails = (props) => {
  const { user } = props;

  const [values, setValues] = useState({
    name: '',
    email: '',
    mob: '',
    street: '',
    city: '',
    state: 'U.P.',
    country: '',
    postal: '',
  });

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(values)
  }

  useEffect(() => {
    if(user){
      const temp = {...values}
      temp.name = user.name
      temp.email = user.email
      temp.mob = user.mob
      temp.street = user.address.street
      temp.city = user.address.city
      temp.state = user.address.state
      temp.country = user.address.country
      temp.postal = user.address.postal
      setValues(temp);
    }
  }, [user])

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
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  // helperText="Please specify the first name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              {/* <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid> */}
              <Grid
                xs={12}
                md={6}
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
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="mob"
                  onChange={handleChange}
                  required
                  value={values.mob}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 10,
                  }}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  onChange={handleChange}
                  required
                  value={values.street}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  onChange={handleChange}
                  required
                  value={values.city}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="State"
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
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Postal"
                  name="postal"
                  onChange={handleChange}
                  required
                  value={values.postal}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 6,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
