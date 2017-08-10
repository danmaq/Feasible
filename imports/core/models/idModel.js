'use strict'

import { Model } from './model.js';

/** Mongo model data. */
export class IdModel extends Model {
    /** Key string for Mongo. */
    _id = '';

    /** Key string for Mongo. */
    get id() {
        return this._id;
    }

    /**
     * Export object data for Mongo.
     * @return {object} data object.
     */
    exportWithoutId() {
        let result = Object.assign({}, this);
        delete result['_id'];
        return result;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Model} Model object.
     */
    clone(override = {}) {
        const model = super.clone(override);
        model._id = this.importValue('id', override);
        return model;
    }
}
