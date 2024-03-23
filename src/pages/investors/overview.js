import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid, SvgIcon, Typography } from '@mui/material';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Layout as InvestorLayout } from 'src/layouts/investor/layout';
import { InvestorWorth } from 'src/sections/investors/investor/investor-worth';
import { InvestorWithdrawn } from 'src/sections/investors/investor/investor-withdrawn';
import { InvestorProfit } from 'src/sections/investors/investor/investor-profit';
import { InvestorBarProfit } from 'src/sections/investors/investor/investor-bar-profit';
import { InvestorPie } from 'src/sections/investors/investor/investor-pie';
import { InvestorInvested } from 'src/sections/investors/investor/investor-total-invested';
import { InvestorCurrInvested } from 'src/sections/investors/investor/investor-curr-invested';
import { InvestorPrevProfit } from 'src/sections/investors/investor/investor-prev-profit';
import { InvestorBank } from 'src/sections/investors/investor/investor-percent';
import { InvestorAvailable } from 'src/sections/investors/investor/investor-available';
import { Stack } from '@mui/system';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvestor } from 'src/redux/Actions/AdminActions';
import { loadInvestor } from 'src/redux/Actions/InvestorActions';
import { toast } from 'react-toastify';

const now = new Date();

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

//   const params = useParams();
  const dispatch = useDispatch();
  const { investor, error } = useSelector(state => state.investorAuth)
  const [isClient, setIsClient] = useState(false);
  const [roi, setRoi] = useState(0);
  const [pie, setPie] = useState(false)

//   useEffect(() => {
//     if(params && params.id){
//       dispatch(getInvestor(params.id))
//     }
//   }, [params, dispatch])

  useEffect(() => {
    setIsClient(true);
    dispatch(loadInvestor());
  }, [dispatch])


  useEffect(() => {
    if(investor){
      if(investor.current.moneyInvest!==0){
        setRoi(investor.current.prevMonProfit/investor.current.moneyInvest*100)
      }
      if(investor.lifetime.moneyInvest!==0 || investor.lifetime.profit!==0){
        setPie(true);
      }
    }
    if(error){
      toast.error(error, toastOptions)
    }
  }, [investor, error])

  return(
    <>
      <Head>
        <title>
          Investor | Finance Kit
        </title>
      </Head>
      {isClient && 
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            alignItems='center'
            spacing={4}
            sx={{
                ml: 2.7, mt: -2, mb: 2
            }}
          >
            {/* <Link href={`/dashboard/investors`} style={{
              textDecoration: 'none'
            }}>
              <SvgIcon>
                <ArrowLeftIcon />
              </SvgIcon>
            </Link> */}
            <Typography variant="h4">
              {investor ? investor.name : "Investor"}
            </Typography>
          </Stack>     
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <InvestorInvested
                difference={12}
                positive
                sx={{ height: '100%' }}
                value={investor ? investor.lifetime.moneyTotal : 0}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <InvestorWorth
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value={investor ? investor.lifetime.moneyTotal + investor.lifetime.profit : 0}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <InvestorWithdrawn
                sx={{ height: '100%' }}
                value={investor ? investor.lifetime.withdrawn : 0}
                diff = {investor ? investor.lifetime : 0}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <InvestorProfit
                sx={{ height: '100%' }}
                value={investor ? investor.lifetime.moneyTotal : 0}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <InvestorCurrInvested
                difference={12}
                positive
                sx={{ height: '100%' }}
                value={investor ? investor.current.moneyInvest : 0}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <InvestorPrevProfit
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value={investor ? investor.current.prevMonProfit : 0}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <InvestorBank
                sx={{ height: '100%' }}
                value={roi}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <InvestorAvailable
                sx={{ height: '100%' }}
                value={investor ? investor.current.moneyRem : 0}
              />
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <InvestorBarProfit
                profits = {investor ? investor.profits : ""}
                sx={{ height: '100%' }}
              />
            </Grid>
            {pie && 
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <InvestorPie
                lifetime={investor ? investor.lifetime : ""}
                chartSeries={[85, 15]}
                labels={['Amount Invested', 'Profit Earned']}
                sx={{ height: '100%' }}
              />
            </Grid>}
          </Grid>
        </Container>
      </Box>}
    </>
  )
};

Page.getLayout = (page) => (
  <InvestorLayout>
    {page}
  </InvestorLayout>
);

export default Page;
