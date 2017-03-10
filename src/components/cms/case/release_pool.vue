<template lang="html">
    <div class="release_pool">
        <topList v-bind:list-msg="list"></topList>
        <ul class="change_list" flex="dir:left main:left cross:center">
          <router-link flex="dir:left main:center cross:center" :to='{path:"/index/cms/case_management/edit_pool"}' tag="li">编辑池</router-link>
          <router-link flex="dir:left main:center cross:center" :to='{path:"/index/cms/case_management/release_pool"}' class="gray" tag="li">发布池</router-link>
        </ul>
        <div class="message" flex="dir:left main:left cross:center">
          <span class="tag">入库时间:</span>
          <datepicker v-model="date" v-bind:language="ch" v-bind:range="true" class="time"></datepicker>
          <span class="tag tag_wide">关键词检索</span>
          <input placeholder="请输入关键词进行检索" type="text" v-model="search" class="search"></input>
          <span class="search-button" v-on:click="get_releaselist()">检索</span>
        </div>
        <div class="release_list message">
          <nav>
            <div class="release_intro" flex="dir:left main:justify cross:center" flex-box="1">
            <span>共{{release_total}}篇案例</span>
            <span class="add_release" v-on:click="push_release_now()">全部发布</span>
            </div>
            <ul>
              <li flex="dir:left main;left cross:center" flex-box="1">
                <span flex="dir:left main:center cross:center" class="release_id">ID</span>
                <span flex="dir:left main:center cross:center" class="release_name">案例标题</span>
                <span flex="dir:left main:center cross:center" class="release_releasetime">发布时间</span>
                <span flex="dir:left main:center cross:center" class="release_sort">排序</span>
                <span flex="dir:left main:center cross:center" class="release_status">状态</span>
                <span flex="dir:left main:center cross:center" class="release_handle">操作</span>
              </li>
              <li flex="dir:left main;left cross:center" flex-box="1" v-for='(item,index) in msg_list' draggable="true" @dragstart="dragstart(index,item.article_id,item)" @drop="drop(index,$event,item.article_id)" @dragover="dragover($event)">
                <span flex="dir:left main:center cross:center" class="release_id">{{item.article_id}}</span>
                <router-link flex="dir:left main:center cross:center" class="release_name" :to='{path:"/index/cms/case_management/add_edit",query:{article_id:item.article_id}}' tag="span"><span class="release_title" flex="dir:left cross:center">{{item.title}}</span></router-link>
                <span flex="dir:left main:center cross:center" class="release_releasetime" v-if="item.status == 1">{{getyear(item.publish_time)+" "+gettime(item.publish_time)}}&nbsp</span>
                <span flex="dir:left main:center cross:center" v-else-if="item.status == 2" class="release_releasetime red">{{getyear(item.time_publish_time)+" "+gettime(item.time_publish_time)}}&nbsp</span>
                <span v-else>&nbsp</span>
                <span class="release_sort" flex="dir:left main:center cross:center" v-on:click="get_sort(item.article_id,item.order_num)">
                    <span flex="dir:left main:center cross:center" class="order_num" v-if="order_num != item.article_id">{{item.order_num}}</span>
                    <input flex="dir:left main:center cross:center" type="tel" onclick="select()" v-model="change_num" v-else v-on:blur="change_sort(item.article_id,change_num)"></input>
                </span>
                <span flex="dir:left main:center cross:center" class="release_status no_release" v-if="item.status == 0">未发布</span>
                <span flex="dir:left main:center cross:center" class="release_status allready_release" v-else-if="item.status == 1">已发布</span>
                <span flex="dir:left main:center cross:center" class="release_status time_release" v-else>已定时发布</span>
                <span flex="dir:left main:center cross:center" class="release_handle">
                  <span flex="dir:left main:center cross:center" class="release_prev" >预览</span>
                  <span flex="dir:left main:center cross:center" class="release_delete" v-on:click="release_delete(item.article_id)">删除</span>
                  <span flex="dir:left main:center cross:center" v-if ="item.status == 0" v-on:click="show_push_time(item.article_id)">定时发布</span>
                  <span flex="dir:left main:center cross:center" v-if ="item.status == 1">推送</span>
                  <span flex="dir:left main:center cross:center" v-if ="item.status == 2" v-on:click="cancel_push_time(item.article_id)">取消定时发布</span>
                </span>
              </li>
            </ul>
          </nav>
        </div>
        <div class="release_intime" v-if="show_push_alert">
          <datepicker v-model="push_time_day" v-bind:range="false" v-bind:language="ch" class="push_time_day"></datepicker>
          <input type="time" v-model="push_time_hour" class="push_time_hour"></input>
          <span class="sure" v-on:click = "submit_push_time(article_id)">确认</span>
          <span class="cancel" v-on:click ="close_push_time()">取消</span>
        </div>
        <page></page>
    </div>
