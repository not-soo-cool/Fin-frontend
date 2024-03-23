import Head from 'next/head';
import { format, subDays, subHours } from 'date-fns';
import { Box, Button, Container, Dialog, Unstable_Grid2 as Grid, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as CustomerLayout } from 'src/layouts/customer/layout';
import { CustomerPrincipal } from 'src/sections/customers/customer/customer-worth';
import { CustomerDown } from 'src/sections/customers/customer/customer-downpay';
import { CustomerRate } from 'src/sections/customers/customer/customer-rate';
import { CustomerBarProfit } from 'src/sections/customers/customer/customer-bar-profit';
import { CustomerPie } from 'src/sections/customers/customer/customer-pie';
import { CustomerPrice } from 'src/sections/customers/customer/customer-prod-price';
import { CustomerMonEMI } from 'src/sections/customers/customer/customer-month-emi';
import { CustomerMonOpted } from 'src/sections/customers/customer/customer-mon-opted';
import { CustomerRemaining } from 'src/sections/customers/customer/customer-remain';
import { CustomerInstalDate } from 'src/sections/customers/customer/customer-instal-date';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { CustomerListInstal } from 'src/sections/customers/customer/customer-list-instal';
import Link from 'next/link';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { getCustomer, getUserInstalments, updateCustomer } from 'src/redux/Actions/AdminActions';
import { loadCustomer } from 'src/redux/Actions/CustomerAction';
import { CustomerFee } from 'src/sections/customers/customer/customer-profees';
import { loadInvestor } from 'src/redux/Actions/InvestorActions';
import { applyPagination } from 'src/utils/apply-pagination';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import { EditCustomer } from 'src/sections/customers/customer/customer-edit';
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

  const dialogSize = 'lg';

  const params = useParams();
  const dispatch = useDispatch();
  const { customer, error } = useSelector(state => state.getCustomer)
  const [isClient, setIsClient] = useState(false);
  const [pie, setPie] = useState(false)
  const [date, setDate] = useState()
  const { isAdminAuthenticated, loading } = useSelector(state => state.adminAuth)
  const {isCustomerAuthenticated, loading: customerLoading} = useSelector(state => state.customerAuth)
  const {isInvestorAuthenticated} = useSelector(state => state.investorAuth)
  const { instalments } = useSelector(state => state.getInstalments)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [instal, setInstal] = useState();

  const [ instalmentList, setInstalmentList ] = useState([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditCustomer = (val) => {
    dispatch(updateCustomer(val.firstName, val.lastName, val.email, val.mob, val.street, val.city, val.state, val.country, val.postal,  val.aadhar, params.id));
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
    if(instalments){
      setInstalmentList(instalments);
    }
  }, [instalments])

  useEffect(() => {
    if(instalmentList){
      setCount(instalmentList.length)
      setInstal(applyPagination(instalmentList, page, rowsPerPage))
    }
  }, [instalmentList, page, rowsPerPage])

  useEffect(() => {
    dispatch(loadCustomer());
    // dispatch(loadInvestor());
    if(params && params.id){
      dispatch(getCustomer(params.id))
      dispatch(getUserInstalments(params.id))
    }
  }, [params, dispatch])

  useEffect(() => {
    if(!customerLoading){
      if(!isCustomerAuthenticated){
        dispatch(loadInvestor())
      }
    }
  }, [customerLoading, dispatch, isCustomerAuthenticated])

  useEffect(() => {
    setIsClient(true);
  }, [isCustomerAuthenticated])


  useEffect(() => {
    if(customer){
      // if(customer.products[0].prod.price!==0){
      //   setRoi(customer.current.prevMonProfit/customer.current.moneyInvest*100)
      // }
      const nextDate = new Date(customer.nextEMIDate);
      const currDate = format(nextDate, "dd/MM/yyyy")
      setDate(currDate);
      if(customer.products[0].finance.netAmount!==0){
        setPie(true);
      }
    }
    if(error){
      toast.error(error, toastOptions)
    }
  }, [customer, error])

  return(
  <>
    <Head>
      <title>
        Customer | Finance Kit
      </title>
    </Head>
    {!customerLoading && 
    (isClient && 
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
            sx={{
              ml: 2.7, mt: -2, mb: 2
            }}
          >
            {!isCustomerAuthenticated && 
            <Link 
              href={ isInvestorAuthenticated ? `/investors/customers` : `/dashboard/customers`} 
              style={{
                textDecoration: 'none'
              }}
            >
              <Button
                variant='contained'
                sx={{backgroundColor: 'rgba(0,0,0,0.4)'}}
              >
              <SvgIcon>
                <ArrowLeftIcon />
              </SvgIcon>
              </Button>
            </Link>}
            <Typography variant="h4">
              {customer ? customer.name : "Customer"}
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
            <CustomerPrice
              difference={12}
              positive
              sx={{ height: '100%' }}
              value={customer ? customer.products[0].prod.price : 0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CustomerDown
              difference={32}
              positive={false}
              sx={{ height: '100%' }}
              value={customer ? customer.products[0].finance.downPay : 0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CustomerPrincipal
              sx={{ height: '100%' }}
              value={customer ? customer.products[0].finance.finAmount : 0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            {isCustomerAuthenticated ? 
              <CustomerFee 
                sx={{ height: '100%' }}
                value={customer ? customer.products[0].finance.proFees : 0}
              />
            :
            <CustomerRate
              sx={{ height: '100%' }}
              value={customer ? customer.products[0].finance.rate : 0}
            />}
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CustomerMonEMI
              difference={12}
              positive
              sx={{ height: '100%' }}
              value={customer ? customer.products[0].finance.emi.toFixed(0) : 0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CustomerRemaining
              sx={{ height: '100%' }}
              value={customer ? customer.products[0] : 0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CustomerMonOpted
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value={customer ? customer.products : 0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CustomerInstalDate
              sx={{ height: '100%' }}
              value={customer ? date : "01/01/2006"}
              complete={customer && customer.amountDue>0 ? false : true}
              // value={customer ? customer.amountDue>0 ? date : "Completed" : "01/01/2006"}
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <CustomerBarProfit
              profits = {customer ? customer.instals : ""}
              sx={{ height: '100%' }}
            />
          </Grid>
          {pie && 
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <CustomerPie
              lifetime={customer ? customer.products[0] : ""}
              chartSeries={[85, 15]}
              labels={['Amount Remaining', 'Amount Paid']}
              sx={{ height: '100%' }}
            />
          </Grid>}
          {instal && instal.length > 0 &&
          <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <CustomerListInstal
              instalments={instalments ? instalments : ""}
              count={count}
              items={instal}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              sx={{ height: '100%' }}
            />
          </Grid>}
        </Grid>
      </Container>
    </Box>)}

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
            <EditCustomer
              customer={customer ? customer : ""}
              onEditCustomer={handleEditCustomer} 
            />
          </Grid>
      </Dialog>
  </>
  )
};

Page.getLayout = (page) => (
  <CustomerLayout>
    {page}
  </CustomerLayout>
);

export default Page;
