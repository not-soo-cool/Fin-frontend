import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as InvestorLayout } from 'src/layouts/investor/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadInvestor, updateInvestor } from 'src/redux/Actions/InvestorActions';

const Page = () => {

  const dispatch = useDispatch();
  const { investor, error } = useSelector(state => state.investorAuth);
//   const { message, error: noError } = useSelector(state => state.investorAuth);

  const handleSubmit = (val) => {
    dispatch(updateInvestor(val.name, val.email, val.mob, val.street, val.city, val.state, val.country, val.postal));
  }

  useEffect(() => {
    dispatch(loadInvestor())
  }, [dispatch])

//   useEffect(() => {
//     if(message){
//       console.log(message)
//     }
//   }, [message])


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
                  user={investor ? investor : ""}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails 
                  user={investor ? investor : ""}
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
  <InvestorLayout>
    {page}
  </InvestorLayout>
);

export default Page;
