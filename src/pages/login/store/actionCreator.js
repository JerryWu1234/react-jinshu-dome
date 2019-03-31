import axios from 'axios';
import * as actionTypes from './actionTypes';

export const changeLogin = (val) => ({
    type: actionTypes.CHANGE_LOGIN,
    value: val
})
export const login = (account, password)=> {
    return (dispatch) => {
        axios.get('/api/login.json').then((res) =>{
            const {data: datas} = res
            if(datas) {
                dispatch(changeLogin(true))
            } else {

            }
        })
    }
}
