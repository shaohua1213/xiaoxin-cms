import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    Row,
    Col,
    Button,
    Input,
    DatePicker,
    Table,
    Icon,
    Form,
    Modal,
    Pagination,
    Select,
    Upload,
    Layout
} from "antd";
import PageHeader from "../view/PageHeader";
import "../home.css";
import {getuserlist} from "../../actions/renyuan";
import {adduser} from "../../actions/renyuan";
import {updateuser} from "../../actions/renyuan";
import {deleteuser} from "../../actions/renyuan";
import {getrolelist} from "../../actions/Role";
import {userInfo} from "../../actions/user";
import {gethuodong} from "../../actions/huodong";
import {updhuodong} from "../../actions/huodong";
import {getUserInfoList, userInfoOut} from "../../actions/user";

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;
const confirm = Modal.confirm;
const success = Modal.success;
const Option = Select.Option;
const {Content} = Layout;
const {Header} = Layout;
const {Footer} = Layout;

function Format(date, fmt) { //author: meizz
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

class UserInfoList extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            current: 1,
            pagesize: 10,
            strDate: '',
            endDate: '',
            nickName: "",
            phoneNum: ""
        };
    }

    componentWillMount() {
        this.onRefresh();
    }

    onChangeDate = (dates, dateString) => {
        console.log(dateString);
        this.setState({
            strDate: dateString[0],
            endDate: dateString[1]
        });
    };

    onChange = page => {
        this.state.current = page;
        this.select();
    };
    onRefresh = () => {
        this.state.current = 1;
        this.select();
    };

    select = () => {
        const {getUserInfoList,} = this.props;
        getUserInfoList(
            this.state.endDate,
            this.state.nickName,
            this.state.current,
            this.state.pagesize,
            this.state.phoneNum,
            this.state.strDate
        ).then((data) => {
            console.log('------', data)
        })
    }


    render() {
        const {userInfoList} = this.props;
        const {nickName, phoneNum} = this.state;
        const columns = [
            {
                title: "用户ID",
                dataIndex: "userId",
                key: "userId",
                width: "8%"
            },
            {
                title: "用户昵称",
                dataIndex: "nickname",
                width: "14%",
                key: "nickname"
            },
            {
                title: "性别",
                dataIndex: "sex",
                key: "sex",
                width: "8%",
                render: (text, record) => {
                    return (
                        <span>
                            {record.sex===0?'未知':record.sex===2?'女':'男'}
		                </span>
                    )
                },
            }
            ,
            {
                title: "手机号码",
                dataIndex: "mobile",
                key: "mobile",
                width: "14%"
            },
            {
                title: "创建时间",
                dataIndex: "gztime",
                key: "gztime",
                width: "14%",
                render: (text, record) => {
                    let date = new Date();
                    date.setTime(record.createTime)
                    return (
                        <span>
                            {Format(date,'yyyy-MM-dd hh:mm:ss')}
		                </span>
                    )
                },
            },
            {
                title: "微信opid",
                dataIndex: "openid",
                key: "openid",
                width: "14%"
            },
            {
                title: "微信uid",
                dataIndex: "unionid",
                key: "unionid",
                width: "14%"
            }
        ];
        var divElement = document.getElementById("downloadDiv");
        var downloadUrl = `/adminuser/adminFormExportUserInfoList`;
        var params = JSON.stringify({
            endDate: this.state.endDate,
            nickname: this.state.nickName,
            pageno: 1,
            pagesize: this.state.pagesize,
            phone: this.state.phoneNum,
            strDate: this.state.strDate
        })
        return (
            <div style={{padding: 15}}>
                <PageHeader pageName={"用户信息列表"}/>
                <div
                    className="my-horizontal-div"
                    style={{marginTop: 24, alignItems: "center"}}
                >
                    <div className="my-content-text ">用户昵称:</div>
                    <div className="my-horizontal-div margin-left10">
                        <Input
                            maxLength={20}
                            value={nickName}
                            onChange={e => {
                                this.setState({nickName: e.target.value});
                            }}
                            style={{width: 200}}
                        />
                    </div>
                    <div className="my-content-text margin-left10 ">手机号码:</div>
                    <div className="my-horizontal-div margin-left10">
                        <Input
                            maxLength={11}
                            value={phoneNum}
                            type={'number'}
                            onChange={e => {
                                let value = e.target.value
                                if (value.length > 11)
                                    value = value.slice(0, 11)
                                this.setState({phoneNum: value});
                            }}
                            style={{width: 200}}
                        />
                    </div>
                </div>

                <div
                    className="my-horizontal-div"
                    style={{marginTop: 24, alignItems: "center"}}
                >
                    <div className="my-content-text ">创建时间:</div>

                    <RangePicker
                        format="YYYY-MM-DD"
                        placeholder={["开始时间", "结束时间"]}
                        onChange={this.onChangeDate}
                        style={{marginLeft: 10}}
                    />

                    <Button style={{marginLeft: "10px"}} onClick={this.onRefresh} type="primary">
                        查询
                    </Button>
                    <form action={downloadUrl} method="post" style={{marginLeft: "10px"}}>
                        <div style={{width: 0, height: 0, overflow: 'hidden'}}>
                            <input name="endDate" type="text" value={this.state.endDate}/>
                            <input name='nickname' type="text" value={this.state.nickName}/>
                            <input name='pageno' type="text" value={1}/>
                            <input name='pagesize' type="text" value={this.state.pagesize}/>
                            <input name='phone' type="text" value={this.state.phoneNum}/>
                            <input name='strDate' type="text" value={this.state.strDate}/>
                        </div>
                        <input type="submit" class="ant-btn ant-btn-primary" value="导出数据"/>
                    </form>
                </div>

                <div className="content_" style={{marginTop: 24}}>
                    <Table
                        bordered
                        columns={columns}
                        showHeader={true}
                        rowKey={record => record.id}
                        pagination={false}
                        dataSource={userInfoList && userInfoList.rows ? userInfoList.rows : []}
                        className="table"
                    />
                </div>
                <br />
                <Footer className="footer" style={{backgroundColor: 'white'}}>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSize={this.state.pagesize}
                        className="page"
                        showQuickJumper={true}
                        current={this.state.current}
                        onChange={this.onChange.bind(this)}
                        total={userInfoList && userInfoList.rowCount ? userInfoList.rowCount : 0}
                    />
                </Footer>
            </div>
        );
    }

}

function mapStateToProps(state, props) {
    return {
        userInfoList: state.getUserInfoList.object
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        getUserInfoList: bindActionCreators(getUserInfoList, dispatch),
        userInfoOut: bindActionCreators(userInfoOut, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoList);
