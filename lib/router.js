'use strict';

FlowRouter.route('/account/:accountId', {
    "action" (params, queryParams) {
        console.log("Yeah! We are on the account:", params.postId);
    },
});
FlowRouter.route('/', {
    "name": "home",
    "action" (params, queryParams) {
        BlazeLayout.render('body', { "main": "lp" });
    },
});
FlowRouter.route('/account', {
    "name": "accounts.show",
    "action" (params, queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.go('home');
        }
        BlazeLayout.render('positions');
    },
});
FlowRouter.route('/account/:accountId', {
    "action" (params, queryParams) {},
});