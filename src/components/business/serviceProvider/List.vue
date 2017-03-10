<template>
	<div class="brand-list" flex="dir:top">
		<div flex-box="0" flex="dir:left box:mean" class="list-top">
			<div flex="cross:center main:center" flex-box="2">ID</div>
			<div flex="cross:center main:center" flex-box="4">商家名称</div>
			<div flex="cross:center main:center" flex-box="3">类型</div>
			<div flex="cross:center main:center" flex-box="3">城市</div>
			<div flex="cross:center main:center" flex-box="2">评价服务商</div>
			<div flex="cross:center main:center" flex-box="3">策划案例</div>
			<div flex="cross:center main:center" flex-box="3">操作</div>
		</div>
		<div flex-box="0" flex="dir:left  box:mean" class="message" v-for='item in msg' :class="{'all-close':item.status==2}">
			<div flex="dir:top cross:center main:center" flex-box="2" class="id" >
				<img :src="close" class="close-img" v-if="item.status==2">
				<span>{{item.seller_id}}</span>
				<span v-if="item.status==2">停用中</span>
			</div>
			<div flex-box="4" class="country" flex="cross:center main:center">
				<div class="space" flex="cross:center main:center" >
					<span>{{item.name}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="3" class="country">
				<div class="space" flex="dir:top cross:center main:center">
					<span v-for="items in item.category">{{items}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="3" class="country">
				<div class="space" flex="cross:center main:center">
					<span>{{item.city_name}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="2" class="country">
				<div class="space" flex="cross:center main:center">
					<span>{{item.evaluation_count}}</span>
      			</div>
			</div>
			<div class="country" flex-box="3" flex="cross:center main:center">
				<div flex="dir:top cross:center main:center" class="space">
         	 		<span>{{item.design_case_count}}</span>
				</div>
			</div>
			<div flex="dir:top cross:center main:center" flex-box="3">
				<div class="choose" flex="dir:left main:justify">
					<span @click="goalbum(item.seller_id)">相册</span>
					<span @click="change(item.seller_id)">编辑</span>
					<span v-if="item.status==0" @click="change_status(item.seller_id,2)">停用</span>
					<span v-if="item.status==2" @click="change_status(item.seller_id,0)">启用</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import serviceApi from '../../../api/service'
	export default {
		data(){
			return{
				close:require('../../../assets/images/list_downstate.png'),
				ificationList:null,
				isActive:null
			}
		},
    	methods:{
    		choose_ification(val){
    			this.isActive=val
    		},
  			change_status(id,status){
                serviceApi.UpdateCaseSellerStatus(this,id,status,serviceApi.getList)
  			},
            change(id){
                this.$router.push({path:'/index/business/serviceProvider/edit',query:{seller_id:id}})
            },
            goalbum(id){
            	window.open(location.pathname+'#/index/business/serviceProvider/album?seller_id='+id)
            }
  		},
  		computed:{
			msg(){
            	return this.$store.state.service.list
            }
		},
		watch:{
			isActive:function(val,oldVal){

			}
		}
	}
</script>
<style scoped lang='scss'>
	.brand-list{
		width: 980px;
		margin:5px auto 0;
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
				width: 100px;
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
	}
</style>
