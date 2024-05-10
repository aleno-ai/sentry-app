import React, { useState, useEffect } from 'react';
import { Box, Button, Link, TextField, Typography } from '@mui/material';

function AlertSettings(props: { onUpdate: (data: { telegramChannelId?: string, webhookUrl?: string }) => Promise<void>, isLoading: boolean, alertOutputs: { telegramChannelId?: string, webhookUrl?: string } }) {
  const [telegramChannelId, setTelegramChannelId] = useState(props.alertOutputs.telegramChannelId);
  const [webhookUrl, setWebhookUrl] = useState(props.alertOutputs.webhookUrl);

  useEffect(() => {
    setTelegramChannelId(props.alertOutputs.telegramChannelId);
    setWebhookUrl(props.alertOutputs.webhookUrl);
  }, [props]);

  const onClick = () => {
    const data: { telegramChannelId?: string, webhookUrl?: string } = {};
    if (!!telegramChannelId && telegramChannelId.length > 0) {
      data.telegramChannelId = telegramChannelId;
    }
    if (!!webhookUrl && webhookUrl.length > 0) {
      data.webhookUrl = webhookUrl;
    }
    props.onUpdate(data);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Alert settings</Typography>
      <Box style={{ marginTop: '2rem' }}>
        <Typography style={{ marginBottom: '0.5rem' }}>Full tutorial to get a Telegram channel ID here:  <Link href="https://docs.aleno.ai/tutorials/integrating-sentry-alerts-with-telegram" underline="hover" target="_blank">Integrating Sentry Alerts with Telegram</Link></Typography>
        <TextField disabled={props.isLoading} label="Telegram channel ID" fullWidth value={telegramChannelId} onChange={(e) => setTelegramChannelId(e.target.value)} />
      </Box>
      <Box style={{ marginTop: '2rem' }}>
        <Typography style={{ marginBottom: '0.5rem' }}>If you have server that accepts webhook, you can provide URL here. You can also use it to connect to <Link href="https://zapier.com/" underline="hover" target="_blank">Zapier</Link> with the following tutorial: <Link href="https://docs.aleno.ai/tutorials/integrating-with-custom-output-with-zapier" underline="hover" target="_blank">Integrating with custom Output with Zapier</Link></Typography>
        <TextField disabled={props.isLoading} label="Webhook URL" fullWidth value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
      </Box>
      <Button variant="outlined" style={{ marginTop: '2rem' }} disabled={props.isLoading} onClick={onClick}>Update alert settings</Button>
    </>
  );
}

export default AlertSettings;
