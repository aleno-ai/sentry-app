import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { LoginState } from '../misc/types';

function LoginDialog(props: { loginState: LoginState, onClickLogin: (providedApiKey: string) => Promise<void> }) {
  const [providedText, setProvidedText] = useState('');
  return (
    <Dialog
      open={!props.loginState.connected}
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Login required</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">To access and use Sentry, you need to provide a valid API key.</DialogContentText>
        <TextField fullWidth style={{ marginTop: '1rem' }} id="outlined-basic" label="Your API Key" variant="outlined" onChange={(e) => setProvidedText(e.target.value)} />
        <Button style={{ marginTop: '1rem' }} variant="contained" fullWidth onClick={() => props.onClickLogin(providedText)} disabled={props.loginState.isLoading}>Login</Button>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
