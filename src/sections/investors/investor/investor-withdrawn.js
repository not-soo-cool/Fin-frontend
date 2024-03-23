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

export const InvestorWithdrawn = (props) => {
  const { value, diff, sx } = props;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if(diff){
      setProgress(diff.withdrawn*100/diff.moneyTotal);
    }
  }, [diff])

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
              Total Withdrawn
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
            value={progress}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

InvestorWithdrawn.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
