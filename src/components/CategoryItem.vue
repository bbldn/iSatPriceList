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
        <ProductTable :products="category.products" v-show="true === category.opened"/>
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
        methods: {
            changeSignState: function () {
                this.category.opened = !this.category.opened;
            }
        },
        created() {
            this.$eventBus.$on('openAll', () => {
                if (false === this.category.opened) {
                    this.changeSignState();
                }
            });

            this.$eventBus.$on('closeAll', () => {
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