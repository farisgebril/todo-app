const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8081; // Bind to 8081 for external access

app.use(cors());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Todo App</title></head>
      <body style="text-align: center; background-color: #f0f0f0;">
        <h1>Welcome to the Todo App Nigga!!!</h1>
        <video width="720" height="480" controls autoplay loop muted>
          <source src="https://drive.google.com/uc?export=download&id=1yvHq77uUvdqa01i10szucuxCs0YqzdTJ" type="video/mp4">
        </video>
      </body>
    </html>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
