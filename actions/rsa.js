import crypto from 'crypto';
import fs from 'fs';

const privateKey = fs.readFileSync('keys/private.pem', 'utf8');
const publicKey = fs.readFileSync('keys/public.pem', 'utf8');

// Function to encrypt a message with a provided public key (RSA encryption)
const encryptMessage = (message, publicKey) => {
  try {
    const encrypted = crypto.publicEncrypt({
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    }, Buffer.from(message));
    return encrypted.toString('base64');
  } catch (error) {
    console.log(error)
    throw new Error('Encryption failed');
  }
};

// Function to decrypt a message with the private key (RSA decryption)
const decryptMessage = (encryptedMessage) => {
  try {
    const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(encryptedMessage, 'base64'));
    return decrypted.toString('utf8');
  } catch (error) {
    console.log(error)
    throw new Error('Decryption failed');
  }
};

// Encryption handler
export async function handleEncryption(req, res) {
  const { message } = req.body;
  const publicKey = req.headers['public-key'];

  if (!message || !publicKey) {
    return res.status(400).json({ error: 'Message and public key are required.' });
  }

  try {
    const encryptedMessage = encryptMessage(message, publicKey);
    res.json({
      encryptedMessage,
    });
  } catch (error) {
    res.status(500).json({ error: 'Encryption failed.' });
  }
}

// Decryption handler
export async function handleDecryption(req, res) {
  const { encryptedMessage } = req.body;

  if (!encryptedMessage) {
    return res.status(400).json({ error: 'Encrypted message is required.' });
  }

  try {
    const decryptedMessage = decryptMessage(encryptedMessage);
    res.json({ decryptedMessage });
  } catch (error) {
    res.status(500).json({ error: 'Decryption failed.' });
  }
}

// Public Key sharing handler
export async function getPublicKey(req, res) {
  try {
    res.json({ publicKey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve public key.' });
  }
}