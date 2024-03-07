var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const { signature } = require('../utils/transloadit_auth');
const { spawn } = require('child_process');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated(),
    signature: signature
  });
});

// Spawn a child process
const childProcess = spawn('python3 send.py', []);

// Listen for stdout data
childProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// Listen for stderr data
childProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Listen for process exit
childProcess.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
