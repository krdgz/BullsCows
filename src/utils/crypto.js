// Utilidades de cifrado/des/ para datos sensibles
// Usa Web Crypto API (AES-GCM) para cifrar el número secreto

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

async function importKeyFromPassphrase(passphrase) {
  const salt = textEncoder.encode('bulls-cows-salt');
  const baseKey = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100_000 },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptSecret(secret, passphrase) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await importKeyFromPassphrase(passphrase);
  const cipher = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    textEncoder.encode(secret)
  );
  const payload = {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(cipher)),
  };
  return btoa(JSON.stringify(payload));
}

export async function decryptSecret(encoded, passphrase) {
  const payload = JSON.parse(atob(encoded));
  const iv = new Uint8Array(payload.iv);
  const data = new Uint8Array(payload.data);
  const key = await importKeyFromPassphrase(passphrase);
  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  return textDecoder.decode(plain);
}
