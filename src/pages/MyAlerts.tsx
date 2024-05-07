import { Grid, Typography, Button, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import Divider from '@mui/material/Divider';
import { MetricAlert } from '../misc/types';

function MetricAlertLine(props: { metricAlert: MetricAlert }) {
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
            <Typography style={{ color: 'green', fontWeight: 'bold' }}>+33.1 %</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>In 4 minutes</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>1 hr ago</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button size="small" variant="outlined">view chart</Button>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>From block</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>#122112</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>From date</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>12/01/2024 12:04:56</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>From value</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>152.2 M WETH</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>To block</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>#122112</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>To date</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>12/01/2024 12:04:56</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>To value</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>152.2 M WETH</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>Duration</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>3 minutes</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>Delta</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>+122 WETH</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>Variation</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>+33.1 %</Typography></Grid>
        </Grid>
        <Divider style={{ marginTop: '4px', marginBottom: '4px' }} />
        <Grid container spacing={2}>
          <Grid item xs={1}><Typography>Generated at</Typography></Grid>
          <Grid item xs={2}><Typography style={{ fontWeight: 'bold' }}>12/01/2024 12:04:56</Typography></Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

function MyAlerts(props: { metricAlerts: MetricAlert[] }) {
  return (
    <>
      <Typography variant="h4" gutterBottom>Alert history</Typography>
      { props.metricAlerts.length === 0 ? <Typography>No alert to be displayed</Typography> : null }
      {props.metricAlerts.map((metricAlert) => (<MetricAlertLine metricAlert={metricAlert} />))}
    </>
  );
}

export default MyAlerts;
