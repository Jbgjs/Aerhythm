const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const crypto = require('crypto');  
const app = express();
const PORT = 8080;

const corsOptions = {
  origin: 'http://localhost:8080',  
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  
  credentials: true,  
  preflightContinue: false,  
  optionsSuccessStatus: 204,  
};


app.use(cors(corsOptions));


app.options('*', cors(corsOptions)); 


app.use(helmet({
  crossOriginEmbedderPolicy: { policy: 'unsafe-none' },  
  crossOriginOpenerPolicy: { policy: 'unsafe-none' },  
}));

app.use(morgan('combined'));

app.use(express.json());

app.use(express.static('public'));

app.get('/auth/google', (req, res) => {
  const googleClientId = '569210729389-8og5q7d6rc06vcq48lroe1kpclp9vpik.apps.googleusercontent.com';
  const redirectUri = encodeURIComponent('http://localhost:8080/oauth2/callback/google');  
  const scope = encodeURIComponent('https://www.googleapis.com/auth/drive.metadata.readonly');  
  const responseType = 'token';  

  const state = crypto.randomBytes(16).toString('hex'); 

  req.session.state = state; 

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;

  res.redirect(authUrl);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'This is some data' });
});

app.post('/api/data', (req, res) => {
  const receivedData = req.body;
  console.log('Received data:', receivedData);
  res.json({ message: 'Data received successfully', data: receivedData });
});

app.get('/oauth2/callback/google', (req, res) => {
  const { access_token, state } = req.query; 
  
  if (state !== req.session.state) {
    return res.status(400).send('Invalid state parameter');
  }

  if (access_token) {
    console.log('Access Token:', access_token);

    res.send('Google OAuth2 인증이 완료되었습니다!');
  } else {
    res.send('인증 실패');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

