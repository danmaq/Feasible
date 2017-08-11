'use strict';

import { Pair, PairUtil } from '../enums/pair.js';

import { IdModel } from './idModel.js';
import { Position } from './position.js';
import { Order } from './order.js';
import { Order } from './order.js';
import { Rate } from './rate.js';
import { Swap } from './swap.js';
import { Preference } from './order.js';

/** Account data. */
export class Account extends IdModel {
    /** Empty object. */
    static empty =
        Object.freeze(new Account({ "positions": [], "orders": [] }));

    /** Initialize new object. */
    constructor({
        rate = new Rate(),
        swap = new Swap(),
        preference
        column = 3,
        lot = 10000,
        multiply = 0.01,
        step = 1.0,
        martingale = 2,
        positions = [new Position()],
        orders = [new Order()],
        directions = [new Order()]
    } = {}) {
        super();
        this._pair = pair;
        this._rate = rate;
        this._swap = swap;
        this._column = column;
        this._lot = lot;
        this._multiply = multiply;
        this._step = step;
        this._martingale = martingale;
        this._positions = positions;
        this._orders = orders;
    }

    /** Currency pair. */
    get pair() {
        return this._pair;
    }

    /** Exchange rate data. */
    get rate() {
        return this._rate;
    }

    /** Swap point. */
    get swap() {
        return this._swap;
    }

    /** Column of pips. */
    get column() {
        return this._column;
    }

    /** Lot unit. */
    get lot() {
        return this._lot;
    }

    /** Initial multiply rate. */
    get multiply() {
        return this._multiply;
    }

    /** Step range of next action (PIPS). */
    get step() {
        return this._step;
    }

    /** Martingale rate. */
    get martingale() {
        return this._martingale;
    }

    /** Positions collection. */
    get positions() {
        return this._positions;
    }

    /** Orders collection. */
    get orders() {
        return this._orders;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Account} Account object.
     */
    innerClone(override = {}) {
        const result =
            new Account({
                "pair": this.importValue('pair', override),
                "rate": Rate.load(this.importValue('rate', override)),
                "swap": Swap.load(this.importValue('swap', override)),
                "column": this.importValue('column', override),
                "lot": this.importValue('lot', override),
                "multiply": this.importValue('multiply', override),
                "step": this.importValue('step', override),
                "martingale": this.importValue('martingale', override),
                "positions": this.importValue('positions', override),
                "orders": this.importValue('orders', override),
            });
        return result;
    }

    /**
     * Export object data for Mongo.
     * @return {object} data object.
     */
    exportWithoutId() {
        let result = super.exportWithoutId();
        result._rate = this.rate.exportWithoutId();
        return result;
    }

    /** Load from de-serialized object. */
    static load = (raw = {}) => Account.empty.clone(raw);
}

/** Extension of Account data. */
export class AccountUtil {
    /** Culculate minimum step. */
    static minStep = (account = new Account()) =>
        Math.pow(10, -account.column);
}