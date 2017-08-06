'use strict';

import { Operation } from '../enums/operation.js';
import { Account } from './account.js';
import { Order, OrderUtil } from './order.js';
import { Position, PositionUtil } from './position.js';

/** Direction data. */
export class Direction {
    /**
     * Initialize new object.
     * @param {number} operation Operation type.
     * @param {string} positionId Position model ID.
     * @param {Position} position New position model.
     * @param {string} orderId Order model ID.
     * @param {Order} order New order model.
     */
    constructor(
        operation = Operation.ORDER,
        positionId = '',
        position = new Position(),
        orderId = '',
        order = new Position(),
    ) {
        this._operation = operation;
        this._positionId = positionId;
        this._position = position;
        this._orderId = orderId;
        this._order = order;
    }

    /** Operation type. */
    get operation() {
        return this._operation;
    }

    /** Position model ID. */
    get positionId() {
        return this._positionId;
    }

    /** New position model. */
    get position() {
        return this._position;
    }

    /** Order model ID. */
    get orderId() {
        return this._orderId;
    }

    /** New order model. */
    get order() {
        return this._order;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Direction} Direction object.
     */
    clone(override = {}) {
        const result =
            new Direction(
                Utils.getValue('operation', override, this.operation),
                Utils.getValue('positionId', override, this.positionId),
                PositionUtil.load(Utils.getValue('position', override, this.position)),
                Utils.getValue('orderId', override, this.orderId),
                OrderUtil.load(Utils.getValue('order', override, this.order)));
        return result;
    }
}

/** Extension of Direction data. */
export class DirectionUtil {
    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Direction} Direction object.
     */
    static load(raw = {}) {
        return new Direction().clone(raw);
    }
}