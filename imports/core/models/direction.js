'use strict';

import { Model } from './model.js';
import { Operation } from '../enums/operation.js';
import { Account } from './account.js';
import { Order, OrderUtil } from './order.js';
import { Position, PositionUtil } from './position.js';

/** Direction data. */
export class Direction extends Model {
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
        order = new Order(),
    ) {
        super();
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
    innerClone(override = {}) {
        const result =
            new Direction(
                this.importValue('operation', override),
                this.importValue('positionId', override),
                PositionUtil.load(this.importValue('position', override)),
                this.importValue('orderId', override),
                OrderUtil.load(this.importValue('order', override)));
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