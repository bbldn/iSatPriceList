<template>
    <div>
        <Header/>
        <Body/>
    </div>
</template>

<script>
    import Header from "./Header";
    import Body from "./Body";
    import axios from 'axios';

    export default {
        name: 'Root',
        components: {Body, Header},
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
                        this.$store.commit('setAllCategories', response.data.data.categories);
                        this.$store.commit('setUser', response.data.data.user);
                    });
            }
        },
        beforeMount() {
            this.loadCategories();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
