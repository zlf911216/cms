<template>
	<div calss="Create" flex="dir:top">
		<topList :list-msg="list"></topList>
		<ul class="Hq_Create">
			<li flex="dir:left cross:top">
				<span class="important" flex-box="0">专题名称</span>
				<input flex-box="0" type="text" name="" v-model='special_name' placeholder='这里输入标题，字数限制22个字符' maxlength="22" class="special_name"></input>
			</li>
			<li flex="dir:left cross:top">
				<span class="important" flex-box="0">专题简介</span>
				<textarea name="" v-model="description" maxlength="100" placeholder='这里输入专题简介，字数限制100个字符'></textarea>
			</li>
			<li flex="dir:left cross:top">
				<span class="important" flex-box="0">封面图</span>
				<div class="Hq_logo">
					<img :src="img+'@!gif'" alt="品牌logo" v-if="img!=null&&img!=''">
					<input type="file" id="Upload" @change="getfile" accept="image/jpeg,image/gif,image/png,image/bmp,image/jpg" v-if="accessid!=null"/>
				</div>
				<div class='explain'>
					<p>1.每张图片不超过5M</p>
					<p>2.格式为PNG、JPG、GIF</p>
					<p>3.尺寸1200*675</p>
				</div>
			</li>
			<li flex="dir:left cross:top">
				<span flex-box="0">搜索案例</span>
				<div class="special-box" flex="dir:top">
					<div class="search-spceial" flex="dir:top">
						<div flex="dir:left cross:center">
							<span class="title">文字搜索:</span>
							<input type="text" placeholder='搜索案例标题' v-model="searc_case">
              <span class="tagsearch" v-on:click = "search_case()">搜索</span>
						</div>
						<div flex="dir:left cross:center">
							<span class="title">标签搜索:</span>
							<select class="YY-select" v-model="choose_tag1">
							 	<option v-for="item in change_tag" :value="item.children">{{item.name}}</option>
							</select>
							<select class="YY-select" v-model="choose_tag2">
							 	<option v-for="item in choose_tag1" :value="item.tag_id" >{{item.name}}</option>
							</select>
							<span class="tagsearch" v-on:click = "search_case()">搜索</span>
						</div>
						<div class="tag_search" v-if="show_cover">
              <div>搜索结果:{{get_taglist.length}}篇</div>
              <div class="search-result">
                <div flex="dir:left box:mean">
                  <div flex-box="2">序号</div>
                  <div flex-box="2">ID</div>
                  <div flex-box="6">案例标题</div>
                  <div flex-box="2">操作</div>
                </div>
                <div flex="dir:left box:mean" v-for="(item,index) in get_taglist">
                  <div flex-box="2">{{index+1}}</div>
                  <div flex-box="2">{{item.article_id}}</div>
                  <div flex-box="6">{{item.title}}</div>
                  <div flex-box="2"><span class="add" v-if="item.haschoose != true" v-on:click="add_choose_result(item.article_id,index)">添加</span>
                  <span class="add allready" v-else-if="item.haschoose == true">已添加</span></div>
                </div>
              </div>
            </div>
						<div>选择结果:{{choose_tagid.length}}篇</div>
						<div flex="dir:top" class="search-result">
							<div flex="dir:left box:mean">
								<div flex-box="2">序号</div>
								<div flex-box="2">ID</div>
								<div flex-box="6">案例标题</div>
								<div flex-box="2">操作</div>
							</div>
							<div flex="dir:left box:mean" v-for="(item,index) in choose_taglist">
								<div flex-box="2">{{index+1}}</div>
								<div flex-box="2">{{item.article_id}}</div>
								<div flex-box="6">{{item.title}}</div>
								<div flex-box="2"><span class="delete" v-on:click="remove_choose_result(item.article_id,index)">删除</span></div>
							</div>
						</div>
					</div>
					<div>
					</div>
				</div>
			</li>
			<li flex="dir:left main:center">
				<div class="save" @click="save">保存</div>
				<div class="give-up" @click="goback">放弃编辑</div>
			</li>
		</ul>
    <div v-if="show_cover" v-on:click="close_cover()" class="cover"></div>
	</div>
