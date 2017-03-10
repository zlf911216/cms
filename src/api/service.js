export default {
  sellerCategoryList(_this) {
      _this.$http.post('/api/casecms/seller/GetCaseSellerCategoryList').then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        _this.category_list = msg.resp.seller_category_list
      })
    },
    addseller(_this) {
      _this.$http.post('/api/casecms/seller/CreateCaseSeller', {
        category: _this.category,
        name: _this.name,
        description: _this.description,
        work_year: _this.work_year,
        city_id: _this.city_id,
        address: _this.address,
        seller_phone_list: _this.seller_phone_list,
        logo_url: _this.logo_url,
        cover_image: _this.cover_image,
        contact: _this.contact,
        contact_phone: _this.contact_phone,
        area_list: _this.area_list,
        interview_list: _this.interview_list,
      }).then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        _this.$router.go(-1)
      })
    },
    getList(_this) {
      _this.$http.post('/api/casecms/seller/GetCaseSellerList', {
        page: parseInt(sessionStorage.getItem("service-now-page")),
        page_size: _this.$store.state.style.page_size,
        category: _this.$store.state.service.category,
        city_id: _this.$store.state.service.city_id
      }).then((response) => {
        _this.$store.dispatch('load-close')
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        let allpage = Math.ceil(msg.resp.seller_count / _this.$store.state.service.page_size)
        _this.$store.dispatch('page', allpage)
        _this.$store.dispatch('service-list', msg.resp.seller_list)

      })
    },
    UpdateCaseSellerStatus(_this, id, status, cb) {
      _this.$store.dispatch('load-start')
      _this.$http.post('/api/casecms/seller/UpdateCaseSellerStatus', {
        seller_id: id,
        status: status
      }).then((response) => {
        _this.$store.dispatch('load-close')
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        cb(_this)
      })
    },
    GetCaseSellerList(_this) {
      _this.$http.post('/api/casecms/seller/GetCaseSellerDetailById', {
        seller_id: _this.$route.query.seller_id,
      }).then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        _this.category = msg.resp.seller_category_list
        _this.name = msg.resp.seller.name
        _this.description = msg.resp.seller.description
        _this.date = new Date(msg.resp.seller.create_time).toISOString().substr(0, 10)
        _this.city_id = msg.resp.seller.city_id
        _this.address = msg.resp.seller.address
        for (let item of msg.resp.seller_phone_list) {
          if (item.category == 1) {
            _this.phone_area = item.phone_num
          }
          if (item.category == 2) {
            _this.phone_four = item.phone_num
          }
          if (item.category == 3) {
            _this.phone_mobile = item.phone_num
          }
        }
        _this.logo_url = msg.resp.seller.logo
        _this.cover_image = msg.resp.seller.cover_image
        _this.contact = msg.resp.seller.contact
        _this.contact_phone = msg.resp.seller.contact_phone
        _this.area_list = msg.resp.area_list
        _this.my_choose_list = msg.resp.seller_article_id||[]
      })
    },
    updateseller(_this) {
      _this.$http.post('/api/casecms/seller/UpdateCaseSeller', {
        seller_id: _this.$route.query.seller_id,
        category: _this.category,
        name: _this.name,
        description: _this.description,
        work_year: _this.work_year,
        city_id: _this.city_id,
        address: _this.address,
        seller_phone_list: _this.seller_phone_list,
        logo_url: _this.logo_url,
        cover_image: _this.cover_image,
        contact: _this.contact,
        contact_phone: _this.contact_phone,
        area_list: _this.area_list,
        interview_list: _this.interview_list
      }).then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        _this.$router.go(-1)
      })
    },
    GetRelevanceArticleList(_this, title) {
      _this.$http.post('/api/cms/article/GetRelevanceArticleList', {
        title: title,
        category: 1
      }).then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        for (let item of msg.resp.articles) {
          item.haschoose = false
          for (let items of _this.my_choose_list) {
            if (item.article_id == items.article_id) {
              item.haschoose = true
            }
          }
        }
        _this.search_msg_list = msg.resp.articles
      })
    }
}
