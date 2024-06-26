import { CircularProgress, Snackbar } from '@mui/material';

import React from 'react';
import { AppSnackBarState } from '../misc/types';

function AppSnackBar(props: { appSnackBarState: AppSnackBarState }) {
  return (
    <Snackbar
      open={!!props.appSnackBarState.message}
      message={props.appSnackBarState.message}
      action={<CircularProgress size={30} />}
    />
  );
}

export default AppSnackBar;
