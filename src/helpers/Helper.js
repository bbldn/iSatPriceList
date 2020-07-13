export default {
    getDefaultCurrency: function (currencies) {
        for (let currency of currencies) {
            if (true === currency.default) {
                return currency;
            }
        }

        return {value: 1.0, code: 'USD', symbol_left: '$'};
    },
    getCurrencyByCode: function (code, currencies) {
        for (let currency of currencies) {
            if (code === currency.code) {
                return currency;
            }
        }

        return {value: 1.0, code: 'USD', symbol_left: '$'};
    }
};