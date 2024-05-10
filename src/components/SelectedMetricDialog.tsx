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
  const { metric, metricAlert, dataPoints } = props.selectedMetricState;

  let title = '';
  if (!metric) {
    title = 'closing...';
  } else if (!metricAlert) {
    title = metric.name;
  } else {
    const metricAlertInfo = utils.getMetricAlertInfo(metricAlert);
    title = `${metric.name} (alert: ${metricAlertInfo.percentVariationString} in ${metricAlertInfo.withinTime})`;
  }
  const xAxis = dataPoints.map((p) => new Date(p.timestamp * 1_000));
  const yAxis = dataPoints.map((p) => p.value);

  const yValuesMetricAlert: (number | null)[] = [];
  let alertIsTooOldString: string | null = null;
  if (metricAlert) {
    if (dataPoints.length > 0) {
      dataPoints.forEach((p) => {
        if (p.timestamp >= metricAlert.fromPoint.timestamp && p.timestamp <= metricAlert.toPoint.timestamp) {
          yValuesMetricAlert.push(p.value);
        } else {
          yValuesMetricAlert.push(null);
        }
      });
      if (dataPoints[0].timestamp > metricAlert.fromPoint.timestamp) {
        const firstPointTimeAgo = utils.getTimeAgo(metricAlert.fromPoint.timestamp);
        const lastPointTimeAgo = utils.getTimeAgo(metricAlert.toPoint.timestamp);
        console.log('last data timestamp', dataPoints[dataPoints.length - 1].timestamp);
        console.log('last alert timestamp', metricAlert.toPoint.timestamp);
        alertIsTooOldString = dataPoints[0].timestamp > metricAlert.toPoint.timestamp ? `Alert #${metricAlert.id} is too old to be displayed (last point: ${lastPointTimeAgo} ago)` : `Alert #${metricAlert.id} is too old to be fully displayed (first point: ${firstPointTimeAgo} ago, last point: ${lastPointTimeAgo} ago)`;
      }
    }
  }

  // @ts-ignore
  const allYValues: number[] = [...yValuesMetricAlert, ...yAxis].filter((v) => v !== null);
  const [min, max] = [Math.min(...allYValues), Math.max(...allYValues)];

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
          <>
            <Typography variant="h5" style={{ marginLeft: 100 }}>Last hour updates on {title}</Typography>
            { alertIsTooOldString ? <Typography style={{ marginLeft: 100 }}>{alertIsTooOldString}</Typography> : null }
            <LineChart
              xAxis={[{ data: xAxis, scaleType: 'time', label: 'date' }]}
              series={[
                { color: '#2196f3', label: 'data points', curve: 'linear', data: yAxis, valueFormatter: (v) => (v === null ? '' : v.toFixed(7)) },
                { color: '#f44336', label: 'Alert', curve: 'linear', area: true, data: yValuesMetricAlert, valueFormatter: (v) => (v === null ? '' : v.toFixed(7)) },
              ]}
              yAxis={[{ min, max }, { min, max }]}
              margin={{ left: 100, right: 100, top: 30, bottom: 200 }}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SelectedMetricDialog;
