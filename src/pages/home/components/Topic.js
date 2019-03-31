import React from 'react'
import {connect} from "react-redux";
import {
    TopicWrapper,
    TopicItem
} from '../style'
class Topic extends React.PureComponent {

    render() {
        const {topicList} = this.props
        return (
            <TopicWrapper>

                {
                    topicList.map(item => {
                        return (<TopicItem key={item.get('title')}>{item.get('title')}</TopicItem>)
                    })
                }
            </TopicWrapper>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        'topicList': state.getIn(['home', 'topicList'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Topic)
