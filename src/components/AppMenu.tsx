import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { NavState } from '../misc/types';
import HeaderLogo from '../assets/aleno-header.png';

const a11yProps = (index: number) => ({ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` });

const tabWidth = 180;

function AppMenu(props: { navState: NavState, onClickTab: (tabIndex: number) => void }) {
  return (
    <div style={{ position: 'fixed', zIndex: 100, backgroundColor: 'white', width: '100vw' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} display="flex">
        <div style={{ marginLeft: 24, marginRight: 24, width: 260, display: 'flex', alignItems: 'center' }}>
          <a href="https://docs.aleno.ai/" target="_blank" rel="noreferrer">
            <img src={HeaderLogo} alt="Logo" style={{ width: 110, height: 34, objectFit: 'contain' }} />
          </a>
        </div>
        <Tabs value={props.navState.tabIndex} onChange={(e: any, newTabValue: number) => props.onClickTab(newTabValue)} aria-label="basic tabs example">
          <Tab label="SEARCH METRICS" {...a11yProps(0)} style={{ width: tabWidth }} />
          <Tab label="SUBSCRIPTIONS" {...a11yProps(1)} style={{ width: tabWidth }} />
          <Tab label="ALERTS HISTORY" {...a11yProps(2)} style={{ width: tabWidth }} />
          <Tab label="ALERT SETTINGS" {...a11yProps(2)} style={{ width: tabWidth }} />
        </Tabs>
      </Box>
    </div>

  );
}

export default AppMenu;
