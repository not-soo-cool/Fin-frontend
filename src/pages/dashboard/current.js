import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { CurrentInvested } from 'src/sections/current/current-invested';
import { CurrentRemain } from 'src/sections/current/current-rem';
import { CurrentMonInstal } from 'src/sections/current/current-mon-instal';
import { CurrentProfit } from 'src/sections/current/current-profit';
import { CurrentBarInstal } from 'src/sections/current/current-bar-instal';
import { CurrentPie } from 'src/sections/current/current-pie';
import { CurrentDueUsers } from 'src/sections/current/current-due-users';
import { CurrentListInstal } from 'src/sections/current/current-list-instal';
import { useDispatch, useSelector } from 'react-redux';
import { useSelection } from 'src/hooks/use-selection';
import { useCallback, useEffect, useState } from 'react';
import { dueUsers, getInstalments, loadAdmin } from 'src/redux/Actions/AdminActions';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();

const useCustomerIds = (customers) => {
  return customers.map((customer) => customer._id);
};

const Page = () => {

  const [ isClient, setIsClient ] = useState(false);

  const dispatch = useDispatch();
  const { admin } = useSelector(state => state.adminAuth);
  const { users } = useSelector(state => state.dueUsers);
  const { instalments } = useSelector(state => state.getInstalments);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dueCustomers, setDueCustomers] = useState();
  const [isDueCustomers, setIsDueCustomers] = useState(false);
  const [isInstal, setIsInstal] = useState(false);

  const [instalPage, setInstalPage] = useState(0);
  const [instalRowsPerPage, setInstalRowsPerPage] = useState(5);
  const [instal, setInstal] = useState();

  const [ customersList, setCustomersList ] = useState([]);
  const [count, setCount] = useState(0);

  const [ instalmentList, setInstalmentList ] = useState([]);
  const [inCount, setInCount] = useState(0);

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

  const handleInPageChange = useCallback(
    (event, value) => {
      setInstalPage(value);
    },
    []
  );

  const handleInRowsPerPageChange = useCallback(
    (event) => {
      setInstalRowsPerPage(event.target.value);
    },
    []
  );

  useEffect(()=> {
    if(users){
      setCustomersList(users);
    }
  }, [users])

  useEffect(() => {
    if(customersList){
      setCount(customersList.length)
      setDueCustomers(applyPagination(customersList, page, rowsPerPage))
    }
  }, [customersList, page, rowsPerPage])

  useEffect(()=> {
    if(instalments){
      setInstalmentList(instalments);
    }
  }, [instalments])

  useEffect(() => {
    if(instalmentList){
      setInCount(instalmentList.length)
      setInstal(applyPagination(instalmentList, instalPage, instalRowsPerPage))
    }
  }, [instalmentList, instalPage, instalRowsPerPage])

  setInterval(() => {
    dispatch(dueUsers());
  }, 24*60*60*1000)

  useEffect(() => {
    if(users){
      if(users.length > 0){
        setIsDueCustomers(true)
      }
    }
    if(instalments){
      if(instalments.length > 0){
        setIsInstal(true)
      }
    }
  }, [users, instalments])

  useEffect(() => {
    // dispatch(loadAdmin());
    setIsClient(true)
    dispatch(dueUsers());
    dispatch(getInstalments());
  }, [isClient, dispatch])


  return(
  <>
    <Head>
      <title>
        Current | Finance Kit
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CurrentInvested
              difference={12}
              positive
              sx={{ height: '100%' }}
              value={admin ? admin.current.activeInvest : 0}
              prev={admin ? admin.current.prevActiveInvest : 0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CurrentRemain
              sx={{ height: '100%' }}
              value={admin ? admin.current.moneyRem : 0}
              prev={admin ? admin.current.prevMoneyRem : 0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CurrentMonInstal
              sx={{ height: '100%' }}
              value={admin ? admin.receivedInstal : 0}
              prev={admin ? admin.expectedInstal : 0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CurrentProfit
              sx={{ height: '100%' }}
              value={admin ? admin.current.activeProfit.toFixed(2) : 0}
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <CurrentBarInstal
              // admin={admin ? admin : ""}
              receivedInstal = {admin ? admin.receivedInstal : ""}
              expectedInstal = {admin ? admin.expectedInstal : ""}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <CurrentPie
              current = {admin ? admin.current : ""}
              chartSeries={[63, 15, 22]}
              labels={['Invested', 'Profit']}
              sx={{ height: '100%' }}
            />
          </Grid>
          {isDueCustomers && 
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <CurrentDueUsers
              users={users ? users : ""}
              count={count}
              items={dueCustomers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Healthcare Erbology',
                  updatedAt: subHours(now, 6).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Makeup Lancome Rouge',
                  updatedAt: subDays(subHours(now, 8), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Skincare Soja CO',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Makeup Lipstick',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Healthcare Ritual',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>}
          {isInstal && 
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <CurrentListInstal
              instalments={instalments ? instalments : ""}
              count={inCount}
              items={instal}
              onPageChange={handleInPageChange}
              onRowsPerPageChange={handleInRowsPerPageChange}
              page={instalPage}
              rowsPerPage={instalRowsPerPage}
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
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
