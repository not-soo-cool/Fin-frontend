import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import { useEffect } from 'react';

const user1 = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Anika Visser',
  timezone: 'GTM-7'
};

export const AccountProfile = (props) => {

  const { user } = props;

  useEffect(() => {
    if(user){

    }
  }, [user])

  return(
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user1.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {user ? user.name : ""}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user ? user.address.city : ""} {user ? user.address.state : ""}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user ? user.address.country : ""}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
        {/* <TextField 
          fullWidth
          disabled={true}
          type='file'
         /> */}
      </Button>
      {/* <TextField
        fullWidth
        // helperText="Please specify the first name"
        label=""
        name="name"
        type='file'
        // onChange={handleChange}
        required
        // value={values.name}
      /> */}
    </CardActions>
  </Card>
)};
