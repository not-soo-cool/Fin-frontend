import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as InvestorLayout } from 'src/layouts/investor/layout';
import { useDispatch } from 'react-redux';
import { updateInvestorPass } from 'src/redux/Actions/InvestorActions';

const Page = () => {

  const dispatch = useDispatch();

  const handlePass = (val) => {
    dispatch(updateInvestorPass(val.newPass, val.confirmPass));
  }

  return(
  <>
    <Head>
      <title>
        Settings | Finance Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">
            Settings
          </Typography>
          {/* <SettingsNotifications /> */}
          <SettingsPassword 
            onChange={handlePass}
          />
        </Stack>
      </Container>
    </Box>
  </>
)};

Page.getLayout = (page) => (
  <InvestorLayout>
    {page}
  </InvestorLayout>
);

export default Page;
