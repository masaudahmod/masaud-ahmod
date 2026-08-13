// ======================================================
// File: src/utils/hashPassword.js
// Description: Hash user password using bcrypt
// ======================================================

import bcrypt from "bcrypt";

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

/**
 * Hash Password
 *
 * @param {string} password
 * @returns {Promise<string>}
 */
const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export default hashPassword;