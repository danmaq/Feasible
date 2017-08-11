'use strict';

import { Exchange } from '../enums/exchange.js';
import { Operation } from '../enums/operation.js';

import { Account } from '../models/account.js';
import { Rate, RateUtil } from '../models/rate.js';
import { Direction } from '../models/direction.js';
import { Order } from '../models/order.js';
import { Position } from '../models/position.js';


/** AI Logic. */
export class AI {
    constructor({
        account = new Account(),
        orders = [new Order()],
        positions = [new Position()]
    }) {

    }
}
export class AIUtil {
    static init = (account = new Account()) =>
        new AI({ "account": account, "orders": [], "positions": [] });
}