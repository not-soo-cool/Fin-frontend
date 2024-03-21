import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

export const LifetimeWithdrawl = (props) => {
  const { value, sx, prev } = props;

  const [difference, setDifference] = useState(0)
  
  useEffect(() => {
    const diff = value*100/prev;
    setDifference(diff);
  }, [value, prev])

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Total Withdrawl
            </Typography>
            <Typography variant="h4">
              ₹ {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress
            value={difference}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

LifetimeWithdrawl.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
