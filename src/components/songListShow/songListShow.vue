<template>
    <div id="songlistshow" v-show="showStatus" ref="_songlistshow">
      <div class="wrapper">
        <div class="cover">
          <span class="close" @click="toClose">X</span>
          <div class="info">
            <span class="title">{{title}}</span>
            <span class="time" v-if="pagebean">{{pagebean.update_time}} 更新</span>
            <span class="play"></span>
          </div>
        </div>
        <ul class="songlist" v-if="pagebean">
          <li class="song-item" v-for="item,index in pagebean.songlist" :key="index" @click="toSongPage(item, event)">
            <div class="index">{{index}}</div>
            <div class="song-info">
              <span class="songname">{{item.songname}}</span>
              <span class="singername">{{item.singername}}</span>
            </div>
          </li>
        </ul>
      </div>
      <songPage :song="currentSong" ref="song"></songPage>
    </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll'
import songPage from '../songPage/songPage.vue'
export default {
  props: {
    pagebean: {
      type: Object,
      default: function () {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      showStatus: false,
      scroll: null,
      currentSong: {}
    }
  },
  methods: {
    show: function () {
      this.showStatus = true
      document.body.style.overflow = 'hidden'
    },
    toClose: function (event) {
      if (event._constructed) {
        this.showStatus = false
        document.body.style.overflow = 'scroll'
      }
    },
    toSongPage: function (item, event) {
      this.currentSong = item
      this.$refs.song.toShow()
      console.log(arguments)
    }
  },
  updated: function () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs._songlistshow, {
          scrollY: true,
          click: true,
          bounce: false
        })
        this.scroll.refresh()
      }
    })
  },
  components: {
    songPage
  }
}
</script>

<style lang='scss'>
#songlistshow {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #694C39;
  .wrapper {
    .cover {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding-top: 100%;
      background:   -webkit-linear-gradient(bottom, rgba(0,0,0,.7),rgba(0,0,0,0)),url("https://y.gtimg.cn/music/photo_new/T002R300x300M000000noD0i1tPu1N.jpg?max_age=2592000") 0 0 no-repeat;
      background-size: cover;
    .close {
      position: absolute;
      left: 10px;
      top: 10px;
      width: 36px;
      height: 36px;
      color: #bbb;
      font-size: 30px;
      line-height: 36px;
      text-align: center;
      font-weight: 100;
      &:hover {
         background-color: rgba(255,255,255,.8);
       }
    }
    .info {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: -webkit-linear-gradient(bottom, rgba(0,0,0,1),rgba(0,0,0,0));
      padding: 6px 0 20px 6px;
      font-size: 0;
    span {
      display: block;
      margin: 5px;
    }
    .title {
      font-size: 22px;
      color: #fff;
      margin-bottom: 8px;
    }
    .time {
      font-size: 12px;
      color: #fff;
    }
    .play {
      width: 48px;
      height: 48px;
      border: 3px solid #fff;
      border-radius: 50%;
      position: absolute;
      right: 10px;
      bottom: 10px;
    &::before {
       content: '';
       position: absolute;
       left: 18px;
       top: 14px;
       width: 0;
       height: 0;
       border-width: 10px 16px;
       border-style: solid;
       border-color: transparent transparent transparent #fff;
     }
    }
    }
    }
    .songlist {
      width: 100%;
      font-size: 0;
      padding-top: 100%;
      list-style: none;
      .song-item {
        display: flex;
        height: 60px;
        .index {
          font-size: 20px;
          flex: 0 0 60px;
          height: 100%;
          color: #eee;
          text-align: center;
          line-height: 60px;
        }
        .song-info {
          flex: 1;
          position: relative;
          padding-left: 6px;
          .songname {
            display: block;
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;
            color: #fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-top: 10px;
            padding-bottom: 4px;
          }
          .singername {
            font-size: 14px;
            color: #aaa;
          }
          &::after {
            position: absolute;
            left: 0;
            bottom: 0;
             width: 100%;
            content: '';
            display: block;
            border-bottom: 1px solid #ccc;
            transform: scaleY(.2);
           }
        }
      }
    }
  }
}
</style>
