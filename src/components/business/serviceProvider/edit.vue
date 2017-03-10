<template>
 	<div calss="YY-business" flex="dir:top">
		<topList :list-msg="list"></topList>
 		<ul class="Hq_Create">
			<li flex="dir:left cross:center">
			    <span flex-box="0" class='important'>类别</span>
                <ul>
                    <li v-for="item in category_list" class="Hq_label">
                        <input name="Fruit" type="checkbox" :value="item.seller_category_id" :id="item.seller_category_id" v-model="category"/>
                        <label :for="item.seller_category_id">{{item.name}}</label>
                    </li>
                </ul>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0" class='important'>商家名称</span>
				<input class="long" type="text" name="" v-model='name' placeholder='这里输入商家名称，字数限制18字' maxlength="18">
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0" class='important'>商家简介</span>
				<textarea type="text" name="" v-model='description' placeholder='输入40-100字符' maxlength="100"></textarea>
			</li>
			<li flex="dir:left cross:center" class="time">
				<span flex-box="0" class='important'>从业时间</span>
			 	<datepicker v-model="date" language='ch'></datepicker>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0" class='important'>商家地址</span>
				<div flex="dir:top">
					<div flex="dir:left" class="bottom_space">
						<select class="right_space" v-model='city_id' v-if="city!=null">
						 	<option v-for="item in city" :value="item.city_id" >{{item.name}}</option>
						</select>
					</div>
					<div flex="dir:left">
						<input type="text" class="long" placeholder="详细地址" v-model="address">
					</div>
				</div>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">商家电话</span>
				<div flex="dir:top">
					<div flex="dir:left cross:center" class="bottom_space">
						<span>400电话:</span>
						<input type="text" placeholder="请输入400电话" v-model="phone_four">
					</div>
					<div flex="dir:left cross:center" class="bottom_space">
						<span>手机号码:</span>
						<input type="text" placeholder="请输入手机号码" v-model="phone_mobile">
					</div>
                    <div flex="dir:left cross:center" class="bottom_space">
                        <span>商家电话:</span>
                        <input class="company" type="text" placeholder="区号+电话号码" v-model="phone_area">
                    </div>
				</div>
             </li>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0" class='important'>商家头像</span>
				<div class="Hq_logo">
					<img :src="logo_url+'@!gif'" alt="品牌logo" v-if="logo_url!=null&&logo_url!=''">
					<input type="file" class="upload" id="logo_url" @change="getfile_logo" accept="image/jpeg,image/gif,image/png,image/bmp"/>
				</div>
				<p class="explain">尺寸500*500</p>
				<!-- <span flex-box="0" class="cover">封面图</span>
				<div class="Hq_logo">
					<img :src="cover_image+'@!gif'" alt="品牌logo" v-if="cover_image!=null&&cover_image!=''">
					<input type="file" class="upload" id="cover_image" @change="getfile_cover" accept="image/jpeg,image/gif,image/png,image/bmp"/>
				</div> -->
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">负责人</span>
				<input type="text" name="" v-model='contact'>
				<span flex-box="0">联系电话</span>
				<input type="text" name="" v-model='contact_phone'>
			</li>
			<li flex="dir:left cross:top">
				<span flex-box="0">场地区域</span>
				<div flex="dir:top" flex-box="0">
					<p class="add" flex="dir:left">
						<span flex-box='0' @click='add_new_area'>+新增区域</span>
					</p>
					<div class="add-box">
						<section flex="dir:left box:mean">
							<div flex-box='2'>序号</div>
							<div flex-box='5'>内容</div>
							<div flex-box='3'>类型</div>
							<div flex-box='3'>操作</div>
						</section>
						<section flex="dir:left box:mean" v-for="(item,index) in area_list">
							<div flex-box='2'>{{index+1}}</div>
							<div flex-box='5' class="overflow">{{item.name}}</div>
							<div flex-box='3' v-if="item.type==1">室内</div>
							<div flex-box='3' v-if="item.type==2">户外</div>
							<div flex-box='3' class="fix">
								<span @click="change_area(index)">修改</span>
								<span @click="delete_area(index)">删除</span>
							</div>
						</section>
					</div>
				</div>
			</li>
			<li flex="dir:left cross:top">
				<span flex-box="0">商家专访</span>
				<div flex="dir:top" flex-box="0">
					<p class="add" flex="dir:left">
						<span flex-box='0' @click='add_new_special'>+新增专访</span>
					</p>
					<div class="add-box">
						<section flex="dir:left box:mean">
							<div flex-box='2'>序号</div>
							<div flex-box='6'>内容</div>
							<div flex-box='2'>操作</div>
						</section>
						<section flex="dir:left box:mean" v-for="(item,index) in my_choose_list">
							<div flex-box='2'>{{index+1}}</div>
							<div flex-box='6' class="overflow">{{item.title}}</div>
							<div flex-box='2' class="fix">
								<span @click="delete_msg(index)">删除</span>
							</div>
						</section>
					</div>
				</div>
			</li>
			<li flex="dir:left main:center">
				<div class="save" @click="save">保存</div>
				<div class="give-up" @click="goback">放弃编辑</div>
			</li>
		</ul>
		<div class="shandow-box" v-if='open_area||open_special' @click="close_all"></div>
		<div class='add_area' flex="dir:top main:justify" v-if='open_area'>
			<div class='title'>
				<span>新增区域</span>
			</div>
			<div>
				<input type='text' v-model='new_area.name'>
			</div>
			<div flex="dir:left cross:center">
				<select class="YY-fselect" v-model='new_area.type'>
				 	<option :value='1' >室内</option>
				 	<option :value='2' >户外</option>
				</select>
				<span class="enter" @click="add_new_area_list">确定</span>
				<span class="cancel" @click="close_all">取消</span>
			</div>
		</div>
		<div class='add_interview' flex="dir:top" v-if='open_special'>
			<div flex="dir:left cross:center" class="title-search">
				<span>搜索文章</span>
				<input type='text' v-model="search_msg_input">
				<span class="search" @click="search_msg">搜索</span>
			</div>
			<div flex="dir:top" class="msg-list-top">
				<div flex="dir:left box:mean" flex-box="0">
					<div flex-box="2">ID</div>
					<div flex-box="2">种类</div>
					<div flex-box="7">专题标题</div>
					<div flex-box="2">操作</div>
				</div>
				<div flex="dir:left box:mean" v-for="item in search_msg_list" flex-box="0">
					<div flex-box="2">{{item.article_id}}</div>
					<div flex-box="2">{{item.category_name}}</div>
					<div flex-box="7">{{item.title}}</div>
					<div flex-box="2">
                        <span class="already" v-if="item.haschoose">已添加</span>
                        <span class="add" @click="add_msg(item)" v-else>添加</span>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import topList from '../../list/list'
