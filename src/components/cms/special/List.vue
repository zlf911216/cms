<template>
	<div class="brand-list" flex="dir:top">
  <div class="edit_intro" flex="dir:left main:justify cross:center" flex-box="1">
    <span>共{{special_total}}篇案例</span>
  </div>
		<div flex-box="0" flex="dir:left box:mean" class="list-top">
			<div flex="cross:center main:center" flex-box="2">ID</div>
			<div flex="cross:center main:center" flex-box="3">专题名称</div>
			<div flex="cross:center main:center" flex-box="3">创建时间</div>
			<div flex="cross:center main:center" flex-box="2">排序</div>
			<div flex="cross:center main:center" flex-box="2">状态</div>
			<div flex="cross:center main:center" flex-box="3">操作</div>
		</div>
		<div flex-box="0" flex="dir:left  box:mean" class="message" v-for='(item,index) in msg' :class="{'all-close':item.status==2}">
			<div flex="dir:top cross:center main:center" flex-box="2" class="id">
				<span>{{item.article_id}}</span>
			</div>
			<div flex-box="3" class="brand" flex="cross:center main:center">
				<div class="space" flex="cross:center main:center" >
          <router-link :to='{path:"/index/cms/special/edit?",query:{id:item.article_id}}' class="special_title" tag="span">{{item.title}}</router-link>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="3" class="country">
				<div class="space" flex="cross:center main:center">
					<span>{{getyear(item.update_time)+" "+gettime(item.update_time)}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="2" class="country">
				<div flex="cross:center main:center" v-on:click="get_sort(item.article_id,item.order_num)">
					<span v-if="order_num != item.article_id">{{item.order_num}}</span>
          <input type="tel" v-model="change_num" onclick="select()" v-else v-on:blur="change_sort(item.article_id,change_num)"></input>
				</div>
			</div>
			<div class="country" flex-box="2" flex="cross:center main:center">
				<div flex="dir:top cross:center main:center" class="space">
          <span v-if="item.status == -1" class="no_release">未发布</span>
          <span v-else>已发布</span>
				</div>
			</div>
			<div flex="dir:top cross:center main:center" flex-box="3">
				<div class="choose" flex="dir:left main:justify">
					<span v-on:click="delete_special(item.article_id)">删除</span>
					<span v-if="item.status == -1" v-on:click="release_special(item.article_id)">发布</span>
          <span v-else v-on:click="recall_special(item.article_id)" class="">撤回</span>
					<span v-on:click="go_cms('/cms/issue_pool.html')">推送</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
        order_num:null,
        change_num:null,
        special_total:0
			}
		},
		name:'cms-list',
    created:function(){
      this.get_special_list()
    },
    watch:{
      now:function(val, oldVal){
        if(!isNaN(val)){sessionStorage.getItem("case_poll-now-page",val)}
        this.get_special_list()
      }
    },
    methods:{
      get_special_list:function(){
        this.$http.post('/api/subjectcms/subject/GetSubjectInfoList',{
          "page":this.$store.state.publicMsg.nowpage
        }).then(function(data){
          if (data.data.retcode == 0) {
            this.special_total = data.data.resp.count
            let allpage = Math.ceil(data.data.resp.count / this.$store.state.special.page_size)
            this.$store.dispatch('page', allpage)
            this.$store.dispatch('special-list', data.data.resp.article_list)
          }
        })
      },
      getyear:function(value){
          return new Date(value).toISOString().substr(0, 10)
      },
      gettime:function(value){
          return new Date(value).toLocaleString().substr(10, 15)
      },
      change_sort:function(id,sort){
        this.$http.post('/api/subjectcms/subject/WriteOrder',{
          "article_id":id,
          "order_num":sort
        }).then(function(data){
          if (data.data.retcode == 0) {
            console.log('修改成功')
            this.get_special_list()
            this.order_num = null
            this.change_num = null
          }
        })
      },
      get_sort:function(id,sort){
        this.order_num = id
        this.change_num = sort
      },
      delete_special:function(id){
        if (confirm("请问是否删除该专题？")) {
          this.$http.post('/api/subjectcms/subject/DeleteSubject',{
            "article_id":id
          }).then(function(data){
            if (data.data.retcode == 0) {
              this.get_special_list()
            }
          })
        }
      },
      release_special:function(id){
        if (confirm("请问是否发布该专题？")) {
          this.$http.post('/api/subjectcms/subject/PublishSubject',{
            "article_id":id
          }).then(function(data){
            if (data.data.retcode == 0) {
              this.get_special_list()
            }
          })
        }
      },
      recall_special:function(id){
        if (confirm("是否撤回该专题")) {
          this.$http.post('/api/subjectcms/subject/ChanelPublishSubject',{
            "article_id":id
          }).then(function(data){
            if (data.data.retcode == 0) {
              this.get_special_list()
            }
          })
        }
      },
      go_cms:function(path){
        window.open(location.origin+path)
      }
    },
    computed:{
      msg(){
        return this.$store.state.special.list
      },
      now(){
        return this.$store.state.publicMsg.nowpage
      }
    }
	}
</script>
<style scoped lang='scss'>
	.brand-list{
		width: 980px;
		margin:5px auto 0;
    input{
      text-align:center;
      width:80%;
      margin:0 auto;
    }
		.all-close{
			background:rgba(0,0,0,0.1) !important;
			.id,.country,.brand,.para{
				color: #999999 !important;
			}
		}
		.list-top,.message{
			height: 50px;
			background: #FFFFFF;
			font-size: 14px;
			color: #383838;
			letter-spacing: 0px;
			border-bottom:1px solid #F4F6F8;
			>div{
				border-right:1px solid #F4F6F8;
			}
			>div:last-child{
				border:none;
			}
		}
		.message{
			width: 100%;
			background:#ffffff;
			height: auto;
			>div{
				padding: 30px 0;
			}
      .special_title{
        text-align:left;
      }
			.brand,.para{
				color: #53AAE6;
				cursor:pointer;
			}
			.close-img{
				width: 20px;
				margin-bottom: 4px;
			}
			.close{
				color: #999999;
				>span:last-child{
					margin-left:10px;
				}
			}
			.para .space>div{
				margin-top: 13px;
				cursor:pointer;
			}
			.para .space>div:first-child{
				margin-top: 0;
			}
			.edit{
				width: 125px;
				height: 30px;
				background: #53AAE6;
				border-radius: 4px;
				color: #ffffff;
				text-align: center;
				line-height: 30px;
				cursor:pointer;
			}
      .no_release{
        color:red;
      }
			.choose{
				width: 130px;
				color: #53AAE6;
				>span{
					cursor:pointer;
				}
        .gray{
          color:#999;
          cursor:auto;
          margin:0px;
        }
			}
		}
		.message:nth-child(2n){
			background: #FBFBFB;
		}
		.space{
			height: 100%;
			text-align: center;
			width:80%;
		}
    .special_title{
      padding:0;
      text-align:left;
      width:100%;
      margin:0 auto;
    }
	}
</style>
