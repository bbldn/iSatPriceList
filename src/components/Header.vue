<template>
    <div class="container-fluid">
        <div class="row">
            <a-page-header title="Прайс-лист" class="w-100">
                <template slot="extra">
                    <a-dropdown>
                        <a-menu slot="overlay">
                            <a-menu-item
                                    v-for="currency in currencies"
                                    :key="currency.currency_id"
                                    @click="setDefaultPrice(currency.code)"
                            >
                                {{ currency.code }}
                            </a-menu-item>
                        </a-menu>
                        <a-button>
                            <span>Валюта: {{ defaultCurrency.code }}</span>
                            <a-icon style="vertical-align: 0.125em;" type="down"/>
                        </a-button>
                    </a-dropdown>
                    <a-button @click="changeListState" class="mr-1">
                        {{ true === listState ? 'Свернуть всё': 'Развернуть всё'}}
                    </a-button>
                    <a-dropdown-button v-if="Object.keys(formats).length > 0">
                        Скачать PriceList
                        <a-menu slot="overlay">
                            <a-menu-item
                                    v-for="(format, key) in formats"
                                    :key="key"
                                    @click="downloadPriceList(index)">
                                {{ key }}
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown-button>
                </template>
            </a-page-header>
        </div>
    </div>
</template>

<script>
    import {EventBus} from '../main.js'
    import Helper from '../helpers/Helper';

    export default {
        name: "Header",
        computed: {
            listState: function () {
                for (let value of this.$store.state.current.categories) {
                    if (true === value.opened) {
                        return true;
                    }
                }

                return false;
            },
            currencies: function () {
                return this.$store.state.currencies;
            },
            defaultCurrency: function () {
                return this.$store.state.currency;
            },
            formats: function () {
                if (false === Object.prototype.hasOwnProperty.call(window, 'FORMATS')) {
                    return {};
                }

                if (false === (FORMATS instanceof Object)) {
                    return {};
                }

                /* global FORMATS */
                return FORMATS;
            }
        },
        methods: {
            changeListState: function () {
                if (true === this.listState) {
                    EventBus.$emit('closeAll');
                } else {
                    EventBus.$emit('openAll');
                }
            },
            downloadPriceList: function (format) {
                if (undefined !== this.formats[format]) {
                    window.open(this.formats[format]);
                }
            },
            setDefaultPrice: function (code) {
                let currency = Helper.getCurrencyByCode(code, this.currencies);
                this.$store.commit('setCurrency', currency);
            }
        }
    }
</script>