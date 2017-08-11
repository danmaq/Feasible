'use strict';

import { Operation } from '../enums/operation.js';

import Model from './model.js';
import Position from './position.js';
import Order from './order.js';

/** Direction data. */
export default class Direction extends Model {
    /** Initialize new object. */
    constructor({
        operation = Operation.ORDER,
        position = new Position(),
        order = new Order(),
    } = {}) {
        super();
        this._operation = operation;
        this._position = position;
        this._order = order;
    }

    /** Operation type. */
    get operation() {
        return this._operation;
    }

    /** New position model. */
    get position() {
        return this._position;
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
            new Direction({
                "operation": this.getValue('operation', override),
                "position": Position.load(this.getValue('position', override)),
                "order": Order.load(this.getValue('order', override))
            });
        return result;
    }

    /** Load from de-serialized object. */
    static load = (raw = {}) => new Direction().clone(raw);
}
