// ======================================================
// comparePassword.js
// Description: Compare plain password with hashed password
// ======================================================

import bcrypt from "bcrypt";

/**
 * Compare Password
 *
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export default comparePassword;