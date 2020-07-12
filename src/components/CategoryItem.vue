<template>
    <div>
        <div class="row category-item">
            <div class="col-12">
                <a-icon v-if="!category.opened" @click="changeSignState" type="plus" :style="{ fontSize: '0.7em' }" class="sign" />
                <a-icon v-if="category.opened" @click="changeSignState" type="minus" :style="{ fontSize: '0.7em' }" class="sign" />
                {{ category.name }}
            </div>
        </div>
        <ProductTable v-if="category.opened" :products="category.products" />
    </div>
</template>

<script>
    import {EventBus} from '../main.js'
    import ProductTable from "./ProductTable";

    export default {
        name: "CategoryItem",
        components: {ProductTable},
        props: {
            category: Object,
        },
        methods: {
            changeSignState: function () {
                this.category.opened = !this.category.opened;
            }
        },
        created () {
            EventBus.$on('openAll', () => {
                if (false === this.opened) {
                    this.changeSignState();
                }
            });

            EventBus.$on('closeAll', () => {
                if (true === this.opened) {
                    this.changeSignState();
                }
            });
        }
    }
</script>

<style scoped>
    .category-item:hover {
        background-color: #EEEEEE;
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

    .sign:hover {
        cursor: pointer;
    }
</style>