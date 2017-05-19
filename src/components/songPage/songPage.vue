<template>
    <div id="songpage" ref='songpage' v-if="showStatus">
      <div class="wrapper">
        <div class="header">
          <div class="avatar">
            <img :src="song.albumpic_big" alt="" class="img_avatar"/>
          </div>
          <div class="info">
            <span class="name">{{song.songname}}</span>
            <span class="singername">{{song.singername}}</span>
          </div>
          <span class="play-status" :class='{play: status,pause: !status}' @click="toggleStatus"></span>
        </div>
        <div class="lyric">
          <ul class="lyricList" ref="lyricList">
            <li class='lyric-item' v-for="item in getSongLyricList" :class='{active: currentLyricId === item.id}' :id="item.id">{{item.lyric}}</li>
          </ul>
        </div>
        <div class="control">
          <audio :src="song.m4a || song.url" ref="player"
                 @pause="pause"
                 @timeupdate="timeupdate"
                 @ended="ended"
                 @loadeddata="loadeddata"
                 id="player"
            ></audio>
          <div class="options">
            <i class="back" @click="toClose">back</i>
            <i class="favorite"></i>
          </div>
          <div class="process">
            <span class="time_start" ref="timestart">00:00</span>
            <div class="bg_process">
              <div class="mask_process" ref="maskprocess"></div>
            </div>
            <span class="time_end" ref="timeend">00:00</span>
          </div>
        </div>
      </div>
      <div class="bg" ref="bg"></div>
      <div class="bg_mask"></div>
    </div>
</template>

