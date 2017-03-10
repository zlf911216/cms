<template>
	<div class="album" flex="dir:top">
		<topList :list-msg="list"></topList>
		<h1 class='title'>相册</h1>
		<div class="upload-box" flex='dir:left box:mean'>
			<div class="video"  flex='dir:left cross:top'>
				<section flex-box="0" class='upload-title'>
					<p>上传视频:</p>
				</section>
				<section flex-box="1" class="upload-msg">
					<p>视频ID:</p>
					<input type='text' placeholder='请输入视频ID' v-model="video_id">
					<p>上传封面图:</p>
					<div flex="dir:left cross:center">
						<div class="upload">
							<img :src="video_cover_image+'@!gif'" alt="品牌logo" v-if="video_cover_image!=null&&video_cover_image!=''">
							<input type="file" class="upload" id="Upload_video" @change="get_video" accept="image/jpeg,image/gif,image/png,image/bmp"/>
						</div>
						<p class="explain">尺寸1200x675</p>
					</div>
					<p>简介描述:</p>
					<textarea v-model="video_description" placeholder='最多输入30个字符' maxlength='30'></textarea>
					<div class="save" flex="dir:right">
						<span @click='save_video'>保存视频</span>
					</div>
				</section>
			</div>
			<div class="picture"  flex='dir:left cross:top'>
				<section flex-box="0" class='upload-title'>
					<p>上传图片:</p>
				</section>
				<section flex-box="1" class="upload-msg">
					<p>添加图片:</p>
					<div flex="dir:left cross:center">
						<div class="upload">
							<img :src="logo_url+'@!gif'" alt="品牌logo" v-if="logo_url!=null&&logo_url!=''">
							<input type="file" multiple class="upload" id="Upload_images" @change="get_img" accept="image/jpeg,image/gif,image/png,image/bmp"/>
						</div>
						<p class="explain">建议尺寸600x600</p>
					</div>
					<p>图片列表:</p>
					<div class='imgList-box'>
                        <div class="img-box" v-for='(item,index) in picture_list'>
                            <div class="close" @click="delete_pic_img(index)">删除</div>
                            <img :src="item.pic_url+'@!100x100'">
                        </div>
					</div>
					<p>简介描述:</p>
					<textarea v-model="pic_description" placeholder='建议输入30个字符'></textarea>
					<div class="save" flex="dir:right">
						<span @click="save_pic">保存图片</span>
					</div>
				</section>
			</div>
		</div>
		<albumList></albumList>
		<page></page>
	</div>
</template>
<script>
import topList from '../../list/list'
import albumList from './albumList'
import page from '../../page/index'
import commonApi from '../../../api/Common'
import albumApi from '../../../api/album'
	export default {
		data(){
			return{
				list:['商家','>','服务商管理','>','相册'],
                video_id:null,
                video_description:null,
                video_cover_image:null,
                picture_list:[],
                pic_description:null,
                files:null,
                pic_files:null,
                host:null,
                access_url:null,
                accessid:null,
                expire:null,
                host:null,
                key:null,
                oss_bucket:null,
                policy:null,
                signature:null
			}
		},
		components:{
			topList,albumList,page
		},
		name:'album',
    	methods:{
    		get_video(){
                this.files=document.querySelector('#Upload_video').files
                let from=new FormData()
                let now_time=new Date().getTime()
                from.append('OSSAccessKeyId',this.accessid)
                from.append('key',this.key+now_time+'_'+'${filename}')
                from.append('policy',this.policy)
                from.append('signature',this.signature)
                from.append('file',this.files[0])
                this.$http.post(this.host,from)
                .then((response) => {
                    this.video_cover_image=this.access_url+this.key+now_time+'_'+this.files[0].name
                })
            },
            get_img(){
                this.pic_files=document.querySelector('#Upload_images').files
                for(let index=0;index<this.pic_files.length;index++){
                    let from=new FormData()
                    let now_time=new Date().getTime()
                    from.append('OSSAccessKeyId',this.accessid)
                    from.append('key',this.key+now_time+'_'+'${filename}')
                    from.append('policy',this.policy)
                    from.append('signature',this.signature)
                    from.append('file',this.pic_files[index])
                    this.$http.post(this.host,from)
                    .then((response) => {
                        let now_img={}
                        let _this=this
                        now_img.pic_url=this.access_url+this.key+now_time+'_'+this.pic_files[index].name
                        let reader = new FileReader();
                        reader.readAsDataURL(this.pic_files[index]);
                        reader.onload = function(theFile) {
                            let image = new Image();
                            image.src = theFile.target.result;
                            image.onload = function() {
                                now_img.width=this.width
                                now_img.height=this.height
                                _this.picture_list.push(now_img)
                            }
                        }
                    })
                }
            },
            delete_pic_img(index){
                this.picture_list.splice(index,1)
            },
            save_video(){
                this.$store.dispatch('now-change',1)
                albumApi.AddCaseVideo(this,albumApi.getlist)
            },
            save_pic(){
                if (this.picture_list.length == 0) {
                  this.$store.dispatch('alert-msg', '请至少上传一张图片')
                  this.$store.dispatch('alert-start')
                  return
                }
                this.$store.dispatch('now-change',1)
                albumApi.AddCasePicture(this,albumApi.getlist)
            }
  		},
  		computed:{
            now(){
                return this.$store.state.publicMsg.nowpage
            },
		},
		watch:{
            now:function(val, oldVal){
                if(!isNaN(val)){sessionStorage.setItem("album-now-page",val)}
                albumApi.getlist(this)
            },
		},
        created(){
            commonApi.signature(this)
            let nowpage=parseInt(sessionStorage.getItem("album-now-page"))
            this.$store.dispatch('now-change',nowpage || 1)
        },
        beforeRouteLeave(to, from, next){
            this.$store.dispatch('now-change',Number)
            next()
        }
	}
