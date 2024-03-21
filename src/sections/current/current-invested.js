import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyRupeeIcon from '@heroicons/react/24/solid/CurrencyRupeeIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const CurrentInvested = (props) => {
  const { sx, value, prev } = props;

  const [difference, setDifference] = useState(0)
  const [positive, setPositive] = useState(false);
  
  useEffect(() => {
    const diff = (value*100/prev - 100).toFixed(0);
    if(diff >= 0){
      setDifference(diff);
      setPositive(true)
    } else{
      setDifference(-diff);
      setPositive(false)
    }
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
              variant="overline"
            >
              Active Invested
            </Typography>
            <Typography variant="h4">
              ₹ {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyRupeeIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {/* {difference && ( */}
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Since last month
            </Typography>
          </Stack>
        {/* )} */}
      </CardContent>
    </Card>
  );
};

CurrentInvested.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.number.isRequired
};
