import * as types from './mutation-types'

export function selectImage ({commit, state}, {images, selectIndex}) {
  commit(types.SET_IMAGE_ZOOM_LIST, images)
  commit(types.SET_IMAGE_ZOOM_INDEX, selectIndex)
}
