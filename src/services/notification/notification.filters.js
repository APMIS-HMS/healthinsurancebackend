module.exports = function (data, connection, hook) {
    if (user.userType.name === 'Beneficiary') {
        return data;
    } else if (user.userType.name === 'Health Insurance Agent') {
        return data;
    }
};