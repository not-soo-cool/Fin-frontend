import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Button, Container, Dialog, Unstable_Grid2 as Grid, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
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
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvestor, getUserWithdrawls, loadAdmin, updateAdInvestor } from 'src/redux/Actions/AdminActions';
import { InvestorListWithdraw } from 'src/sections/investors/investor/investor-withdraw-list';
import { applyPagination } from 'src/utils/apply-pagination';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import { EditInvestor } from 'src/sections/investors/investor/investor-edit';


const Page = () => {

  const dialogSize = 'lg';

  const params = useParams();
  const dispatch = useDispatch();
  const { investor, error } = useSelector(state => state.getInvestor)
  const { isAdminAuthenticated, loading } = useSelector(state => state.adminAuth)
  const { withdrawls } = useSelector(state => state.getWithdrawls)
  const [isClient, setIsClient] = useState(false);
  const [roi, setRoi] = useState(0);
  const [pie, setPie] = useState(false)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [avWithdrawls, setAvWithdrawls] = useState();
  const [ withdrawlsList, setWithdrawlsList ] = useState([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditInvestor = (val) => {
    dispatch(updateAdInvestor(val.firstName, val.lastName, val.email, val.mob, val.street, val.city, val.state, val.country, val.postal,  val.aadhar, params.id));
    setOpen(false);
  }

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  useEffect(()=> {
    if(withdrawls){
      setWithdrawlsList(withdrawls);
    }
  }, [withdrawls])

  useEffect(() => {
    if(withdrawlsList){
      setCount(withdrawlsList.length)
      setAvWithdrawls(applyPagination(withdrawlsList, page, rowsPerPage))
    }
  }, [withdrawlsList, page, rowsPerPage])

  useEffect(() => {
    if(params && params.id){
      dispatch(getInvestor(params.id))
      dispatch(getUserWithdrawls(params.id))
    }
  }, [params, dispatch])

  useEffect(() => {
    setIsClient(true);
    dispatch(loadAdmin());
  }, [])


  useEffect(() => {
    if(investor){
      if(investor.current.currMoney!==0){
        setRoi(Number(investor.current.currMonProfit*100/investor.current.currMoney).toFixed(2))
      }
      if(investor.lifetime.moneyInvest!==0 || investor.lifetime.profit!==0){
        setPie(true);
      }

    }
  }, [investor])

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
            justifyContent="space-between"
            spacing={4}
          >
            <Stack
              direction="row"
              alignItems='center'
              spacing={4}
            >
              <Link href={`/dashboard/investors`} style={{
                textDecoration: 'none'
              }}>
                <Button
                  variant='contained'
                  sx={{backgroundColor: 'rgba(0,0,0,0.4)'}}
                >
                  <SvgIcon>
                    <ArrowLeftIcon />
                  </SvgIcon>
                </Button>
              </Link>
              <Typography variant="h4">
                {investor ? investor.name : "Investor"}
              </Typography>
            </Stack> 
            {!loading && isAdminAuthenticated && 
            <div>
              <Button 
                onClick={handleClickOpen}
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PencilIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Edit
              </Button>
            </div>}
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
                value={investor ? (investor.lifetime.moneyTotal + investor.lifetime.profit).toFixed(2) : 0}
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
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <InvestorProfit
                sx={{ height: '100%' }}
                value={investor ? investor.lifetime.profit.toFixed(2) : 0}
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
                value={investor ? investor.current.currMoney.toFixed(0) : 0}
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
                value={investor ? investor.current.currMonProfit.toFixed(0) : 0}
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
            <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <InvestorListWithdraw
              // instalments={instalments ? instalments : ""}
              count={count}
              items={avWithdrawls}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              sx={{ height: '100%' }}
            />
          </Grid>
          </Grid>
        </Container>
      </Box>}

      <Dialog 
        open={open}
        onClose={handleClose}
        maxWidth={dialogSize}
      >
          <Grid item
            xs={12}
            md={4}
            lg={8}
          >
            <EditInvestor
              investor={investor ? investor : ""}
              onEditInvestor={handleEditInvestor} 
              // onWithdraw={handleWithdraw}
            />
          </Grid>
      </Dialog>
    </>
  )
};

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Page;
