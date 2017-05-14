<template>
  <div id="recommend">
    <div class="wrapper">
      <ul ref='slidewrapper' class="slide-wrapper"
          @transitionend="transitionend"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend">
        <li class="slide-item"><a :href="slideShowBean[slideShowBean.length-1].special"><img
          :src="slideShowBean[slideShowBean.length-1].img" alt="" width="100%"/></a></li>
        <li class="slide-item" v-for='bean in slideShowBean'><a :href="bean.special"><img :src="bean.img" alt=""
                                                                                          width="100%"/></a></li>
        <li class="slide-item"><a :href="slideShowBean[0].special"><img :src="slideShowBean[0].img" alt=""
                                                                        width="100%"/></a></li>
      </ul>
      <ul class="points-wrapper">
        <li class="point-item" v-for="item,index in slideShowBean"></li>
      </ul>
    </div>
    <div class="content">
      <h3 class="title">电台</h3>
      <div class="radio_cards">
          <div class="card">
            <div class="img_wrapper">
              <img src="https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg?max_age=2592000&max_age=2592000" alt="" style="width:100%"/>
              <span class="icon icon_play"></span>
            </div>
            <span class="title">一热一首招牌歌</span>
          </div>
          <div class="card">
            <div class="img_wrapper">
              <img src="https://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg?max_age=2592000&max_age=2592000" alt="" style="width:100%"/>
              <span class="icon icon_play"></span>
            </div>
            <span class="title">热歌</span>
          </div>
      </div>
      <h3 class="title">热门歌单</h3>
      <div class="message">
        <a href="#" class="go">去客户端发现更多更好的音乐>>></a>
        <a href="http://y.qq.com/?ADTAG=myqq&nomobile=1#type=index" class="go">查看电脑端网页</a>
      </div>
    </div>
    <div class="footer">
      <div class="footer-logo"></div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  // 推荐
  import $ from '../../common/js/JqyeryWrapper.js'
  export default {
    name: 'recommend',
    data: function () {
      return {
        activeIndex: 1,
        timerInterval: null,
        picWidth: 0,
        touched: false,
        minMoveX: 0,
        startX: -1
      }
    },
    mounted: function () {
      this.picWidth = parseInt($('.slide-item').css('width'))
      this.minMoveX = this.picWidth / 3
      $(this.$refs.slidewrapper).css('transform', 'translateX(' + -this.picWidth + 'px)')
      this.addTransition()
      $('.point-item').eq(0).addClass('active')  // 初始白点索引
      this.timerInterval = setInterval(this.intervalFunc, 2000)
    },
    methods: {
      intervalFunc: function () {
        this.next()
      },
      addTransition: function () {
        $(this.$refs.slidewrapper).addClass('transition')
      },
      removeTransition: function () {
        $(this.$refs.slidewrapper).removeClass('transition')
      },
      toTransform: function (dx) {
        $(this.$refs.slidewrapper).css('transform', `translateX(${dx}px)`)
      },
      next: function () {
        ++this.activeIndex
        // 白点索引
        $('.point-item').removeClass('active')
        if (this.activeIndex === 6) {
          $('.point-item').eq(0).addClass('active')
        } else if (this.activeIndex === 0) {
          $('.point-item').eq(4).addClass('active')
        } else {
          $('.point-item').eq(this.activeIndex - 1).addClass('active')
        }
        this.toTransform(-this.activeIndex * this.picWidth)
      },
      prev: function () {
        --this.activeIndex
        // 白点索引
        $('.point-item').removeClass('active')
        if (this.activeIndex === 0) {
          $('.point-item').eq(4).addClass('active')
        } else if (this.activeIndex === 6) {
          $('.point-item').eq(0).addClass('active')
        } else {
          $('.point-item').eq(this.activeIndex - 1).addClass('active')
        }
        this.toTransform(-this.activeIndex * this.picWidth)
      },
      transitionend: function () {
        var width = 375
        if (this.activeIndex > 0 && this.activeIndex < 6) {
          return
        }
        // 循环轮播 左轮
        if (this.activeIndex >= 6) {
          this.activeIndex = 1
        }
        // 右轮
        if (this.activeIndex <= 0) {
          this.activeIndex = 5
        }
        this.removeTransition() // 移除过渡效果，实现无缝轮播
        this.toTransform(-this.activeIndex * width) // 平移
        setTimeout(() => {
          this.addTransition()
        })
      },
      touchstart: function (event) {
        this.removeTransition() // 移除过渡效果
        /* start 防止手指快速滑动图片的时候，出现空白 */
        if (this.activeIndex >= 6) {
          this.activeIndex = 1
        }
        if (this.activeIndex <= 0) {
          this.activeIndex = 5
        }
        this.toTransform(-this.activeIndex * this.picWidth) // 平移
        /* end 防止手指快速滑动图片的时候，出现空白 */
        clearInterval(this.timerInterval) // 手指touch的时候，停止轮播
        this.startX = event.changedTouches[0].clientX
      },
      touchmove: function (event) {
        if (this.startX === -1) {
          this.startX = event.changedTouches[0].clientX
        }
        var nowX = event.changedTouches[0].clientX
        var dx = nowX - this.startX
        this.toTransform(-this.activeIndex * this.picWidth + dx)
      },
      touchend: function (event) {
        var endX = event.changedTouches[0].clientX
        if (Math.abs(endX - this.startX) > this.minMoveX) {
          if (endX - this.startX > 0) {
            this.activeIndex--  // 前一张
          } else {
            this.activeIndex++  // 后一张
          }
        }
        this.startX = -1
        /* start 控制白点索引 */
        $('.point-item').removeClass('active')
        if (this.activeIndex === 6) {
          $('.point-item').eq(0).addClass('active')
        } else if (this.activeIndex === 0) {
          $('.point-item').eq(4).addClass('active')
        } else {
          $('.point-item').eq(this.activeIndex - 1).addClass('active')
        }
        /* end 控制白点索引 */

        /* 手指松开之后平稳过度到指定位置 */
        this.addTransition() // 添加过渡效果
        this.toTransform(-this.activeIndex * this.picWidth)
        this.timerInterval = setInterval(this.intervalFunc, 3000) // 手指松开后，图片开始轮播
      }
    },
    computed: {
      slideShowBean: function () {
        return this.$store.getters.getSlideShowBean
      }
    }
  }