import comApi from '../../../api/Common'
import serviceApi from '../../../api/service'
import datepicker from 'vue-date'
	export default {
		name:'CreateBrand',
		data(){
			return{
                my_choose_list:[],
                search_msg_input:null,
                search_msg_list:null,
				date: '',
				list:['商家','>','服务商管理','>','基本信息'],
				category:[],
				category_list:null,
				name:null,
				description:null,
				city:null,
				city_id:null,
				address:null,
				phone_area:null,
				phone_four:null,
				phone_mobile:null,
				contact:null,
				contact_phone:null,
				access_url:null,
				accessid:null,
				expire:null,
				host:null,
				key:null,
				oss_bucket:null,
				policy:null,
				signature:null,
				logo_url:null,
				cover_image:null,
				area_list:[],
				change_area_num:null,
				new_area:{name:'',type:''},
				new_interview:null,
				open_area:false,
				open_special:false,
			}
		},
		components:{
			topList,datepicker
		},
		methods:{
            add_msg(item){
                item.haschoose=true
                this.my_choose_list.push(item)
            },
            delete_msg(index){
                this.my_choose_list.splice(index,1)
            },
		    goback(){
		        this.$router.go(-1)
		    },
			save(){
                if(this.category.length==0){
                    this.$store.dispatch('alert-msg', '请填写商家类别')
                    this.$store.dispatch('alert-start')
                    return
                }
                if(this.name==null||this.name==''){
                    this.$store.dispatch('alert-msg', '请填写商家名称')
                    this.$store.dispatch('alert-start')
                    return
                }
                if(this.description==null||this.description==''){
                    this.$store.dispatch('alert-msg', '请填写商家简介')
                    this.$store.dispatch('alert-start')
                    return
                }
                if(this.date==''){
                    this.$store.dispatch('alert-msg', '请填写从业时间')
                    this.$store.dispatch('alert-start')
                    return
                }
                if(this.city_id==null||this.address==null||this.address==''){
                    this.$store.dispatch('alert-msg', '请填写商家地址')
                    this.$store.dispatch('alert-start')
                    return
                }
                if(this.logo_url==null){
                    this.$store.dispatch('alert-msg', '请上传商家头像')
                    this.$store.dispatch('alert-start')
                    return
                }
                if(!this.$route.query.seller_id){
                    serviceApi.addseller(this)
                }else{
                    serviceApi.updateseller(this)
                }
			},
			getfile_logo(){
				this.files=document.querySelector('#logo_url').files
				let from=new FormData()
				let now_time=new Date().getTime()
				from.append('OSSAccessKeyId',this.accessid)
				from.append('key',this.key+now_time+'_'+'${filename}')
				from.append('policy',this.policy)
				from.append('signature',this.signature)
				from.append('file',this.files[0])
				this.$http.post(this.host,from)
				.then((response) => {
					this.logo_url=this.access_url+this.key+now_time+'_'+this.files[0].name
				})
			},
			getfile_cover(){
				this.files=document.querySelector('#cover_image').files
				let from=new FormData()
				let now_time=new Date().getTime()
				from.append('OSSAccessKeyId',this.accessid)
				from.append('key',this.key+now_time+'_'+'${filename}')
				from.append('policy',this.policy)
				from.append('signature',this.signature)
				from.append('file',this.files[0])
				this.$http.post(this.host,from)
				.then((response) => {
					this.cover_image=this.access_url+this.key+now_time+'_'+this.files[0].name
				})
			},
			add_new_area(){
				this.open_area=true
			},
			add_new_special(){
				this.open_special=true
			},
			close_all(){
				this.open_special=false
				this.open_area=false
				this.new_area={name:'',type:''}
			},
			add_new_area_list(){
                if(this.new_area.name==''){
                    this.$store.dispatch('alert-msg', '请输入区域名称')
                    this.$store.dispatch('alert-start')
                    return
                }
                if(this.new_area.type==''){
                    this.$store.dispatch('alert-msg', '请选择区域种类')
                    this.$store.dispatch('alert-start')
                    return
                }
				if(this.change_area_num!=null){
					this.area_list.splice(this.change_area_num,1,this.new_area)
				}else{
					this.area_list.push(this.new_area);
				}
				this.change_area_num=null
				this.close_all()
			},
			change_area(index){
				this.open_area=true
				this.change_area_num=index
				this.new_area.name=this.area_list[index].name
				this.new_area.type=this.area_list[index].type
			},
			delete_area(index){
				this.area_list.splice(index,1)
			},
            search_msg(){
                serviceApi.GetRelevanceArticleList(this,this.search_msg_input)
            }
		},
		mounted(){
			comApi.signature(this,2)
			comApi.sellercity(this)
			serviceApi.sellerCategoryList(this)
		},
		computed:{
			seller_phone_list(){
				let put=[]
				let type_1={}
				type_1.type=1
				type_1.phone=this.phone_area
				let type_2={}
				type_2.type=2
				type_2.phone=this.phone_four
				let type_3={}
				type_3.type=3
				type_3.phone=this.phone_mobile
				if((this.phone_area!=null&&this.phone_area!="")){put.push(type_1)}
				if(this.phone_four!=null&&this.phone_four!=""){put.push(type_2)}
				if(this.phone_mobile!=null&&this.phone_four!=""){put.push(type_3)}
				return put
			},
			work_year(){
				let str = this.date
				str = str.replace(/-/g,'/')
				let date = new Date(str).getTime();
				return date
			},
            interview_list(){
                let msg=[]
                for(let item of this.my_choose_list){
                    msg.push(item.article_id)
                }
                return msg
            }
		},
        created(){
            if(!this.$route.query.seller_id){return}
            serviceApi.GetCaseSellerList(this)

        }
	}
