const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit-feedback', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).send('All fields are required.');
  }

  const feedback = { name, email, message, timestamp: new Date().toISOString() };
  fs.appendFileSync('feedback.json', JSON.stringify(feedback) + '\n');
  res.send('Thank you for your feedback!');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
