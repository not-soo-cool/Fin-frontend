import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  progress: 'warning',
  completed: 'success',
  toStart: 'error'
};

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    customers,
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  // const openCustomer = (val) => {
  //   console.log(`Opening Customer ${val}`)
  // }

  const [ avt, setAvt ] = useState('/assets/avatars/avatar-siegbert-gottfried.png')


  return (
    <Card >
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table >
            <TableHead>
              <TableRow >
                <TableCell padding="checkbox" >
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  EMI Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {items && items.map((customer, index) => {
                const isSelected = selected.includes(customer._id);
                const date = new Date(customer.nextEMIDate)
                const instalDate = format(date, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={customer._id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox" >
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer._id);
                          } else {
                            onDeselectOne?.(customer._id);
                          }
                        }}
                      />
                    </TableCell>
                      <TableCell 
                        sx={{
                          '&:hover': {
                            cursor: 'pointer'
                          }
                        }}
                      // onClick = {() => openCustomer(customer.id)}
                      >
                        <Link href={`/customers/${customer._id}`} style={{
                          textDecoration: 'none',
                          color: 'black'
                        }}>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Avatar src={avt}>
                              {getInitials(customer.name)}
                            </Avatar>
                            <Typography variant="subtitle2">
                              {customer.name}
                            </Typography>
                          </Stack>
                        </Link>
                      </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.address.street}, {customer.address.city}, {customer.address.state}
                    </TableCell>
                    <TableCell>
                      {customer.mob}
                    </TableCell>
                    <TableCell>
                      {customer.amountDue === 0 ? 
                        <SeverityPill color={  statusMap['completed']}>
                        {"Completed"}
                      </SeverityPill> :
                      instalDate}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={ customer.amountDue === 0 ? statusMap['completed'] : customer.inProgress ? statusMap['progress'] : statusMap['toStart']}>
                        {customer.amountDue === 0 ? "Completed" : customer.inProgress ? "In Progress" : "Not Started"}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
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

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
