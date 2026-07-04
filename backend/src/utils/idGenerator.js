/**
 * Generates human-readable, sortable IDs like "MSN-7F3K2A" without
 * pulling in an external uuid dependency.
 */
function generateId(prefix = 'ID') {
  const stamp = Date.now().toString(36).toUpperCase().slice(-4);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `${prefix}-${stamp}${rand}`;
}

module.exports = { generateId };
