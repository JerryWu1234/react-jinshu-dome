import {actionTypes} from './index'
import axios from 'axios'
import {fromJS} from 'immutable'
export const HandleSearch = (val) => ({
    type: actionTypes.HANDLESEARCH,
    value: val,
})

export const changeList = (data) => ({
    type: actionTypes.CHANGELIST,
    value: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
})
export const mouseEnter = (val) => ({
    type: actionTypes.CHANGEMOUSEIN,
    value: val
})

export const handleChangePage = (val) => ({
        type: actionTypes.HANDLECHANGEPAGE,
        value: val
    })


export const getList = () => {
    return (dispatch) => {
        axios.get('/api/headerList.json' ).then(res=>{
           const {data: datas} = res
            dispatch(changeList(datas.data))
       })
    }
}
