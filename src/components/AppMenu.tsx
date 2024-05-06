import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { NavState } from '../misc/types';

const a11yProps = (index: number) => ({ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` });

function AppMenu(props: { navState: NavState, onClickTab: (tabIndex: number) => void }) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={props.navState.tabIndex} onChange={(e: any, newTabValue: number) => props.onClickTab(newTabValue)} aria-label="basic tabs example">
        <Tab label="METRICS" {...a11yProps(0)} />
        <Tab label="SUBSCRIPTIONS" {...a11yProps(1)} />
        <Tab label="ALERTS" {...a11yProps(2)} />
      </Tabs>
    </Box>
  );
}

export default AppMenu;
