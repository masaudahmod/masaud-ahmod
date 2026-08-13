// ======================================================
// validateRequest.js
// Description: Validate Request using Zod
// ======================================================

import { ZodError } from "zod";
import ApiError from "../errors/apiError.js";

const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query,
            });

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return next(
                    new ApiError(
                        400,
                        "Validation Error",
                        error.errors.map((err) => ({
                            field: err.path.join("."),
                            message: err.message,
                        }))
                    )
                );
            }

            next(error);
        }
    };
};

export default validateRequest;