</template>
<script type="text/javascript">
import topList from "../../list/list"
import datepicker from 'vue-date'
import page from '../../page/index'
export default{
    name:"edit_pool",
    data(){
        return{
            list:['CMS后台','>',' 案例管理','>','发布池'],
            date:[],
            release_total:null,
            release_list:[],
            create_time_begin:"",
            create_time_end:"",
            all_article_id:[],
            show_push_alert:false,
            push_time_day:"请选择日期",
            push_time_hour:"00:00",
            article_id:null,
            order_num:null,
            change_num:null,
            now:null,
            nowNum:null,
            _change:null,
            _change_num:null,
            search:"",
            push_release_tag:false,
            item:null
        }
    },
    components:{
        topList,datepicker,page
    },
    beforeRouteLeave(to, from, next){
        this.$store.dispatch('now-change',Number)
        next()
    },
    created:function(){
      this.$store.dispatch("now-change",parseInt(sessionStorage.getItem("case_poll-now-page")||1))
    },
    watch:{
      now_page:function(val,oldVal){
        if(!isNaN(val)){sessionStorage.getItem("case_poll-now-page",val)}
        this.get_releaselist()
      }
    },
    computed:{
      msg_list:function(){
        return this.$store.state.release_pool.list
      },
      msg_search:function(){
        return this.$store.state.release_pool.search
      },
      msg_time:function(){
        return this.$store.state.release_pool.time
      },
      now_page(){
        return this.$store.state.publicMsg.nowpage
      }
    },
    methods:{
      get_releaselist:function(){
        var start_time,end_time,date_str = this.date.toString().replace(/-/g,'/')
        start_time = new Date(date_str.substr(0,10))
        end_time = new Date(date_str.substr(11))
        this.$http.post('/api/casecms/case/GetCaseInfoList', {
          "create_time_begin":start_time.getTime(),
          "create_time_end":end_time.getTime()+86399000,
          "title":this.search,
          "type":2,
          "page":this.now_page
        }).then(function(data){
          if (data.data.retcode == 0) {
            this.release_total = data.data.resp.count
            this.release_list = data.data.resp.article_list
            let allpage = Math.ceil(data.data.resp.count / this.$store.state.release_pool.page_size)
            this.$store.dispatch('page', allpage)
            this.$store.dispatch('release_pool_list',data.data.resp.article_list)
            this.all_article_id = []
            for (var i = 0; i < this.release_list.length; i++) {
              this.all_article_id.push(this.release_list[i].article_id)
            }
          }
        },function(data){
          console.log("失败")
        })
      },
      release_delete:function(id){
        if (confirm("你确定删除吗?")) {
          this.$http.post('/api/casecms/case/PublishToEdit',{"article_id":id}).then(function(data){
            if(data.data.retcode == 0){
              this.$store.dispatch('alert-msg', data.data.msg)
              this.$store.dispatch('alert-start')
              this.get_releaselist()
            }
          },function(data){
            alert("删除失败")
          })
        }
      },
      show_push_time:function(id){
        this.show_push_alert = true
        this.article_id = id
      },
      submit_push_time:function(id){
        var timestamp =new Date(this.push_time_day+" "+this.push_time_hour)
        this.$http.post('/api/casecms/case/TimedPublishArticle',{
          "article_id":id,
          "publish_time":timestamp.getTime()
        }).then(function(data){
          if (data.data.retcode == 0) {
            alert("已定时发布")
            this.show_push_alert = false
            this.get_releaselist()
          }
        }, function(){
          alert("定时发布失败")
        })
        this.article_id = null
      },
      close_push_time:function(){
         this.show_push_alert = false
         this.push_time_day = "请选择日期"
         this.push_time_hour = "00:00"
      },
      push_release_now:function(id){
        if (confirm("是否进行发布？")) {
          this.$http.post('/api/casecms/case/AllPublish',{
            "page":this.now_page,
            "article_ids":this.all_article_id
          }).then(function(data){
            if (data.data.retcode == 0) {
              console.log("调用成功")
            }
            this.get_releaselist()
          })
        }
      },
      cancel_push_time:function(id){
        if (confirm("是否取消定时发布吗?")) {
          this.$http.post('/api/casecms/case/DeleteTimedPublishArticle',{
            "article_id":id
          }).then(function(data){
            if (data.data.retcode == 0) {
              alert("取消成功")
              this.get_releaselist()
            }
          })
        }
      },
      get_sort:function(id,sort){
        this.order_num = id
        this.change_num = sort
      },
      change_sort:function(id,sort){
        this.$http.post('/api/casecms/case/WriteOrder',{
          "article_id":id,
          "order_num":sort
        }).then(function(data){
          if (data.data.retcode == 0) {
            console.log('修改成功')
            this.get_releaselist()
            this.order_num = null
            this.change_num = null
          }
        })
      },
      dragstart:function(num,id,item){
        this.now = id
        this.nowNum = num
        this.item =item
      },
      drop:function(num,event,id){
        this._change = id
        this.release_list.splice(this.nowNum,1)
        this.all_article_id.splice(this.nowNum,1)
        if (this.nowNum < num) {
          this.release_list.splice(num-1,0,this.item)
          this.all_article_id.splice(num-1,0,this.now)
        }else{
          this.release_list.splice(num,0,this.item)
          this.all_article_id.splice(num,0,this.now)
        }
      },
      dragover:function(val){
        event.preventDefault()
      },
      getyear:function(value){
          return new Date(value).toISOString().substr(0, 10)
      },
      gettime:function(value){
          return new Date(value).toLocaleString().substr(9, 15)
      }
    }
}

