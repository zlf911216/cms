export default {
  AddCasePicture(_this, cb) {
      _this.$http.post('/api/casecms/feed/AddCasePicture', {
          seller_id: _this.$route.query.seller_id,
          picture_list: _this.picture_list,
          description: _this.pic_description,
        })
        .then((response) => {
          let msg = response.data
          if (msg.retcode != 0) {
            _this.$store.dispatch('alert-msg', msg.msg)
            _this.$store.dispatch('alert-start')
            return
          } else {
            _this.$store.dispatch('alert-msg', msg.msg)
            _this.$store.dispatch('alert-start')
          }
          cb(_this)
          _this.picture_list = []
          _this.pic_description = null
        })
    },
    AddCaseVideo(_this, cb) {
      _this.$http.post('/api/casecms/feed/AddCaseVideo', {
          seller_id: _this.$route.query.seller_id,
          video_id: _this.video_id,
          description: _this.video_description,
          cover_image: _this.video_cover_image
        })
        .then((response) => {
          let msg = response.data
          if (msg.retcode != 0) {
            _this.$store.dispatch('alert-msg', msg.msg)
            _this.$store.dispatch('alert-start')
            return
          } else {
            _this.$store.dispatch('alert-msg', msg.msg)
            _this.$store.dispatch('alert-start')
          }
          setTimeout(function(){
            cb(_this)
          },300)
          _this.video_id = null
          _this.video_description = null
          _this.video_cover_image = null
        })
    },
    getlist(_this) {
      _this.$store.dispatch('load-start')
      _this.$http.post('/api/casecms/feed/GetCaseFeedList', {
          seller_id: _this.$route.query.seller_id,
          page: parseInt(sessionStorage.getItem("album-now-page")),
          page_size: _this.$store.state.album.page_size,
        })
        .then((response) => {
          _this.$store.dispatch('load-close')
          let msg = response.data
          if (msg.retcode != 0) {
            _this.$store.dispatch('alert-msg', msg.msg)
            _this.$store.dispatch('alert-start')
            return
          }
          let allpage = Math.ceil(msg.resp.feed_count / _this.$store.state.album.page_size)
          _this.$store.dispatch('page', allpage)
          _this.$store.dispatch('album-list', msg.resp.feed_list)
        })
    },
    UpdateCaseFeedStatus(_this, id, cb) {
      _this.$http.post('/api/casecms/feed/UpdateCaseFeedStatus', {
          feed_id: id,
          status:1
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
    }
}
