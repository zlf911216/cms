<template>
  <div class="all">
        <div class="banner-img">
            <img :src="banner">
        </div>
        <div flex-box="1" flex="dir:left main:center">
            <router-link :to="{path:'/index/cms'}" tag="div" class="choose-tag menu_brand" flex="dir:top main:center cross:center">
                <span>CMS后台</span>
            </router-link>
            <router-link :to="{path:'/index/weddingDress'}" tag="div" class="choose-tag menu_series" flex="dir:top main:center cross:center">
                <span>婚纱礼服</span>
            </router-link>
            <router-link :to="{path:'/index/jewelry'}" tag="div" class="choose-tag menu_style" flex="dir:top main:center cross:center">
                <span>珠宝</span>
            </router-link>
            <router-link :to="{path:'/index/business'}" tag="div" class="choose-tag menu_para" flex="dir:top main:center cross:center">
                <span>商家</span>
            </router-link>
        </div>
  </div>
</template>
<script>
  export default {
    data(){
        return{
            banner:require('./assets/images/page_banner.jpg'),
        }
    }
  }
</script>
<style scoped lang='scss'>
    .banner-img{
        img{
            display:block;
            width:100%;
        }
    }
    .choose-tag{
        height: 145px;
        width: 145px;
        margin-top: 110px;
        margin-left: 35px;
        border-radius: 8px;
        background: rgba(69,73,83,0.60);
        border-radius: 8px;
        cursor:pointer;
        span{
            font-size: 0.8rem;
            color: #FFFFFF;
            letter-spacing: 0px;
        }
    }
    .choose-tag:hover{
        box-shadow: 0px 8px 14px 0px rgba(112,189,243,0.41);
        margin-top: 100px;
        background: #6AC4F4;
    }
    .choose-tag:first-child{
        margin-left: 0;
    }
</style>
