import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AppSnackBarState, LoginState } from '../misc/types';
import AppSnackBar from './AppSnackBar';

function LoginPage(props: { appSnackBarState: AppSnackBarState, loginState: LoginState, onClickLogin: (providedApiKey: string) => Promise<void> }) {
  const [providedText, setProvidedText] = useState('');
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">API key required</Typography>
      <Typography>To access and use Sentry, you need to provide a valid API key.</Typography>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextField fullWidth style={{ marginTop: '1rem' }} id="outlined-basic" label="Your API Key" variant="outlined" onChange={(e) => setProvidedText(e.target.value)} />
        </Grid>
        <Grid item xs={3}>
          <Button style={{ marginTop: '1rem', height: '56px' }} fullWidth variant="contained" onClick={() => props.onClickLogin(providedText)} disabled={props.loginState.isLoading}>Login</Button>
        </Grid>
      </Grid>
      <AppSnackBar appSnackBarState={props.appSnackBarState} />
    </Box>
  );
}

export default LoginPage;
