'use strict';

/** Utility class. */
export class Utils {
    static toPips(cur) { return cur / 100; }
    static toCurrency(pip) { return pip * 100; }

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
            _key in values ? values[_key] :
            key in values ? values[key] :
            alt;
        return result;
    }
}