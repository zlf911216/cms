const actions = {
  'add-msg' (store, param) {
    store.commit('add-msg', param)
  },
  'page' (store, param) {
    store.commit('page', param)
  },
  'pl_library_id' (store, param) {
    store.commit('pl_library_id', param)
  },
  'now-add' (store) {
    store.commit('now-add')
  },
  'now-reduce' (store) {
    store.commit('now-reduce')
  },
  'repeat-close' (store) {
    store.commit('repeat-close')
  },
  'repeat-open' (store) {
    store.commit('repeat-open')
  },
  'now-change' (store, param) {
    store.commit('now-change', param)
  },
  'load-start' (store) {
    store.commit('load-start')
  },
  'load-close' (store) {
    store.commit('load-close')
  },
  'alert-start' (store) {
    store.commit('alert-start')
  },
  'alert-close' (store) {
    store.commit('alert-close')
  },
  'alert-msg' (store, param) {
    store.commit('alert-msg', param)
  },
  'brand-list' (store, param) {
    store.commit('brand-list', param)
  },
  'brand-search' (store, param) {
    store.commit('brand-search', param)
  },
  'series-list' (store, param) {
    store.commit('series-list', param)
  },
  'series-search' (store, param) {
    store.commit('series-search', param)
  },
  'style-list' (store, param) {
    store.commit('style-list', param)
  },
  'style-search' (store, param) {
    store.commit('style-search', param)
  },
  'parameter-list' (store, param) {
    store.commit('parameter-list', param)
  },
  'parameter-search' (store, param) {
    store.commit('parameter-search', param)
  },
  'pic-list' (store, param) {
    store.commit('pic-list', param)
  },
  'pic-search' (store, param) {
    store.commit('pic-search', param)
  },
  'pic-picture_category' (store, param) {
    store.commit('pic-picture_category', param)
  },
  'pic-open-upload' (store) {
    store.commit('pic-open-upload')
  },
  'pic-open-cover' (store) {
    store.commit('pic-open-cover')
  },
  'pic-open-move' (store) {
    store.commit('pic-open-move')
  },
  'pic-open-kind' (store) {
    store.commit('pic-open-kind')
  },
  'pic-move_id' (store, param) {
    store.commit('pic-move_id', param)
  },
  'pic-move_url' (store, param) {
    store.commit('pic-move_url', param)
  },
  'management-list' (store, param) {
    store.commit('management-list', param)
  },
  'management-search' (store, param) {
    store.commit('management-search', param)
  },
  'management-business_id' (store, param) {
    store.commit('management-business_id', param)
  },
  'gold-list' (store, param) {
    store.commit('gold-list', param)
  },
  'opportunity-list' (store, param) {
    store.commit('opportunity-list', param)
  },
  'opportunity-search' (store, param) {
    store.commit('opportunity-search', param)
  },
  'common-list' (store, param) {
    store.commit('common-list', param)
  },
  'common-search' (store, param) {
    store.commit('common-search', param)
  },
  'service-list' (store, param) {
    store.commit('service-list', param)
  },
  'service-category' (store, param) {
    store.commit('service-category', param)
  },
  'service-city_id' (store, param) {
    store.commit('service-city_id', param)
  },
  'album-list' (store, param) {
    store.commit('album-list', param)
  },
  'evaluate-list' (store, param) {
    store.commit('evaluate-list', param)
  },
  'evaluate-search' (store, param) {
    store.commit('evaluate-search', param)
  },
  'evaluate-evaluation_status' (store, param) {
    store.commit('evaluate-evaluation_status', param)
  },
  'evaluate-start_time' (store, param) {
    store.commit('evaluate-start_time', param)
  },
  'evaluate-end_time' (store, param) {
    store.commit('evaluate-end_time', param)
  },
  'special-list' (store, param) {
    store.commit('special-list', param)
  },
  'case_edit_pool_list' (store,param){
    store.commit('case_edit_pool_list',param)
  },
  'case_edit_pool_search' (store,param){
    store.commit('case_edit_pool_search',param)
  },
  'case_edit_pool_time' (store,param){
    store.commit('case_edit_pool_time',param)
  },
  'release_pool_list' (store,param){
    store.commit('release_pool_list',param)
  },
  'release_pool_search' (store,param){
    store.commit('release_pool_search',param)
  },
  'release_pool_time' (store,param){
    store.commit('release_pool_time',param)
  }
}

export default actions
