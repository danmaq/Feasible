'use strict';

const getBackIfGuest =
    () => {
        if (!Meteor.userId()) {
            FlowRouter.go('home');
        }
    };
FlowRouter.route('/', {
    name: "home",
    action: (params, queryParams) =>
        BlazeLayout.render('body', { "main": "lp" });
});
FlowRouter.route('/account', {
    name: "accounts.show",
    action: (params, queryParams) => {
        getBackIfGuest();
        BlazeLayout.render('body', { "main": "accounts" });
    },
});
FlowRouter.route('/account/:accountId', {
    name: "account.show",
    action: (params, queryParams) => {
        getBackIfGuest();
        BlazeLayout.render('body', { "main": "accountDetail" });
    },
});
FlowRouter.route('/account/:accountId/modify', {
    name: "account.modify",
    action: (params, queryParams) => {
        getBackIfGuest();
        BlazeLayout.render('body', { "main": "accountModify" });
    },
});