<template>
    <div class="container-fluid categories-container">
        <CategoryItem v-for="category in categories" :key="category.category_id" :category="category"/>
    </div>
</template>

<script>
    import CategoryItem from "./CategoryItem";

    export default {
        name: "Body",
        components: {CategoryItem},
        computed: {
            categories() {
                return this.$store.state.current.categories.filter((category) => category.products.length > 0);
            },
        }
    }
</script>

<style scoped>
    .categories-container {
        padding-left: 30px;
    }
</style>