// const crypto = require('crypto');
import crypto from 'crypto';
// 生成符合规范长度的密钥
function genkey(secret, length = 32) {
  return crypto
    .createHash('sha256')
    .update(String(secret))
    .digest('base64')
    .substr(0, length);
}

// 加密字符串
function encryptByAes256(content, secretkey, iv) {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    genkey(secretkey),
    genkey(iv, 16),
  );
  let enc = cipher.update(content, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

// 解密字符串
function decryptByAes256(content, secretkey, iv) {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    genkey(secretkey),
    genkey(iv, 16),
  );
  let dec = decipher.update(content, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}
export { decryptByAes256, encryptByAes256 };
