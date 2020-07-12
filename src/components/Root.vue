<template>
    <div>
        <template v-if="true === loaded">
            <Header/>
            <Body/>
        </template>
        <template v-else>
            <div class="container-fluid heigth-50 d-flex justify-content-center align-items-center">
                <a-button type="primary" shape="circle" loading />
            </div>
        </template>
    </div>
</template>

<script>
    import Header from "./Header";
    import Body from "./Body";
    import axios from 'axios';
    import Helper from '../helpers/Helper';

    export default {
        name: 'Root',
        components: {Body, Header},
        data: function() {
            return {
                loaded: false,
            };
        },
        methods: {
            loadCategories: function () {
                axios
                    .get('/index.php?route=common/prices/getCategoriesProductsAndInformation')
                    .then(response => {
                        if (200 !== response.status) {
                            console.log('Response code is not 200');

                            return;
                        }

                        if (true !== response.data.ok) {
                            console.log(response.data.data.errors);

                            return;
                        }
                        this.$store.commit('setUser', response.data.data.user);
                        this.$store.commit('setCurrency', Helper.getDefaultCurrency(response.data.data.currencies));
                        this.$store.commit('setCurrencies', response.data.data.currencies);
                        this.$store.commit('setAllCategories', response.data.data.categories);

                        this.loaded = true;
                    });
            }
        },
        beforeMount() {
            this.loadCategories();
        }
    }
</script>

<style scoped>
    .heigth-50 {
        height: 50vh;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
