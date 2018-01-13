/*jshint esversion: 6 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		counter: 0
	},
	// get things, not mutating the state
	getters: {
		getCounterX6: state => {
			return state.counter * 6;
		}
	},
	// mutates the state synchronously
	mutations: {
		incrementCounter: (state, num) => {
			state.counter += num;
		}
	},
	// commits the mutation asynchronously
	actions: {
		asyncIncremetCounter: ({ commit }, asyncNum, duration) => {
			setTimeout(() => {
				commit('incrementCounter', asyncNum);
			}, duration);
		}
	}
});