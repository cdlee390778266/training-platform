import Vue from 'vue';
import Vuex from 'vuex';
import CONFIG from '../js/config';
import Utils from '../js/utils.js'

Vue.use(Vuex);

// 不建议线上使用
const debug = process.env.NODE_ENV !== 'production';

/**
 * export一个store的单例
 */
export default new Vuex.Store({
	state: {
		user: {
			userId: 0,
			isLogin: false
		},
		cart: [],
		orderList: []
	},
	mutations: {
		setUser: function(state, payload) {
			
		}
	},
	actions: {
		setUser: function(context, payload) {
			context.commit('setUser', payload);
		}
	},
	getters: {
	    getUser: state => {
	    	return 1;
	    }
	}
});
