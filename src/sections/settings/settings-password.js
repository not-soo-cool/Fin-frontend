import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';

export const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    newPass: '',
    confirmPass: ''
  });

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onChange(values)
  }


  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label="Password"
              name="newPass"
              onChange={handleChange}
              type="password"
              value={values.newPass}
            />
            <TextField
              fullWidth
              label="Password (Confirm)"
              name="confirmPass"
              onChange={handleChange}
              type="password"
              value={values.confirmPass}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
