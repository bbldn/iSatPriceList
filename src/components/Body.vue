<template>
    <div class="container-fluid categories-container">
        <CategoryItem v-for="category in categories" v-bind:key="category.category_id" v-bind:category="category"/>
    </div>
</template>

<script>
    import CategoryItem from "./CategoryItem";
    export default {
        name: "Body",
        components: {CategoryItem},
        computed: {
            categories() {
                return this.$store.state.current.categories;
            },
        }
    }
</script>

<style scoped>
    .categories-container {
        padding-left: 30px;
    }
</style>