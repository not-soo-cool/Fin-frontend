import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useEffect, useState } from 'react';

const statusMap = {
  progress: 'warning',
  received: 'success',
  overdue: 'error'
};

export const CustomerListInstal = (props) => {
  const { 
    instalments, 
    orders = [], 
    sx,
    count,
    products = [], 
    page = 0,
    rowsPerPage = 0,
    onPageChange = () => {},
    onRowsPerPageChange,
    items = [], 
  } = props;
  

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Instalments" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Order
                </TableCell>
                <TableCell>
                  Customer
                </TableCell>
                <TableCell sortDirection="desc">
                  Date
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items && items.map((instal) => {
                const date = new Date(instal.createdAt)
                const createdAt = format(date, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={instal._id}
                  >
                    <TableCell>
                      {instal.ID}
                    </TableCell>
                    <TableCell>
                      {instal.customer.name}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      {instal.amount}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap['received']}>
                        Received
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
              {/* {orders.map((order) => {
                const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.ref}
                    </TableCell>
                    <TableCell>
                      {order.customer.name}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })} */}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions> */}
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListInstal.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
