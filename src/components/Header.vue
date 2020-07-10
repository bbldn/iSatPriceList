<template>
    <div class="container-fluid">
        <div class="row">
            <a-page-header title="Прайс-лист" class="w-100">
                <template v-slot:extra>
                    <a-button @click="changeListState" class="mr-1">
                        {{ listState ? 'Свернуть всё': 'Развернуть всё'}}
                    </a-button>
                    <a-button @click="downloadPriceList">Скачать PriceList .xlsx</a-button>
                </template>
            </a-page-header>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data: function () {
            return {
                listState: false, //expanded - true, collapse - false
            };
        },
        methods: {
            changeListState: function () {
                this.listState = !this.listState;
            },
            downloadPriceList: function () {
                alert('Функция пока не доступна');
            }
        }
    }
</script>

<style scoped>

</style>