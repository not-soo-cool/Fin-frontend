import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdminPass } from 'src/redux/Actions/AdminActions';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Page = () => {

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

  const dispatch = useDispatch();

  const { message, error } = useSelector(state => state.updateAdmin)

  const handlePass = (val) => {
    dispatch(updateAdminPass(val.newPass, val.confirmPass));
  }

  useEffect(() => {
    if(message){
      toast.success(message, toastOptions);
      dispatch({type: "clearMessage"});
    }
    if(error){
      toast.error(error, toastOptions);
      dispatch({type: "clearErrors"});
    }
  }, [message, error, dispatch, toastOptions])

  return(
  <>
    <Head>
      <title>
        Settings | Finance Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">
            Settings
          </Typography>
          {/* <SettingsNotifications /> */}
          <SettingsPassword 
            onChange={handlePass}
          />
        </Stack>
      </Container>
    </Box>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
