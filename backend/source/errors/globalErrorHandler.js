// ======================================================
// File: src/errors/globalErrorHandler.js
// Description: Global Error Handler Middleware
// ======================================================

import ApiError from "./apiError.js";

const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    let errors = [];

    /**
     * Custom API Error
     */
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errors = err.errors;
    }

    /**
     * Unknown Error
     */
    else {
        message = err.message || message;
    }

    /**
     * Development Log
     */
    if (process.env.NODE_ENV !== "production") {
        console.error("ERROR =>", err);
    }

    return res.status(statusCode).json({
        success: false,
        message,
        // errors,
        // ...(process.env.NODE_ENV !== "production" && {
        //     stack: err.stack,
        // }),
    });
};

export default globalErrorHandler;