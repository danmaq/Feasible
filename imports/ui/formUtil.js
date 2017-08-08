'use strict';

export const types =
    Object.freeze({
        "int": Number.parseInt,
        "float": Number.parseFloat,
        "string": (x = '') => x,
    });

export const parse =
    (target, params = {}) => {
        const keys = Object.keys(params);
        const map =
            (k = '') => ({ "key": k, "value": params[k](target[k].value)});
        let result = {};
        for (let item of keys.map(map))
        {
            result[item.key] = item.value;
        }
        return result;
    };