</script>
<style scoped lang='scss'>
	$backGd:#FBFBFB;
	$borderRadius:4px;
	$inputBg:#FBFBFB;
	.Hq_Create{
		background: #fff;
		margin:20px auto 0;
		padding: 0 180px 20px;
		width: 600px;
		input,select{
			text-indent: 15px;
			outline: none;
			background: $backGd;
			border-radius: 4px;
			border:none;
			height: 30px;
			width:180px;
		}
		.long{
			width:420px;
		}
		.right_space{
			margin-right: 10px;
		}
		.bottom_space{
			margin-bottom: 20px;
			>span{
			    text-align: justify;
			    text-align-last: justify;
			    width: 70px;
			}
			>span,input{
				margin-right: 10px;
			}
		}
		>li{
			font-size: 14px;
			color: #454953;
			letter-spacing: 0px;
			margin: 20px 0;
			min-height: 30px;
			>span{
				font-weight: bold;
				text-align: justify;
				text-align-last:justify;
				width: 70px;
				padding-right: 20px;
				position: relative;
			}
			>span:after{
				position: absolute;
				content: ':';
				width: 10px;
				height: 100%;
				top: 0;
				right: 0;
			}
            .important:after{
                position: absolute;
                content: '*';
                color: red;
                width: 10px;
                height: 100%;
                top: 0;
                right: 0;
            }
			.explain{
				margin-left: 10px;
				p{
					margin-bottom: 15px;
				}
				p:last-child{
					margin-bottom: 0;
				}
			}
			.Hq_logo{
				height: 100px;
				width: 100px;
				background-image:url(../../../assets/images/form_logo_increase.png);
				background-repeat: no-repeat;
				background-size:15% contain;
				background-position: center 20px;
				border: 1px solid #E0E0E0;
				border-radius: $borderRadius;
				display: inline-block;
				position: relative;
				overflow: hidden;
				.upload{
					position: absolute;
					top:0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					z-index: 3;
				}
				img{
					z-index: 2;
					position: absolute;
					display: block;
					width: auto;
					height: 100%;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
				}
			}
			.Hq_logo:after{
				position:absolute;
				content:'点击上传';
				width: auto;
				height: 20px;
				font-size: 12px;
				color: #7BC3F5;
				letter-spacing: 0px;
				font-weight: bold;
				left: 50%;
				transform: translate(-50%,65px);
				z-index: 1
			}
			textarea{
				height:160px;
				width: 390px;
				padding: 15px;
				max-width: 390px;
				max-height: 160px;
				outline: none;
				border: none;
				background:$inputBg;
				border-radius: $borderRadius;
				overflow-y: auto;
				resize: none;
			}
			.save,.give-up{
				height: 30px;
				width: 130px;
				text-align:center;
				line-height: 30px;
				background: #53AAE6;
				border-radius:$borderRadius;
				color: #fff;
				cursor: pointer;
			}
			.give-up{
				margin-left: 70px;
				background: #E4EBF0;
			}
			.cover{
				margin-left: 60px;
			}
			.explain{
				width: 130px;
				text-align: center;
			}
			.add{
				&>span{
					background: #53AAE6;
					color: white;
					padding: 2px 15px;
					border-radius: 4px;
					cursor: pointer;
				}
			}
			.add-box{
				background: rgba(0, 0, 0, 0.1);
				border-top: 1px solid black;
				border-right: 1px solid black;
				margin-top: 20px;
				width: 500px;
				section:first-child{
					background:rgba(0, 0, 0, 0.2);
				}
				section>div{
					height: 2.2rem;
					line-height: 2.2rem;
					text-align: center;
					border-left: 1px solid black;
					border-bottom: 1px solid black;
				}
				.overflow{
					text-overflow : ellipsis;
				}
				.fix{
					color:#53AAE6;
					&>span{
						cursor: pointer;
					}
				}
			}
		}
		.time{
			overflow: visible;
			&>div{
                width:200px;
				overflow: visible;
			}
		}
		.Hq_label{
			float: left;
			padding-left: 50px;
			height: 30px;
			width: auto;
			label{
				display: block;
				position: relative;
				line-height: 30px;
				width: 100%;
				text-align: right;
				cursor:pointer;
			}
			input[type=radio],input[type=checkbox],input[type=radio]:checked,input[type=checkbox]:checked{
				display: none
			}
			input[type=radio]:checked+label:after,input[type=checkbox]:checked+label:after,input[type=radio]+label:after,input[type=checkbox]+label:after{
				position: absolute;
				top: 50%;
				left:0;
				transform: translate(-35px,-50%);
				content: "\2714";
				width:20px;
				height: 20px;
				text-align: center;
				line-height: 20px;
				background: #53AAE6;
				color: white;
				border-radius: 50%;
			}
			input[type=radio]+label:after,input[type=checkbox]+label:after{
				content: "";
				background: #FBFBFB;
			}
		}
	}
	.shandow-box{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		background: rgba(0,0,0,0.5);
		z-index: 999;
	}
	.add_area{
		position: fixed;
		top: 50%;
		left: 50%;
		width: 300px;
		height: 130px;
		border-radius: 6px;
		padding: 20px;
		background: white;
		border:1px solid rgba(0,0,0,0.3);
		transform:translate(-50%,-50%);
		z-index: 999;
		.title{
			font-size: 1.2rem;
		}
		input{
			outline: none;
			border:none;
			border-radius: 4px;
			height: 1.8rem;
			line-height: 1.8rem;
			width: 82%;
			background: rgba(0,0,0,0.05);
			text-indent: 5px;
		}
		select{
			outline: none;
			border: none;
			width: 70px;
			background: rgba(0,0,0,0.05);
			height: 1.8rem;
			border-radius: 4px;
		}
		.enter{
			margin-left: 28px;
		    text-align: center;
		    line-height: 30px;
		    background: #53AAE6;
		    border-radius: 4px;
		    color: #fff;
		    cursor: pointer;
		    width: 60px;
		}
		.cancel{
			margin-left: 28px;
		    text-align: center;
		    line-height: 30px;
		    background: #becfdc;
		    border-radius: 4px;
		    color: #fff;
		    cursor: pointer;
		    width: 60px;
		}
	}
	.add_interview{
		position: fixed;
		top: 50%;
		left: 50%;
		width: 600px;
		min-height: 200px;
		border-radius: 6px;
		padding: 20px;
		background: white;
		border:1px solid rgba(0,0,0,0.3);
		transform:translate(-50%,-50%);
		z-index: 999;
		.title-search{
			input{
				height: 1.4rem;
				margin:0 25px;
				outline: none;
				border-radius: 8px;
				border: none;
				background: rgba(0,0,0,0.15);
				text-indent: 10px;
			}
			.search{
				text-align: center;
			    line-height: 22px;
			    background: #53AAE6;
			    border-radius: 6px;
			    color: #fff;
			    cursor: pointer;
			    width: 60px;
			}
		}
		.msg-list-top{
			margin-top: 20px;
			border-top:1px solid rgba(0,0,0,0.3);
            height:300px;
            overflow-y:scroll;
			&>div{
				height: 2.2rem;
				line-height: 2.2rem;
				font-size: 0.9rem;
				border-right:1px solid rgba(0,0,0,0.3);
				&>div{
					border-left:1px solid rgba(0,0,0,0.3);
					border-bottom:1px solid rgba(0,0,0,0.3);
					text-align: center;
				}
				&:first-child{
					background: rgba(0,0,0,0.2);
				}
				.add{
					border-radius: 4px;
					background: #33af76;
					color: white;
					padding: 0 5px;
					cursor: pointer;
				}
                .already{
                    border-radius: 4px;
                    background: #3cb5a5;
                    color: white;
                    padding: 0 5px;
                }
				.delete{
					border-radius: 4px;
					background: red;
					color: white;
					padding: 0 5px;
					cursor: pointer;
				}
			}
		}
	}

</style>
