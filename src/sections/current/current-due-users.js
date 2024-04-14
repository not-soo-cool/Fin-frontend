import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  TablePagination
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const CurrentDueUsers = (props) => {
  const { 
    users, 
    sx,
    count,
    products = [], 
    page = 0,
    rowsPerPage = 0,
    onPageChange = () => {},
    onRowsPerPageChange,
    items = [],
  } = props;
  const [months, setMonths] = useState([
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct", "Nov", "Dec"
  ]);
  

  return (
    <Card sx={sx}>
      {/* <Scrollbar> */}
        <CardHeader title="After Due Users" />
        <List>
          {items && items.map((user, index) => {
            const hasDivider = index < items.length - 1;
            // const days = formatDistanceToNow(currDate, user.nextEMIDate);
            const userDate = new Date(user.nextEMIDate);
            const date = userDate.getDate();
            const month = months[userDate.getMonth()];
            const year = userDate.getFullYear();

            return (
              <ListItem
                divider={hasDivider}
                key={user._id}
              >
                <Link href={`/customers/${user._id}`} style={{
                  textDecoration: 'none',
                  color: 'black'
                }}>
                  <ListItemAvatar>
                    {
                      products[0].image
                        ? (
                          <Box
                            component="img"
                            src={products[0].image}
                            sx={{
                              borderRadius: 1,
                              height: 48,
                              width: 48
                            }}
                          />
                        )
                        : (
                          <Box
                            sx={{
                              borderRadius: 1,
                              backgroundColor: 'neutral.200',
                              height: 48,
                              width: 48
                            }}
                          />
                        )
                    }
                  </ListItemAvatar>
                </Link>
                <ListItemText
                  primary={user.name}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                  secondary={`₹ ${user.netNextEMI} due since ${date}th ${month}, ${year}`}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
                <IconButton edge="end">
                  <SvgIcon>
                    <EllipsisVerticalIcon />
                  </SvgIcon>
                </IconButton>
              </ListItem>
            );
          })}
        </List>
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

CurrentDueUsers.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
