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

export const CustomerRemaining = (props) => {
  const { value, sx } = props;
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    if(value){
      setDiff(value.details.netRem*100/value.finance.netAmount)
    }
  }, [value])

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
              Amount Remaining
            </Typography>
            <Typography variant="h4">
              ₹ {value ? value.details.netRem>20 ? value.details.netRem : 0 : 0}
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
            value={diff}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

CustomerRemaining.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
