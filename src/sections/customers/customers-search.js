import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import FunnelIcon from '@heroicons/react/24/solid/FunnelIcon';
import { Button, Card, Grid, InputAdornment, OutlinedInput, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const status = [
  {
    value: 'All',
    label: 'All'
  },
  {
    value: 'Completed',
    label: 'Completed'
  },
  {
    value: 'Started',
    label: 'Not Started'
  },
  {
    value: 'Progress',
    label: 'In Progress'
  },
];

export const CustomersSearch = (props) => {

  const [ search, setSearch ] = useState("")
  const [stat, setStat] = useState("All")

  const handleChange = (e) => {
    setSearch(e.target.value)
    props.onSearch(e.target.value);
  }

  const handleSelect = (e) => {
    setStat(e.target.value)
    console.log("val: ", e.target.value)
    props.onSelect(e.target.value);
  }

  return(
    <Card sx={{ p: 2, pr: 8 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
      >
        <OutlinedInput
          value={search}
          name='search'
          onChange={handleChange}
          fullWidth
          placeholder="Search customer"
          startAdornment={(
            <InputAdornment position="start">
              <SvgIcon
                color="action"
                fontSize="small"
              >
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          )}
          sx={{ maxWidth: 500 }}
        />

        <Stack
          direction="row"
          alignItems="center"
          spacing={4}
        >
          <Typography variant='h6'>
            Status: 
          </Typography>

            <TextField
              name="status"
              onChange={handleSelect}
              select
              SelectProps={{ native: true }}
              value={stat}
              sx={{ width: "100%", maxWidth: 200}}
            >
              {status.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </TextField>

        </Stack>
        {/* <Button
          color="inherit"
          startIcon={(
            <SvgIcon fontSize="small">
              <FunnelIcon />
            </SvgIcon>
          )}
        >
          Export
        </Button> */}

      </Stack>
    </Card>
  )
};
