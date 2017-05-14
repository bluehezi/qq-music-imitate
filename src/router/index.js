import Vue from 'vue'
import Router from 'vue-router'
import recommend from '../components/recommend/recommend.vue'
import ranking from '../components/ranking/ranking.vue'
import search from '../components/search/search.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'recommend'}
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: ranking
    }
  ]
})
