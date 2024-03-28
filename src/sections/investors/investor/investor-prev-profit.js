import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyRupeeIcon from '@heroicons/react/24/solid/CurrencyRupeeIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const InvestorPrevProfit = (props) => {
  const { difference, sx, value } = props;
  const [diff, setDiff] = useState(0);
  const [positive, setPositive] = useState(false);

  useEffect(() => {
    if(difference && value){
      if(value - difference > 0){
        setPositive(true);
        setDiff((value*100/difference - 100).toFixed(2));
      } else {
        setDiff((100 - value*100/difference).toFixed(2));
      }
    }
  }, [difference, value])

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
              Curr Month Profit
            </Typography>
            <Typography variant="h4">
              ₹ {value ? value : 0}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyRupeeIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
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
                {diff}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Since last month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

InvestorPrevProfit.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.number,
  sx: PropTypes.object
};

