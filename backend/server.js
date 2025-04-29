const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Todo App</title>
      </head>
      <body style="text-align: center; background-color: #f0f0f0;">
        <h1>Welcome to the Todo App Nigga!!!</h1>
        <video width="720" height="480" controls autoplay loop muted>
          <source src="https://drive.google.com/uc?export=download&id=1yvHq77uUvdqa01i10szucuxCs0YqzdTJ" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </body>
    </html>
  `);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
