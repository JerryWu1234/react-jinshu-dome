import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, Button } from './style';
import { actionCreator } from './store';

class Login extends PureComponent {
	render() {
		const { loginStatus } = this.props;
		if (!loginStatus) {
			return (
				<LoginWrapper>
					<LoginBox>
						<Input placeholder="帐号" ref={(input)=> this.acount = input} />
						<Input placeholder="密码" ref={(input)=> this.password = input } />
						<Button onClick={()=>this.props.login({acount: this.acount, password: this.password})}>登陆</Button>
					</LoginBox>
				</LoginWrapper>
			)
		}else {
			return <Redirect to='/'/>
		}
	}
}

const mapState = (state) => ({
	'loginStatus': state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => ({
	login({acount, password}){
		dispatch(actionCreator.login(acount,password))
		console.log(acount.value, password.value)
	}
})

export default connect(mapState, mapDispatch)(Login);
