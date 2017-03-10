<template lang="html">
  <div class="all">
    <div :id="'add'+''+inputId"  @input="outputContent" style="height:380px"></div>
    <div class="upload" v-if="open_load">
      <div class="box" @click="closeup"></div>
      <div class="upload-box">
        <p class="pic-attr">设置图片属性</p>
        <div class="water-box" flex="dir:left cross:center">
          <p flex-box="0">图片水印:</p>
          <div flex="dir:left cross:center" @click="haswater">
            <div class="circle" :class="{'choose':has_water_mark==1}"></div>
            <p class="true">是</p>
          </div>
          <div flex="dir:left cross:center" @click="nowater">
            <div class="circle" :class="{'choose':has_water_mark==0}"></div>
            <p class="false">否</p>
          </div>
        </div>
        <p class="pic-choose">上传要求</p>
        <p class="upload-explain">图片尺寸:1200*900</p>
        <p class="upload-explain">图片大小:不超过5M</p>
        <p class="upload-explain">图片格式:PNG,JPG,GIF</p>
        <p class="pic-choose" v-if="upload_kinds==0">上传图片</p>
        <p class="pic-choose" v-if="upload_kinds==1">上传图集</p>
        <div class='choose-box' flex='dir:left main:justify'>
          <div flex-box="0" class="upload-pic">
            <div class="upload-word">选择文件</div>
            <input type="file" id="Upload" multiple @change="getfile" accept="image/jpg,image/jpeg,image/gif,image/png,image/bmp"/>
          </div>
          <div flex-box="0" class="start-upload" @click="uploadPic" v-if="host!=null">开始上传</div>
        </div>
        <div class='pic-msg-box'>
          <div class="pic-msg" flex="dir:top" v-for='(item,index) in files'>
            <div class="pic-name-box" flex="dir:left cross:center">
              <p class="pic-name">{{item.name}}</p>
              <p class='pic-size'>{{item.size | changeSize}}KB</p>
            </div>
            <div class="pic-pro-box" flex="dir:left cross:center">
              <div class="pic-pro">
                <div class="pic-pro-per" :style="{width:allpro[index]+'%'}"></div>
              </div>
              <p class='pic-wait' v-if='allstatus[index]==0'>等待上传</p>
              <p class='prc-pro' v-if='allstatus[index]==1'>{{allpro[index]}}</p>
              <p class='pic-success' v-if='allstatus[index]==2'>上传成功</p>
              <p class='pic-error' v-if='allstatus[index]==3'>上传失败，点击<span class='repeat' @click="repeat(index)">重试</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="video-upload-box" v-if="video_open">
        <div class="box" @click="closeup"></div>
        <div class="video-upload" flex="dir:top">
            <p class="title">请填写视频信息</p>
            <section flex="dir:left cross:center" class="video-id">
                <span>视频ID:</span>
                <input type="text" v-model="video_ID"></input>
            </section>
            <section flex="dir:left">
                <span>封面图:</span>
                <div class="Hq_logo">
                    <img :src="video_img+'@!gif'" alt="品牌logo" v-if="video_img!=null&&video_img!=''">
                    <input type="file" id="Upload_video" @change="get_videofile" accept="image/jpeg,image/gif,image/png,image/bmp,image/jpg" v-if="accessid!=null"/>
                </div>
                <div flex="dir:top main:center" class="explain">
                    <p>图片尺寸:1200*675</p>
                    <p>图片大小:不超过5M</p>
                    <p>图片格式:PNG,JPG,GIF</p>
                </div>
            </section>
            <section flex="dir:left cross:center main:justify" class="choose-box">
                <div class="video_sure" @click="addvideo_pic">确定</div>
                <div class="video_cancel" @click="closeup">取消</div>
            </section>
        </div>
    </div>
  </div>
</template>

