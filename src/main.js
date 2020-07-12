import Vue from 'vue'
import App from './App.vue'
import {Button, Dropdown, Icon, InputNumber, Menu, PageHeader, Table} from 'ant-design-vue';
import Vuex from 'vuex';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(PageHeader);
Vue.use(Icon);
Vue.use(Table);
Vue.use(InputNumber);
Vue.use(Dropdown);
Vue.use(Menu);
Vue.use(Vuex);

export const EventBus = new Vue();

const store = new Vuex.Store({
    state: {
        current: {
            categories: [],
        },
        all: {
            categories: [],
        },
        user: {
            groupId: 1,
        },
        currencies: [],
    },
    mutations: {
        setAllCategories: function (state, array) {
            state.all.categories = array;
            state.current.categories = array;
        },
        setCurrentCategories: function (state, array) {
            state.current.categories = array;
        },
        setUser: function (state, user) {
            state.user = user;
        },
        setCurrencies: function (state, currencies) {
            currencies.user = currencies;
        }
    },
});

new Vue({
    render: h => h(App),
    store,
}).$mount('#app');
