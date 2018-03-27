import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Icon,Button,Affix,BackTop} from 'antd'

class PageHeader extends Component {

    render() {

        const {user, backM, showBack} = this.props;

        return (
            <div style={{}}>
                <div className="" style={{
                    fontSize: 18,
                    color: '#333',
                    width: '100%',
                    paddingBottom: 13,
                    borderBottomWidth: 1,
                    borderColor: '#666',
                    borderStyle: 'solid',
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    paddingRight: 80,
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    {this.props.pageName}
                    {
                        showBack ?
                            <Affix offsetTop={30}>
                                <Button onClick={() => {
                                    backM()
                                }} icon={'close-circle-o'}>
                                </Button>
                            </Affix>
                            : null
                    }
                </div>

                <BackTop/>
            </div>
        );
    }
}

PageHeader.propTypes = {
    pageName: PropTypes.object.isRequired, // 方法
    showBack: PropTypes.object.isRequired, // 展示返回
    backM: PropTypes.object.isRequired, // 返回方法
}


export default PageHeader;

