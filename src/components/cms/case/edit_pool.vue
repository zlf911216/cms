<template lang="html">
    <div class="edit_pool">
        <topList v-bind:list-msg="list"></topList>
        <ul class="change_list" flex="dir:left main:left cross:center">
          <router-link flex="dir:left main:center cross:center" class="gray" :to='{path:"/index/cms/case_management/edit_pool"}' tag="li">编辑池</router-link>
          <router-link flex="dir:left main:center cross:center" :to='{path:"/index/cms/case_management/release_pool"}' tag="li">发布池</router-link>
        </ul>
        <div class="message" flex="dir:left main:left cross:center">
          <span class="tag">入库时间:</span>
          <datepicker v-model="date" v-bind:language="ch" v-bind:range="true" class="time"></datepicker>
          <span class="tag tag_wide">关键词检索</span>
          <input placeholder="请输入关键词进行检索" type="text" v-model="search" class="search"></input>
          <span v-on:click = "search_edit()" class="search-button">检索</span>
        </div>
        <div class="edit_list message">
          <nav>
            <div class="edit_intro" flex="dir:left main:justify cross:center" flex-box="1">
              <span>共{{edit_total}}篇案例</span>
              <router-link flex="dir:top main:justify cross:center" :to='{path:"/index/cms/case_management/add_edit"}' tag="span" class="add_edit">新增案例</router-link>
            </div>
            <ul>
              <li flex="dir:left main:center cross:center"  flex-box="1">
                <span flex="dir:left main:center cross:center"  class="edit_id">ID</span>
                <span flex="dir:left main:center cross:center"  class="edit_name">案例标题</span>
                <span flex="dir:left main:center cross:center"  class="edit_changetime">修改时间</span>
                <span flex="dir:left main:center cross:center"  class="edit_handle">操作</span>
              </li>
              <li flex="dir:left main:center cross:center" flex-box="1" v-for='item in msg_list'>
                <span flex="dir:left main:center cross:center"  class="edit_id">{{item.article_id}}</span>
                <router-link :to='{path:"/index/cms/case_management/add_edit",query:{article_id:item.article_id}}' tag="span" flex="dir:left main:center cross:center"  class="edit_name"><span class="edit_title" flex="dir:left cross:center">{{item.title}}</span></router-link>
                <span flex="dir:left main:center cross:center" class="edit_changetime">{{getyear(item.update_time)+" "+gettime(item.update_time)}}</span>
                <span flex="dir:left main:center cross:center"  class="edit_handle">
                  <span flex="dir:left main:center cross:center" class="edit_prev" v-on:click="edit_preview()">预览</span>
                  <span flex="dir:left main:center cross:center" class="edit_delete" v-on:click="edit_delete(item.article_id)">删除</span>
                  <span flex="dir:left main:center cross:center" v-on:click = "edit_to_release(item.article_id)">入发布池</span>
                </span>
              </li>
            </ul>
          </nav>
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
            list:['CMS后台','>',' 案例管理','>','编辑池'],
            date:[],
            edit_total:null,
            edit_list:[],
            create_time_begin:"",
            create_time_end:"",
            search:""
        }
    },
    created:function(){
      this.$store.dispatch('now-change',parseInt(sessionStorage.getItem("case_poll-now-page")) || 1)
    },
    beforeRouteLeave(to, from, next){
        this.$store.dispatch('now-change',Number)
        next()
    },
    components:{
        topList,datepicker,page
    },
    watch:{
      now:function(val, oldVal){
        if(!isNaN(val)){sessionStorage.getItem("case_poll-now-page",val)}
        this.get_editlist()
      }
    },
    computed:{
      msg_list:function(){
        return this.$store.state.case_edit_pool.list
      },
      msg_search:function(){
        return this.$store.state.case_edit_pool.search
      },
      msg_time:function(){
        return this.$store.state.case_edit_pool.time
      },
      now(){
        return this.$store.state.publicMsg.nowpage
      }
    },
    methods:{
      get_editlist:function(){
        var start_time,end_time,date_str = this.date.toString().replace(/-/g,'/')
        start_time = new Date(date_str.substr(0,10))
        end_time = new Date(date_str.substr(11))
        this.$http.post('/api/casecms/case/GetCaseInfoList', {
          "create_time_begin":start_time.getTime(),
          "create_time_end":end_time.getTime()+86399000,
          "title":this.search,
          "type":1,
          "page":this.now
        }).then(function(data){
          if (data.data.retcode == 0) {
            this.edit_total = data.data.resp.count
            let allpage = Math.ceil(data.data.resp.count / this.$store.state.case_edit_pool.page_size)
            this.$store.dispatch('page', allpage)
            this.$store.dispatch('case_edit_pool_list',data.data.resp.article_list)
          }
        },function(data){
          console.log("失败")
        })
      },
      edit_preview:function(){
        alert('暂未添加该功能')
      },
      edit_to_release:function(id){
        this.$http.post('/api/casecms/case/IntoPublishPool',{
          "article_id":id
        }).then(function(data){
          if (data.data.retcode == 0) {
            alert("已添加至发布池");
            this.get_editlist()
          }
        },function(){
          alert("添加失败")
        })
      }
      ,
      edit_delete:function(id){
        console.log(id)
        if (confirm("你确定删除吗?")) {
          this.$http.post('/api/casecms/case/DeleteCase',{"article_id":id}).then(function(data){
            if(data.data.retcode == 0){
              alert("删除成功");
              this.get_editlist()
            }
          },function(data){
            alert("删除失败")
          })
        }
      },
      search_edit:function(){
        this.get_editlist()
        this.search = ''
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
.edit_pool{
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
    span.edit_title{
      text-align:left;
    }
    span.gray{
      color:#999;
    }
    span.tag{
      width: 120px;
      font-size: 24px;
      color: #454953;
      letter-spacing: 0px;
      line-height: 30px;
      font-weight: bold;
    }
    span.add_edit{
      background:#53AAE6;
      padding:10px;
      color:#fff;
      border-radius:10px;
      cursor:pointer;
      margin:0 20px 0 0;
    }
    span.edit_name{
      color:#53AAE6;
    }
    li:first-child span.edit_name{
      color:#000;
    }
    span.tag_wide{
      margin:0 10px;
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
.edit_list{
  background:#fff;
  .edit_intro{
    border-bottom:1px solid #F4F6F8;
    padding: 0 0 20px 0;
    span{
      margin:0 10px;
    }
  }
  nav ul{
    background:#fff;
    span{
      text-align:center;
      box-sizing: border-box;
      border-right:1px solid #F4F6F8;
      border-bottom:1px solid #F4F6F8;
      min-height:120px;
    }
    li:nth-child(2n+1){
      background:#fbfbfb;
    }
    span:nth-child(1){
      width:10%;
    }
    span:nth-child(2){
      width:30%;
      cursor:pointer;
      span{
        width:80%;
        border:none;
      }
    }
    span:nth-child(3){
      width:30%;
    }
    span:last-child{
      width:30%;
      border-right:none;
      span{
        border:none;
        cursor:pointer;
        width:auto;
        margin:0 5px;
        color:#53AAE6;
      }
    }
  }
}
</style>
