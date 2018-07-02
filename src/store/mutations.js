import * as types from './mutation-types'

const mutations = {
  [types.SET_COMMENT_ADDED] (state, commentAdded) {
    state.commentAdded = commentAdded
  }
}

export default mutations