</template>
<script>
import topList from '../../list/list'
import CommonApi from '../../../api/Common'
	export default {
		name:'EditBrand',
		data(){
			return{
				list:['CMS后台','>','专题管理','>','编辑专题'],
				special_name:null,
				description:null,
				img:null,
				files:null,
				host:null,
				access_url:null,
				accessid:null,
				expire:null,
				host:null,
				key:null,
				oss_bucket:null,
				policy:null,
				signature:null,
        searc_case:null,
        choose_tag:null,
        choose_tag1:null,
        choose_tag2:null,
        get_taglist:[],
        choose_taglist:[],
        choose_tagid:[],
        hash_id:null,
        show_cover:false
			}
		},
		components:{
			topList
		},
    created:function(){
      this.get_tag_list()
      var query = this.$route.query
      if (query.id != "" && query.id !=undefined) {
        this.hash_id = query.id
        this.get_special_content(query.id)
      }
    },
		methods:{
			goback(){
				this.$router.go(-1)
			},
			save(){
        var url,special_data
        if (this.special_name == "" || this.special_name == null) {
          this.$store.dispatch("alert-msg","请输入专题名称")
          this.$store.dispatch('alert-start')
          return
        }
        if (this.description == "" || this.description == null) {
          this.$store.dispatch("alert-msg","请输入专题描述")
          this.$store.dispatch('alert-start')
          return
        }
        if (this.img == "" || this.img == null) {
          this.$store.dispatch("alert-msg","请添加专题封面图")
          this.$store.dispatch('alert-start')
          return
        }
        if (this.special_name != "" && this.description != "" && this.img != "") {
          if (this.hash_id != "" && this.hash_id !=undefined) {
            url = "/api/subjectcms/subject/UpdateSubject"
            special_data = {
              'article':{
                "article_id":this.hash_id,
                "category":5,
                "title":this.special_name,
                "description":this.description
              },
              "list_style":{
                "list_style_type":"image_1_style",
                "url":this.img,
              },
              "relation_article_id_list":this.choose_tagid
            }
          }else{
            url = "/api/subjectcms/subject/AddSubject",
            special_data = {
              'article':{
                "category":5,
                "title":this.special_name,
                "description":this.description
              },
              "list_style":{
                "list_style_type":"image_1_style",
                "url":this.img,
              },
              "relation_article_id_list":this.choose_tagid
            }
          }
          this.$http.post(url,special_data).then(function(data){
            if (data.data.retcode == 0) {
              alert("保存成功")
              this.$router.go(-1)
            }
          })
        }
			},
			getfile(){
				this.files=document.querySelector('#Upload').files
				let from=new FormData()
				let now_time=new Date().getTime()
				from.append('OSSAccessKeyId',this.accessid)
				from.append('key',this.key+now_time+'_'+'${filename}')
				from.append('policy',this.policy)
				from.append('signature',this.signature)
				from.append('file',this.files[0])
				this.$http.post(this.host,from)
				.then((response) => {
					this.img=this.access_url+this.key+now_time+'_'+this.files[0].name
				})
			},
      search_case:function(){
        if ((this.choose_tag2 == null || this.choose_tag2 == "") && (this.searc_case == "" || this.searc_case == undefined)) {
          this.$store.dispatch("alert-msg","请输入关键字或选取二级标签")
          this.$store.dispatch('alert-start')
        }else{
          this.$http.post('/api/casecms/case/GetCaseListByTitleOrTag',{
            "tag_id":this.choose_tag2,
            "title":this.searc_case
          }).then(function(data){
            this.get_taglist = null
            this.get_taglist = data.data.resp.article_list
            if (this.choose_tagid.length > 0) {
              for (var i = 0; i < this.get_taglist.length; i++) {
              for (var j = 0; j < this.choose_tagid.length; j++) {
                  if (this.get_taglist[i].article_id == this.choose_tagid[j]) {
                    this.get_taglist[i].haschoose = true
                  }
                }
              }
            }
            this.show_cover = true
            console.log(this.get_taglist[0].haschoose)
          })
        }
      },
      close_cover:function(){
        this.show_cover = false
        this.searc_case = ""
        this.choose_tag1 = null
        this.choose_tag2 = null
      }
      ,
      get_tag_list:function(){
        this.$http.post('/api/cms/tag/GetTagList',{
          "tag_type":4
        }).then(function(data){
          if (data.data.retcode == 0) {
            this.change_tag = data.data.resp.tag_list
          }
        })
      },
      add_choose_result:function(id,index){
        this.choose_taglist.push(this.get_taglist[index])
        this.get_taglist[index].haschoose = true
        this.choose_tagid.push(id)
        /*console.log(this.choose_tagid)*/
      },
      remove_choose_result:function(id,index){
        this.choose_taglist.splice(index,1)
        this.choose_tagid.splice(index,1)
        /*console.log(this.choose_tagid)*/
      },
      get_special_content:function(id){
        this.$http.post('/api/subjectcms/subject/GetSubjectInfo',{
          "article_id":id
        }).then(function(data){
          if (data.data.retcode == 0) {
            this.special_name = data.data.resp.article.title
            this.description = data.data.resp.article.description
            this.img = data.data.resp.article.list_style.url
            this.choose_taglist = data.data.resp.article.relation_article_list
            for (var i = 0; i<this.choose_taglist.length; i++) {
              this.choose_tagid.push(this.choose_taglist[i].article_id)
            }
          }
        })
      }
		},
		mounted(){
			CommonApi.signature(this)
		}
	}
