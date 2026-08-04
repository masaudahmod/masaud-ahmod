// ======================================================
// notFound.js
// Description: Handle Unknown Routes (404)
// ======================================================

import ApiError from "./ApiError.js";

const notFound = (req, res, next) => {
    next(
        new ApiError(
            404,
            `Route ${req.originalUrl} not found.`
        )
    );
};

export default notFound;