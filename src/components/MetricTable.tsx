import { Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Metric } from '../misc/types';

type EntityRow = {
  rowKey: string, entityName: string, entityAddress: string, entityType: string, metricWithThresholds: { metric: Metric, threshold: number }[]
}

const groupByEntity = (metricWithThresholds: { metric: Metric, threshold: number }[]) => {
  const entityMap: Map<string, EntityRow> = new Map();
  metricWithThresholds.forEach((metricWithThreshold) => {
    const { metric } = metricWithThreshold;
    const entityType = metric.type.includes('token') ? 'token' : 'pool';
    let entityName = '';
    let entityAddress = '';
    if (entityType === 'token') {
      entityAddress = metric.info.token.address;
      entityName = metric.info.token.symbol;
    } else {
      entityName = `${metric.info.pool.protocolId} ${metric.info.pool.name}`;
      entityAddress = metric.info.pool.address;
    }
    const rowKey = `${entityType}_${entityAddress}`;
    if (entityMap.has(rowKey)) {
      entityMap.get(rowKey)!.metricWithThresholds.push(metricWithThreshold);
    } else {
      entityMap.set(rowKey, { rowKey, entityName, entityAddress, entityType, metricWithThresholds: [metricWithThreshold] });
    }
  });

  return Array.from(entityMap.values());
};

const getMetricShortName = (metric: Metric) => {
  if (metric.type === 'token_total_supply') return 'total supply';
  if (metric.type === 'token_total_tvl') return 'DEX tvl';
  if (metric.type === 'token_weth_price') return 'WETH price';
  if (metric.type === 'token_usd_price') return 'USD price';
  if (metric.type.includes('pool_rate')) {
    const baseTokenSymbol: string = metric.info.baseToken.symbol;
    const quoteTokenSymbol: string = metric.info.quoteToken.symbol;
    return `${baseTokenSymbol} / ${quoteTokenSymbol} pool rate`;
  }
  if (metric.type.includes('pool_tvl')) {
    const tokenSymbol: string = metric.info.token.symbol;
    return `${tokenSymbol} TVL`;
  }
  return 'unknown';
};

function MetricLine(props: { metricWithThreshold: { metric: Metric, threshold: number } }) {
  const metricShortName = getMetricShortName(props.metricWithThreshold.metric);
  return (
    <Grid container alignItems="center" style={{ marginTop: '1rem' }}>
      <Grid item xs={4}>
        <Button>{metricShortName}</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" size="small">View chart</Button>
      </Grid>
      <Grid item xs={4}>
        <TextField size="small" label="alert threshold (%)" value="0" />
      </Grid>
    </Grid>
  );
}

function EntityLine(props: { entityRow: EntityRow }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Grid container>
          <Grid item xs={4}>
            <Typography style={{ fontWeight: 'bold' }}>{props.entityRow.entityName}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>{props.entityRow.entityType}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>{props.entityRow.metricWithThresholds.length} metrics</Typography>
          </Grid>
          <Grid item>
            <Typography>{props.entityRow.entityAddress}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        {props.entityRow.metricWithThresholds.map((metricWithThreshold) => (<MetricLine metricWithThreshold={metricWithThreshold} />))}
      </AccordionDetails>
    </Accordion>
  );
}

function MetricTable(props: { metricWithThresholds: { metric: Metric, threshold: number }[] }) {
  const entityRows = groupByEntity(props.metricWithThresholds);
  return (
    <div style={{ marginTop: '3rem' }}>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item>
          <Typography variant="h5">Metric Table: {props.metricWithThresholds.length} metrics on {entityRows.length} entities</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth variant="outlined">Update 0 subscriptions</Button>
        </Grid>
      </Grid>
      <div style={{ marginTop: '1rem' }}>
        {entityRows.map((entityRow) => (<EntityLine entityRow={entityRow} />))}
      </div>
    </div>
  );
}

export default MetricTable;
