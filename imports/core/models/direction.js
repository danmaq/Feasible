'use strict';

import { Operation } from '../enums/operation.js';

import { IdModel } from './idModel.js';
import { Account } from './account.js';
import { Order } from './order.js';
import { Position } from './position.js';

/** Direction data. */
export class Direction extends IdModel {
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
    innerClone(override = {}) {
        const result =
            new Direction({
                "operation": this.importValue('operation', override),
                "position": Position.load(this.importValue('position', override)),
                "order": Order.load(this.importValue('order', override))
            });
        return result;
    }

    /** Load from de-serialized object. */
    static load = (raw = {}) => new Direction().clone(raw);
}

/** Extension of Direction data. */
export class DirectionUtil {
    static next = ({positions = [new Position()], orders = [new Order()]}) => {
        if(positions.length === 0) {
            return [];
        }
        return [];
    };
}