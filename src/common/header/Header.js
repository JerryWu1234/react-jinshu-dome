import { connect } from "react-redux";
import React from 'react';
import {CSSTransition} from "react-transition-group/esm";
import {Link} from "react-router-dom";
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    Addition,
    Button,
    NavSearch,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList
} from "./style";
import {actionCreate} from './store';
import { actionCreator as loginActionCreate} from '../../pages/login/store'

class Header extends React.PureComponent {
    getListArea() {
        const {page} = this.props
        const pageList = [];
        const newList = this.props.list.toJS();
        if(newList.length === 0) return
        for (let i = ((page - 1) * 10); i < page * 10; i++) {
            pageList.push(
                <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
            )

        }
        if (this.props.focused || this.props.mouseIn) {
            return (
                <SearchInfo
                    onMouseEnter={() => {
                        this.props.handleMouseEnter(true)
                    }}
                    onMouseLeave={() => {
                        this.props.handleMouseEnter(false)
                    }}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => this.props.handleChangePage(this.spinIcon)}>
                            <i ref={(icon)=>{this.spinIcon = icon}} className='spin'>b</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null
        }
    }
        render()
        {
            return (
                <HeaderWrapper>
                    <Link to="/">
                        <Logo />
                    </Link>
                    <Nav>
                        <NavItem className='left active'>首页</NavItem>
                        <NavItem className='left'>下载App</NavItem>
                        <NavItem className='right'>Aa</NavItem>
                        {
                            this.props.login === true ?
                            <NavItem onClick={() => this.props.loginOut()} className='right'>退出</NavItem> :
                            <Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
                        }
                        <SearchWrapper>
                            <CSSTransition
                                classNames="my-node"
                                in={this.props.focused}
                                timeout={500}>
                                <NavSearch
                                    className={this.props.focused === false ? '' : 'focused'}
                                    onFocus={() => {
                                        this.props.handleInput(true)
                                    }}
                                    onBlur={() => {
                                        this.props.handleInput(false)
                                    }}
                                ></NavSearch>
                            </CSSTransition>
                            {this.getListArea(this.props.focused)}
                        </SearchWrapper>
                    </Nav>
                    <Addition>
                        <Button className='writting'>
                            <i className="iconfont">b</i>
                            写文章
                        </Button>
                        <Button className='reg'>注册</Button>
                    </Addition>
                </HeaderWrapper>)
        }
}


const mapStateToProps = (state, ownProps = {}) => {
    return {
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        totalPage: state.getIn(['header', 'totalPage']),
        'login': state.getIn(['login', 'login'])
        // focused: state.get('header').get('focused')
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInput(val){
            this.list.size <= 0 && dispatch(actionCreate.getList())
            dispatch(actionCreate.HandleSearch(val))
        },
        handleMouseEnter(val){
            dispatch(actionCreate.mouseEnter(val))
        },
        handleChangePage(that){
            let val = that.style.transform.match(/\d+/g)
            if(val !== null){
                val = Number(...val)
                console.log(val)
                val += 360
                that.style.transform = `rotate(${val}deg)`
            }else{
                that.style.transform = `rotate(360deg)`
            }

            if(this.totalPage > this.page){
                console.log(this.page + 1)
                dispatch(actionCreate.handleChangePage(this.page + 1))
            }else{
                dispatch(actionCreate.handleChangePage(1))
            }

        },
        loginOut() {
            dispatch(loginActionCreate.changeLogin(false))
        }
    }
}



export default connect(mapStateToProps,  mapDispatchToProps)(Header);