</script>
<style scoped lang='scss'>
	::-webkit-scrollbar {
		width: 0;
	}
	.title{
		width: 960px;
		margin:20px auto 0;
		font-size: 1.5rem;
	}
	.upload-box{
		width: 940px;
		margin:10px auto 0;
		padding: 20px 10px;
		background: white;
		.video,.picture{
			.upload-title{
				width: 100px;
				text-align: center;
			}
			.explain{
				margin-left: 10px;
			}
			.upload{
				margin-bottom: 15px;
				height: 100px;
				width: 100px;
				background-image:url(../../../assets/images/form_logo_increase.png);
				background-repeat: no-repeat;
				background-size:15% contain;
				background-position: center 20px;
				border: 1px solid #E0E0E0;
				border-radius: 6px;
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
				&:after{
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
			}
			.upload-msg{
				p{
					margin-bottom: 15px;
				}
			}
			textarea{
				height: 110px;
			    width: 85%;
			    padding: 15px;
			    max-width: 390px;
			    max-height: 160px;
			    outline: none;
			    border: none;
			    background: rgba(0,0,0,0.05);
			    border-radius: 4px;
			    overflow-y: auto;
			    resize: none;
			}
			.save{
				margin-top: 25px;
				padding-right: 25px;
				&>span{
				    width: 125px;
				    height: 30px;
				    background: #53AAE6;
				    border-radius: 4px;
				    color: #ffffff;
				    text-align: center;
				    line-height: 30px;
				    cursor: pointer;
				}
			}
		}
		.video{
			border-right: 1px solid rgba(0,0,0,0.1);
			input{
				border: none;
				outline: none;
				background: rgba(0,0,0,0.05);
				line-height: 2rem;
				width: 65%;
				border-radius: 8px;
				text-indent: 5px;
				margin-bottom: 15px;
			}
		}
		.picture{
			.imgList-box{
				min-height: 10px;
				width:86%;
				max-height: 160px;
				overflow-y: auto;
				border:1px solid rgba(0,0,0,0.2);
				border-radius: 4px;
				padding: 10px;
				margin-bottom: 15px;
                .img-box{
                    position:relative;
                    width: 22%;
                    float: left;
                    border-radius: 6px;
                    margin-right:4%;
                    margin-bottom: 3%;
                    &:nth-child(4n){
                        margin-right: 0;
                    }
                    img{
                        display:block;
                        width:100%;
                    }
                    .close{
                        position:absolute;
                        width:30px;
                        text-align:center;
                        height:16px;
                        line-height:16px;
                        top:-7.5px;
                        right:-7.5px;
                        background:red;
                        border-radius:6px;
                        color:white;
                        font-size:0.5rem;
                        cursor:pointer;
                    }
                }
			}
		}
	}
</style>
