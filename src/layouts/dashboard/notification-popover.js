import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Button, Divider, MenuItem, MenuList, Popover, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotifications, loadAdmin } from 'src/redux/Actions/AdminActions';

export const NotificationPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  // const router = useRouter();
  const dispatch = useDispatch()
  const { isAdminAuthenticated } = useSelector(state => state.adminAuth)
  const { notifications, loading } = useSelector(state => state.getNotifications)
  const [noti, setNoti] = useState()

  const[mon, setMon] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])


  useEffect(() => {
    dispatch(loadAdmin());
  }, [dispatch])

  useEffect(() => {
    if(isAdminAuthenticated){
      dispatch(getAllNotifications());
    }
  }, [isAdminAuthenticated, dispatch])

  useEffect(() => {
    if(notifications){
      setNoti(notifications)
      console.log("Kuchh: ", notifications)
    }
  }, [notifications])


  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 300, maxHeight: 500 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Notifications
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {/* <Button
            fullWidth
            variant="text"
            onClick={handleRoute}
          >
            {user ? user.name : ""}
          </Button> */}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          },
        }}
      >
        {noti && noti.map((notification, index) => {
          let msg;
          const date = new Date(notification.createdAt)
          const daye = date.getDate()
          const day = (daye===1 || daye===21 || daye===31) ? `${daye}st` : (daye===2 || daye===22) ? `${daye}nd` : (daye===3 || daye===23) ? `${daye}rd` : `${daye}th`
          const month = mon[date.getMonth()]
          const year = date.getFullYear()
          const isPm = (date.getHours()>11) ? true : false
          const hour = isPm ? date.getHours()===12 ? 12 : date.getHours()-12 : date.getHours()===0 ? 12 : date.getHours()
          const min = date.getMinutes()
          const pm = isPm ? "Pm" : "Am"
          if(notification.notName === "Instalment Added"){
            msg = `${notification.name} added instalment of ${notification.amount} for ${notification.month}, ${notification.year} on ${day} ${month} ${year} at ${hour}:${min}${pm}`
          } else if(notification.notName === "Customer Added"){
            msg = `${notification.name} bought ${notification.custInfo} with ${notification.amount} as finance amount on ${day} ${month} ${year} at ${hour}:${min}${pm}`
          } else if(notification.notName === "Investor Added"){
            msg = `${notification.name} invested ${notification.amount} on ${day} ${month} ${year} at ${hour}:${min}${pm}`
          } else if(notification.notName === "Withdrawl Added"){
            msg = `${notification.name} withdrew ${notification.amount} on ${day} ${month} ${year} at ${hour}:${min}${pm}`
          }


          return(
          <>
            <MenuItem sx={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
              whiteSpace: 'pre-wrap'
            }}>
              {msg}
              {/* {notification.notName === "Instalment Added" ? <>{notification.name} added instalment of {notification.amount} for {notification.month}, {notification.year} on {day} {month} {year} at {hour}:{min}{pm}</> : notification.notName === "Customer Added" ? `${notification.name} bought ${notification.custInfo} with ${notification.amount} as finance amount on ${day} ${month} ${year} at ${hour}:${min}${pm}` : notification.notName === "Investor Added" ? `${notification.name} invested ${notification.amount} on ${day} ${month} ${year} at ${hour}:${min}${pm}` : `${notification.name} withdrew ${notification.amount} on ${day} ${month} ${year} at ${hour}:${min}${pm}`} */}
            </MenuItem>

            <Divider />
          </>
        )})}
        {/* <MenuItem>
          Sign out
        </MenuItem> */}
      </MenuList>
      <Typography
          color="text.secondary"
          variant="body2"
        >
          <Button
            fullWidth
            // variant="text"
          >
            View All
          </Button>
        </Typography>
    </Popover>
  );
};

NotificationPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
