'use strict';

/** Currency pairs. */
export const Pair =
    Object.freeze({
        EURUSD: 0,
        EURCHF: 1,
        EURGBP: 2,
        EURJPY: 3,
        EURAUD: 4,
        USDCAD: 5,
        USDCHF: 6,
        USDJPY: 7,
        USDMXN: 8,
        GBPCHF: 9,
        GBPJPY: 10,
        GBPUSD: 11,
        AUDJPY: 12,
        AUDUSD: 13,
        CHFJPY: 14,
        NZDJPY: 15,
        NZDUSD: 16,
        XAUUSD: 17,
        EURCAD: 18,
        AUDCAD: 19,
        CADJPY: 20,
        EURNZD: 21,
        GRXEUR: 22,
        NZDCAD: 23,
        SGDJPY: 24,
        USDHKD: 25,
        USDNOK: 26,
        USDTRY: 27,
        XAUAUD: 28,
        AUDCHF: 29,
        AUXAUD: 30,
        EURHUF: 31,
        EURPLN: 32,
        FRXEUR: 33,
        HKXHKD: 34,
        NZDCHF: 35,
        SPXUSD: 36,
        USDHUF: 37,
        USDPLN: 38,
        USDZAR: 39,
        XAUCHF: 40,
        ZARJPY: 41,
        BCOUSD: 42,
        ETXEUR: 43,
        EURCZK: 44,
        EURSEK: 45,
        GBPAUD: 46,
        GBPNZD: 47,
        JPXJPY: 48,
        UDXUSD: 49,
        USDCZK: 50,
        USDSEK: 51,
        WITUSD: 52,
        XAUEUR: 53,
        AUDNZD: 54,
        CADCHF: 55,
        EURDKK: 56,
        EURNOK: 57,
        EURTRY: 58,
        GBPCAD: 59,
        NSXUSD: 60,
        UKXGBP: 61,
        USDDKK: 62,
        USDSGD: 63,
        XAGUSD: 64,
        XAUGBP: 65,
        __length: 66
    });

/** Extension of currency pairs. */
export class PairUtil {
    /**
     * Get stringed value.
     * @param {number} pair Currency pair.
     * @return {string} Stringed value.
     */
    static toStr(pair = Pair.USDJPY) {
        switch (pair) {
            case Pair.EURUSD:
                return 'EURUSD';
            case Pair.EURCHF:
                return 'EURCHF';
            case Pair.EURGBP:
                return 'EURGBP';
            case Pair.EURJPY:
                return 'EURJPY';
            case Pair.EURAUD:
                return 'EURAUD';
            case Pair.USDCAD:
                return 'USDCAD';
            case Pair.USDCHF:
                return 'USDCHF';
            case Pair.USDJPY:
                return 'USDJPY';
            case Pair.USDMXN:
                return 'USDMXN';
            case Pair.GBPCHF:
                return 'GBPCHF';
            case Pair.GBPJPY:
                return 'GBPJPY';
            case Pair.GBPUSD:
                return 'GBPUSD';
            case Pair.AUDJPY:
                return 'AUDJPY';
            case Pair.AUDUSD:
                return 'AUDUSD';
            case Pair.CHFJPY:
                return 'CHFJPY';
            case Pair.NZDJPY:
                return 'NZDJPY';
            case Pair.NZDUSD:
                return 'NZDUSD';
            case Pair.XAUUSD:
                return 'XAUUSD';
            case Pair.EURCAD:
                return 'EURCAD';
            case Pair.AUDCAD:
                return 'AUDCAD';
            case Pair.CADJPY:
                return 'CADJPY';
            case Pair.EURNZD:
                return 'EURNZD';
            case Pair.GRXEUR:
                return 'GRXEUR';
            case Pair.NZDCAD:
                return 'NZDCAD';
            case Pair.SGDJPY:
                return 'SGDJPY';
            case Pair.USDHKD:
                return 'USDHKD';
            case Pair.USDNOK:
                return 'USDNOK';
            case Pair.USDTRY:
                return 'USDTRY';
            case Pair.XAUAUD:
                return 'XAUAUD';
            case Pair.AUDCHF:
                return 'AUDCHF';
            case Pair.AUXAUD:
                return 'AUXAUD';
            case Pair.EURHUF:
                return 'EURHUF';
            case Pair.EURPLN:
                return 'EURPLN';
            case Pair.FRXEUR:
                return 'FRXEUR';
            case Pair.HKXHKD:
                return 'HKXHKD';
            case Pair.NZDCHF:
                return 'NZDCHF';
            case Pair.SPXUSD:
                return 'SPXUSD';
            case Pair.USDHUF:
                return 'USDHUF';
            case Pair.USDPLN:
                return 'USDPLN';
            case Pair.USDZAR:
                return 'USDZAR';
            case Pair.XAUCHF:
                return 'XAUCHF';
            case Pair.ZARJPY:
                return 'ZARJPY';
            case Pair.BCOUSD:
                return 'BCOUSD';
            case Pair.ETXEUR:
                return 'ETXEUR';
            case Pair.EURCZK:
                return 'EURCZK';
            case Pair.EURSEK:
                return 'EURSEK';
            case Pair.GBPAUD:
                return 'GBPAUD';
            case Pair.GBPNZD:
                return 'GBPNZD';
            case Pair.JPXJPY:
                return 'JPXJPY';
            case Pair.UDXUSD:
                return 'UDXUSD';
            case Pair.USDCZK:
                return 'USDCZK';
            case Pair.USDSEK:
                return 'USDSEK';
            case Pair.WITUSD:
                return 'WITUSD';
            case Pair.XAUEUR:
                return 'XAUEUR';
            case Pair.AUDNZD:
                return 'AUDNZD';
            case Pair.CADCHF:
                return 'CADCHF';
            case Pair.EURDKK:
                return 'EURDKK';
            case Pair.EURNOK:
                return 'EURNOK';
            case Pair.EURTRY:
                return 'EURTRY';
            case Pair.GBPCAD:
                return 'GBPCAD';
            case Pair.NSXUSD:
                return 'NSXUSD';
            case Pair.UKXGBP:
                return 'UKXGBP';
            case Pair.USDDKK:
                return 'USDDKK';
            case Pair.USDSGD:
                return 'USDSGD';
            case Pair.XAGUSD:
                return 'XAGUSD';
            case Pair.XAUGBP:
                return 'XAUGBP';
            default:
                return '';
        }
    }
    static * iter() {
        for (let i of PairUtil.iteri()) {
            yield PairUtil.toStr(i);
        }
    }
    static * iteri() {
        for (let i = 0; i < Pair.__length; i++) {
            yield i;
        }
    }
    static * iterkv() {
        for (let i of PairUtil.iteri()) {
            yield { key: i, value: PairUtil.toStr(i) };
        }
    }
}