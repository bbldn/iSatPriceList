<template>
    <div class="row products">
        <div class="col-12">
            <a-table
                    :columns="columns"
                    :dataSource="products"
                    :rowKey="row => row.product_id"
                    :pagination="false"
            >
                <a-input-number slot="count" slot-scope="text, row" :value="row.count" step="1" :formatter="formatNumber" />
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
            formatNumber(value) {
                return value.replace(/[^0-9]/, '')
            }
        },
        computed: {
            columns() {
                let width = [];
                if (this.$store.state.user.groupId > 1) {
                    width = ['40%', '15%', '15%', '15%', '15%',];
                } else {
                    width = ['40%', '20%', '0', '20%', '20%',];
                }

                let data = [
                    {
                        title: "Наименование",
                        dataIndex: "name",
                        sorter: (a, b) => a.name.localeCompare(b.name),
                        width: width[0],
                    },
                    {title: "Розница", dataIndex: "retail", sorter: (a, b) => a.retail - b.retail, width: width[1],},
                ];

                switch (this.$store.state.user.groupId) {
                    case 2:
                        data.push({
                            title: "Диллер",
                            dataIndex: "dealer",
                            sorter: (a, b) => a.dealer - b.dealer,
                            width: width[2],
                        });
                        break;
                    case 3:
                        data.push({
                            title: "Партнер",
                            dataIndex: "partner",
                            sorter: (a, b) => a.partner - b.partner,
                            width: width[2],
                        });
                        break;
                    case 4:
                        data.push({
                            title: "ОПТ",
                            dataIndex: "wholesale",
                            sorter: (a, b) => a.wholesale - b.wholesale,
                            width: width[2],
                        });
                        break;
                }

                data.push({
                    title: 'Количество',
                    dataIndex: 'count',
                    width: width[3],
                    scopedSlots: { customRender: 'count' },
                });
                data.push({title: '', dataIndex: 'buy', width: width[4],});

                return data;
            }
        },
    }
</script>

<style scoped>

</style>