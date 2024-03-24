import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import FunnelIcon from '@heroicons/react/24/solid/FunnelIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, CardContent, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, SvgIcon, TextField, Typography, useMediaQuery } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { CustomersSearch } from 'src/sections/customers/customers-search';
import { CustomersTable } from 'src/sections/customers/customers-table';
import { AddCustomers } from 'src/sections/customers/customers-add';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer, addInstalment, getAllCustomers, getAllInvestors } from 'src/redux/Actions/AdminActions';
import { toast } from 'react-toastify';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    phone: '712-351-5711'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@devias.io',
    name: 'Jie Yan Song',
    phone: '770-635-2682'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@devias.io',
    name: 'Anika Visser',
    phone: '908-691-3242'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'miron.vitold@devias.io',
    name: 'Miron Vitold',
    phone: '972-333-4106'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'penjani.inyene@devias.io',
    name: 'Penjani Inyene',
    phone: '858-602-3409'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'omar.darobe@devias.io',
    name: 'Omar Darobe',
    phone: '415-907-2647'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798  Hickory Ridge Drive'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'siegbert.gottfried@devias.io',
    name: 'Siegbert Gottfried',
    phone: '702-661-1654'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934  Wildrose Lane'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'iulia.albu@devias.io',
    name: 'Iulia Albu',
    phone: '313-812-8947'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road'
    },
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: 'nasimiyu.danai@devias.io',
    name: 'Nasimiyu Danai',
    phone: '801-301-7894'
  }
];

const getCustomerIds = (customers) => {
  return customers.map((customer) => customer._id);
};

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

  const [ isClient, setIsClient ] = useState(false);

  const dialogSize = 'lg';

  const dispatch = useDispatch();
  const { customers } = useSelector(state => state.getCustomers)
  const { investors } = useSelector(state => state.getInvestors)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customersAv, setCustomersAv] = useState();
  const [customersIds, setCustomersIds] = useState();
  const customersSelection = useSelection(customersIds);

  const [ customersList, setCustomersList ] = useState([]);
  const [count, setCount] = useState(0);
  const [combine, setCombine] = useState();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const { message, error } = useSelector(state => state.customers)
  const { message: instalMessage, error: instalError } = useSelector(state => state.addInstalments)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleData = (values) => {
    dispatch(addCustomer(values.firstName, values.lastName, values.email, values.mob, values.street, values.city, values.state, values.country, values.postal, values.dob, values.gender, values.aadhar, values.emiDate, values.guarantorName, values.guarantorAdd, values.guarantorPh, values.prodName, values.prodPrice, values.downPay, values.finAmount, values.mon, values.roi, values.invEmail))
    setOpen(false);
  }

  const handleInstal = (val) => {
    dispatch(addInstalment(val.email, val.month, val.year, val.amount))
    setOpen(false);
    dispatch(getAllCustomers())
  }

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleSearch = (val) => {
    const searches = customers.filter(item => item.name.toLowerCase().includes(val.toLowerCase()));
    const streetSearch = customers.filter(item => item.address.street.toLowerCase().includes(val.toLowerCase()));
    const emailSearch = customers.filter(item => item.email.toLowerCase().includes(val.toLowerCase()));
    const phoneSearch = customers.filter(item => {
      const mobString = String(item.mob);
      return mobString.toLowerCase().includes(val.toLowerCase());
    })
    const combined = [...new Set([...streetSearch, ...searches, ...emailSearch, ...phoneSearch, ...phoneSearch])]
    setCombine(combined);
    setCount(combined.length)
    setCustomersList(combined);
    setCustomersIds(getCustomerIds(combined));
    setCustomersAv(applyPagination(combined, page, rowsPerPage))
  }

  const handleSelect = (val) => {
    let selects, combined;
    if(val === 'All'){
      combined = combine

    } else if(val === 'Completed'){
      combined = combine.filter(item => item.amountDue === 0)

    } else if(val === 'Progress'){
      selects = combine.filter(item => item.amountDue !== 0)
      combined = selects.filter(item => item.inProgress === true)

    } else {
      combined = combine.filter(item => item.inProgress === false)
    }

    setCount(combined.length)
    setCustomersList(combined);
    setCustomersIds(getCustomerIds(combined));
    setCustomersAv(applyPagination(combined, page, rowsPerPage))
    
  }

  useEffect(()=> {
    if(customers){
      setCustomersList(customers);
      setCombine(customers);
    }
  }, [customers])

  useEffect(() => {
    if(customersList){
      setCount(customersList.length)
      setCustomersIds(getCustomerIds(customersList));
      setCustomersAv(applyPagination(customersList, page, rowsPerPage))
    }
  }, [customersList, page, rowsPerPage])

  useEffect(() => {
    setIsClient(true);
    dispatch(getAllCustomers())
    dispatch(getAllInvestors())
  }, [isClient, dispatch])

  useEffect(() => {
    if(message){
      toast.success(message, toastOptions);
      dispatch({type: "clearMessage"});
      dispatch(getAllCustomers())
      dispatch(getAllInvestors())
    }
    if(error){
      toast.error(error, toastOptions);
      dispatch({type: "clearErrors"});
    }
    if(instalMessage){
      toast.success(instalMessage, toastOptions);
      dispatch({type: "clearMessage"});
      dispatch(getAllCustomers())
    }
    if(instalError){
      toast.error(instalError, toastOptions);
      dispatch({type: "clearErrors"});
    }
  }, [message, error, instalMessage, instalError, dispatch, toastOptions])


  return (
    <>
      <Head>
        <title>
          Customers | Finance Kit
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
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Customers
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button 
                  onClick={handleClickOpen}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {/* <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            > */}
              <CustomersSearch onSearch={handleSearch} onSelect={handleSelect}/>

              {/* <Button
                color="inherit"
                startIcon={(
                  <SvgIcon fontSize="small">
                    <FunnelIcon />
                  </SvgIcon>
                )}
              >
                Export
              </Button> */}

            {/* </Stack> */}
            {customers && 
            <CustomersTable
              customers={customers}
              count={count}
              items={customersAv}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
              progress={progress}
            />}
          </Stack>
        </Container>
      </Box>
      }

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
            <AddCustomers 
              customers={customers}
              investors={investors}
              onAddCustomerData={handleData} 
              onAddInstal={handleInstal}
            />
          </Grid>
        
      </Dialog>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
