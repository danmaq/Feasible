'use strict';

/** Object list of parser by type string key. */
export const to =
    Object.freeze({
        int: Number.parseInt,
        float: Number.parseFloat,
        string: (x = '') => x,
    });

/**
 * Parse inputed form.
 * @param {object} target Event target.
 * @param {object} params Params object list.
 * @return {object} Parsed object.
 */
export const parse =
    (target, params = {}) => {
        const map = (key = '') => ({
            [key]: params[key](target[key].value)
        });
        return Object.assign({}, ...Object.keys(params).map(map));
    };