<template>
  <div class="wed" flex-box="1" flex="dir:top main:center">
  	<section flex="dir:left main:center">
      <router-link :to="{path:'/index/cms/special'}" tag="div" class="choose-tag menu_style" flex="dir:top main:center cross:center">
          <span>专题管理</span>
      </router-link>
      <router-link :to="{path:'/index/cms/case_management'}" tag="div" class="choose-tag menu_style" flex="dir:top main:center cross:center">
          <span>案例管理</span>
      </router-link>
  		<div v-on:click="go_cms('/cms/message_pool.html')" class="choose-tag menu_brand" flex="dir:top main:center cross:center">
	    	<span>资讯管理</span>
	    </div>
	    <div v-on:click="go_cms('/cms/comments.html')" class="choose-tag menu_brand" flex="dir:top main:center cross:center">
	    	<span>评论管理</span>
	    </div>
  	</section>
    <section flex="dir:left main:center">
      <div v-on:click="go_cms('/cms/tag_manage.html')" class="choose-tag menu_brand" flex="dir:top main:center cross:center">
        <span>标签管理</span>
      </div>
      <div v-on:click="go_cms('/cms/user_control.html')" class="choose-tag menu_brand" flex="dir:top main:center cross:center">
        <span>用户管理</span>
      </div>
  		<div v-on:click="go_cms('/cms/push_control_tj.html')" class="choose-tag menu_brand" flex="dir:top main:center cross:center">
	    	<span>push管理</span>
	    </div>
	    <div v-on:click="go_cms('/cms/limits_manage.html')" class="choose-tag menu_brand" flex="dir:top main:center cross:center">
	    	<span>权限管理</span>
	    </div>
  	</section>


  </div>
</template>

<script>
export default {
  name: 'wed',
  data(){
  	return{
  		menu_brand:require('../../assets/images/menu_brand.png'),
  		menu_series:require('../../assets/images/menu_series.png'),
  		menu_style:require('../../assets/images/menu_style.png'),
  		menu_para:require('../../assets/images/menu_para.png'),
  	}
  },
  computed:{
  	see(){
  		return parseInt(localStorage.getItem("role_id"))
  	}
  },
  methods:{
    go_cms:function(path){
      window.open(location.origin+path)
    }
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
