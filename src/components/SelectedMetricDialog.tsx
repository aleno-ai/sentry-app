import React from 'react';
import { AppBar, Button, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { LineChart } from '@mui/x-charts';
import { SelectedMetricState } from '../misc/types';
import utils from '../misc/utils';

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
  const { metric, metricAlert, dataPoints, isLoading } = props.selectedMetricState;

  const title = metric ? metric.name : 'closing...';

  const xAxis = dataPoints.map((p) => new Date(p.timestamp * 1_000));
  const yAxis = dataPoints.map((p) => p.value);
  const alertYAxis: (number| null)[] = [];

  let alertSubTitle: string | null = null;
  if (metricAlert && dataPoints.length > 0) {
    const metricAlertInfo = utils.getMetricAlertInfo(metricAlert);
    alertSubTitle = metricAlert.fromPoint.timestamp < dataPoints[0].timestamp ? `Alert "${metricAlertInfo.percentVariationString} in ${metricAlertInfo.withinTime}" is too old to be fully displayed` : `Alert "${metricAlertInfo.percentVariationString} in ${metricAlertInfo.withinTime}"`;
    dataPoints.forEach((point) => {
      if (point.timestamp < metricAlert.fromPoint.timestamp) {
        alertYAxis.push(null);
      } else if (point.timestamp < metricAlert.toPoint.timestamp) {
        alertYAxis.push(point.value);
      } else {
        alertYAxis.push(null);
      }
    });
  }
  const [min, max] = yAxis.length > 0 ? [Math.min(...yAxis), Math.max(...yAxis)] : [0, 0];

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
        <Typography variant="h5" style={{ marginLeft: 100 }}>Daily data on {title}</Typography>
        {props.selectedMetricState.isLoading ? (<Typography style={{ marginLeft: 100 }}>Loading data points...</Typography>) : null}
        {alertSubTitle ? (<Typography style={{ marginLeft: 100 }}>{alertSubTitle}</Typography>) : null}
        {
          xAxis.length > 0 ? (
            <LineChart
              xAxis={[{ data: xAxis, scaleType: 'time', label: 'date' }]}
              series={[
                { color: '#2196f3', curve: 'linear', data: yAxis, valueFormatter: (v) => (v === null ? '' : v.toFixed(7)) },
                { color: '#f44336', curve: 'linear', area: true, data: alertYAxis, valueFormatter: (v) => (v === null ? '' : v.toFixed(7)) },
              ]}
              yAxis={[{ min, max }, { min, max }]}
              margin={{ left: 100, right: 100, top: 30, bottom: 200 }}
            />
          ) : null
        }
      </DialogContent>
    </Dialog>
  );
}

export default SelectedMetricDialog;
