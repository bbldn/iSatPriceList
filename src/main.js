import Vue from 'vue'
import App from './App.vue'
import {Button, PageHeader, Icon, Table, InputNumber} from 'ant-design-vue';
import Vuex from 'vuex';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(PageHeader);
Vue.use(Icon);
Vue.use(Table);
Vue.use(InputNumber);
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
        }
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
        }
    }
});

new Vue({
    render: h => h(App),
    store,
}).$mount('#app');
