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

export const InvestorsTable = (props) => {
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
    investors
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const openInvestor = (val) => {
    console.log(`Opening Investor ${val}`)
  }

  const [ avt, setAvt ] = useState('/assets/avatars/avatar-iulia-albu.png')

  // useEffect(() => {
  //   console.log(props)
  // }, [props])


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
                  Bank Balance
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {items && items.map((investor) => {
                const isSelected = selected.includes(investor._id);
                const date = new Date(investor.createdAt)
                const createdAt = format(date, 'dd/MM/yyyy');
                return (
                  <TableRow
                    hover
                    key={investor._id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox" >
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(investor._id);
                          } else {
                            onDeselectOne?.(investor._id);
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
                      onClick = {() => openInvestor(investor._id)}>
                        <Link href={`/investors/${investor._id}`} style={{
                          textDecoration: 'none',
                          color: 'black'
                        }}>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Avatar src={avt}>
                              {getInitials(investor.name)}
                            </Avatar>
                            <Typography variant="subtitle2">
                              {investor.name}
                            </Typography>
                          </Stack>
                        </Link>
                      </TableCell>
                    <TableCell>
                      {investor.email}
                    </TableCell>
                    <TableCell>
                      {investor.address.city}, {investor.address.state}, {investor.address.country}
                    </TableCell>
                    <TableCell>
                      {investor.mob}
                    </TableCell>
                    <TableCell>
                      {/* {createdAt} */}
                      {investor.current.moneyRem}
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

InvestorsTable.propTypes = {
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
