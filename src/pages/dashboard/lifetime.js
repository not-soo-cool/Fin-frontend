import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { LifetimeReceived } from 'src/sections/lifetime/lifetime-received';
import { LifetimeInvested } from 'src/sections/lifetime/lifetime-invested';
import { LifetimeWithdrawl } from 'src/sections/lifetime/lifetime-withdrawl';
import { LifetimeProfit } from 'src/sections/lifetime/lifetime-profit';
import { LifetimeBarProfit } from 'src/sections/lifetime/lifetime-bar-profit';
import { LifetimePie } from 'src/sections/lifetime/lifetime-pie';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadAdmin } from 'src/redux/Actions/AdminActions';

const now = new Date();

const Page = () => {

  const { loading, error, admin, isAuthenticated } = useSelector(state => state.adminAuth);

  // setInterval(() => {
  //   console.log("Okay Bhai")
  // }, 4000)

  return(
  <>
    <Head>
      <title>
        Lifetime | Finance Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <LifetimeReceived
              difference={12}
              positive
              sx={{ height: '100%' }}
              value={admin ? admin.lifetime.moneyTotal : 0}
              prev={admin ? admin.lifetime.prevMoneyTotal : 0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <LifetimeInvested
              sx={{ height: '100%' }}
              value={admin ? admin.lifetime.moneyInvest : 0}
              prev={admin ? admin.lifetime.prevMoneyInvest : 0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <LifetimeWithdrawl
              sx={{ height: '100%' }}
              value={admin ? admin.lifetime.totalWithdrawn : 0}
              prev={admin ? admin.lifetime.moneyTotal : 0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <LifetimeProfit
              sx={{ height: '100%' }}
              value={admin ? admin.lifetime.profit.toFixed(2) : 0}
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <LifetimeBarProfit
              profits={admin ? admin.profits : ""}
              prev={admin ? admin.expectedProfits : ""}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <LifetimePie
              current={admin ? admin.current : ""}
              labels={['Amount Invested', 'Amount Remaining']}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
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
