import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyRupeeIcon from '@heroicons/react/24/solid/CurrencyRupeeIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const CustomerMaster = (props) => {
  const { difference, positive = false, sx, value, title, icon, bgColor, font } = props;

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
              {title}
            </Typography>
            <Typography variant={font}>
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: bgColor,
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              {icon}
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

CustomerMaster.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.number.isRequired
};
