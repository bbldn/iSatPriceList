<template>
    <div class="row products">
        <div class="col-12">
            <a-table
                    :columns="columns"
                    :dataSource="products"
                    :rowKey="row => row.product_id"
            >
                <a-input-number
                        slot="count"
                        step="1"
                        slot-scope="text, row"
                        v-model="row.count"
                        :min="1"
                        :formatter="formatNumber"
                />
                <a-icon type="shopping-cart" slot-scope="text, row" slot="buy" class="cart" @click="buy(row)" />
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
            formatNumber: function(value) {
                return (value + '').replace(/[^0-9]/, '');
            },
            buy: function(row) {
                /* global cart */
                cart.add(row.product_id, row.count);
            }
        },
        computed: {
            columns() {
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
                    },
                    {title: 'Розница', dataIndex: 'retail', sorter: (a, b) => a.retail - b.retail, width: width[1],},
                ];

                switch (this.$store.state.user.groupId) {
                    case 2:
                        data.push({
                            title: 'Диллер',
                            dataIndex: 'dealer',
                            sorter: (a, b) => a.dealer - b.dealer,
                            width: width[2],
                        });
                        break;
                    case 3:
                        data.push({
                            title: 'Партнер',
                            dataIndex: 'partner',
                            sorter: (a, b) => a.partner - b.partner,
                            width: width[2],
                        });
                        break;
                    case 4:
                        data.push({
                            title: 'ОПТ',
                            dataIndex: 'wholesale',
                            sorter: (a, b) => a.wholesale - b.wholesale,
                            width: width[2],
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