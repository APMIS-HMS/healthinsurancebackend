'use strict';
const options = {
    apiKey: '2d4e0c15346ba6e810bcfd74ed300cb4042a000fba6effeadbcb775e538bce44',         // Use sandbox API key for sandbox development
    username: 'sandbox',      // Use "sandbox" for sandbox development
};
const promise = [];

const UssdMenu = require('ussd-menu-builder');
let menu = new UssdMenu();

menu.startState({
    run: () => {
        // use menu.con() to send response without terminating session      
        menu.con('Welcome. Health Insurance Platform:' +
            '\n1. SIGN UP' +
            '\n2. PREMIUM PAYMENT');
    },
    // next object links to next state based on user input
    next: {
        '1': 'SIGN UP',
        '2': 'PREMIUM PAYMENT'
    }
});

menu.state('SIGN UP', {
    run: () => {
        menu.con('Choose:' +
            '\n1. REGISTER' +
            '\n2. CHOOSE PLAN' +
            '\n3. ADD DEPENDENTS' +
            '\n2. ADD NEXT OF KIN' +
            '\n2. GET POLICY ID');
    }
});

menu.state('buyAirtime', {
    run: () => {
        menu.con('Enter amount:');
    },
    next: {
        // using regex to match user input to next state
        '*\\d+': 'buyAirtime.amount'
    }
});

// nesting states
menu.state('buyAirtime.amount', {
    run: () => {
        // use menu.val to access user input value
        var amount = Number(menu.val);
        buyAirtime(menu.args.phoneNumber, amount).then(function (res) {
            menu.end('Airtime bought successfully.');
        });
    }
});

const AfricasTalking = require('africastalking')(options);
let _app;
module.exports = function (app) {
    _app = app;
    return function (req, res, next) {
        menu.run(req.body, ussdResult => {
            res.send(ussdResult);
        });

    };
}

