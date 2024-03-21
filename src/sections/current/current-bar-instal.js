import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';
import { useEffect, useState } from 'react';

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const CurrentBarInstal = (props) => {
  const { receivedInstal, expectedInstal, admin, sx } = props;
  const chartOptions = useChartOptions();

  const [ index, setIndex ] = useState(0);
  const [ bar, setBar ] = useState([]);
  const [ year, setYear ] = useState(2021); 

  const handleLeftClick = () => {
    setBar([{ name: 'Received Instalments', data: receivedInstal[index-1].month }, { name: 'Expected Instalments', data: expectedInstal[index-1].month }]);
    setIndex(prevIndex => prevIndex-1);
    setYear(prevYear => prevYear-1);
  }

  const handleRightClick = () => {
    setBar([{ name: 'Received Instalments', data: receivedInstal[index+1].month }, { name: 'Expected Instalments', data: expectedInstal[index+1].month }]);
    setIndex(prevIndex => prevIndex+1);
    setYear(prevYear => prevYear+1)
  }

  useEffect(() => {
    if(receivedInstal && expectedInstal){
      setBar([{ name: 'Received Instalments', data: receivedInstal[index].month }, { name: 'Expected Instalments', data: expectedInstal[index].month }]);
    }
  }, [receivedInstal, expectedInstal])

  return (
    <Card sx={sx}>
      <CardHeader
        action={(
          <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            )}
          >
            Sync
          </Button>
        )}
        title="Instalments"
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          // series={chartSeries}
          series={bar}
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowLeftIcon />
            </SvgIcon>
          )}
          size="small"
          disabled={index===0}
          onClick={handleLeftClick}
        />

        {year}
        
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          disabled={index+1===receivedInstal.length}
          onClick={handleRightClick}
        />
        {/* </Button> */}
      </CardActions>
    </Card>
  );
};

CurrentBarInstal.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
