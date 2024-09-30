import { AES, enc, lib } from "crypto-js";

/**
 * Encrypts the given code using AES encryption with URL-safe Base64 encoding,
 * making the output safe for use in URL parameters.
 *
 * @param {string} code - The plaintext code to encrypt.
 * @param {string} mkey - The encryption key (optional, defaults to environment variable).
 * @returns {string} - The encrypted string in URL-safe Base64 format.
 */
export const encryptFE = (
  code,
  mkey = process.env.REACT_APP_CRYPTO_SECRET_KEY
) => {
  if (!code) {
    throw new Error("Encryption requires a valid code.");
  }

  if (!mkey) {
    throw new Error("Encryption key (mkey) is required.");
  }

  // Generate a random initialization vector (IV)
  const iv = lib.WordArray.random(16);

  // Encrypt the code using AES with the key and IV
  const encrypted = AES.encrypt(code, mkey, { iv: iv });

  // Concatenate IV with the ciphertext (Base64 encoded)
  let combinedCiphertext = iv.toString() + encrypted.toString();

  // Replace URL-unsafe characters and remove padding to make it URL-safe
  combinedCiphertext = combinedCiphertext
    .replace(/\+/g, "-") // Replace `+` with `-`
    .replace(/\//g, "_") // Replace `/` with `_`
    .replace(/=+$/, ""); // Remove any padding `=`

  return combinedCiphertext;
};
