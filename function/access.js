// Middleware to ensure the user is logged in as a restaurant
function isRestaurant(req, res, next) {
    if (req.session.restaurantLogin) {
        return next(); // Continue to the requested route
    } else {
        return res.redirect('/restaurant-dashboard/login');
    }
}

// Middleware to ensure the user is logged in as an admin
function isAdmin(req, res, next) {
    if (req.session.adminLogin) {
        return next();
    } else {
        return res.redirect('/admin-dashboard/login');
    }
}

// Middleware to ensure the user is logged in as a general user
function isUser(req, res, next) {
    if (req.session.userLogin) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

// Middleware to ensure that admin cannot access restaurant dashboard
function restrictAdminFromRestaurant(req, res, next) {
    if (req.session.adminLogin) {
        return res.status(403).send("Admins cannot access the restaurant dashboard.");
    } else {
        return next();
    }
}

// Middleware to ensure that restaurant cannot access admin dashboard
function restrictRestaurantFromAdmin(req, res, next) {
    if (req.session.restaurantLogin) {
        return res.status(403).send("Restaurants cannot access the admin dashboard.");
    } else {
        return next();
    }
}

module.exports={
    isRestaurant,
    isAdmin,
    isUser,
}

