import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyRupeeIcon from '@heroicons/react/24/solid/CurrencyRupeeIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const CustomerMonOpted = (props) => {
  const { difference, positive = false, sx, value } = props;
  
  const [mon, setMon] = useState(0);
  const [monComp, setMonComp] = useState(0);
  const [monRem, setMonRem] = useState(0);

  const getMonths = (arr) => {
    let val = 0;
    arr.forEach(elem => {
      if(elem.details.monRem === monRem){
        if(elem.finance.month > mon){
          setMon(elem.finance.month)
          setMonComp(elem.details.monComp);
        }
      }
      if(elem.details.monRem > val){
        setMon(elem.details.monRem + elem.details.monComp)
        setMonRem(elem.details.monRem)
        setMonComp(elem.details.monComp)
      }
    });
  }

  useEffect(() => {
    if(value && value.length > 0){
      getMonths(value);
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
              variant="overline"
            >
              Months Opted
            </Typography>
            <Typography variant="h4">
              {mon} Months
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
              {/* <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon> */}
              <Typography
                color={ 'success.main' }
                variant="body2"
              >
                {monComp} Completed
              </Typography>
            </Stack>
            <Typography
              color='error.main'
              variant="caption"
            >
              {monRem} Remaining
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

CustomerMonOpted.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};