</script>
<style scoped lang='scss'>
.release_pool{
  .change_list{
    margin:10px auto 0;
    width:980px;
    li{
      width:144px;
      background:#fff;
      height:48px;
      margin:0 1px;
      cursor:pointer;
      color:#7BC3F5;
    }
    .gray{
      color:#999;
    }
  }
  .message{
    padding:20px 0;
    width:980px;
    margin: auto;
    overflow: inherit;
    .time{
      overflow: inherit;
      width:250px;
    }
    span.release_title{
      text-align:left;
    }
    span.tag{
      width: 120px;
      font-size: 24px;
      color: #454953;
      letter-spacing: 0px;
      line-height: 30px;
      font-weight: bold;
    }
    li:first-child span.release_name{
      color:#000;
      cursor:auto;
    }
    span.release_name{
      color:#53AAE6;
      cursor:pointer;
    }
    span.add_release{
      background:#53AAE6;
      padding:10px;
      color:#fff;
      border-radius:10px;
      cursor:pointer;
      margin:0 10px 0 0;
    }
    span.red{
      color:red;
    }
    span.tag_wide{
      margin:0 10px;
    }
    span.order_num{
      padding:0;
      width:100%;
      border:none;
      cursor:pointer;
    }
    span.release_sort input{
      width:80%;
      margin:0 auto;
      text-align:center;
    }
    span.release_handle span{
      cursor:pointer;
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
}
.release_list{
  background:#fff;
  .release_intro{
    border-bottom:1px solid #F4F6F8;
    padding:0 0 20px 0;
    span{
      margin:0 10px;
    }
  }
  nav ul{
    background:#fff;
    li:nth-child(2n+1){
      background:#fbfbfb;
    }
    span{
      text-align:center;
      box-sizing: border-box;
      border-right:1px solid #F4F6F8;
      border-bottom:1px solid #F4F6F8;
      min-height:120px;
    }
    span:nth-child(1){
      width:10%;
    }
    span:nth-child(2){
      width:25%;
      span{
        width:80%;
        border:none;
      }
    }
    span:nth-child(3){
      width:25%;
    }
    span:nth-child(4){
      width:10%;
    }
    span:nth-child(5){
      width:10%;
    }
    .no_release{
      color:red;
    }
    span:last-child{
      width:25%;
      border-right:none;
      span{
        width:auto;
        margin:0 5px;
        border:none;
        color:#53AAE6;
        cursor:pointer;
      }
    }
  }
}
.release_intime{
  width:300px;
  position:fixed;
  text-align:center;
  left:50%;
  top:30%;
  margin:0 0 0 -150px;
  background:#fff;
  padding:20px;
  border:1px solid #999;
  border-radius:20px;
  z-index:20;
  input{
    width:100%;
    display:inline-block;
    text-align:center;
    font-size:18px;
    padding:2px 0;
    margin:10px 0 0;
    box-sizing: border-box;
  }
  span{
    width:20%;
    display:inline-block;
    border:1px solid #999;
    margin:10px 0 0;
    padding:5px;
    border-radius: 10px;
  }
}
</style>
