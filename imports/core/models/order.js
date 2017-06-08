'use strict';

import { Exchange } from '../enums/exchange.js'
import { Trade } from '../enums/trade.js'
import { Rate } from './rate.js'

/** Order model. */
export class Order {
    /**
     * Initialize new object.
     * @param exchange Exchange type.
     * @param trade Limit trade type.
     * @param price Limit price.
     * @param quantity Ordered quantity.
     * @param takeProfit Take profit.
     */
    constructor(
        exchange = Exchange.Buy,
        trade = Trade.Order,
        price = 0,
        quantity = 1,
        takeProfit = NaN) {
        this._exchange = exchange;
        this._trade = trade;
        this._price = price;
        this._quantity = quantity;
        this._takeProfit = takeProfit;
    }

    /** Exchange type. */
    get exchange() {
        return this._exchange;
    }

    /** Limit trade type. */
    get trade() {
        return this._trade;
    }

    /** Limit price. */
    get price() {
        return this._price;
    }

    /** Ordered quantity. */
    get quantity() {
        return this._quantity;
    }

    /** Take profit. */
    get takeProfit() {
        return this._takeProfit;
    }
}