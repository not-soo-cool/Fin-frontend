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

export const InvestorListWithdraw = (props) => {
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
      <CardHeader title="Latest Withdrawls" />
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
                      {instal.investor.name}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                      {/* {instal.createdAt} */}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap['received']}>
                        Received
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
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

InvestorListWithdraw.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
