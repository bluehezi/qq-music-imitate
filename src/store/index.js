/**
 * Created by bluedoor on 2017/5/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import mutations from './mutations.js'
import * as getters from './getters.js'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    ranking: {},
    searchResult: null,
    slideShowBean: [
      {
        special: 'http://y.qq.com/w/album.html?albummid=0032EblP0FOvUt&ADTAG=myqq&from=myqq&channel=10007100',
        img: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000001f28yN3VSdEO.jpg?max_age=2592000&max_age=2592000'
      },
      {
        special: 'http://y.qq.com/w/album.html?albummid=001stRLN16lYgR&ADTAG=myqq&from=myqq&channel=10007100',
        img: 'https://y.gtimg.cn/music/photo_new/T003R720x288M0000036SziY1G1BSV.jpg?max_age=2592000&max_age=2592000'
      },
      {
        special: 'https://y.qq.com/msa/218/0_3076.html?ADTAG=myqq&from=myqq&channel=10007100',
        img: 'https://y.gtimg.cn/music/photo_new/T003R720x288M0000028XHBK3yheh3.jpg?max_age=2592000&max_age=2592000'
      },
      {
        special: 'http://y.qq.com/w/album.html?albummid=003OKlqw3H7j0R&ADTAG=myqq&from=myqq&channel=10007100',
        img: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000002SwJjo2H6SBa.jpg?max_age=2592000&max_age=2592000'
      },
      {
        special: 'https://y.qq.com/live/zhibo/0508chenweiting.html?ADTAG=myqq&from=myqq&channel=10007100',
        img: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000004RTXy31BexGo.jpg?max_age=2592000&max_age=2592000'
      }
    ]
  },
  getters,
  actions,
  mutations
})
