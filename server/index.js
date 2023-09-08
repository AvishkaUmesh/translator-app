const express = require("express");
const translate = require("google-translate-api-x");
const bodyParser = require("body-parser");

const app = express();
const port = 5001;

app.use(bodyParser.json());

app.post("/translate", async (req, res) => {
  const { text } = req.body;

  try {
    const translation = await translate(text, { from: "si", to: "en" });
    res.json({ translation: translation.text });
  } catch (error) {
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
