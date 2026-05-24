// js/cta.js
// Contact form — validates email, saves to Supabase, shows feedback

const btn   = document.getElementById('ctaBtn');
const input = document.getElementById('emailInput');
const msg   = document.getElementById('ctaMsg');

btn.addEventListener('click', handleCTA);
input.addEventListener('keydown', e => { if (e.key === 'Enter') handleCTA(); });

async function handleCTA() {
  const email = input.value.trim();

  // basic validation
  if (!email || !email.includes('@') || !email.includes('.')) {
    msg.style.color = '#e74c3c';
    msg.textContent = 'Please enter a valid email address.';
    input.style.borderColor = '#e74c3c';
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  try {
    const { error } = await window.saveContact(email);

    if (error && error !== 'not_ready') {
      // Supabase error
      msg.style.color = '#e74c3c';
      msg.textContent = 'Something went wrong. Please email us directly.';
    } else {
      // success (or Supabase not yet connected)
      input.value           = '';
      input.placeholder     = '✓ Got it! We\'ll be in touch soon.';
      input.style.borderColor = 'var(--gold)';
      msg.style.color       = 'var(--gold)';
      msg.textContent       = 'We\'ll reach out within 24 hours.';
    }
  } catch (err) {
    console.error('[ATLAS] CTA error:', err);
    msg.style.color = '#e74c3c';
    msg.textContent = 'Something went wrong. Please try again.';
  }

  btn.textContent = 'Send It →';
  btn.disabled    = false;
}
