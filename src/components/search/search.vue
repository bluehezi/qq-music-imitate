<template>
    <div id="search">
      <div class="search-box">
        <input ref='searchvalue' type="text" id="input_search" placeholder="搜索歌曲、歌单、专辑" @focus="toFocus" @keydown="search"/>
        <span class="cancel" v-if="boxFocus" @click="cancelFocus">取消</span>
      </div>
      <div class="tips" v-if="!boxFocus">
        <h3 class="title">热门搜索</h3>
        <div class="tiplist">
          <span class="tip-item" v-for="item in tips" @click="toInput(item)">{{item}}</span>
        </div>
      </div>
      <div class="result-content" v-else>
        <ul class="result-list" v-if="getSearchResult && getSearchResult.ret_code === 0">
          <li class="result-item"
              v-for="item,index in getSearchResult.pagebean.contentlist"
              @click="toSongPage(item)">
            <div class="avatar">
              <img :src="item.albumpic_big" alt="" class="img_avatar"/>
            </div>
            <div class="info">
              <span class="songname">{{item.songname}}</span><br/>
              <span class="singername">{{item.singername}}</span>
            </div>
          </li>
        </ul>
      </div>
      <songPage ref="songpage" :song="currentSong"></songPage>
    </div>
</template>

<script type='text/ecmascript-6'>
// 搜索
import appInfo from '../../common/js/appInfo.js'
import {DateFormat} from '../../common/js/DateFormat.js'
import * as types from '../../store/mutation_type.js'
import songPage from '../songPage/songPage.vue'
export default {
  name: 'search',
  data: function () {
    return {
      boxFocus: false,
      tips: [
        '金曲捞',
        '东京铁塔的幸福',
        '白山茶 陈雪凝固',
        '思念是一把刀',
        '志明与春娇',
        '刚好遇见你',
        '春娇救志明',
        '一人饮酒醉',
        '勉为其难'
      ],
      currentSong: {}
    }
  },
  methods: {
    toFocus: function () {
      this.boxFocus = true
    },
    cancelFocus: function () {
      this.boxFocus = false
    },
    search: function (event) {
      if (event.keyCode === 13) {
        var _this = this
        this.$store.dispatch('ajaxJsonpSearch', {
          url: appInfo.baseApiUrl + appInfo.search,
          type: 'POST',
          dataType: 'jsonp',
          jsonp: 'jsonpcallback',
          data: {
            'showapi_appid': appInfo.appid,
            'showapi_sign': appInfo.secret,
            'showapi_timestamp': DateFormat(new Date(), 'yyyyMMddhhmmss'),
            'keyword': _this.$refs.searchvalue.value
          }
        })
      }
    },
    toInput: function (text) {
      this.$refs.searchvalue.value = text
    },
    toSongPage: function (item) {
      this.currentSong = item
      this.$refs.songpage.toShow()
    }
  },
  computed: {
    getSearchResult: function () {
      return this.$store.getters.getSearchResult
    }
  },
  watch: {
    'boxFocus': function () {
      this.$store.commit(types.AJAX_JSONP_SEARCH, null)
    }
  },
  deactivated: function () {
    if (this.boxFocus) {
      this.boxFocus = false
    } else {
      this.$store.commit(types.AJAX_JSONP_SEARCH, null)
    }
  },
  components: {
    songPage
  }
}
</script>

<style lang='scss'>
#search {
  .search-box {
    padding: 10px 10px;
    background-color: #f4f4f4;
    text-align: center;
    position: relative;
    display: flex;
    #input_search {
      border-radius: 5px;
      box-sizing: border-box;
      flex:1;
      height: 36px;
      padding-left: 36px;
      font-size: 14px;
      color: #666;
      &:focus {
        outline: none;
       }
    }
    .cancel {
      display: inline-block;
      width: 60px;
      height: 100%;
      line-height: 36px;
      font-size: 14px;
      text-align: center;
      color: #666;
    }
    &::before {
       content: '';
       width: 18px;
       height: 18px;
       position: absolute;
       top: 19px;
       left: 19px;
       background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJlSURBVFhH7ZfRShRRHMb3Jkqzm7wJSrqIIDBxX6C0a62H6C7oqq4ixYreQMmMHkXbjLQeIYgyQuqiyIuotKDt923fyLCszv/MzF5EDnzs2T3/7zffOXNm5myjcXDUOAOtVquJ7qOn6AP6ZamtQ33NGk/ZG8VJJtEaagf1XJ7agwEdRI9zIT7RnkdT6Iz7VaO2flPf51z9I9oDtQQDNIxeGv6Nz9voaBFcNa79bu8LsYp8+/Z75FmYN3w/nwqUB204lFiDqYzd+txlek37RFkQ3pNIjDZaKsXBeMkATfloKUjOBGMMifUbXUzmYVp3oFvJ5j0M8GbNXEtiYtJzRtOru6lwAUfhsIZQdveNR30NTPccaD5sChbCXTD7btDSUCAdmqGpsClYCHPa7CdBSyeQXgEKNBI2BQthnjX7Y9DSCfTTpkNhU7AQ7jGzd4KWvgc67EDbKYH6eclOO9BmSqBsUU+HTcFCwJcdaCVo6Vyy7LZfCJuChbAfONCdoKUTKHsw6iE2FDYWFIqFthxoLImLSZsr3fqzScZ9isUyczWZiXEC6UWoF2LaaHqcDcY4+mHmheRAMmBe8oje8nmqFOQvZwS9N2uxLEcgbUuzDdpGmZnyzLxzGG3yqm1lARxH2VZEUz6DChc6NXoia83I087pRukZyozAjqCHvv6Cf0GL6Ao655MrgNr6TX1bDqF1qO/Xcv7qobymJoA+6xpxfvTd7VVqdxcw7au1h3IwbUfn0DJ6hb6ibbSJVtzX8w9B30JVWQf/QqibVQZYm7drpg5C7TmzuZnSI6JZ2yWoAnKo61UY/5f3Dy7dC4CdAEhQAAAAAElFTkSuQmCC");
       background-size: cover;
     }
  }
  .tips {
    padding: 16px 0 0 10px;
    .title {
      font-size: 14px;
      font-weight: 600;
      color: #666;
    }
    .tiplist {
      padding-top: 10px;
      text-align: center;
      .tip-item {
        display: inline-block;
        padding: 5px 8px;
        border: 1px solid #666;
        font-size: 14px;
        margin: 4px;
        border-radius: 12px;
        color: #666;
        cursor: pointer;
      }
    }
  }
  .result-content {
    font-size: 0;
    .result-list {
      .result-item {
        padding: 6px 0 6px 6px;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          .img_avatar {
            width: 100%;
          }
        }
        .info {
          flex: 1;
          overflow: hidden;
          height: 50px;
          box-sizing: border-box;
          padding: 6px 0 6px 14px;
          span {
            width: 80%;
            box-sizing: border-box;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .songname {
            font-size: 16px;
            color: #666;
          }
          .singername {
            font-size: 12px;
            color: #666;
            margin-top: 6px;
          }
        }
      }
    }
  }
}
</style>
