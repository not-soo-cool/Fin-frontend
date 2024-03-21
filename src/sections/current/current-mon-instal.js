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

export const CurrentMonInstal = (props) => {
  const { value, sx, prev } = props;

  const [difference, setDifference] = useState()
  const [val, setVal] = useState(0)
  
  useEffect(() => {
    if(value && prev){
      const date = new Date();
      const mon = date.getMonth();
      const year = date.getFullYear();
      const curr = value[Number(year)-2023].month[mon]
      setVal(curr);
      const pre = prev[Number(year)-2023].month[mon]
      const diff = (curr*100/pre).toFixed(0);
      setDifference(diff);
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
              gutterBottom
              variant="overline"
            >
              Current Month Instalments
            </Typography>
            <Typography variant="h4">
              ₹ {val}
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

CurrentMonInstal.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