</script>

<style lang='scss'>
  #recommend {
    height: 100%;
    font-size: 0;
    background-color: #F4F4F4;
    .wrapper {
      width: 100%;
      overflow: hidden;
      position: relative;

      .slide-wrapper {
        display: flex;
        flex-direction: row;
        width: 700%;

        .slide-item {
          width: 100%;
        }

        &.transition {
          transition: transform .5s ease-in-out;
        }
      }
      .points-wrapper {
        position: absolute;
        width: 100%;
        bottom: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;

        .point-item {
          width: 6px;
          height: 6px;
          margin: 0 6px 0 6px;
          background-color: gray;
          border-radius: 50%;

        &.active {
           background-color: #fff;
         }
        }
      }
    }
    .content {
      width: 100%;
      font-size: 0;
      padding-top: 8px;
      .title {
        font-size: 14px;
        color: #666;
        padding-left: 8px;
        line-height: 14px;
      }
      .radio_cards {
        display: flex;
        padding: 8px;
        .card {
          background-color: #fff;
          padding-bottom: 16px;
          flex: 1;
          text-align: center;
          .img_wrapper {
            position: relative;
            margin-bottom: 5px;
            span.icon {
              position: absolute;
              right: 8px;
              bottom: 8px;
            }
            .icon {
              display: inline-block;
              width: 25px;
              height: 25px;
            }
            .icon_play {
              background: url("https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/list_sprite.png?max_age=19830212&d=20151105145423") 0 0 no-repeat;
              background-size: cover;
            }
          }
          .title {
            color: #555;
          }
          &:first-child {
            margin-right: 8px;
           }
        }
      }
      .message {
        font-size: 14px;
        padding-top: 30px;
        text-align: center;
        .go {
          display: block;
          color: #666;
          margin-top: 16px;
        }
      }
    }
    .footer {
      margin-top: 20px;
      padding-bottom: 20px;
      text-align:center;
      .footer-logo {
        display: inline-block;
        width: 82px;
        height: 24px;
        background: url("https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/logo_footer.png?max_age=19830212&d=20151105145423") 0 0 no-repeat;
        background-size: cover;
      }
    }
  }
</style>