<script>
import PicApi from '../../../api/Pic'
import CommonApi from '../../../api/Common'
import $ from 'jquery'
import WangEditor from 'wangeditor'
export default {
    props: ['inputContent','inputId'],
    data() {
        return {
            content: '',
            num:0,
            new_edit:null,
            reval:null,
            allpro:null,
            allstatus:null,
            xhr:null,
            picmsg:null,
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
            uploadMsg:[],
            allname:null,
            now_time:null,
            has_water_mark:1,
            open_load:false,
            upload_kinds:null,
            video_img:null,
            video_open:false,
            video_ID:null,
            video_files:null
        }
    },
    computed: {
        msg(){
            function htmlFormat(html){
              let arr = []
              html = html.replace(/^\t/gi,'')
              html = html.replace(/\s*?(<\/p>)\s*?(<p[^>]*?>)\s*?/gi,'$1|-=nl=-|$2')
              arr = html.split('|-=nl=-|')
              return arr;
            }
            let word = htmlFormat(this.content)
            let final=[]
            for(let i=0;i<word.length;i++){
              let list={}
              if(word[i].indexOf('class="img_once"')>-1){
                let msg=word[i].replace(/<p.*?>/,'').replace("<\/p>","")
                list.content_node_type='case_picture_node'
                list.url=msg.match(/src=\"([^\"]*?)\"/i)[1].replace(/@!gif$/gi,'')
                list.height=parseInt(msg.match(/data-height=\"([^\"]*?)\"/i)[1])
                list.width=parseInt(msg.match(/data-width=\"([^\"]*?)\"/i)[1])
              }else if(word[i].indexOf('class="img_list"')>-1){
                let msg=word[i].replace(/<p.*?>/,'').replace("<\/p>","")
                list.content_node_type='case_picture_group_node'
                let url_list=msg.match(/style=\"([^\"]*?)\"/i)[1].match(/([^\(\]]+)(?=\))/g)
                let size_list=eval(msg.match(/data-size=\"([^\"]*?)\"/i)[1])
                list.picture_list=[]
                for(let index=0;index<url_list.length;index++){
                  let addlist={}
                  addlist.url=url_list[index].replace(/@!gif$/gi,'')
                  addlist.width=size_list[index].width
                  addlist.height=size_list[index].height
                  addlist.has_water_mark=size_list[index].water
                  list.picture_list.push(addlist)
                }
              }else if(word[i].indexOf('class="video"')>-1){
                let msg=word[i].replace(/<p.*?>/,'').replace("<\/p>","")
                list.content_node_type='case_video_node'
                list.video_id=msg.match(/videoid=\"([^\"]*?)\"/i)[1]
                list.thumbnail=msg.match(/thumbnail=\"([^\"]*?)\"/i)[1]
              }else{
                list.content_node_type='case_text_node'
                list.content=word[i]
              }
              final.push(list)
            }
            return final
        }
    },
    mounted() {
        this.createEditor()
    },
    methods: {
        createEditor() {
            this.addpic()
            this.addImage_set()
            this.addvideo()
            const self = this
            const editor = new WangEditor('add'+this.inputId)
            this.new_edit=editor
            editor.config.menus = ['source', '|', 'bold', 'forecolor', 'fontsize', '|','alignleft', 'aligncenter', 'alignright','|','uploadalipic','addImage_set','addvideo']
            editor.config.pasteText = true
            editor.config.printLog = false;
            editor.onchange = function() {
                self.formatContent(this.$txt.html())
            }
            editor.create()
            if(this.inputContent==null){return}
            let allword=""
            for(let item of this.inputContent){
                if(item.content_node_type=='case_text_node'){
                    allword+=item.content
                }
                if(item.content_node_type=='case_picture_node'){
                    let postfix='@!gif'
                    if(item.has_water_mark==1){postfix='@!gif'}
                    let word='<p><img class="img_once" src='+item.url+postfix+' data-height='+item.height+' data-width='+item.width+'></p>'
                    allword+=word
                }
                if(item.content_node_type=='case_video_node'){
                  let word='<p><iframe class="video" frameborder="0" src="https://player.youku.com/embed/'+item.video_id+'" allowfullscreen="" videoid="'+item.video_id+'" thumbnail="'+item.thumbnail+'"></iframe></p>'
                  allword+=word
                }
                if(item.content_node_type=='case_picture_group_node'){
                  let allheight=Math.ceil(item.picture_list.length/4)*110
                  let allwidth
                  if(item.picture_list.length>2){
                    allwidth=430
                  }else{
                    allwidth=100
                  }
                  let size=[]
                  let url=[]
                  let position=[]
                  for(let index=0;index<item.picture_list.length;index++){
                    let addsize={}
                    let addurl='url('+item.picture_list[index].url+'@!gif)'
                    let x=index%4*110+'px'
                    let y=Math.floor(index/4)*110+5+'px'
                    let addposition=x+' '+y
                    addsize.width=item.picture_list[index].width
                    addsize.height=item.picture_list[index].height
                    addsize.water=item.picture_list[index].has_water_mark
                    size.push(addsize)
                    url.push(addurl)
                    position.push(addposition)
                  }
                  let word='<p><img class="img_list" height="'+allheight+'" width="'+allwidth+'" data-size='+JSON.stringify(size).replace(/"/g,"")+' style="background-image:'+String(url)+';background-position:'+String(position)+'"></p>'
                  allword+=word
                }
            }
            editor.$txt.html(allword);
        },
        formatContent(content) {
            this.content = content
            this.outputContent()
        },
        outputContent() {
            this.$emit('input', this.msg)
        },
        addpic(){
            const _this=this
            const E = window.wangEditor
            E.createMenu(function (check) {
                let menuId = 'uploadalipic'
                let editor = this
                let menu = new E.Menu({
                    editor: editor,  // 编辑器对象
                    id: menuId,  // 菜单id
                    title: '上传单张图片', // 菜单标题
                    $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-picture"></i></a>'),
                    $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-picture"></i></a>')
                })
                // 菜单正常状态下，点击将触发该事件
                menu.clickEvent = function (e) {
                    _this.open_load=true
                    _this.upload_kinds=0
                }
                editor.menus[menuId] = menu
            })
        },
        addImage_set(){
            const _this=this
            const E = window.wangEditor
            E.createMenu(function (check) {
                let menuId = 'addImage_set'
                let editor = this
                let menu = new E.Menu({
                    editor: editor,  // 编辑器对象
                    id: menuId,  // 菜单id
                    title: '上传图集', // 菜单标题
                    $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-picture"></i></a>'),
                    $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-picture"></i></a>')
                })
                // 菜单正常状态下，点击将触发该事件
                menu.clickEvent = function (e) {
                    _this.open_load=true
                    _this.upload_kinds=1
                }
                editor.menus[menuId] = menu
            })
        },
        addvideo(){
            const _this=this
            const E = window.wangEditor
            E.createMenu(function (check) {
                let menuId = 'addvideo'
                let editor = this
                let menu = new E.Menu({
                    editor: editor,  // 编辑器对象
                    id: menuId,  // 菜单id
                    title: '上传视频', // 菜单标题
                    $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-play"></i></a>'),
                    $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-play"></i></a>')
                })
                // 菜单正常状态下，点击将触发该事件
                menu.clickEvent = function (e) {
                    _this.video_open=true
                }
                editor.menus[menuId] = menu
            })
        },
        haswater(){
          this.has_water_mark=1
        },
        nowater(){
          this.has_water_mark=0
        },
        closeup(){
            this.has_water_mark=1
            this.files=null
            this.open_load=false
            this.video_img=null
            this.video_open=false
            this.video_ID=null
        },
        getfile(){
          this.num=0
          this.uploadMsg=[]
          this.allpro=[]
          this.allstatus=[]
          let msg=document.querySelector('#Upload').files
          for (let index = 0; index < msg.length; index++) {
              this.allpro.push(0)
            this.allstatus.push(0)
          }
          this.files=document.querySelector('#Upload').files
        },
        uploadPic(){
            if(this.upload_kinds==1&&this.files.length<3){
              this.$store.dispatch('alert-msg','需上传3张以上照片')
              this.$store.dispatch('alert-start')
              return
            }
            this.$set(this.allstatus,this.num,1)
            this.xhr = new XMLHttpRequest()
            let from=new FormData()
            this.now_time=new Date().getTime()
            from.append('OSSAccessKeyId',this.accessid)
            from.append('key',this.key+this.now_time+'_'+'${filename}')
            from.append('policy',this.policy)
            from.append('signature',this.signature)
            from.append('file',this.files[this.num])
            this.xhr.upload.addEventListener("progress", this.uploadpro, false)
            this.xhr.open("POST", this.host , true)
            this.xhr.send(from)
            this.xhr.onreadystatechange=this.callback 
        },
        uploadpro(evt){
          let percentComplete = Math.round((evt.loaded) * 100 / evt.total)
          this.$set(this.allpro,this.num,percentComplete)
        },
        callback(){
          if(this.xhr.readyState==4 && this.xhr.status>=200 &&this.xhr.status<300){
            this.$set(this.allstatus,this.num,2)
            let _this=this
            let url=this.access_url+this.key+this.now_time+'_'+this.files[this.num].name
            let onepic={}
            onepic.url=url
            onepic.water=this.has_water_mark
            let reader = new FileReader();
            reader.readAsDataURL(this.files[this.num]);
            reader.onload = function(theFile) {
                let image = new Image();
                image.src = theFile.target.result;
                image.onload = function() {
                　　onepic.width=this.width
                    onepic.height=this.height
                    _this.uploadMsg.push(onepic)
                    if(_this.num!=(_this.files.length-1)){
                        _this.num+=1
                        return _this.uploadPic()
                    }else{
                        _this.uploadall()
                    }
                }
            }
          }else if(this.xhr.readyState==4){
            this.$set(this.allstatus,this.num,3)
            if(this.num!=(this.files.length-1)){
              this.num+=1
              return this.uploadPic()
            }else{
              this.uploadall()
            }
          }
        },
        uploadall(){
            if(this.upload_kinds==0){
                for(let item of this.uploadMsg){
                    let nowuploadMsg=[]
                    nowuploadMsg.push(item)
                    let size=[]
                    let url=[]
                    let position=[]
                    for(let index=0;index<nowuploadMsg.length;index++){
                        let addsize={}
                        let addurl='url('+nowuploadMsg[index].url+'@!gif)'
                        let x=index%4*110+'px'
                        let y=Math.floor(index/4)*110+5+'px'
                        let addposition=x+' '+y
                        addsize.width=nowuploadMsg[index].width
                        addsize.height=nowuploadMsg[index].height
                        addsize.water=nowuploadMsg[index].water
                        size.push(addsize)
                        url.push(addurl)
                        position.push(addposition)
                    }
                    let word='<p><img class="img_list" height="100" width="100"  data-size='+JSON.stringify(size).replace(/"/g,"")+' style="background-image:'+String(url)+';background-position:'+String(position)+'"></p>'
                    this.new_edit.command(null, 'insertHtml', '<p></br></p>')
                    this.new_edit.command(null, 'insertHtml', word)
                    this.new_edit.command(null, 'insertHtml', '<p></br></p>')
                }
            }else if(this.upload_kinds==1){
                let allheight=Math.ceil(this.uploadMsg.length/4)*110
                let size=[]
                let url=[]
                let position=[]
                for(let index=0;index<this.uploadMsg.length;index++){
                    let addsize={}
                    let addurl='url('+this.uploadMsg[index].url+'@!gif)'
                    let x=index%4*110+'px'
                    let y=Math.floor(index/4)*110+5+'px'
                    let addposition=x+' '+y
                    addsize.width=this.uploadMsg[index].width
                    addsize.height=this.uploadMsg[index].height
                    addsize.water=this.uploadMsg[index].water
                    size.push(addsize)
                    url.push(addurl)
                    position.push(addposition)
                }
                let word='<img class="img_list" height="'+allheight+'" width="430" data-size='+JSON.stringify(size).replace(/"/g,"")+' style="background-image:'+String(url)+';background-position:'+String(position)+'">'
                this.new_edit.command(null, 'insertHtml', '<p></br></p>')
                this.new_edit.command(null, 'insertHtml', word)
                this.new_edit.command(null, 'insertHtml', '<p></br></p>')
            }
            this.closeup()
        },
        addvideo_pic(){
            if(this.video_ID==null||this.video_ID==""){
                this.$store.dispatch('alert-msg', '请输入视频ID')
                this.$store.dispatch('alert-start')
                return
            }
            this.new_edit.command(null, 'insertHtml', '<p></br></p>')
            this.new_edit.command(null, 'insertHtml', '<p><iframe class="video" frameborder="0" src="https://player.youku.com/embed/'+this.video_ID+'" allowfullscreen="" videoid="'+this.video_ID+'" thumbnail="'+this.video_img+'"></iframe></p>')
            this.new_edit.command(null, 'insertHtml', '<p></br></p>')
            this.closeup()
        },
        repeat(val){
          this.reval=val
          this.$set(this.allstatus,this.reval,1)
          this.xhr = new XMLHttpRequest()
          let from=new FormData()
          this.now_time=new Date().getTime()
          from.append('OSSAccessKeyId',this.accessid)
          from.append('key',this.key+this.now_time+'_'+'${filename}')
          from.append('policy',this.policy)
          from.append('signature',this.signature)
          from.append('file',this.files[this.reval])
          this.xhr.upload.addEventListener("progress", this.uploadprorepeat, false)
          this.xhr.open("POST", this.host , true)
          this.xhr.send(from)
          this.xhr.onreadystatechange=this.callbackrepeat
        },
        uploadprorepeat(evt){
          let percentComplete = Math.round((evt.loaded) * 100 / evt.total)
          this.$set(this.allpro,this.reval,percentComplete)
        },
        callbackrepeat(){
          if(this.xhr.readyState==4 && this.xhr.status>=200 &&this.xhr.status<300){
            this.$set(this.allstatus,this.reval,2)
          }else if(this.xhr.readyState==4){
            this.$set(this.allstatus,this.reval,3)
          }
        },
        get_videofile(){
            this.video_files=document.querySelector('#Upload_video').files
            let from=new FormData()
            let now_time=new Date().getTime()
            from.append('OSSAccessKeyId',this.accessid)
            from.append('key',this.key+now_time+'_'+'${filename}')
            from.append('policy',this.policy)
            from.append('signature',this.signature)
            from.append('file',this.video_files[0])
            this.$http.post(this.host,from)
            .then((response) => {
                this.video_img=this.access_url+this.key+now_time+'_'+this.video_files[0].name
            })
        }
    },
    filters:{
      changeSize(value){
        let size=Math.floor(value/1024)
        return size
      }
    },
    created(){
      CommonApi.signature(this)
    }
  }
</script>

<style lang='scss'>
    .wangEditor-container{
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid #CCC;
        height:400px;
    }
    .wangEditor-txt img{
        display: inline-block;
    }
    .wangEditor-txt .img_list{
      background-size: 100px 100px;
      background-repeat: no-repeat;
    }
    .img-drag-point,.txt-toolbar{
        visibility: hidden;
    }
    .wangEditor-txt .img_list{
      background-repeat:no-repeat;
      background-size:100px 100px;
      position:relative;
    }
    .wangEditor-txt .video{
      position:relative;
    }
    .upload{
        .box{
          position: fixed;
          height: 100%;
          width: 100%;
          min-width: 1200px;
          top: 0;
          left: 0;
          z-index: 2000;
          background:rgba(0,0,0,0.33);
        }
        .upload-box{
          position: fixed;
          width: 720px;
          height: 542px;
          background: #FFFFFF;
          box-shadow: 0px 2px 14px 0px rgba(0,0,0,0.33);
          border-radius: 4px;
          z-index: 2001;
          top: 40%;
          left: 50%;
          transform: translate(-50%,-50%);
          .pic-attr,.pic-choose{
            margin-top: 30px;
            padding-left: 30px;
            font-size: 18px;
            color: #454953;
            letter-spacing: 0px;
            font-weight: bold;
          }
          .pic-choose{
            margin-top: 50px;
          }
          .kind-box{
            margin-top: 40px;
          }
          .name-box{
            margin-top: 20px;
          }
          .water-box{
            margin-top: 20px;
          }
          .upload-explain{
            padding-left: 50px;
            margin-top:5px;
            font-size: 14px;
          }
          .kind-box,.name-box,.water-box{
            padding-left: 50px;
            p{
              font-size: 14px;
              color: #454953;
              letter-spacing: 0px;
              margin-right: 30px;
            }
            select{
              outline: none;
              border:none;
              height: 30px;
              width: 190px;
              background: #FBFBFB;
              border-radius: 4px;
              font-size: 12px;
              color: #454953;
              letter-spacing: 0px;
              text-indent: 10px;
            }
            input{
              outline: none;
              border:none;
              height: 30px;
              width: 340px;
              background: #FBFBFB;
              border-radius: 4px;
              font-size: 12px;
              color: #454953;
              letter-spacing: 0px;
              text-indent: 10px;
            }
            .circle{
              margin-right: 7px;
              width: 5px;
              height: 5px;
              border-radius: 50%;
              border:5px solid #EBEBEB;
            }
            .choose{
              border:5px solid #53AAE6;
            }
            .true{
              margin-right: 50px;
            }
          }
          .choose-box{
            margin-top: 30px;
            padding-left: 50px;
            margin-bottom: 20px;
            width: 300px;
          }
          .upload-pic{
            position: relative;
            .upload-word{
              background: #53AAE6;
              border-radius: 4px;
              width: 125px;
              height: 30px;
              font-size: 14px;
              color: #FFFFFF;
              letter-spacing: 0px;
              text-align: center;
              line-height: 30px;
              cursor: pointer;
            }
            #Upload{
              cursor: pointer;
              width: 125px;
              height: 30px;
              opacity: 0;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
          .start-upload{
            background: #53AAE6;
            border-radius: 4px;
            width: 125px;
            height: 30px;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
          }
          .pic-msg-box{
            height: 160px;
            overflow: auto;
          }
          .pic-msg{
            padding-left: 50px;
            .pic-name{
              font-size: 12px;
              color: #999999;
              letter-spacing: 0px;
              margin-right: 50px;
            }
            .pic-size{
              font-size: 12px;
              color: #999999;
              letter-spacing: 0px;
            }
            .pic-pro{
              background: #EBEBEB;
              border-radius: 4px;
              height: 10px;
              width: 332px;
              .pic-pro-per{
                width: 0;
                height: 10px;
                background: #95D584;
                border-radius: 4px;
              }
            }
            .pic-success,.prc-pro,.pic-error,.pic-wait{
              font-size: 12px;
              color: #95D584;
              letter-spacing: 0px;
              width: 130px;
              padding-left: 30px;
              height: 30px;
              line-height: 30px;
            }
            .prc-pro{
              padding-left: 10px;
              color: #999999;
            }
            .pic-error{
              color: #454953;
              .repeat{
                line-height: none;
                color: #53AAE6;
              }
            }
          }
        }
    }
    .video-upload-box{
        .box{
            position: fixed;
            height: 100%;
            width: 100%;
            min-width: 1200px;
            top: 0;
            left: 0;
            z-index:2000;
            background:rgba(0,0,0,0.33);
        }
        .video-upload{
            position:fixed;
            width: 520px;
            height: 302px;
            background: #FFFFFF;
            box-shadow: 0px 2px 14px 0px rgba(0,0,0,0.33);
            border-radius: 4px;
            z-index: 2001;
            top: 40%;
            left: 50%;
            transform: translate(-50%,-50%);
            .title{
                padding:10px 20px;
                font-size:1.1rem;
            }
            section{
                padding:10px 20px;
                .explain{
                  margin-left:20px;
                }
                .Hq_logo{
                    margin-left:10px;
                    height: 100px;
                    width: 100px;
                    background-image:url(../../../assets/images/form_logo_increase.png);
                    background-repeat: no-repeat;
                    background-size:15% contain;
                    background-position: center 20px;
                    border: 1px solid #E0E0E0;
                    border-radius: 4px;
                    display: inline-block;
                    position: relative;
                    overflow: hidden;
                    #Upload_video{
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
                    z-index: 1;
                }
                .video_sure{
                    height: 30px;
                    width: 130px;
                    text-align: center;
                    line-height: 30px;
                    background: #53AAE6;
                    border-radius: 4px;
                    color: #fff;
                    cursor: pointer;
                }
                .video_cancel{
                    height: 30px;
                    width: 130px;
                    text-align: center;
                    line-height: 30px;
                    background: #E4EBF0;
                    border-radius: 4px;
                    color: #fff;
                    cursor: pointer;
                }
            }
            .choose-box{
                width:70%;
                margin:auto;
            }
            .video-id input{
                outline:none;
                border:none;
                background:rgba(0,0,0,0.08);
                margin-left:10px;
                height:1.5rem;
            }
        }
    }
</style>
