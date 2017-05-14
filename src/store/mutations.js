/**
 * Created by bluedoor on 2017/5/5.
 */
import * as types from './mutation_type.js'
import Vue from 'vue'
export default {
  [types.AJAX_JSONP_RANKING]: function (state, data) {
    Vue.set(state.ranking, data.id, data.body)
  },
  [types.AJAX_JSONP_SEARCH]: function (state, data) {
    state.searchResult = data
  }
}
