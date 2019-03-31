import React from 'react'
import {
    ListItem,
    ListInfo,
    LoadMore
}  from '../style'
import {connect} from 'react-redux'
import {actionCreate} from '../store'
import {Link} from 'react-router-dom'
class List extends React.PureComponent {
    render() {
        const {articleList} = this.props
        return (
            <>
                {
                    articleList.map((item)=>{
                        return(
                            <Link key={item.get('id')} to={'/detail/'+ item.get('id')} >
                            <ListItem>
                                <img className="pic" src={item.get('imgUrl')} alt=""/>
                                <ListInfo>
                                    <h3 className="title">{item.get('title')}</h3>
                                    <p className="desc">{item.get('desc')}</p>
                                </ListInfo>
                            </ListItem>
                            </Link>
                        )
                    })
                }
                <LoadMore onClick={()=>this.props.handleLoad()}>更多文字</LoadMore>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        'articleList': state.getIn(['home','articleList']),
        'articlePage': state.getIn(['home','articlePage'])
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleLoad(){
            dispatch(actionCreate.handleLoad())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(List)
