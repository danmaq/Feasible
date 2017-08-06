'use strict';

/** Utility class. */
export class Utils {
    /**
     * Get class property.
     * @param {string} key Key string.
     * @param {object} values Data source.
     * @param {object} alt Result value when key or _key are not found in values.
     * @return {object} value.
     */
    static getValue(key = '', values = new Object(), alt = null) {
        const _key = `_${key}`;
        const result =
            values && _key in values ? values[_key] :
            values && key in values ? values[key] :
            alt;
        return result;
    }
}