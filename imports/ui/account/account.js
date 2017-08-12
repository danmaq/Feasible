'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { PairUtil } from '../../core/enums/pair.js';

import Account from '../../core/models/account.js';

import './account.html';

/** Get template data. */
const getData = () => Template.instance().data;

/** Get Account data from template data. */
const getAccount = () => Account.load(getData());

/** Stringed currency pair. */
const strPair = () => PairUtil.toStr(getAccount().pair);

Template.account.helpers({ "strPair": strPair, });
Template.account.events({
    "click .fe-delete": event => {
        event.preventDefault();
        const msg =
            `${strPair()} account will remove. This operation can't be undone. Are you ok?`;
        if (confirm(msg)) {
            Meteor.call('accounts.remove', getData()._id);
        }
    },
});