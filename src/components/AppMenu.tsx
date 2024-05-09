import React from 'react';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import { NavState } from '../misc/types';
import HeaderLogo from '../assets/aleno-header.png';

const a11yProps = (index: number) => ({ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` });

const tabWidth = 280;

function AppMenu(props: { navState: NavState, onClickTab: (tabIndex: number) => void }) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} display="flex">
      <div style={{ marginLeft: 24, marginRight: 24, width: 260, display: 'flex', alignItems: 'center' }}>
        <a href="https://docs.aleno.ai/">
          <img src={HeaderLogo} alt="Logo" style={{ width: 110, height: 34, objectFit: 'contain' }} />
        </a>
      </div>
      <Tabs value={props.navState.tabIndex} onChange={(e: any, newTabValue: number) => props.onClickTab(newTabValue)} aria-label="basic tabs example">
        <Tab label="METRICS" {...a11yProps(0)} style={{ width: tabWidth }} />
        <Tab label="SUBSCRIPTIONS" {...a11yProps(1)} style={{ width: tabWidth }} />
        <Tab label="ALERTS" {...a11yProps(2)} style={{ width: tabWidth }} />
      </Tabs>
    </Box>
  );
}

export default AppMenu;
