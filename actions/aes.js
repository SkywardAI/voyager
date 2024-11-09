import crypto from 'crypto';

const algorithm = 'aes-256-cbc'; // AES 256 CBC Mode
const keyLength = 32; // 256-bit key for AES-256
const ivLength = 16;  // IV length for CBC mode (128-bit)

// Derive a key from a password and salt using PBKDF2
const deriveKey = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 100000, keyLength, 'sha256');
};

// Function to encrypt a message
const encryptMessage = (message, password) => {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(ivLength);

  const key = deriveKey(password, salt);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return { encrypted, iv: iv.toString('hex'), salt: salt.toString('hex') };
};

// Function to decrypt a message
const decryptMessage = (encryptedMessage, password, ivHex, saltHex) => {
  const iv = Buffer.from(ivHex, 'hex');
  const salt = Buffer.from(saltHex, 'hex');

  const key = deriveKey(password, salt);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

// Encryption handler
export async function handleEncryption(req, res) {
  const { message, password } = req.body;

  if (!message || !password) {
    return res.status(400).json({ error: 'Message and password are required.' });
  }

  try {
    const { encrypted, iv, salt } = encryptMessage(message, password);
    res.json({
      encryptedMessage: encrypted,
      iv,
      salt
    });
  } catch (error) {
    res.status(500).json({ error: 'Encryption failed.' });
  }
};

// Decription handler
export async function handleDecryption(req, res) {
  const { encryptedMessage, password, iv, salt } = req.body;

  if (!encryptedMessage || !password || !iv || !salt) {
    return res.status(400).json({ error: 'Encrypted message, password, iv, and salt are required.' });
  }

  try {
    const decryptedMessage = decryptMessage(encryptedMessage, password, iv, salt);
    res.json({ decryptedMessage });
  } catch (error) {
    res.status(500).json({ error: 'Decryption failed.' });
  }
};