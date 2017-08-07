'use strict'

/** Mongo model data. */
export class Model {
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
     * Get class property from extern object.
     * @param {string} key key name.
     * @param {object} extern Data store.
     * @return {object} property value.
     */
    importValue(key = '', extern = {}) {
        const _key = `_${key}`;
        const result = !!extern && _key in extern ? extern[_key] :
            !!extern && key in extern ? extern[key] :
            this[_key];
        return result;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Model} Model object.
     */
    clone(override = {}) {
        const model = this.innerClone(override);
        model._id = this.importValue('id', override);
        return model;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Model} Model object.
     */
    innerClone(override = {}) {
        return new Model();
    }
}