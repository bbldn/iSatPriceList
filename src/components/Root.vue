<template>
    <div>
        <template v-if="true === loaded">
            <Header/>
            <Body/>
        </template>
        <template v-else>
            <div class="container-fluid container-loading d-flex justify-content-center align-items-center">
                <a-button type="primary" shape="circle" loading/>
            </div>
        </template>
    </div>
</template>

<script>
    import Header from "./Header";
    import Body from "./Body";

    export default {
        name: 'Root',
        components: {Body, Header},
        data: function () {
            return {
                loaded: false,
            };
        },
        methods: {
            loadCategories: function () {
                this.$axios
                    .get('/index.php?route=price_list/main/getCategoriesProductsAndInformation')
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
                        this.$store.commit('setCurrency', this.$helper.getDefaultCurrency(response.data.data.currencies));
                        this.$store.commit('setCurrencies', response.data.data.currencies);
                        this.$store.commit('setAllCategories', response.data.data.categories);

                        this.loaded = true;
                    });
            },
            loadFormats: function () {
                if (false === Object.prototype.hasOwnProperty.call(window, 'FORMATS')) {
                    window.FORMATS = [];
                    return;
                }

                window.FORMATS = JSON.parse(window.FORMATS);

                if (false === Array.isArray(window.FORMATS)) {
                    window.FORMATS = [];
                }
            }
        },
        beforeMount() {
            this.loadFormats();
            this.loadCategories();
        }
    }
</script>

<style scoped>
    .container-loading {
        height: 465px;
    }
</style>
