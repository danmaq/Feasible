'use strict';

const getBackIfGuest =
    () => {
        if (!Meteor.userId()) {
            FlowRouter.go('home');
        }
    };
FlowRouter.route('/', {
    "name": "home",
    "action" (params, queryParams) {
        BlazeLayout.render('body', { "main": "lp" });
    },
});
FlowRouter.route('/account', {
    "name": "accounts.show",
    "action" (params, queryParams) {
        getBackIfGuest();
        BlazeLayout.render('body', { "main": "accounts" });
    },
});
FlowRouter.route('/account/:accountId', {
    "action" (params, queryParams) {
        console.log("Yeah! We are on the account:", params.accountId);
        getBackIfGuest();
        BlazeLayout.render('body', { "main": "positions" });
    },
});