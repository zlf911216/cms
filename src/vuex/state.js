const state = {
  publicMsg: {
    messageList: null,
    allpage: Number,
    nowpage: Number,
    pl_library_id: Number,
    repeat:false
  },
  load: {
    open: false
  },
  alert: {
    open: false,
    msg: null,
  },
  brand: {
    page_size: 20,
    search: null,
    list: null,
  },
  series: {
    page_size: 20,
    search: null,
    list: null,
  },
  parameter: {
    page_size: 3,
    search: null,
    list: null,
  },
  style: {
    page_size: 20,
    search: null,
    list: null,
  },
  pic: {
    page_size: 20,
    search: null,
    move: false,
    kind: false,
    move_url: null,
    move_id: Number,
    list: null,
    picture_category: null,
    upload: false,
    cover: false
  },
  management: {
    page_size: 20,
    search: null,
    business_id:null,
    list: null,
  },
  gold:{
    page_size: 20,
    list: null,
  },
  opportunity:{
    page_size: 20,
    list: null,
    search: null,
  },
  common:{
    page_size: 20,
    list: null,
    search: null,
  },
  service:{
    page_size: 20,
    category:null,
    city_id:null,
    list:null,
  },
  album:{
    page_size: 5,
    list:null
  },
  evaluate:{
    page_size: 10,
    search: '',
    type:2,
    evaluation_status:null,
    start_time:new Date(Date.parse(new Date())-(1000*3600*24*30)).toISOString().substr(0, 10),
    end_time:new Date(Date.parse(new Date())).toISOString().substr(0, 10),
    list:null
  },
  special:{
    page_size: 10,
    list:null
  },
  case_edit_pool:{
    page_size: 10,
    list:null,
    start_time:new Date(Date.parse(new Date())-(1000*3600*24*30)).toISOString().substr(0, 10),
    end_time:new Date(Date.parse(new Date())).toISOString().substr(0, 10),
    search:null,
  },
  case_release_pool:{
    page_size: 10,
    list:null,
    start_time:new Date(Date.parse(new Date())-(1000*3600*24*30)).toISOString().substr(0, 10),
    end_time:new Date(Date.parse(new Date())).toISOString().substr(0, 10),
    search:null,
  },
  release_pool:{
    page_size:10,
    list:null,
    start_time:new Date(Date.parse(new Date())-(1000*3600*24*30)).toISOString().substr(0, 10),
    end_time:new Date(Date.parse(new Date())).toISOString().substr(0, 10),
    search:null
  }
}

export default state
