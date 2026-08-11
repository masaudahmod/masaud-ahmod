import ApiError from "../errors/apiError.js";

const roleGuard = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return next(new ApiError(401, "Authentication required."));
        }

        // Super admin bypass
        if (user.role?.name === "SUPER_ADMIN") return next();

        if (!allowedRoles.includes(user.role?.name)) {
            return next(new ApiError(403, "Insufficient role to access this resource."));
        }

        next();
    };
};

export default roleGuard;
