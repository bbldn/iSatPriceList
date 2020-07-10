<template>
    <div>
        <div class="row category-item">
            <div class="col-12">
                <a-icon v-if="!opened" @click="changeSignState" type="plus" :style="{ fontSize: '0.7em' }" class="sign" />
                <a-icon v-if="opened" @click="changeSignState" type="minus" :style="{ fontSize: '0.7em' }" class="sign" />
                {{ category.name }}
            </div>
        </div>
        <ProductTable v-if="opened" :products="category.products" />
    </div>

</template>

<script>
    import ProductTable from "./ProductTable";
    export default {
        name: "CategoryItem",
        components: {ProductTable},
        props: {
            category: Object,
        },
        data: function () {
            return {
                opened: false,
            };
        },
        methods: {
            changeSignState: function () {
                this.opened = !this.opened;
            }
        },
    }
</script>

<style scoped>
    .category-item:hover {
        background-color: #EEEEEE;
    }

    .sign:hover {
        cursor: pointer;
    }

    .category-item {
        font-size: 1.3em;
        height: 50px;
    }

    .category-item .col-12 {
        padding-top: 15px;
    }

    .category-item .sign {
        vertical-align: 0.125em;
    }
</style>