import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable'
const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommendList: [],
    articlePage: 1,
    showScroll: false
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGEHOMEDATA:
            return state.merge({
                'topicList': action.value.get('topicList'),
                'articleList': action.value.get('articleList'),
                'recommendList': action.value.get('recommendList'),
            })
        case actionTypes.ADDHOMELIST:
            return state.set('articleList', state.get('articleList').concat(action.value))
        case actionTypes.CHANGESCROLLSTATE:
            console.log(action.value)
            return state.set('showScroll', action.value)
        default:
            return state
    }
}
