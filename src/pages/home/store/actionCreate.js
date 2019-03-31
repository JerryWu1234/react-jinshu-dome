import {actionTypes} from './index'
import axios from 'axios'
import {fromJS} from 'immutable'
export const getHomeList = (data) => ({
    type: actionTypes.CHANGEHOMEDATA,
    value: fromJS(data),
})
export const addHomeList = (data) => ({
    type: actionTypes.ADDHOMELIST,
    value: fromJS(data),
})
export const changeScrollState = (val) => ({
    type: actionTypes.CHANGESCROLLSTATE,
    value: fromJS(val),
})

export const changeHomeData = (data) => {
    return (dispatch)=>{
        axios.get('/api/home.json').then(res=>{
            const {data: childData} = res
            console.log(childData.data)
            dispatch(getHomeList(childData.data))
        })
    }
}

export const handleLoad = () => {
    return (dispatch) => {
        axios.get('/api/homeList.json').then(res=>{
            const {data: childData} = res
            dispatch(addHomeList(childData.data))
        })
    }
}
