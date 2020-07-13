import Vue from 'vue'
import App from './App.vue'
import {Button, Dropdown, Icon, InputNumber, Menu, PageHeader, Table} from 'ant-design-vue';
import Vuex from 'vuex';
import Helper from './helpers/Helper';
import axios from 'axios';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(PageHeader);
Vue.use(Icon);
Vue.use(Table);
Vue.use(InputNumber);
Vue.use(Dropdown);
Vue.use(Menu);
Vue.use(Vuex);

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
        currency: Helper.getDefaultCurrency([]),
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
            state.currencies = currencies;
        },
        setCurrency: function (state, currency) {
            state.currency = currency;
        }
    },
});

Vue.prototype.$axios = axios;
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$helper = Helper;

new Vue({
    render: h => h(App),
    store,
}).$mount('#app');
