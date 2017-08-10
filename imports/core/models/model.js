'use strict'

/** Mongo model data. */
export class Model {
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
        return this.innerClone(override);
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