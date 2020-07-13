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
                    <a-dropdown-button v-if="formats.length > 1" @click="downloadPriceList(formats[0])">
                        Скачать PriceList
                        <a-menu slot="overlay">
                            <a-menu-item
                                    class="text-uppercase"
                                    v-for="(format) in formats"
                                    :key="format.format"
                                    @click="downloadPriceList(format)">
                                {{ format.format }}
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown-button>
                    <a-button v-else-if="1 === formats.length" @click="downloadPriceList(formats[0])">
                        Скачать PriceList
                    </a-button>
                </template>
            </a-page-header>
        </div>
    </div>
</template>

<script>
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
                return window.FORMATS;
            }
        },
        methods: {
            changeListState: function () {
                if (true === this.listState) {
                    this.$eventBus.$emit('closeAll');
                } else {
                    this.$eventBus.$emit('openAll');
                }
            },
            downloadPriceList: function (format) {
                window.open(format.url);
            },
            setDefaultPrice: function (code) {
                let currency = this.$helper.getCurrencyByCode(code, this.currencies);
                this.$store.commit('setCurrency', currency);
            }
        }
    }
</script>