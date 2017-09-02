'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ExchangeKV } from '../../core/enums/exchange.js';

import Account from '../../core/models/account.js';
import Position from '../../core/models/position.js';
import Rate from '../../core/models/rate.js';

import AccountUtil from '../account/accountUtil.js';
import formUtil from '../formUtil.js';

import './positions.html';
import './position.js';

/** Default position instance. */
const DEFAULT_POSITION = new Position();

/** Convert function: String to Number. */
const TO_FLOAT = formUtil.to.float;

/** Convert function: String to integer (number). */
const TO_INT = formUtil.to.int;

/** Get positions. */
const positions = () => AccountUtil.tryGet([], a => a.positions);

Template.positions.onCreated(AccountUtil.subscribe);
Template.positions.helpers({
    accountId: () => AccountUtil.tryGet('', a => a.id),
    positions: positions,
    rate: () => AccountUtil.tryGet(new Rate(), a => a.rate),
    positionLength: () => positions().length,
    price: () => AccountUtil.tryGet(0, a => a.rate.ask),
    quantity: DEFAULT_POSITION.quantity,
    exchanges: ExchangeKV,
});
Template.positions.events({
    "submit #fe-add-position": event => {
        event.preventDefault();
        const formParams =
            formUtil.parse(
                event.target, {
                    price: TO_FLOAT,
                    quantity: TO_INT,
                    exchange: TO_INT,
                    takeProfit: TO_FLOAT,
                });
        const next = [Position.load(formParams), ...positions()];
        const params = {
            accountId: AccountUtil.accountId(),
            positions: next.map(p => ({...p}))
        };
        Meteor.call('accounts.updatePositions', params);
        AccountUtil.unloadAccount();
    },
});