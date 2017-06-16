'use strict';

import { Template } from 'meteor/templating';

import { Account } from '../core/models/account.js';
import { Order } from '../core/models/order.js';
import { Position } from '../core/models/position.js';
import { Rate } from '../core/models/rate.js';
import { Swap } from '../core/models/swap.js';

import './body.html';

console.log(JSON.stringify(new Account()));
console.log(JSON.stringify(new Order()));
console.log(JSON.stringify(new Position()));
console.log(JSON.stringify(new Rate()));
console.log(JSON.stringify(new Swap()));

Template.body.helpers({

});

Template.body.events({

});