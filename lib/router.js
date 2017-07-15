'use strict';

FlowRouter.route('/account/:accountId', {
    "action" (params, queryParams) {
        console.log("Yeah! We are on the account:", params.postId);
    },
});
FlowRouter.route('/', {
    "action" (params, queryParams) {

    },
});
FlowRouter.route('/account', {
    "action" (params, queryParams) {

    },
});
FlowRouter.route('/account/:accountId', {
    "action" (params, queryParams) {},
});