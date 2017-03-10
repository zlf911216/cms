<template>
	<div class="brand-list" flex="dir:top">
		<div flex-box="0" flex="dir:left box:mean" class="list-top">
			<div flex="cross:center main:center" flex-box="2">ID</div>
			<div flex="cross:center main:center" flex-box="2">时间</div>
			<div flex="cross:center main:center" flex-box="7">评价内容</div>
			<div flex="cross:center main:center" flex-box="2">发表用户</div>
			<div flex="cross:center main:center" flex-box="2">被评价商家</div>
			<div flex="cross:center main:center" flex-box="2">状态</div>
			<div flex="cross:center main:center" flex-box="3">操作</div>
		</div>
		<div flex-box="0" flex="dir:left  box:mean" class="message" v-for='item in msg' :class="{'all-close':item.status==1}">
			<div flex="dir:top cross:center main:center" flex-box="2" class="id" >
				<img :src="close" class="close-img" v-if="item.status==1">
				<span>{{item.comment_id}}</span>
				<span v-if="item.status==1">屏蔽中</span>
			</div>
			<div flex-box="2" class="country" flex="cross:center main:center">
				<div class="space" flex="dir:top cross:center main:center" >
					<span>{{item.create_time | getyear}}</span>
                    <span>{{item.create_time | gettime}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="7" class="country">
				<div class="space pic_list" flex="dir:top cross:top main:center">
					<p>{{item.content}}</p>
					<div class='pic-box'>
                        <img :src="item+'@!gif'" v-for="item in item.picture">
					</div>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="2" class="para" @click="go_new_eval(item.user_id)">
				<div class="space" flex="dir:top cross:center main:center">
					<span>{{item.user}}</span>
					<span>{{item.user_identity_name}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="2" class="country">
				<div class="space" flex="cross:center main:center">
					<span>{{item.seller_article}}</span>
      			</div>
			</div>
			<div class="country" flex-box="2" flex="cross:center main:center">
				<div flex="dir:top cross:center main:center" class="space">
         	 		<span v-if="item.status==0">正常</span>
                    <span v-if="item.status==1">屏蔽</span>
				</div>
			</div>
			<div flex="dir:top cross:center main:center" flex-box="3">
				<div class="choose" flex="dir:left main:justify">
					<span v-if="item.status==0" @click="change_state(item.comment_id,1)">屏蔽</span>
                    <span v-if="item.status==1" @click="change_state(item.comment_id,0)">取消屏蔽</span>
                    <span @click="change_talk(item.user_id,1)" v-if="item.forbid_status==3">解除禁言</span>
					<span @click="change_talk(item.user_id,3)" v-else>禁言</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import evaluateApi from '../../../api/evaluate'
	export default {
		data(){
			return{
				close:require('../../../assets/images/list_downstate.png'),
			}
		},
		name:'evaluate-list',
    	methods:{
            change_state(id,state){
                evaluateApi.UpdateUserEvaluationStatus(this,id,state,evaluateApi.getList)
            },
            change_talk(id,state){
                evaluateApi.ForbidCommentStatus(this,id,state,evaluateApi.getList)
            },
            go_new_eval(id){
                if(this.$route.query.user_id){return}
                window.open(location.href+"?user_id="+id)
            }
  		},
  		computed:{
			msg(){
            	return this.$store.state.evaluate.list
            }
		},
        filters:{
            getyear:function(value){
                return new Date(value).toISOString().substr(0, 10)
            },
            gettime:function(value){
                return new Date(value).toLocaleString().substr(10, 15)
            }
        }
	}
</script>
<style scoped lang='scss'>
	.brand-list{
		width: 980px;
		margin:5px auto 0;
        min-height: 400px;
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
				min-height: 120px;
			}
			.pic-box{
                width:100%;
				margin-top: 5px;
				img{
					display: block;
					float: left;
					height:35px;
					margin-right:4%;
					margin-bottom: 4%;
				}
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
			.choose{
				width: 95px;
				color: #53AAE6;
				>span{
					cursor:pointer;
				}
			}
		}
		.message:nth-child(2n){
			background: #FBFBFB;
		}
		.space{
			height: 100%;
			text-align: center;
			padding: 0 10%;
			word-wrap:break-word;
		}
        .pic_list{
            width:100%;
        }
		.msg{
			padding: 20px 10%;
		}
	}
</style>
