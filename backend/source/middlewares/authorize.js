// ======================================================
// authorize.js
// Description: Permission Middleware
// ======================================================

import ApiError from "../errors/apiError.js";

const authorize = (...requiredPermissions) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return next(
                new ApiError(401, "Authentication required.")
            );
        }

        // Super Admin bypass
        if (user.role?.name === "SUPER_ADMIN") {
            return next();
        }

        const permissions =
            user.role?.permissions?.map(
                (item) =>
                    `${item.permission.resource}.${item.permission.action}`
            ) || [];

        const hasPermission = requiredPermissions.every(
            (permission) => permissions.includes(permission)
        );

        if (!hasPermission) {
            return next(
                new ApiError(
                    403,
                    "You don't have permission to perform this action."
                )
            );
        }

        next();
    };
};

export default authorize;
