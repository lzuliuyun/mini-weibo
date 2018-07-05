import * as types from './mutation-types'

const mutations = {
  [types.SET_COMMENT_ADDED] (state, commentAdded) {
    state.commentAdded = commentAdded
  },
  [types.SET_IMAGE_ZOOM_LIST] (state, imageZoomList) {
    state.imageZoomList = imageZoomList
  },
  [types.SET_IMAGE_ZOOM_INDEX] (state, imageZoomIndex) {
    state.imageZoomIndex = imageZoomIndex
  }
}

export default mutations
