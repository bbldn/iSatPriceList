<template>
    <div>
        <div class="row category-item">
            <div class="col-12">
                <a-icon :type="true === category.opened ? 'minus': 'plus'"
                        :style="{ fontSize: '0.7em' }"
                        class="sign"
                        @click="changeSignState"
                />
                {{ category.name }}
            </div>
        </div>
        <ProductTable v-if="true === category.opened" :products="category.products"/>
    </div>
</template>

<script>
    import ProductTable from "./ProductTable";
    import {EventBus} from '../main.js'

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
        created() {
            EventBus.$on('openAll', () => {
                if (false === this.category.opened) {
                    this.changeSignState();
                }
            });

            EventBus.$on('closeAll', () => {
                if (true === this.category.opened) {
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