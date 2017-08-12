'use strict';

import Preference from '../../core/models/preference.js';
import Swap from '../../core/models/swap.js';

import formUtil from '../formUtil.js';

import './form.html';

/** Convert function: String to Number. */
const TO_FLOAT = formUtil.to.float;

/** Convert function: String to integer (number). */
const TO_INT = formUtil.to.int;

/** Template for parsing. */
const paramsTemplate =
    Object.freeze({
        "swap-long": TO_FLOAT,
        "swap-short": TO_FLOAT,
        "column": TO_INT,
        "lot": TO_INT,
        "mul": TO_FLOAT,
        "step": TO_FLOAT,
        "martingale": TO_FLOAT,
    });

/** Extension for account form. */
export class AccountFormUtil {
    /** Template for parsing. */
    static get paramsTemplate() {
            return paramsTemplate;
        }
        /** Create parameters. */
    static params =
        (target, template = paramsTemplate, preference = new Preference()) => {
            const formParams = formUtil.parse(event.target, template);
            const swapParams = {
                "long": formParams['swap-long'],
                "short": formParams['swap-short']
            };
            const result = {
                "preference": {...preference.clone(formParams) },
                "swap": {...Swap.load(swapParams) },
            };
            return result;
        };
}