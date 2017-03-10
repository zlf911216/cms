<template>
	<div class="management" flex="dir:top">
        <topList :list-msg="list"></topList>
		<div class="message" flex="dir:left cross:center">
			<div class="tag-search" flex="dir:left">
				<span flex-box="0" class='tag'>商家评价</span>
				<input type='text' class="search" placeholder="筛选.." v-model="search">
				<div class="search-button" @click='changemsg'>搜索</div>
			</div>
			<p class="state">评价状态:</p>
			<select class="state-select" v-model='choose_state'>
                <option :value=null>不限</option>
			 	<option :value=0>正常</option>
			 	<option :value=1>屏蔽</option>
        <option :value=2>禁言</option>
			</select>
			<p class="time">评价时间:</p>
            <div class="data-time">
                <datepicker v-model="time" :language='ch' :range=true></datepicker>
            </div>
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
import evaluateApi from '../../../api/evaluate'
import datepicker from 'vue-date'
	export default {
		name:'management',
		data(){
			return{
                list:['商家','>','评价列表'],
				search:null,
				change:null,
                time:[this.$store.state.evaluate.start_time,this.$store.state.evaluate.end_time],
                choose_state:this.$store.state.evaluate.evaluation_status
			}
		},
		components:{
			msgList,page,datepicker,topList
		},
		computed:{
			now(){
            	return this.$store.state.publicMsg.nowpage
            }
		},
		methods:{
			changemsg(){
				this.change=this.search
                this.$store.dispatch('evaluate-search',this.search)
				if(this.now==1){
					evaluateApi.getList(this)
				}else{
					this.$store.dispatch('now-change',1)
				}
			}
		},
		watch:{
			now:function(val, oldVal){
				if(!isNaN(val)){sessionStorage.setItem("evaluate-now-page",val)}
				evaluateApi.getList(this)
			},
            choose_state:function(val, oldVal){
                this.$store.dispatch('evaluate-evaluation_status',val)
                if(this.now==1){
                    evaluateApi.getList(this)
                }else{
                    this.$store.dispatch('now-change',1)
                }
            },
            time:function(val, oldVal){
                console.log(1)
                this.$store.dispatch('evaluate-start_time',val[0])
                this.$store.dispatch('evaluate-end_time',val[1])
                if(this.now==1){
                    evaluateApi.getList(this)
                }else{
                    this.$store.dispatch('now-change',1)
                }
            }
		},
		created(){
			let nowpage=parseInt(sessionStorage.getItem("evaluate-now-page"))
	    	this.$store.dispatch('now-change',nowpage || 1)

		},
		beforeRouteLeave(to, from, next){
            this.$store.dispatch('evaluate-evaluation_status',null)
            this.$store.dispatch('evaluate-start_time',new Date(Date.parse(new Date())-(1000*3600*24*30)).toISOString().substr(0, 10))
            this.$store.dispatch('evaluate-end_time',new Date(Date.parse(new Date())).toISOString().substr(0, 10))
			this.$store.dispatch('evaluate-search','')
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
			overflow: visible;
			.tag-search{
				.tag{
					width: 120px;
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
					width: 170px;
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
			&>div{
				overflow: visible;
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
		.time,.state{
			margin-left: 20px;
			font-weight: bold;
		}
		.time{
			margin-right: 5px;
		}
    .data-time{
      width:300px;
      margin-left:10px;
    }
		.state-select{
			width: 80px;
			border:none;
			outline: none;
			height: 1.6rem;
			margin-left: 10px;
			border-radius: 6px;
		}
	}
</style>
