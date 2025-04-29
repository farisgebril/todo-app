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
        <h1>Hanane is my main bitch and I'm her main niggggaaaaaaa</h1>
        <div style="position:relative; width:100%; height:0px; padding-bottom:56.250%">
          <iframe allow="fullscreen;autoplay" allowfullscreen height="100%" 
            src="https://streamable.com/e/qgkxjb?autoplay=1" width="100%" 
            style="border:none; width:100%; height:100%; position:absolute; left:0px; top:0px; overflow:hidden;">
          </iframe>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
