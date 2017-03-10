export default {
  getList(_this) {
    _this.$store.dispatch('load-start')
    _this.$http.post('/api/casecms/evaluation/GetCaseSellerEvaluationList', {
        page: parseInt(sessionStorage.getItem("evaluate-now-page")),
        page_size: _this.$store.state.evaluate.page_size,
        type: _this.$store.state.evaluate.type,
        name: _this.$store.state.evaluate.search,
        user_id:_this.$route.query.user_id,
        evaluation_status: _this.$store.state.evaluate.evaluation_status,
        start_time: new Date(_this.$store.state.evaluate.start_time).getTime(),
        end_time: new Date(_this.$store.state.evaluate.end_time).getTime()+86399000,
      })
      .then((response) => {
        _this.$store.dispatch('load-close')
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        let allpage = Math.ceil(msg.resp.seller_evaluation_count / _this.$store.state.evaluate.page_size)
        _this.$store.dispatch('page', allpage)
        _this.$store.dispatch('evaluate-list', msg.resp.seller_evaluation_list)
      })
  },
  UpdateUserEvaluationStatus(_this,id,state,cb){
    _this.$http.post('/api/casecms/evaluation/UpdateCaseSellerEvaluationStatus', {
        comment_id:id,
        status:state
      })
      .then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        cb(_this)
      })
  },
  ForbidCommentStatus(_this,id,state,cb){
    _this.$http.post('/api/cms/user/ForbidCommentStatus', {
        user_id:id,
        forbid_comment_status:state
      })
      .then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        cb(_this)
      })
  },
}
