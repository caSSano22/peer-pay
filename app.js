/* ==========================================================================
   PEER PAY — FIRST-CLASS CHECKOUT FOR UNDERSERVED BUSINESSES
   Interactive Terminal & Theme Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPeerTheme();
  initCheckoutEngine();
});

// 1. Theme Engine Switcher
function initPeerTheme() {
  const savedTheme = localStorage.getItem('peer-pay-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function togglePeerTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('peer-pay-theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// 2. Interactive 3-Step Checkout Terminal Engine
let currentStep = 1;
let selectedPaymentMethod = 'Venmo';
let paymentAmount = '1,337.00';

function selectPaymentMethod(element, methodName) {
  selectedPaymentMethod = methodName;
  document.querySelectorAll('.payment-method-row').forEach(row => {
    row.classList.remove('selected');
    row.style.borderColor = '#e2e0d8';
    row.style.background = '#ffffff';
  });

  element.classList.add('selected');
  element.style.borderColor = '#0b0c0e';
  element.style.background = '#f9f9f6';
}

function startCheckoutPayment() {
  const stepContainer = document.getElementById('checkoutStepContainer');
  const btnStart = document.getElementById('btnStartPayment');

  if (!stepContainer) return;

  if (currentStep === 1) {
    currentStep = 2;
    // Step 2: Pay
    document.getElementById('stepTag1').classList.remove('active');
    document.getElementById('stepTag2').classList.add('active');

    stepContainer.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #71717a; margin-bottom: 8px;">PAY VIA ${selectedPaymentMethod.toUpperCase()}</div>
        <div style="font-family: var(--font-syne); font-size: 2.2rem; font-weight: 800; color: #0b0c0e; margin-bottom: 16px;">$${paymentAmount} USDC</div>

        <div style="background: #ffffff; border: 1px solid #e2e0d8; border-radius: 16px; padding: 20px; display: inline-block; margin-bottom: 20px;">
          <!-- Simulated QR Code -->
          <svg width="140" height="140" viewBox="0 0 100 100" fill="#0b0c0e">
            <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v10 h-10 z M40,40 h20 v20 h-20 z M70,70 h20 v20 h-20 z M10,40 h20 v10 h-20 z M70,40 h10 v20 h-10 z"/>
          </svg>
        </div>

        <div style="font-family: var(--font-mono); font-size: 0.82rem; color: #71717a; margin-bottom: 12px;">
          Send $${paymentAmount} using ${selectedPaymentMethod} app to verify
        </div>
      </div>
    `;

    if (btnStart) btnStart.textContent = 'Simulate Payment Verification →';
    showPeerToast(`📲 Initialized ${selectedPaymentMethod} payment session`);

  } else if (currentStep === 2) {
    currentStep = 3;
    // Step 3: Verified
    document.getElementById('stepTag2').classList.remove('active');
    document.getElementById('stepTag3').classList.add('active');

    stepContainer.innerHTML = `
      <div style="text-align: center; padding: 24px 0;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: #22c55e; color: #ffffff; display: inline-flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 16px;">✓</div>
        <h4 style="font-family: var(--font-syne); font-size: 1.4rem; font-weight: 800; color: #0b0c0e; margin-bottom: 6px;">PAYMENT VERIFIED</h4>
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #166534; font-weight: 700; margin-bottom: 16px;">Paid in 4.2 seconds • Robinhood Chain</div>
        
        <div style="background: #ffffff; border: 1px solid #e2e0d8; border-radius: 14px; padding: 16px; font-family: var(--font-mono); font-size: 0.8rem; text-align: left; color: #3f3f46;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><span>Amount:</span><strong>1,337.00 USDC</strong></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><span>Method:</span><strong>${selectedPaymentMethod}</strong></div>
          <div style="display: flex; justify-content: space-between;"><span>Status:</span><strong style="color: #22c55e;">Settled (No Holds)</strong></div>
        </div>
      </div>
    `;

    if (btnStart) {
      btnStart.textContent = '← Reset Sandbox Checkout';
      btnStart.style.background = '#0b0c0e';
      btnStart.style.color = '#ffffff';
    }

    showPeerToast('🎉 Payment Verified! $1,337.00 settled instantly to your wallet!');

  } else {
    // Reset to Step 1
    location.reload();
  }
}

// 3. FAQ Accordion Toggle
function toggleFaqPeer(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector('.faq-icon');

  if (!answer) return;

  if (answer.style.display === 'block') {
    answer.style.display = 'none';
    if (icon) icon.textContent = '+';
  } else {
    answer.style.display = 'block';
    if (icon) icon.textContent = '−';
  }
}

// Mobile Menu Drawer
function toggleMobileMenuPeer() {
  const drawer = document.getElementById('mobileMenuDrawerPeer');
  if (drawer) drawer.classList.toggle('open');
}

// Global Peer Toast Notification
function showPeerToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 32px; right: 32px; z-index: 1000;
    background: #0b0c0e; color: #ffffff; border: 1px solid #24272e;
    padding: 14px 24px; border-radius: 9999px; font-family: var(--font-mono);
    font-size: 0.85rem; box-shadow: 0 15px 40px rgba(0,0,0,0.5);
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4500);
}
