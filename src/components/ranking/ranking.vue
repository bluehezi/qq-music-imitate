<template>
    <div id="ranking">
      <ul class="ranking-wrapper" v-if="getRanking">
        <li class='ranking-item'
            v-for="item,key in getRanking"
            :key="key"
            @click='showSongList(key)'
            v-if="item.ret_code!==-1">
          <div class="wrapper">
            <div class="avatar">
              <img src="../../../static/avatar.jpg" alt="" style="width:100%"/>
            </div>
            <div class="content">
              <h3 class="title">{{topIds[key]}}</h3>
              <ul class="threesong">
                <li class='song-item' v-for="song,index in item.pagebean.songlist" v-if="index < 3">{{song.songname}} <span class="singername"> - {{song.singername}}</span></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <songListShow ref="songlist" :pagebean="currentPagebean" :title="currentTitle"></songListShow>
    </div>
</template>

<script type='text/ecmascript-6'>
// 排行榜
import {DateFormat} from '../../common/js/DateFormat.js'
import appInfo from '../../common/js/appInfo.js'
import songListShow from '../songListShow/songListShow.vue'
export default {
  name: 'ranking',
  data: function () {
    return {
      topIds: {
        '3': '欧美',
        '5': '内地',
        '6': '港台',
        '16': '韩国',
        '17': '日本',
        '18': '民谣',
        '19': '摇滚',
        '23': '销量',
        '26': '热歌'
      },
      currentPagebean: null,
      currentTitle: ''
    }
  },
  created: function () {
    for (var id in this.topIds) {
      this.$store.dispatch('ajaxJsonpRanking', {
        url: appInfo.baseApiUrl + appInfo.ranking,
        type: 'POST',
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        data: {
          'showapi_appid': appInfo.appid,
          'showapi_sign': appInfo.secret,
          'showapi_timestamp': DateFormat(new Date(), 'yyyyMMddhhmmss'),
          'topid': id
        }
      })
    }
  },
  computed: {
    getRanking: function () {
      return this.$store.getters.getRanking
    }
  },
  components: {
    songListShow
  },
  methods: {
    showSongList: function (key) {
      if (this.$store.getters.getRanking[key]) {
        this.currentTitle = this.topIds[key]
        this.currentPagebean = this.$store.getters.getRanking[key].pagebean
        this.$refs.songlist.show()
      }
    }
  }
}
</script>

<style lang='scss'>
#ranking {
  font-size: 0;
  .ranking-wrapper {
    background-color: #f4f4f4;
    padding: 0 10px;
    .ranking-item {
      padding: 10px 0 0 0;
      .wrapper {
        display: flex;
        background-color: #fff;
        height: 100px;
        .avatar {
          width: 100px;
        }
        .content {
          position: relative;
          padding: 6px 4px 4px 10px;
          flex: 1;
          font-size: 14px;
          .title {
            font-size: 16px;
            font-weight: 400;
          }
          .threesong {
            padding-top: 10px;
            .song-item {
              font-size: 14px;
              font-weight: 200;
              margin-bottom: 3px;
              .singername {
                font-size: 12px;
                color: #666;
                display: inline-block;
                width: 60px;
                padding: 1px 0;
                vertical-align: middle;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
          &::after {
             content: '>';
             width: 6px;
             height: 6px;
             color: #666;
             position: absolute;
             right: 14px;
             bottom: 50%;
             margin-top: -3px;
           }
        }
      }
    }
  }
}
</style>
