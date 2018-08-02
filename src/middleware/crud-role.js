'use strict';
/*
 * API to delete role from a user
 */
// Required data: userId, roleId.
// Optional data: none
module.exports = function(app) {
    return function(req, res, next) {
        const userId = req.body.userId;
        const roleId = req.body._id;

        // Get the user data.
        app.service('users').get(userId).then(userData => {
            if (userData._id && userData.roles.length > 0) {
                const newRoles = userData.roles.filter(x => x._id.toString() !== roleId);
                // Replace the new array with the old one
                userData.roles = newRoles;

                // Update the users data
                app.service('users').patch(userData._id, userData, {}).then(updatedData => {
                    if (updatedData._id) {
                        res.send(updatedData);
                        next;
                    }
                });
            }
        }).catch(next);
    };

    res.send({ response: result });
    next;
}