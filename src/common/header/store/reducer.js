import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable'
const defaultState = fromJS({
    focused: false,
    list: [],
    page: 1,
    totalPage: 1,
    mouseIn: false
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.HANDLESEARCH:
            return state.set('focused', action.value);
        case actionTypes.CHANGELIST:
            return state.merge({
                'list': action.value,
                'totalPage': action.totalPage
            })
            // return state.set('list', action.value).set('totalPage', action.totalPage);
        case actionTypes.CHANGEMOUSEIN:
            return state.set('mouseIn', action.value)
        case actionTypes.HANDLECHANGEPAGE:
            return state.set('page', action.value)
        default:
            return state
    }
}
