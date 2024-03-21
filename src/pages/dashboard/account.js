import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadAdmin, updateAdmin } from 'src/redux/Actions/AdminActions';
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
  const { admin } = useSelector(state => state.adminAuth);
  const { message, error } = useSelector(state => state.updateAdmin);

  const handleSubmit = (val) => {
    dispatch(updateAdmin(val.name, val.email, val.mob, val.street, val.city, val.state, val.country, val.postal));
  }

  useEffect(() => {
    dispatch(loadAdmin())
  }, [dispatch])

  useEffect(() => {
    if(message){
      toast.success(message, toastOptions);
      dispatch({type: "clearMessage"});
    }
    if(error){
      toast.error(error, toastOptions);
      dispatch({type: "clearErrors"});
    }
  }, [message, error])


  return(
  <>
    <Head>
      <title>
        Account | Finance Kit
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
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile 
                  user={admin ? admin : ""}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails 
                  user={admin ? admin : ""}
                  onSubmit={handleSubmit}
                />
              </Grid>
            </Grid>
          </div>
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
