import { Grid, Typography, Button, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import Divider from '@mui/material/Divider';
import { MetricAlert, Metric } from '../misc/types';
import utils from '../misc/utils';

function MetricAlertLine(props: { metricAlert: MetricAlert, onViewChart: (metric: Metric) => Promise<void> }) {
  const { metricAlert } = props;
  const { fromPoint, toPoint, metricPercentVariation, metric } = metricAlert;
  const timeSince = utils.timeSince(toPoint.timestamp);
  const withinTime = utils.durationString(fromPoint.timestamp, toPoint.timestamp);
  const percentVariation = Math.abs(metricPercentVariation).toFixed(2);
  const percentVariationString = `${metricPercentVariation > 0 ? '+' : '-'}${percentVariation} %`;
  const varColor = metricPercentVariation > 0 ? 'rgb(39, 174, 96)' : 'rgb(231, 76, 60)';

  return (
    <Accordion elevation={3}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Grid container>
          <Grid item xs={3}>
            <Typography style={{ fontWeight: 'bold' }}>{props.metricAlert.metric.name}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography style={{ color: varColor, fontWeight: 'bold' }}>{percentVariationString}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>In {withinTime}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{timeSince} ago</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button size="small" variant="outlined" onClick={() => props.onViewChart(metric)}>view chart</Button>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>On block</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>#{metricAlert.block.number}</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>From date</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>{(new Date(fromPoint.timestamp * 1_000)).toLocaleString()}</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>From value</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>{utils.formatNumber(fromPoint.value)}</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>To date</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>{(new Date(toPoint.timestamp * 1_000)).toLocaleString()}</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>To value</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>{utils.formatNumber(toPoint.value)}</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>Duration</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>{withinTime}</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>Delta</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>{utils.formatNumber(toPoint.value - fromPoint.value, true)}</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>Variation</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>{percentVariationString}</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>Generated at</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>{(new Date(props.metricAlert.createdAt)).toLocaleString()}</Typography></Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

function MyAlerts(props: { metricAlerts: MetricAlert[], onViewChart: (metric: Metric) => Promise<void> }) {
  return (
    <>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '2.5rem' }}>Alert history</Typography>
      { props.metricAlerts.length === 0 ? <Typography>No alert to be displayed</Typography> : null }
      {props.metricAlerts.map((metricAlert) => (<MetricAlertLine key={metricAlert.id} onViewChart={props.onViewChart} metricAlert={metricAlert} />))}
    </>
  );
}

export default MyAlerts;
