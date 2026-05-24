// js/supabase.js
// ─────────────────────────────────────────
// STEP 1: Paste your values below
// ─────────────────────────────────────────

const SUPABASE_URL  = 'https://cvmjsjdspxhgcsseqtjj.supabase.co';
const SUPABASE_ANON = 'sb_publishable_OoKd6yR8lZ-H1hD14cKPtw_16bBkh-f';

// ─────────────────────────────────────────
// DO NOT EDIT BELOW THIS LINE
// ─────────────────────────────────────────

async function saveContact(email) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPABASE_ANON,
        'Authorization': `Bearer ${SUPABASE_ANON}`,
        'Prefer':        'return=minimal'
      },
      body: JSON.stringify({ email: email })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[ATLAS] Supabase error:', err);
      return { error: err };
    }

    console.log('[ATLAS] Contact saved ✓');
    return { data: true };

  } catch (err) {
    console.error('[ATLAS] Network error:', err.message);
    return { error: err.message };
  }
}

window.saveContact = saveContact;
console.log('[ATLAS] Supabase ready ✓');