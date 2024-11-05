
export const checkPasswordChange = async (req, res, next) => {
    const user = req.user; // Предполагаем, что user добавлен в req после авторизации

    if (user && user.mustChangePassword && req.path !== '/change-password') {

        return res.status(403).json({
            message: 'Password change required. Please go to /change-password to update your password.'
        });

        // return res.redirect(307, '/change-password');
    }

    next();
};