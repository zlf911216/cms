<template>
	<div class="management" flex="dir:top">
        <topList :list-msg="list"></topList>
		<div class="message" flex="dir:left main:justify cross:center">
			<div class="tag-search" flex="dir:left cross:center">
				<span flex-box="0" class='tag'>服务商</span>
				<p class="state">城市:</p>
				<select class="state-select" v-model='city_id' v-if="city!=null">
                    <option :value=null>不限</option>
				 	<option v-for="item in city" :value="item.city_id" >{{item.name}}</option>
				</select>
				<p class="state">类型:</p>
				<select class="state-select" v-model='category' v-if="category_list!=null">
                    <option :value=null>不限</option>
				 	<option v-for="item in category_list" :value="item.seller_category_id">{{item.name}}</option>
				</select>
			</div>

			<div class="add" @click='addCompany'>添加服务商</div>
		</div>
		<div class="searchEnd" v-if="change!=null&&change!=''">以下为筛选结果…</div>
		<msgList></msgList>
		<page></page>
	</div>
</template>
<script>
import topList from '../../list/list'
import msgList from './List'
import page from '../../page/index'
import serviceApi from '../../../api/service'
import comApi from '../../../api/Common'
	export default {
		name:'service',
		data(){
			return{
                list:['商家','>','服务商列表'],
				search:null,
				change:null,
				city:null,
                city_id:this.$store.state.service.city_id,
                category:this.$store.state.service.category,
				category_list:null
			}
		},
		components:{
			msgList,page,topList
		},
		computed:{
			now(){
            	return this.$store.state.publicMsg.nowpage
            },
		},
		methods:{
			addCompany(){
				this.$router.push({path:'/index/business/serviceProvider/edit'})
			}
		},
		watch:{
			now:function(val, oldVal){
                if(!isNaN(val)){sessionStorage.setItem("service-now-page",val)}
				serviceApi.getList(this)
			},
            city_id:function(val, oldVal){
                this.$store.dispatch('service-city_id',val)
                if(this.now==1){
                    serviceApi.getList(this)
                }else{
                    this.$store.dispatch('now-change',1)
                }
            },
            category:function(val, oldVal){
                this.$store.dispatch('service-category',val)
                if(this.now==1){
                    serviceApi.getList(this)
                }else{
                    this.$store.dispatch('now-change',1)
                }
            }
		},
		created(){
			comApi.sellercity(this)
			serviceApi.sellerCategoryList(this)
            let nowpage=parseInt(sessionStorage.getItem("service-now-page"))
            this.$store.dispatch('now-change',nowpage || 1)
		},
		beforeRouteLeave(to, from, next){
            this.$store.dispatch('service-category',null)
            this.$store.dispatch('service-city_id',null)
			this.$store.dispatch('now-change',Number)
			next()
		}
	}
</script>
<style scoped lang='scss'>
	.management{
		.message{
			height: 60px;
			width: 980px;
			margin: auto;
			.tag-search{
				.tag{
					width: 100px;
					font-size: 24px;
					color: #454953;
					letter-spacing: 0px;
					line-height: 30px;
					font-weight: bold;
				}
				.search{
					background-image: url(../../../assets/images/seach_icon.png);
					background-repeat: no-repeat;
					background-size: auto 20px;
					background-color: #FFFFFF;
					background-position:10px 5px;
					height: 30px;
					width: 250px;
					border:none;
					outline: none;
					border-radius: 18px 0 0 18px;
					padding-left: 38px;
					font-size: 14px;
				}
				.search-button{
					background: #53AAE6;
					border-radius: 0px 18px 18px 0px;
					font-size: 12px;
					color: #FFFFFF;
					letter-spacing: 0px;
					line-height: 30px;
					width: 53px;
					text-align: center;
					cursor:pointer;
				}
			}
			.add{
				background-image: url(../../../assets/images/list_new_increase.png);
				background-repeat: no-repeat;
				background-size: auto 18px;
				background-color: #5ABCCB;
				background-position:12px 6px;
				width: 105px;
				height: 30px;
				border-radius: 4px;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: 0px;
				text-align: center;
				line-height: 30px;
				padding-left: 25px;
				cursor:pointer;
			}
			.state{
				margin-left: 30px;
				font-weight: bold;
			}
			.state-select{
				width: 180px;
				border:none;
				outline: none;
				height: 1.6rem;
				margin-left: 10px;
				border-radius: 6px;
			}
		}
		.searchEnd{
			width: 980px;
			margin:0 auto 20px;
			height: 20px;
			font-size: 14px;
			color: #999999;
			letter-spacing: 0px;
		}
	}
</style>
