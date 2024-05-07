import React from 'react';
import { AppBar, Button, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { LineChart } from '@mui/x-charts';
import { SelectedMetricState } from '../misc/types';

const Transition = React.forwardRef((
  props: TransitionProps & {
      children: React.ReactElement;
    },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

function SelectedMetricDialog(props: {
    onClose: () => void,
    selectedMetricState: SelectedMetricState,
    onRefreshMetricDataPoints: () => Promise<void>
}) {
  const { metric } = props.selectedMetricState;
  const title = metric ? metric.name : 'closing...';
  const xAxis = props.selectedMetricState.dataPoints.map((p) => new Date(p.timestamp * 1_000));
  const yAxis = props.selectedMetricState.dataPoints.map((p) => p.value);

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
          <Button autoFocus color="inherit" onClick={props.onRefreshMetricDataPoints} disabled={props.selectedMetricState.isLoading}>refresh</Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        {props.selectedMetricState.isLoading ? (
          <Typography>Loading data points...</Typography>
        ) : (
          <LineChart
            xAxis={[{ data: xAxis, scaleType: 'time', label: 'date' }]}
            yAxis={[{ label: props.selectedMetricState.metric?.name }]}
            series={[{ data: yAxis }]}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SelectedMetricDialog;
