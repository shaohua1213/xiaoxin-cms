import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
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
    Layout,
    message
} from "antd";
import PageHeader from "../view/PageHeader";
import "../home.css";
import {
    getLevelList
} from "../../actions/course";
import {adminGetOrderList, GetVerPhaseList} from "../../actions/financial";
import {getRefundInfo} from './RefundInfoAction'
import {refundCommit, refundShenheCommit, refundChakan, rRefundCommit} from '../refundManage/RefundAction'

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;
const confirm = Modal.confirm;
const success = Modal.success;
const Option = Select.Option;
const {Content} = Layout;
const {Header} = Layout;
const {Footer} = Layout;


function Format(dateLong, fmt) {
    //author: meizz
    let date = new Date();
    date.setTime(dateLong);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
}
class RefundInfo extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            id: this.props.refundId,
            type: this.props.type, // 展示类型 0 手动退款 1 退款审核 2 退款申请被驳回 3 查看退款详情
            data: undefined,
            shitui: -1, // 实退金额
            shitui1: 0, //
            refunddesc: '', //
            yijian: '', //
            disable: true,
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getLevelListM();
    }

    onChange = page => {
        this.setState({
            pageno: page,
        })
        setTimeout(() => {
            this.getOrderList();
        }, 100)
    };


    // 获取数据
    getLevelListM = () => {
        const {getRefundInfo, refundChakan, type} = this.props;
        let method = undefined;
        if (type === 1 || type === 2 || type === 3) {
            method = refundChakan
        } else {
            method = getRefundInfo
        }
        method(this.state.id).then(data => {
            console.log(data)
            if (data.meta.code === "0") {
                this.setState({
                    data: data.object ? data.object : undefined,
                    refunddesc: data.object ? data.object.refunddesc ? data.object.refunddesc : '' : '',
                    shitui: data.object ? data.object.refundprice ? data.object.refundprice / 100 : 0 : 0,
                    disable: false,
                });
            } else {
                message.error(data.meta.message || data.meta.message === '' ? data.meta.message : '服务器链接失败')
            }
        }).catch(e => {
            console.log(e)
            message.error('服务器链接失败')
        })
    };

    render() {

        let my_center_body = {
            borderColor: '#e8e8e8',
            borderStyle: 'solid',
            borderBottomWidth: '1px',
            borderLeftWidth: '1px',
            borderRightWidth: '0px',
            borderTopWidth: '0px',
        }
        let my_center_body1 = {
            borderColor: '#e8e8e8',
            borderStyle: 'solid',
            borderBottomWidth: '1px',
            borderLeftWidth: '1px',
            borderRightWidth: '0px',
            borderTopWidth: '0px',
            width: '50%',
            marginTop: 22
        }
        let my_ho_div = {
            display: 'flex',
            flexDirection: 'row',
        }

        let my_center_title = {
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60px',
            padding: '10px',
            fontSize: '14px',
            color: '#555',
            borderColor: '#dddddd',
            borderStyle: 'solid',
            borderBottomWidth: '0px',
            borderLeftWidth: '0px',
            borderRightWidth: '1px',
            borderTopWidth: '1px',
            fontWeight: 500,
        }
        let my_body = {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
        }
        let my_body1 = {
            display: 'flex',
            flex: 1.2,
            flexDirection: 'column',
        }
        let my_body2 = {
            display: 'flex',
            flex: 2,
            flexDirection: 'column',
        }
        let my_body3 = {
            display: 'flex',
            flex: 1.4,
            flexDirection: 'column',
        }
        let my_center_title1 = {
            display: 'flex',
            flex: 1.2,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60px',
            padding: '10px',
            fontSize: '14px',
            color: '#555',
            borderColor: '#dddddd',
            borderStyle: 'solid',
            borderBottomWidth: '0px',
            borderLeftWidth: '0px',
            borderRightWidth: '1px',
            borderTopWidth: '1px',
        }
        let my_center_title2 = {
            display: 'flex',
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60px',
            padding: '10px',
            fontSize: '14px',
            color: '#555',
            borderColor: '#dddddd',
            borderStyle: 'solid',
            borderBottomWidth: '0px',
            borderLeftWidth: '0px',
            borderRightWidth: '1px',
            borderTopWidth: '1px',
        }

        let {data, type, disable} = this.state;
        console.log(data ? data.loglist : undefined)
        {
            data ?
                data.payprice && data.refundprice
                    ? parseFloat(parseFloat(data.payprice - data.refundprice).toPrecision(12))
                    : data.caiwuqueren ? data.caiwuqueren / 100
                    : '0' : '0'
        }
        let shoudong = 0;
        if (data) {
            if (data.caiwuqueren) {
                shoudong = data.caiwuqueren / 100;
            }
            if (data.payprice && data.refundprice) {
                shoudong = parseFloat(parseFloat(data.payprice / 100 - Math.abs(data.refundprice / 100)).toPrecision(12));
                if(data.yiqueren){
                    shoudong = parseFloat(parseFloat(shoudong - data.yiqueren/100).toPrecision(12));
                }
            }
            if (this.state.shitui >=0) {
                shoudong = parseFloat(parseFloat(data.payprice / 100 - this.state.shitui).toPrecision(12));
                if(data.yiqueren){
                    shoudong = parseFloat(parseFloat(shoudong - data.yiqueren/100).toPrecision(12));
                }
            }
        }

        return (
            <div style={{padding: 15}}>
                <div id='printTable'>
                    <PageHeader pageName={"退款申请"}/>
                    <div style={{
                        marginTop: 15,
                        width: '100%',
                        paddingBottom: 13,
                        borderBottomWidth: 1,
                        borderColor: '#666',
                        borderStyle: 'solid',
                        borderTopWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        paddingRight: 200,
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}>
                        <div>退款单号：{data && data.refundnum ? data.refundnum : ''}</div>
                        <div>退款时间：{data && data.refundtime ? Format(data.refundtime, "yyyy-MM-dd hh:mm:ss") : ''}</div>
                    </div>
                    <div style={{marginTop: 22}}>订单信息：</div>
                    <div style={{marginTop: 22}}>
                        <div style={my_center_body}>
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <div style={my_body1}>
                                    <div style={my_center_title}>
                                        原订单号
                                    </div>
                                    <div style={my_center_title}>
                                        {data && data.ordernum ? data.ordernum : ''}
                                    </div>
                                </div>
                                <div style={my_body}>
                                    <div style={my_center_title}>
                                        期数名称
                                    </div>
                                    <div style={my_center_title}>
                                        {data && data.phasename ? data.phasename : ''}
                                    </div>
                                </div>
                                <div style={my_body}>
                                    <div style={my_center_title}>
                                        课程名称
                                    </div>
                                    <div style={my_center_title}>
                                        {data && data.levelname ? data.levelname : ''}
                                    </div>
                                </div>
                                <div style={my_body}>
                                    <div style={my_center_title}>
                                        实收金额(¥)
                                    </div>
                                    <div style={my_center_title}>
                                        {data && data.payprice ? data.payprice / 100 : '0'}
                                    </div>
                                </div>
                                <div style={my_body}>
                                    <div style={my_center_title}>
                                        已确认收入(¥)
                                    </div>
                                    <div style={my_center_title}>
                                        {data && data.yiqueren ? data.yiqueren / 100 : '0'}
                                    </div>
                                </div>
                                <div style={my_body}>
                                    <div style={my_center_title}>
                                        实退金额(¥)
                                    </div>
                                    <div style={my_center_title}>
                                        {
                                            type === 1 || type === 3 ?  // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
                                                <div style={{color: 'red'}}>
                                                    {data && data.refundprice ? Math.abs(data.refundprice / 100) : '0'}
                                                </div>
                                                :
                                                <input
                                                    style={{
                                                        textAlign: 'center',
                                                        width: 120,
                                                        color: 'red',
                                                        borderColor:'#f4f4f4',
                                                        borderWidth:1,
                                                        borderRadius:3,
                                                    }}
                                                    placeholder={data && data.refundprice ? Math.abs(data.refundprice / 100) : '0'}
                                                    value={this.state.shitui >=0 ? (this.state.shitui + ''): (-this.state.shitui+'')}
                                                    onChange={e => {
                                                        if (!isNaN(e.target.value)) {
                                                            let shitui = e.target.value;
                                                            // 判断不能有0.001
                                                            shitui = shitui.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
                                                            shitui = shitui.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
                                                            shitui = shitui.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
                                                            if (parseFloat(parseFloat(shitui).toPrecision(12)) >= 0) {
                                                                if (parseFloat(parseFloat(shitui).toPrecision(12)) <= data.payprice / 100) {
                                                                    this.setState({
                                                                        //shitui: parseFloat(parseFloat(shitui).toPrecision(12)),
                                                                        shitui: shitui,
                                                                    })
                                                                } else {
                                                                    message.warning('退款金额不能大于实收金额')
                                                                    this.setState({
                                                                        shitui: data.payprice / 100,
                                                                    })
                                                                }
                                                            } else {
                                                                this.setState({
                                                                    shitui: 0,
                                                                })
                                                            }
                                                        } else {
                                                            this.setState({
                                                                shitui: 0,
                                                            })
                                                        }
                                                    }}/>
                                        }
                                    </div>
                                </div>
                                <div style={my_body3}>
                                    <div style={my_center_title1}>
                                        调整财务确认收入(¥)
                                    </div>
                                    <div style={my_center_title1}>
                                        {shoudong}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: 22}}>原支付信息：</div>
                    <div style={{marginTop: 22}}>
                        <div style={my_center_body}>
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <div style={my_body}>
                                    <div style={my_center_title}>
                                        用户昵称
                                    </div>
                                    <div style={my_center_title}>
                                        {data && data.nickname ? data.nickname : ''}
                                    </div>
                                </div>
                                <div style={my_body}>
                                    <div style={my_center_title}>
                                        手机号
                                    </div>
                                    <div style={my_center_title}>
                                        {data && data.mobile ? data.mobile : ''}
                                    </div>
                                </div>
                                <div style={my_body3}>
                                    <div style={my_center_title1}>
                                        支付时间
                                    </div>
                                    <div style={my_center_title1}>
                                        {data && data.paytime ? Format(data.paytime, "yyyy-MM-dd hh:mm:ss") : ''}
                                    </div>
                                </div>
                                <div style={my_body}>
                                    <div style={my_center_title}>
                                        支付方式
                                    </div>
                                    <div style={my_center_title}>
                                        {data && data.paytype ? data.paytype === 1 ? '微信支付' : '其它' : '其它'}
                                    </div>
                                </div>
                                <div style={my_body}>
                                    <div style={my_center_title}>
                                        支付金额(¥)
                                    </div>
                                    <div style={my_center_title}>
                                        {data && data.tradeprice ? data.tradeprice / 100 : '0'}
                                    </div>
                                </div>
                                <div style={my_body}>
                                    <div style={my_center_title}>
                                        订单来源
                                    </div>
                                    <div style={my_center_title}>
                                        公众号
                                    </div>
                                </div>
                                <div style={my_body1}>
                                    <div style={my_center_title1}>
                                        交易号
                                    </div>
                                    <div style={my_center_title1}>
                                        {data && data.trade_num ? data.trade_num : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: 22}}>退款信息：</div>
                    <div style={my_center_body1}>
                        <div style={my_ho_div}>
                            <div style={my_center_title}>
                                是否无理由退款
                            </div>
                            <div style={my_center_title2}>
                                {data ? data.refundtype === 0 ? "是" : '否' : ''}
                            </div>
                        </div>
                        <div style={my_ho_div}>
                            <div style={my_center_title}>
                                退款渠道
                            </div>
                            <div style={my_center_title2}>
                                微信
                            </div>
                        </div>
                        <div style={my_ho_div}>
                            <div style={my_center_title}>
                                退款金额(¥)
                            </div>
                            <div style={my_center_title2}>
                                {
                                    type === 1 || type === 3 ?
                                        <div style={{color: 'red'}}>
                                            {data && data.refundprice ? Math.abs(data.refundprice / 100) : '0'}
                                        </div>
                                        :
                                        <input
                                            style={{textAlign: 'center', color: 'red',
                                                borderColor:'#f4f4f4',
                                                borderWidth:1,
                                                borderRadius:3,}}
                                            placeholder={data && data.refundprice ? Math.abs(data.refundprice / 100) : '0'}
                                            value={this.state.shitui >=0 ? (this.state.shitui + ''): (-this.state.shitui+'')}
                                            onChange={e => {
                                                if (!isNaN(e.target.value)) {
                                                    let shitui = e.target.value;
                                                    // 判断不能有0.001
                                                    // shitui = shitui.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
                                                    shitui = shitui.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
                                                    shitui = shitui.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
                                                    if (parseFloat(parseFloat(shitui).toPrecision(12)) >= 0) {
                                                        if (parseFloat(parseFloat(shitui).toPrecision(12)) <= data.payprice / 100) {
                                                            this.setState({
                                                                //shitui: parseFloat(parseFloat(shitui).toPrecision(12)),
                                                                shitui: shitui,
                                                            })
                                                        } else {
                                                            message.warning('退款金额不能大于实收金额')
                                                            this.setState({
                                                                shitui: data.payprice / 100,
                                                            })
                                                        }
                                                    } else {
                                                        this.setState({
                                                            shitui: 0,
                                                        })
                                                    }
                                                } else {
                                                    this.setState({
                                                        shitui: 0,
                                                    })
                                                }
                                            }}/>
                                }
                            </div>
                        </div>
                        <div style={my_ho_div}>
                            <div style={my_center_title}>
                                <div style={{color: 'red'}}>*</div>
                                退款说明
                            </div>
                            <div style={my_center_title2}>
                                {
                                    type === 1 || type === 3 ?
                                        <div style={{color: 'red'}}>
                                            {data && data.refunddesc ? data.refunddesc : '暂无'}
                                        </div>
                                        :
                                        <textarea rows="2" cols="20"
                                                  style={{ width: '90%', color: 'red',
                                                      borderColor:'#f4f4f4',
                                                      borderWidth:1,
                                                      borderRadius:3,}}
                                                  placeholder={'请输入退款说明'}
                                                  value={this.state.refunddesc}
                                                  onChange={e => {
                                                      this.setState({
                                                          refunddesc: e.target.value,
                                                      })
                                                  }}/>
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{marginTop: 22}}>审核日志：</div>
                        {
                            <div style={{marginTop: 5}}>
                                {
                                    data && data.loglist && data.loglist.length > 0 ?
                                        data.loglist.map(da => {
                                            return (
                                                <div style={{marginTop: 5}}>{
                                                    Format(da.createTime, 'yyyy-MM-dd hh:mm:ss') + '   ' + da.logRemark
                                                }</div>
                                            )
                                        })
                                        : <div style={{marginTop: 5}}>暂无</div>
                                }
                            </div>
                        }
                    </div>
                    {
                        type === 1 || type === 2 ?
                            <div>
                                <div style={{marginTop: 22}}>审核意见：</div>
                                <textarea rows="3" cols="20"
                                          style={{
                                              borderColor: '#ddd',
                                              borderRadius: 5,
                                              width: '50%',
                                              marginTop: 10,
                                              padding: 5
                                          }}
                                          placeholder={'请输入审核意见'}
                                          value={this.state.yijian}
                                          onChange={e => {
                                              this.setState({
                                                  yijian: e.target.value,
                                              })
                                          }}/>
                            </div>
                            : null
                    }
                </div>
                <div style={{marginTop: 20}}>
                    {
                        type === 0 ?
                            <Button
                                disabled={disable}
                                onClick={this.commit}
                                type="primary">
                                提交
                            </Button>
                            : type === 1 ?
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <Button
                                    disabled={disable}
                                    onClick={() => {
                                        this.shenheCommit(0)
                                    }}
                                    type="primary">
                                    通过
                                </Button>
                                <Button
                                    disabled={disable}
                                    onClick={() => {
                                        this.shenheCommit(1)
                                    }}
                                    type="primary"
                                    style={{marginLeft: 30}}>
                                    驳回
                                </Button>
                            </div>
                            : type === 2 ?
                            <div>
                                <Button
                                    disabled={disable}
                                    onClick={() => {
                                        this.rCommit(1)
                                    }}
                                    type="primary">
                                    提交
                                </Button>
                                <Button
                                    disabled={disable}
                                    type="primary"
                                    onClick={() => {
                                        this.rCommit(2)
                                    }}
                                    style={{marginLeft: 30}}>
                                    取消申请
                                </Button>
                            </div>
                            : type === 3 ?
                            <Button
                                disabled={disable}
                                type="primary"
                                onClick={this.printPage}>打印</Button>
                            : null
                    }
                </div>
            </div>
        );
    }

    // 打印方法
    printPage = () => {
        let tableToPrint = document.getElementById('printTable');
        let newWin = window.open("");//新打开一个空窗口
        newWin.document.write(tableToPrint.outerHTML);//将表格添加进新的窗口
        newWin.document.close();//在IE浏览器中使用必须添加这一句
        newWin.focus();//在IE浏览器中使用必须添加这一句
        newWin.print();//打印
        newWin.close();//关闭窗口
    }
    // 提交审核
    commit = () => {
        const {refundCommit, refundId, commitOver} = this.props;
        const {id, shitui, refunddesc, yijian} = this.state;
        console.log(id, refunddesc, shitui)
        if (refunddesc === '') {
            message.warning('请填写退款说明')
            return
        }
        let shit = parseFloat(parseFloat(shitui).toPrecision(12));
        if(parseFloat(parseFloat(shitui).toPrecision(12))<0){
            shit = 0;
        }
        console.log('提交----',shit)
        refundCommit(id, refunddesc, shit * 100).then(data => {
            console.log(data)
            if (data.meta.code === '0') {
                message.success('提交成功')
                commitOver();
            } else {
                message.error(data.meta.message && data.meta.message != '' ? data.meta.message : '提交失败')
            }
        }).catch(e => {
            console.log(e)
            message.error('服务器链接失败')
        })
    }
    // 再次提交审核
    rCommit(type) {
        const {refundCommit, refundId, commitOver, rRefundCommit} = this.props;
        const {id, shitui, refunddesc, yijian} = this.state;
        console.log(id, refunddesc, shitui)
        if (type === 1) {
            if (yijian === '') {
                message.warning('请填写审核意见')
                return
            }
            if (refunddesc === '') {
                message.warning('请填写退款说明')
                return
            }
        }
        let shit = parseFloat(parseFloat(shitui).toPrecision(12));
        if(parseFloat(parseFloat(shitui).toPrecision(12))<0){
            shit = 0;
        }
        console.log('再次提交审核----',shit)
        rRefundCommit(id, refunddesc, shit * 100, yijian, type).then(data => {
            console.log(data)
            if (data.meta.code === '0') {
                message.success('提交成功')
                commitOver();
            } else {
                message.error(data.meta.message && data.meta.message != '' ? data.meta.message : '提交失败')
            }
        }).catch(e => {
            console.log(e)
            message.error('服务器链接失败')
        })
    }

    shenheCommit(state) {
        const {refundCommit, refundShenheCommit, commitOver} = this.props;
        const {id, shitui, refunddesc, yijian} = this.state;
        if (state === 1 && yijian === '') {
            message.warning('请填写审核意见')
            return
        }
        refundShenheCommit(id, this.props.type1, state, yijian).then(data => {
            console.log(data)
            if (data.meta.code === '0') {
                message.success('提交成功')
                commitOver();
            } else {
                message.error(data.meta.message && data.meta.message != '' ? data.meta.message : '提交失败')
            }
        }).catch(e => {
            console.log(e)
            message.error('服务器链接失败')
        })
    }

    handleOk = () => {
        this.setState({
            refundType: 0, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
            showTuikuan: false, // 展示退款model
        })
    }

    handleCancel = (e) => {
        this.setState({
            refundType: 0, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
            showTuikuan: false, // 展示退款model
        })
    }

    dingdanChange = value => {
        this.setState({
            status: value,
        })
    };

    chaxun = () => {
        this.onChange(1)
    }
}

RefundInfo.propTypes = {
    refundId: PropTypes.object.isRequired,
    type: PropTypes.object.isRequired,
    type1: PropTypes.object.isRequired,
    commitOver: PropTypes.object.isRequired, // 点击按钮后成功，调取的方法
}

function mapStateToProps(state, props) {
    return {};
}

function mapDispatchToProps(dispatch, props) {
    return {
        getLevelList: bindActionCreators(getLevelList, dispatch),
        GetVerPhaseList: bindActionCreators(GetVerPhaseList, dispatch),
        getRefundInfo: bindActionCreators(getRefundInfo, dispatch),
        refundCommit: bindActionCreators(refundCommit, dispatch),
        refundShenheCommit: bindActionCreators(refundShenheCommit, dispatch),
        refundChakan: bindActionCreators(refundChakan, dispatch),
        rRefundCommit: bindActionCreators(rRefundCommit, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RefundInfo);
