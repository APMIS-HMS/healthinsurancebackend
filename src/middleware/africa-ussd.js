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
        menu.con('Welcome. Choose option:' +
            '\n1. Show Balance' +
            '\n2. Buy Airtime');
    },
    // next object links to next state based on user input
    next: {
        '1': 'showBalance',
        '2': 'buyAirtime'
    }
});

menu.state('showBalance', {
    run: () => {
        // fetch balance
        // fetchBalance(menu.args.phoneNumber).then(function (bal) {
        //     // use menu.end() to send response and terminate session
        //     menu.end('Your balance is KES ' + bal);
        // });
        console.log('1');
        console.log(app);
        app.service('policies').find({query:{
            policyId:'P00001'
        }}).then(payload => {
            console.log('fine')
            menu.end('Your balance is KES ' + payload.data[0].policyId);
        }).catch(err => {
            console.log('error')
            menu.end('ERROR');
        });
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
    console.log(_app);
    return function (req, res, next) {
        menu.run(req.body, ussdResult => {
            res.send(ussdResult);
        });

    };
}

