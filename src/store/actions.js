/**
 * Created by bluedoor on 2017/5/5.
 */
import $ from '../common/js/JqyeryWrapper.js'
import * as types from './mutation_type.js'
export const ajaxJsonpRanking = function (context, paramsData) {
  $.ajax(paramsData)
    .then(function (data, textStatus, cxt) {
      if (data.showapi_res_code === 0 && data.showapi_res_body) {
        context.commit(types.AJAX_JSONP_RANKING,
          {
            body: data.showapi_res_body,
            id: paramsData.data.topid
          })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}
export const ajaxJsonpSearch = function (context, paramsData) {
  $.ajax(paramsData)
    .then(function (data, textStatus, cxt) {
      if (data.showapi_res_code === 0 && data.showapi_res_body) {
        context.commit(types.AJAX_JSONP_SEARCH, data.showapi_res_body)
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

