<template lang="html">
    <div class="wed" flex-box="1" flex="dir:top main:center">
      <topList v-bind:list-msg ="list"></topList>
      <section flex="dir:left main:center">
          <router-link :to="{path:'/index/cms/case_management/edit_pool'}" tag="div" class="choose-tag menu_style" flex="dir:left main:center cross:center">
              <span>编辑池</span>
          </router-link>
          <router-link :to="{path:'/index/cms/case_management/release_pool'}" tag="div" class="choose-tag menu_style" flex="dir:left main:center cross:center">
              <span>发布池</span>
          </router-link>
      </section>
    </div>
</template>
<script type="text/javascript">
import topList from "../../list/list";
export default{
    data(){
        return {
            list:['CMS后台','>','案例管理']
        }
    },
    components:{
        topList
    }
}
</script>
<style scoped lang='scss'>
.wed{
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
    .menu_brand img{
        margin-top: 35px;
        width:40%;
    }
    .menu_series img{
        margin-top: 35px;
        width:32%;
    }
    .menu_style img{
        margin-top: 50px;
        width: 33%;
    }
    .menu_para img{
        margin-top: 38px;
        width:20%;
    }
    .choose-tag:first-child{
        margin-left: 0;
    }
}
</style>
