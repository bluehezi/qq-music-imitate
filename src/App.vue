<template>
  <div id="app">
    <header class="mob_header">
      <i class="music_logo"></i>
      <a href="http://dldir1.qq.com/music/clntupate/QQMusic72282.apk" class="btn_download" download>下载app</a>
    </header>
    <nav class="mob_nav">
      <router-link v-for='item,index in tos' :to="item" :key='index' class="nav-item">{{item.title}}</router-link>
    </nav>
    <div class="view">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app',
    data: function () {
      return {
        tos: [
          {name: 'recommend', 'title': '推荐'},
          {name: 'ranking', 'title': '排行榜'},
          {name: 'search', 'title': '搜索'}
        ]
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  .mob_header {
    width: 100%;
    height: 44px;
    background-color: #31C27C;

  .music_logo {
    float: left;
    width: 90px;
    height: 25px;
    margin: 10px 0 0 8px;
    background: url("https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/logo.png?max_age=19830212&d=20151105145423") 0 0 no-repeat;
    background-size: cover;
  }

  .btn_download {
    float: right;
    font-size: 14px;
    color: #ffffff;
    border-radius: 16px;
    padding: 8px;
    margin: 6px 8px;
    background-color: #149C5A;
  }

  }
  .mob_nav {
    width: 100%;
    display: flex;

  .nav-item {
    flex: 1;
    background-color: #fff;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #666;
  }
  .nav-item.router-link-active {
    color: #31C27C;
    border-bottom: 2px solid #31C27C;

  }
  }
  .view {
  }
  }
</style>
