<template>
    <div class="row products">
        <div class="col-12">
            <a-table :columns="columns"
                     :dataSource="products"
                     :rowKey="row => row.product_id"
            >
                <a slot="name"
                   slot-scope="text, row"
                   :href="`/index.php?route=product/product&product_id=${row.product_id}`"
                >
                    {{ row.name }}
                </a>
                <span slot="price" slot-scope="text">
                    {{ defaultCurrency.symbol_left }}
                    {{ Math.toFixed(text * defaultCurrency.value, defaultCurrency.decimal_place) }}
                    {{ defaultCurrency.symbol_right }}
                </span>
                <a-input-number
                        slot="count"
                        slot-scope="text, row"
                        v-model="row.count"
                        :min="1"
                        :step="1"
                        :formatter="value => (value + '').replace(/[^0-9]/, '')"
                />
                <a-icon type="shopping-cart" slot="buy" slot-scope="text, row" class="cart" @click="buy(row)"/>
            </a-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductTable",
        props: {
            products: Array,
        },
        methods: {
            buy: function (row) {
                /* global cart */
                cart.add(row.product_id, row.count);
            }
        },
        computed: {
            defaultCurrency: function () {
                return this.$store.state.currency;
            },
            columns: function () {
                let width = ['65%', '15%', '0', '15%', '5%',];
                if (this.$store.state.user.groupId > 1) {
                    width[2] = '15%';
                }

                let data = [
                    {
                        title: 'Наименование',
                        dataIndex: 'name',
                        sorter: (a, b) => a.name.localeCompare(b.name),
                        width: width[0],
                        scopedSlots: {customRender: 'name'},
                    },
                    {
                        title: 'Розница',
                        dataIndex: 'retail',
                        sorter: (a, b) => a.retail - b.retail,
                        width: width[1],
                        scopedSlots: {customRender: 'price'},
                    },
                ];

                switch (this.$store.state.user.groupId) {
                    case 2:
                        data.push({
                            title: 'Диллер',
                            dataIndex: 'dealer',
                            sorter: (a, b) => a.dealer - b.dealer,
                            width: width[2],
                            scopedSlots: {customRender: 'price'},
                        });
                        break;
                    case 3:
                        data.push({
                            title: 'Партнер',
                            dataIndex: 'partner',
                            sorter: (a, b) => a.partner - b.partner,
                            width: width[2],
                            scopedSlots: {customRender: 'price'},
                        });
                        break;
                    case 4:
                        data.push({
                            title: 'ОПТ',
                            dataIndex: 'wholesale',
                            sorter: (a, b) => a.wholesale - b.wholesale,
                            width: width[2],
                            scopedSlots: {customRender: 'price'},
                        });
                        break;
                }

                data.push({
                    title: 'Количество',
                    dataIndex: 'count',
                    width: width[3],
                    scopedSlots: {customRender: 'count'},
                });

                data.push({
                    title: '',
                    dataIndex: 'buy',
                    width: width[4],
                    scopedSlots: {customRender: 'buy'},
                });

                return data;
            }
        },
    }
</script>

<style scoped>
    .cart {
        color: green;
    }

    .cart:hover {
        cursor: pointer;
    }
</style>