import React from 'react'
import {List, Recommed, Writer, Topic}from './components'
import {connect} from "react-redux";
import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop
} from './style'
import {actionCreate} from './store'
class Home extends React.PureComponent {
    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img className="banner-img" src="http://pic24.nipic.com/20120906/2786001_082828452000_2.jpg" alt=""/>
                    <Topic></Topic>
                    <List></List>
                </HomeLeft>
                <HomeRight>
                    <Recommed></Recommed>
                    <Writer></Writer>
                </HomeRight>
                {
                    this.props.showScroll === true ? <BackTop onClick={()=>this.backTop()}>top</BackTop> : null
                }
            </HomeWrapper>
        )
    }
    componentDidMount() {
        this.props.changeHomeData()
        this.bindEvents()
    }

    backTop(){
        window.scrollTo(0, 0)
    }
    bindEvents() {
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }
}

const mapStateToProps = (state) => {
    return {
        showScroll: state.getIn(['home', 'showScroll'])
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeHomeData(){
            dispatch(actionCreate.changeHomeData())
        },
        changeScrollTopShow (e) {
            const height = document.documentElement.scrollTop
            if(height > 500){
                dispatch(actionCreate.changeScrollState(true))
            } else {
                dispatch(actionCreate.changeScrollState(false))
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
