<template>
    <div class="container-fluid">
        <div class="row">
            <a-page-header title="Прайс-лист" class="w-100">
                <template slot="extra">
                    <a-dropdown>
                        <a-menu slot="overlay">
                            <a-menu-item key="1">$</a-menu-item>
                            <a-menu-item key="2">грн</a-menu-item>
                        </a-menu>
                        <a-button>
                            <span>Валюта: $</span>
                            <a-icon style="vertical-align: 0.125em;" type="down"/>
                        </a-button>
                    </a-dropdown>
                    <a-button @click="changeListState" class="mr-1">
                        {{ listState ? 'Свернуть всё': 'Развернуть всё'}}
                    </a-button>
                    <a-dropdown-button @click="downloadPriceList('xlsx')">
                        Скачать PriceList
                        <a-menu slot="overlay">
                            <a-menu-item key="1" @click="downloadPriceList('xlsx')">XLSX</a-menu-item>
                            <a-menu-item key="2" @click="downloadPriceList('json')">JSON</a-menu-item>
                        </a-menu>
                    </a-dropdown-button>
                </template>
            </a-page-header>
        </div>
    </div>
</template>

<script>
    import {EventBus} from '../main.js'

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
            }
        },
        methods: {
            changeListState: function () {
                if (true === this.listState) {
                    EventBus.$emit('closeAll');
                } else {
                    EventBus.$emit('openAll');
                }
                this.listState = !this.listState;
            },
            downloadPriceList: function (format) {
                switch (format) {
                    case 'xlsx':
                        window.open('/files/price_list.xlsx');
                        break;
                    case 'json':
                        window.open('/index.php?route=common/prices/getCategoriesProductsAndInformation');
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>