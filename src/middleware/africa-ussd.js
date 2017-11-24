'use strict';
const options = {
    apiKey: '2d4e0c15346ba6e810bcfd74ed300cb4042a000fba6effeadbcb775e538bce44',         // Use sandbox API key for sandbox development
    username: 'sandbox',      // Use "sandbox" for sandbox development
};
const promise = [];

const UssdMenu = require('ussd-menu-builder');
let menu = new UssdMenu();
var localStorage;
menu.sessionConfig({
    start: (sessionId, callback) => {
        // initialize current session if it doesn't exist
        // this is called by menu.run()
        // if (!(sessionId in sessions))
        //  sessions[sessionId] = {};
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage(sessionId);
        }
        callback();
    },
    end: (sessionId, callback) => {
        // clear current session
        // this is called by menu.end()
        // delete sessions[sessionId];
        localStorage.removeItem(sessionId);
        localStorage.clear();
        callback();
    },
    set: (sessionId, key, value, callback) => {
        // store key-value pair in current session
        // sessions[sessionId][key] = value;
        // console.log(sessionId);
        // console.log(key);
        // console.log(value)
        localStorage.setItem(key, value)
        callback();
    },
    get: (sessionId, key, callback) => {
        // retrieve value by key in current session
        // let value = sessions[sessionId][key];
        let value = localStorage.getItem(key)
        callback(null, value);
    }
});





menu.startState({
    run: () => {
        // use menu.con() to send response without terminating session      
        menu.con('Welcome. Health Insurance Platform:' +
            '\n1. Sign Up' +
            '\n2. Premium Payment');
    },
    // next object links to next state based on user input
    next: {
        '1': 'signUp',
        '2': 'premiumPayment'
    }
});

menu.state('signUp', {
    run: () => {
        menu.con('Choose:' +
            '\n1. Register' +
            '\n2. Choose Plan' +
            '\n3. Add Dependant' +
            '\n4. Add Next Of Kin' +
            '\n5. Get Your Policy ID');
    },
    next: {
        '1': 'register',
        '2': 'choosePlan',
        '3': 'addDependant',
        '4': 'addNextOfKin',
        '5': 'getPolicy'
    }
});

menu.state('register', {
    run: () => {
        menu.con('Enter Your LastName:');
    },
    next: {
        '*[a-zA-Z]+': 'register.firstName'
    }
});

menu.state('register.firstName', {
    run: () => {
        let lastName = menu.val;
        console.log(lastName)
        menu.session.set('lastName', lastName)
            .then(() => {
                menu.con(lastName + ' enter your first name');
            })
    },
    next: {
        '*[a-zA-Z]+': 'register.gender'
    }
});
menu.state('register.gender', {
    run: () => {
        let firstName = menu.val;
        menu.session.set('firstName', firstName)
            .then(() => {
                menu.con('Choose Your Gender:' +
                    '\n1. Male' +
                    '\n2. Female');
            })
    },
    next: {
        '1': 'return',
        '2': 'return'
    }
});
menu.state('return', {
    run: () => {
        menu.session.get('lastName').then(lastName => {
            console.log(lastName)
            menu.end(lastName);
        })
    }
});

menu.state('choosePlan', {
    run: () => {
        menu.end('You have choosen to select plan:');
    },
    next: {
        // using regex to match user input to next state
        '*\\d+': 'buyAirtime.amount'
    }
});

// nesting states
// menu.state('buyAirtime.amount', {
//     run: () => {
//         // use menu.val to access user input value
//         var amount = Number(menu.val);
//         buyAirtime(menu.args.phoneNumber, amount).then(function (res) {
//             menu.end('Airtime bought successfully.');
//         });
//     }
// });

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

