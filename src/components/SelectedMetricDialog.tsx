import React from 'react';
import { AppBar, Button, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { SelectedMetricState } from '../misc/types';

const Transition = React.forwardRef((
  props: TransitionProps & {
      children: React.ReactElement;
    },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

function SelectedMetricDialog(props: { onClose: () => void, selectedMetricState: SelectedMetricState }) {
  const { metric } = props.selectedMetricState;
  const title = metric ? metric.name : 'closing...';
  return (
    <Dialog
      fullScreen
      open={!!props.selectedMetricState.metric}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close"><CloseIcon /></IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">{title}</Typography>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
}

export default SelectedMetricDialog;
