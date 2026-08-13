// ======================================================
// sendResponse.js
// Description: Standard API Response Helper
// ======================================================

const sendResponse = (
    res,
    {
        statusCode = 200,
        success = true,
        message = "Success",
        data = null,
        meta = null,
    }
) => {
    const response = {
        success,
        message,
    };

    if (meta) {
        response.meta = meta;
    }

    if (data !== null) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

export default sendResponse;