<script type='text/ecmascript-6'>
import $ from '../../common/js/JqyeryWrapper.js'
import appInfo from '../../common/js/appInfo.js'
import {DateFormat} from '../../common/js/DateFormat.js'
export default {
  props: {
    song: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return {
      showStatus: false,
      status: false,  // true: play  false: pause
      songLyric: '',
      currentLyricId: '',
      num: 0  // 歌词向上移动
    }
  },
  methods: {
    keydown: function (event) {
      console.log(event.keyCode)
    },
    toShow: function () {
      this.showStatus = true
      document.body.style.overflow = 'hidden'
      this.num = 0
      if (this.$refs.maskprocess) {
        this.$refs.maskprocess.style.width = '0%'
      }
    },
    toClose: function () {
      this.showStatus = false
      document.body.style.overflow = 'auto'
      this.$refs.player.pause()
      this.num = 0
      if (this.$refs.maskprocess) {
        this.$refs.maskprocess.style.width = '0%'
      }
    },
    toggleStatus: function () {
      this.status = !this.status
      this.status ? this.$refs.player.play() : this.$refs.player.pause()
    },
    unescapeHTML: function (str) {
      var t = document.createElement('div')
      t.innerHTML = str + ''
      this.songLyric = t.innerHTML.replace(/\s+/g, '')
    },
    // audio 监听事件
    paly: function () {
      this.status = true
    },
    pause: function () {
      this.status = false
    },
    timeupdate: function () {
      if (this.$refs.player) {
        var time = parseInt(this.$refs.player.currentTime)
        this.$refs.maskprocess.style.width = time / this.$refs.player.duration * 100 + '%'
        // 设置进度时间 start
        var m = parseInt(time / 60)
        var s = time % 60
        m = ('00' + m).substring(('' + m).length)
        s = ('00' + s).substring(('' + s).length)
        this.$refs.timestart.innerHTML = m + ':' + s
        // end
        if (document.getElementById(time)) {
          this.currentLyricId = time
        }
        var lyrics = document.querySelectorAll('.lyric-item')
        if (lyrics[4 + this.num] && lyrics[4 + this.num].id === time + '') {
          ++this.num
          this.$refs.lyricList.style.top = -46 * this.num + 'px'
        }
      }
    },
    ended: function () {
      this.num = 0
      this.$refs.lyricList.style.top = '0px'
      this.status = false
      this.$refs.maskprocess.style.width = '0%'
    },
    loadeddata: function () {
      // 更新 歌曲总时长
      var time = parseInt(this.$refs.player.duration)
      var m = parseInt(time / 60)
      var s = time % 60
      m = ('00' + m).substring(('' + m).length)
      s = ('00' + s).substring(('' + s).length)
      this.$refs.timeend.innerHTML = m + ':' + s
    }
  },
  computed: {
    getSongLyricList: function () {
      var arr = this.songLyric.split('[')
      var lyricList = []
      for (var i = 0; i < arr.length; i++) {
        var _arr = arr[i].split(']')
        var s = 0
        var _time = _arr[0].split('.')
        var time = _time[0].split(':')
        s = time[0] * 60 + time[1] * 1
        if (_arr[1]) {
          lyricList.push({
            id: s,
            lyric: _arr[1]
          })
        }
      }
      return lyricList
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  updated: function () {
    if (this.$refs.bg) {
      this.$refs.bg.style.backgroundImage = 'url(' + this.song.albumpic_big + ')'
    }
  },
  watch: {
    'showStatus': function (n, o) {
      if (n) {
        if (this.song.songid) {
          var _this = this
          $.ajax({
            type: 'post',
            url: appInfo.baseApiUrl + appInfo.lyric,
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            async: true,
            data: {
              showapi_appid: appInfo.appid,
              showapi_sign: appInfo.secret,
              showapi_timestamp: DateFormat(new Date(), 'yyyyMMddhhmmss'),
              musicid: _this.song.songid
            }
          })
            .then(function (data, textStatus) {
              if (!data.showapi_res_code) {
                _this.unescapeHTML(data.showapi_res_body.lyric)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    }
  }
}
</script>

<style lang='scss'>
#songpage {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  font-size: 0;
  background-color: #fff;
  .wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    .header {
      padding: 16px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      background-color: rgba(0,0,0,.1);
      position: relative;
      .avatar {
        width: 80px;
        .img_avatar {
          width: 100%;
        }
      }
      .play-status {
        position: absolute;
        bottom: 30px;
        right: 20px;
        width: 45px;
        height: 45px;
        border: 1px solid #fff;
        border-radius: 50%;
        opacity: .6;
        &::after {
           content: '';
           display: inline-block;
           margin: 12px 17px;
           width: 17px;
           height: 20px;
           background-size: 40px 350px;
           background-image: url(https://y.gtimg.cn/mediastyle/mobile/app/share/img/sprite_play.png?max_age=2592000&d=20151203183007);
           background-repeat: no-repeat;
         }
      }
      .pause::after {
        background-position: 0 -150px;

      }
      .play::after {
        background-position: 0 -180px;
        margin: 15px 19px;
      }
      .info {
        flex: 1;
        padding: 12px 0 0 10px;
        span {
          display: block;
          color: #fff;
        }
        .name {
          width: 100%;
          font-size: 18px;
        }
        .singername {
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
    .lyric {
      font-size: 16px;
      color: #888;
      text-align: center;
      margin-top: 40px;
      position: absolute;
      top: 112px;
      left: 0;
      right: 0;
      bottom: 130px;
      overflow: hidden;
      .lyricList {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        transition: all .4s linear;
        .lyric-item {
          line-height: 46px;
          font-weight: 500;
          &.active {
            color: #31C27C;
           }
        }
      }
    }
    .control {
      position: absolute;
      bottom: 0;
      height: 146px;
      left: 0;
      right: 0;
      .options {
        margin-top: 30px;
        padding-right: 30px;
        text-align: right;
        .back {
          float: left;
          width: 40px;
          height: 30px;
          padding-left: 16px;
          font-size: 20px;
          color: #888;
          font-weight: 400;
        }
        .favorite {
          display: inline-block;
          width: 26px;
          height: 21px;
          background-image: url(https://y.gtimg.cn/mediastyle/mobile/app/share/img/sprite_play.png?max_age=2592000&d=20151203183007);
          background-size: 40px 350px;
          background-repeat: no-repeat;
        }
      }
      .process {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 46px;
        display: flex;
        .time_start,
        .time_end {
          flex: 0 0 16px;
          line-height: 16px;
          color: rgba(255,255,255,.2);
          font-size: 12px;
          padding: 0 14px;
          font-weight: 200;
        }
        .bg_process {
          flex: 1;
          height: 2px;
          margin: auto;
          background-color: rgba(255,255,255,.2);
          border-radius: 2px;
          .mask_process {
            width: 0%;
            height: 2px;
            background-color: #31C27C;
          }
        }
      }
    }
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
    background-size: cover;
    background-position: bottom center;
    background-color: #fff;
    filter: blur(15px);
    transform: scale(1.15);
  }
  .bg_mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
    background-color: #000000;
    opacity: .6;
  }
}
</style>
