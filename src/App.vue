<template>
  <div id="app" >
    <div class="bg-info text-white">
      <h5>讀經小幫手</h5>
    </div>
    <div id="nav">
      <router-link to="/">讀經</router-link>|
      <router-link to="/query">查詢</router-link>|
      <router-link to="/about">關於</router-link>
    </div>
    <!--<Breadcrumb />-->
    <router-view />
  </div>
</template>

<script>
/*
import Breadcrumb from './components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  }
}
*/
</script>

<style>
@import url(https://fonts.googleapis.com/earlyaccess/cwtexfangsong.css);
/*@import url(https://fonts.googleapis.com/earlyaccess/cwtexming.css);
/*@import url(https://fonts.googleapis.com/earlyaccess/cwtexyen.css);*/
/*@import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css);*/

* {
  font-family: "cwTeXFangSong", sans-serif;
  font-size: 20px;
  /*font-family: 'cwTeXMing', sans-serif;*/
  /*font-family: 'cwTeXYen', sans-serif;*/
  /*font-family: 'Noto Sans TC', sans-serif;*/
}
</style>
