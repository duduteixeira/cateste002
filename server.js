require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files - CRITICAL for Marketing Cloud
app.use('/ui', express.static(path.join(__dirname, 'ui')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Root redirect to UI - prevents "Cannot GET /" errors
app.get('/', (req, res) => {
  res.redirect('/ui/index.html');
});

// Serve config.json from multiple paths for SFMC compatibility
app.get('/config.json', (req, res) => {
  const config = require('./config.json');
  const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
  const configStr = JSON.stringify(config).replace(/{{BASE_URL}}/g, baseUrl);
  res.json(JSON.parse(configStr));
});

app.get('/ui/config.json', (req, res) => {
  const config = require('./config.json');
  const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
  const configStr = JSON.stringify(config).replace(/{{BASE_URL}}/g, baseUrl);
  res.json(JSON.parse(configStr));
});

// Save endpoint
app.post('/save', (req, res) => {
  console.log('Save request:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ success: true });
});

// Publish endpoint
app.post('/publish', (req, res) => {
  console.log('Publish request:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ success: true });
});

// Validate endpoint
app.post('/validate', (req, res) => {
  console.log('Validate request:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ success: true });
});

// Stop endpoint
app.post('/stop', (req, res) => {
  console.log('Stop request:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ success: true });
});

// Execute endpoint - Main activity logic
app.post('/execute', async (req, res) => {
  console.log('Execute request:', JSON.stringify(req.body, null, 2));
  
  try {
    const { inArguments } = req.body;
    const args = inArguments.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    
    console.log('Processing arguments:', args);
    

    // Zenvia SMS Integration
    const brokerResponse = await axios({
      method: 'POST',
      url: 'https://api.zenvia.com/v2/channels/sms/messages'.replace(/{{(\w+)}}/g, (_, key) => process.env[key] || args[key] || ''),
      headers: {
      "Content-Type": "application/json",
      "X-API-TOKEN": "' + (process.env['ZENVIA_API_TOKEN'] || args['ZENVIA_API_TOKEN'] || '') + '"
},
      data: {
      "from": "' + (args['sender'] || '') + '",
      "to": "' + (args['recipient'] || '') + '",
      "contents": [
            {
                  "type": "text",
                  "text": "' + (args['message'] || '') + '"
            }
      ]
}
    });
    
    console.log('Broker response:', brokerResponse.data);
    
    res.status(200).json({
      success: true,
      branchResult: 'true',
      ...brokerResponse.data
    });

  } catch (error) {
    console.error('Execute error:', error.response?.data || error.message);
    res.status(200).json({
      success: false,
      branchResult: 'false',
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', activity: 'cateste002' });
});

// Export app for serverless environments
module.exports = app;

// Start server if running directly (not imported)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`cateste002 Custom Activity running on port ${PORT}`);
  });
}
