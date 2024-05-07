import React, { useEffect, useState } from 'react';
import { Typography, Grid, FormControl, MenuItem, Select, InputLabel, TextField, Button } from '@mui/material';
import { Metric, MetricState, SubscriptionState } from '../misc/types';
import utils from '../misc/utils';
import MetricTable from '../components/MetricTable';

function SearchMetrics(props: {
  metricState: MetricState,
  onSelectMetric: (metric: Metric) => void,
  subscriptionState: SubscriptionState,
  onClickSearch: (searchMode: string, textInput: string) => Promise<void>,
  onClickUpdateSubscriptions: (updateSubscriptionData: { metricKey: string, threshold: number }[]) => Promise<void>
}) {
  const [searchMode, setSearchMode] = useState('USER_ADDRESSES');
  const [textInput, setTextInput] = useState('');
  const isLoading = props.metricState.isLoading || props.subscriptionState.isLoading;
  const metricWithThresholds = utils.getMetricsWithThresholds(props.metricState.metrics, props.subscriptionState.subscriptions);

  return (
    <>
      <Typography variant="h4" gutterBottom>Search metrics</Typography>
      <Typography gutterBottom>Search parameters (you can provide multiple addresses separated by a coma)</Typography>
      <Grid container spacing={2} style={{ marginTop: '0.5rem' }}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchMode}
              label="Age"
              onChange={(e) => setSearchMode(e.target.value)}
            >
              <MenuItem value="USER_ADDRESSES">My addresses</MenuItem>
              <MenuItem value="TOKEN_ADDRESSES">token addresses</MenuItem>
              <MenuItem value="POOL_ADDRESSES">pool addresses</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <TextField fullWidth label="addresses" onChange={(e) => setTextInput(e.target.value)} />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" style={{ height: '56px' }} fullWidth onClick={() => props.onClickSearch(searchMode, textInput)} disabled={isLoading}>Search metrics</Button>
        </Grid>
      </Grid>
      <MetricTable onSelectMetric={props.onSelectMetric} metricWithThresholds={metricWithThresholds} isLoading={props.metricState.isLoading || props.subscriptionState.isLoading} onClickUpdateSubscriptions={props.onClickUpdateSubscriptions} />
    </>
  );
}

export default SearchMetrics;
