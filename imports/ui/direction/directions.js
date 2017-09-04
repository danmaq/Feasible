'set strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import AI from '../../core/ai.js';

import AccountUtil from '../account/accountUtil.js';

import './directions.html';
import './direction.js';

/** Get next directions. */
const next = () => AI.next(AccountUtil.loadAccount());

Template.directions.onCreated(AccountUtil.subscribe);
Template.directions.helpers({
    directionLength: () => next().length,
    directions: next,
});