</script>
<style scoped lang='scss'>
	$backGd:#FBFBFB;
	$borderRadius:4px;
	$inputBg:#FBFBFB;
  .cover{
    background:rgba(0, 0, 0, 0.6);
    width:100%;
    height:100%;
    top:0;
    z-index:20;
    position:fixed;
  }
	.Hq_Create{
		background: #fff;
		margin:20px auto 0;
		padding: 0 180px 20px;
		width: 600px;
		input,select{
			text-indent: 10px;
			outline: none;
			background: $backGd;
			border-radius: 4px;
			border:none;
			height: 30px;
			width:288px;
		}
    .special_name{
      width:100%;
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
				#Upload{
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
				height:120px;
				width: 278px;
				padding:5px 0 5px 10px;
				max-width: 278px;
				max-height: 120px;
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
			.special-box{
				padding:0 20px 20px 20px;
				background: rgba(0,0,0,0.1);
				width: 500px;
				.search-spceial{
          div.tag_search{
            position:fixed;
            width:500px;
            background:#fff;
            padding:10px;
            border-radius:10px;
            top:25%;
            min-height:120px;
            z-index:21;
            left: 50%;
            margin:0 0 0 -250px;
            overflow-y:auto;
            height:300px;
          }
					&>div{
						width: 100%;
						margin-top: 20px;
						.title{
							margin-right: 10px;
						}
            input{
              margin:0 20px 0 0;
            }
						.search{
							margin-left: 20px;
							border-radius: 6px;
						    line-height: 25px;
    						background: #53AAE6;
    						color: white;
    						padding: 0 5px;
    						cursor: pointer;
						}
						.tagsearch{
							border-radius: 6px;
						    line-height: 25px;
    						background: #53AAE6;
    						color: white;
    						padding: 0 5px;
    						cursor: pointer;
						}
						.YY-select{
							width: 134px;
							margin-right: 20px;
						}
					}
					.search-result{
						border-top:1px solid rgba(0,0,0,0.3);
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
              .allready{
                background:#3cb5a5;
                cursor:auto;
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
			}
		}
		.Hq_label{
			float: left;
			height: 30px;
			width: auto;
			padding-left: 50px;
			label{
				display: block;
				position: relative;
				line-height: 30px;
				width: 100%;
				text-align: right;
				cursor:pointer;
			}
			input[type=checkbox],input[type=checkbox]:checked{
				display: none
			}
			input[type=checkbox]:checked+label:after,input[type=checkbox]+label:after{
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
			input[type=checkbox]+label:after{
				content: "";
				background: #FBFBFB;
			}
		}
	}
</style>
