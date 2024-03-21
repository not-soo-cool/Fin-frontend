import PropTypes from 'prop-types';
import CurrencyRupeeIcon from '@heroicons/react/24/solid/CurrencyRupeeIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const CustomerInstalDate = (props) => {
  const { complete, value, sx } = props;

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
              Next Instal Date
            </Typography>
            {complete ? 
              <Typography
              color={ 'success.main' }
              // variant="body2"
              variant="h5"
              >
                Completed
              </Typography>
            : 
              <Typography variant="h5">
                {value}
              </Typography>
            }
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyRupeeIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

CustomerInstalDate.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
