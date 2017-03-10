export default {
  AddCase(_this) {
      _this.$http.post('/api/casecms/case/AddCase', {
        article: _this.article,
        list_style: _this.list_style,
        case_module_list: _this.case_module_list,
        case_wedding_info_list: _this.case_wedding_info_list,
        case_team_fee_list: _this.case_team_fee_list,
        tag_ids: _this.tag_ids
      }).then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        localStorage.removeItem('case_add_title_1')
        localStorage.removeItem('case_add_title_2')
        localStorage.removeItem('case_add_title_3')
        localStorage.removeItem('case_add_msg')
        _this.$router.go(-1)
      })
    },
    UpdateCase(_this) {
      _this.$http.post('/api/casecms/case/UpdateCase', {
        article: _this.article,
        list_style: _this.list_style,
        case_module_list: _this.case_module_list,
        case_wedding_info_list: _this.case_wedding_info_list,
        case_team_fee_list: _this.case_team_fee_list,
        tag_ids: _this.tag_ids
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
    city(_this) {
      _this.$http.post('/api/casecms/seller/GetCaseCityList').then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        _this.city_list = msg.resp.city_list
      })
    },
    SellerName(_this) {
      _this.$http.post('/api/casecms/seller/GetCaseSellerNameByCityId', {
        city_id: _this.choose_city,
        category_id: _this.choose_category
      }).then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        _this.seller_list = msg.resp.seller_list
      })
    },
    area(_this) {
      _this.$http.post('/api/casecms/seller/GetCaseAreaBySellerId', {
        seller_id: _this.choose_seller
      }).then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        _this.area_list = msg.resp.area_list
      })
    },
    GetCaseInfo(_this) {
      _this.$http.post('/api/casecms/case/GetCaseInfo', {
        article_id: _this.$route.query.article_id
      }).then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        _this.title = msg.resp.article.title
        _this.description = msg.resp.article.description
        _this.case_img = msg.resp.article.list_style.url
        if (msg.resp.article.case_module_1_list.length != 0) {
          for (let item of msg.resp.article.case_module_1_list) {
            let list = {}
            list.case_module_type_1 = item.case_module_1_id
            list.name = item.case_module_1_name
            list.case_module_type_1_list = []
            for (let change_1 of _this.title1) {
              if (item.case_module_1_id == change_1.id) {
                change_1.haschoose = true
              }
            }
            for (let item_2 of item.case_module_2_list) {
              let list_2 = {}
              list_2.case_module_type_2 = item_2.case_module_2_id
              list_2.name = item_2.case_module_2_name
              list_2.case_module_type_2_list = []
              for (let change_2 of _this.title_2_by_id) {
                if (item_2.case_module_2_id == change_2.id) {
                  change_2.haschoose = true
                }
              }
              for (let item_3 of item_2.case_module_3_list) {
                let list_3 = {}
                list_3.case_module_3_id = item_3.case_module_3_id
                list_3.name = item_3.case_module_3_name
                list_3.content = item_3.case_content_nodes
                list_2.case_module_type_2_list.push(list_3)
                for (let change_3 of _this.title_3_by_id) {
                  if (item_3.case_module_3_id == change_3.id) {
                    change_3.haschoose = true
                  }
                }
              }
              list.case_module_type_1_list.push(list_2)
            }
            _this.msg.push(list)
          }
        }
        if (msg.resp.article.case_wedding_info_list.length != 0) {
          _this.title1[4].haschoose = true
          for (let item of msg.resp.article.case_wedding_info_list) {
            if (item.wedding_info_dict_id == 1) {
              _this.date = item.info

            }
            if (item.wedding_info_dict_id == 2) {
              _this.wedding_size = item.info

            }
            if (item.wedding_info_dict_id == 3) {
              _this.wedding_seller_id = item.info
              _this.$http.post('/api/casecms/seller/GetCaseSellerById', {
                seller_id: item.info
              }).then((response) => {
                let msgs = response.data
                if (msgs.retcode != 0) {
                  _this.$store.dispatch('alert-msg', msgs.msg)
                  _this.$store.dispatch('alert-start')
                  return
                }
                _this.wedding_seller_status = msgs.resp.seller.status
                _this.wedding_seller_name = msgs.resp.seller.name
              })
            }
            if (item.wedding_info_dict_id == 4 && item.info != '') {
              _this.wedding_area_id = item.info
              _this.$http.post('/api/casecms/seller/GetCaseAreaBySellerId', {
                seller_id: item.info
              }).then((response) => {
                let msgs = response.data
                if (msgs.retcode != 0) {
                  _this.$store.dispatch('alert-msg', msgs.msg)
                  _this.$store.dispatch('alert-start')
                  return
                }
                for (let items of msgs.resp.area_list) {
                  if (items.area_id = item.info) {
                    _this.wedding_area_name = items.name
                  }
                }
              })
            }
          }
          if (msg.resp.article.case_wedding_info_list[3].info != "" && msg.resp.article.case_wedding_info_list[3].info != null) {
            _this.wedding_area_id = msg.resp.article.case_wedding_info_list[3].info
            _this.$http.post('/api/casecms/seller/GetCaseAreaBySellerId', {
              seller_id: msg.resp.article.case_wedding_info_list[2].info
            }).then((response) => {
              let msgs = response.data
              if (msgs.retcode != 0) {
                _this.$store.dispatch('alert-msg', msgs.msg)
                _this.$store.dispatch('alert-start')
                return
              }
              for (let item of msgs.resp.area_list) {
                if (item.area_id = msg.resp.article.case_wedding_info_list[3].info) {
                  _this.wedding_area_name = item.name
                }
              }
            })
          }
        }
        if (msg.resp.article.case_team_fee_list.length != 0) {
          _this.title1[5].haschoose = true
          for (let item of msg.resp.article.case_team_fee_list) {
            if (item.team_id == 1) {
              _this.fix_case_team_fee_list[0].seller_name = item.seller_name
              _this.fix_case_team_fee_list[0].seller_id = item.seller_id
              _this.fix_case_team_fee_list[0].cost = item.cost
              _this.fix_case_team_fee_list[0].description = item.description
              _this.fix_case_team_fee_list[0].seller_status = item.status
            }
            if (item.team_id == 2) {
              _this.fix_case_team_fee_list[1].seller_name = item.seller_name
              _this.fix_case_team_fee_list[1].seller_id = item.seller_id
              _this.fix_case_team_fee_list[1].cost = item.cost
              _this.fix_case_team_fee_list[1].description = item.description
              _this.fix_case_team_fee_list[1].seller_status = item.status
            }
            if (item.team_id == 3) {
              _this.fix_case_team_fee_list[2].seller_name = item.seller_name
              _this.fix_case_team_fee_list[2].seller_id = item.seller_id
              _this.fix_case_team_fee_list[2].cost = item.cost
              _this.fix_case_team_fee_list[2].description = item.description
              _this.fix_case_team_fee_list[2].seller_status = item.status
            }
            if (item.team_id == 4) {
              _this.fix_case_team_fee_list[3].seller_name = item.seller_name
              _this.fix_case_team_fee_list[3].seller_id = item.seller_id
              _this.fix_case_team_fee_list[3].cost = item.cost
              _this.fix_case_team_fee_list[3].description = item.description
              _this.fix_case_team_fee_list[3].seller_status = item.status
            }
            if (item.team_id == 5) {
              _this.fix_case_team_fee_list[4].seller_name = item.seller_name
              _this.fix_case_team_fee_list[4].seller_id = item.seller_id
              _this.fix_case_team_fee_list[4].cost = item.cost
              _this.fix_case_team_fee_list[4].description = item.description
              _this.fix_case_team_fee_list[4].seller_status = item.status
            }
            if (item.team_id == 6) {
              _this.fix_case_team_fee_list[5].seller_name = item.seller_name
              _this.fix_case_team_fee_list[5].seller_id = item.seller_id
              _this.fix_case_team_fee_list[5].cost = item.cost
              _this.fix_case_team_fee_list[5].description = item.description
              _this.fix_case_team_fee_list[5].seller_status = item.status
            }
            if (item.team_id == 7) {
              _this.fix_case_team_fee_list[6].seller_name = item.seller_name
              _this.fix_case_team_fee_list[6].seller_id = item.seller_id
              _this.fix_case_team_fee_list[6].cost = item.cost
              _this.fix_case_team_fee_list[6].description = item.description
              _this.fix_case_team_fee_list[6].seller_status = item.status
            }
            if (item.team_id == 8) {
              _this.fix_case_team_fee_list[7].seller_name = item.seller_name
              _this.fix_case_team_fee_list[7].seller_id = item.seller_id
              _this.fix_case_team_fee_list[7].cost = item.cost
              _this.fix_case_team_fee_list[7].description = item.description
              _this.fix_case_team_fee_list[7].seller_status = item.status
            }
            if (item.team_id == 9) {
              _this.fix_case_team_fee_list[8].seller_name = item.seller_name
              _this.fix_case_team_fee_list[8].seller_id = item.seller_id
              _this.fix_case_team_fee_list[8].cost = item.cost
              _this.fix_case_team_fee_list[8].description = item.description
              _this.fix_case_team_fee_list[8].seller_status = item.status
            }
            if (item.team_id == 10) {
              _this.fix_case_team_fee_list[9].seller_name = item.seller_name
              _this.fix_case_team_fee_list[9].seller_id = item.seller_id
              _this.fix_case_team_fee_list[9].cost = item.cost
              _this.fix_case_team_fee_list[9].description = item.description
              _this.fix_case_team_fee_list[9].seller_status = item.status
            }
          }
        }
        if (msg.resp.article.tag_vo_list.length != 0) {
          for (let item of msg.resp.article.tag_vo_list) {
            _this.my_tag_ids.push(item)
            _this.choose_tag_list.push(item)
          }
        }
      })
    },
    tag_list(_this, type) {
      _this.$http.post('/api/cms/tag/GetTagList', {
        tag_type: type
      }).then((response) => {
        let msg = response.data
        if (msg.retcode != 0) {
          _this.$store.dispatch('alert-msg', msg.msg)
          _this.$store.dispatch('alert-start')
          return
        }
        _this.tag_list = _this.tag_list.concat(msg.resp.tag_list)
      })
    }
}
