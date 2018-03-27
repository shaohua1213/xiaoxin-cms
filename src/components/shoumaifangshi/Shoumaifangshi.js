import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageHeader from '../view/PageHeader'
import {Row, Col, Button, Select, Input, DatePicker, Table, Icon, Form, Modal, Pagination, Layout, message} from 'antd';
import '../home.css'
import {imageUrl} from '../../libs/utils/ImageUtils'
import Http from '../../libs/utils/Http';
import PropTypes from 'prop-types';
import {
    shoumaiList,
    qishuXinxi,
    updateQishu,
    tijiaoshenhe,
    adminPhaseDelete,
    phaseUp2On
} from '../shoumaifangshishenhe/ShouMaiAction'
import {cShowlog} from '../../actions/user'
import {priceYuan2Fen, priceFen2Yuan} from '../../libs/utils/PriceUtils'

const Option = Select.Option;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

const pageSize = 15;
const rowCount = 1; // 总页数
const current = 1; // 当前页

function Format1(dateLong, fmt) { //author: meizz
    let date = new Date();
    date.setTime(dateLong)
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
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

function Format(date, fmt) { //author: meizz
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
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

// 售卖方式审核 -- 产品
class Shoumaifangshi extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            teacherHeaderUrl: '',
            showkechengEdit: false,
            rowCount: rowCount,
            current: current,
            pageSize: pageSize,
            pageNo: 1,
            bmstrDate1: '',
            bmstrDate2: '',
            bmendDate1: '',
            bmendDate2: '',
            kkendDate: '',
            kkstrDate: '',
            phaseid: '',
            phasename: '',
            state: -1,
            verifystate: -1,
            startendOpen: false,
            endendOpen: false,
            kkendOpen: false,
            currentQishu: {},
            openPeizhiPrice: false,
            original_price: '',
            discount_price: '',
            rizhiVisible: false,
        }
    }

    componentWillMount() {
        this.chaxun()
    }

    handleImageUpload(e) {
        e.preventDefault()
        let file = e.target
        console.log(file.value)
        this.setState({
            teacherHeaderUrl: file.value,
        })
        // todo
        Http.post("/qyxing_baoming/api/upload", file, this.callback.bind(this), this.error)
    }

    error() {
        console.log('上传失败')
    }

    callback(result) {
        if (result.code === 0) { // 设置相应老师的头像
            const {setHeadUrl} = this.props;
            const {getInfo} = this.props;
            let data = getInfo ? getInfo.data : undefined
            setHeadUrl(data.nickname, data.sex, result.data.url).then((data) => {
                console.log(data)
                if (data.code === 0) {
                    this.getUserInfoM();
                } else {
                }
            })
        }
    }

    onChangeDateStr = (dates, dateString) => {

        this.setState({
            bmstrDate1: dateString[0],
            bmstrDate2: dateString[1]
        });
    };
    onChangeDateEnd = (dates, dateString) => {
        this.setState({
            bmendDate1: dateString[0],
            bmendDate2: dateString[1]
        });
    };
    onChangeDateKk = (dates, dateString) => {
        console.log(dates, dateString, dateString[0])
        this.setState({
            kkstrDate: dateString[0],
            kkendDate: dateString[1]
        });
    };
    onChangeDate = (e, dateString, s) => {
        this.setState({
            [e]: s
        });
    };

    handleStartOpenChange = (e, open) => {
        if (!open) {
            this.setState({[e]: true});
        }
    }

    handleEndOpenChange = (e, open) => {
        this.setState({[e]: open});
    }


    // 查询
    chaxun = () => {
        this.setState({pageNo: 1})
        this.getDate()
    }

    // 日志
    chakanrizhi = () => {

    }
    getDate = () => {
        const {shoumaiList} = this.props;
        const {bmstrDate1, bmstrDate2, bmendDate1, bmendDate2, kkendDate, kkstrDate, pageNo, pageSize, phaseid, phasename, state, verifystate} = this.state;

        shoumaiList(bmstrDate1, bmstrDate2, bmendDate1, bmendDate2, kkendDate, kkstrDate, pageNo, pageSize, phaseid, phasename, state, verifystate).then((data) => {
            console.log(data)
        })
    }

    // 获取期数信息
    getQishuXinxi = (phaseId) => {
        const {qishuXinxi} = this.props;
        qishuXinxi(phaseId).then((data) => {
            console.log(data)
        })

    }

    // 确认按钮 配置价格
    handleOk = () => {
        const {original_price, discount_price, currentQishu} = this.state;
        const {updateQishu,} = this.props;
        if (original_price === '' || discount_price === '') {
            message.success('请完善价格信息')
            return
        }
        let dataP = currentQishu;
        let begindate = dataP != undefined && dataP.classBeginDate && dataP.classBeginDate != '' ? dataP.classBeginDate : undefined;
        let regenddate = dataP != undefined && dataP.regEndDate && dataP.regEndDate != '' ? dataP.regEndDate : undefined;
        let regstrdate = dataP != undefined && dataP.regBeginDate && dataP.regBeginDate != '' ? dataP.regBeginDate : undefined;
        let begindate1 = '';
        let regenddate1 = '';
        let regstrdate1 = '';
        if (begindate) {
            begindate1 = Format1(begindate, 'yyyy-MM-dd')
        }
        if (regenddate) {
            regenddate1 = Format1(regenddate, 'yyyy-MM-dd HH:mm:ss')
        }
        if (regstrdate) {
            regstrdate1 = Format1(regstrdate, 'yyyy-MM-dd HH:mm:ss')
        }
        let re = {
            begindate: begindate1,// 开课时间
            "discount_price": parseFloat(priceYuan2Fen(parseFloat(discount_price).toPrecision(12))),
            "guide_url": dataP != undefined && dataP.guideUrl && dataP.guideUrl != '' ? dataP.guideUrl : '',
            "id": dataP != undefined && dataP.phaseId ? dataP.phaseId : -1,
            "idlist": [],
            "introurl1": dataP != undefined && dataP.introduceImg1Path && dataP.introduceImg1Path != '' ? dataP.introduceImg1Path : '',
            "introurl10": dataP != undefined && dataP.introduceImg10Path && dataP.introduceImg10Path != '' ? dataP.introduceImg10Path : '',
            "introurl2": dataP != undefined && dataP.introduceImg2Path && dataP.introduceImg2Path != '' ? dataP.introduceImg2Path : '',
            "introurl3": dataP != undefined && dataP.introduceImg3Path && dataP.introduceImg3Path != '' ? dataP.introduceImg3Path : '',
            "introurl4": dataP != undefined && dataP.introduceImg4Path && dataP.introduceImg4Path != '' ? dataP.introduceImg4Path : '',
            "introurl5": dataP != undefined && dataP.introduceImg5Path && dataP.introduceImg5Path != '' ? dataP.introduceImg5Path : '',
            "introurl6": dataP != undefined && dataP.introduceImg6Path && dataP.introduceImg6Path != '' ? dataP.introduceImg6Path : '',
            "introurl7": dataP != undefined && dataP.introduceImg7Path && dataP.introduceImg7Path != '' ? dataP.introduceImg7Path : '',
            "introurl8": dataP != undefined && dataP.introduceImg8Path && dataP.introduceImg8Path != '' ? dataP.introduceImg8Path : '',
            "introurl9": dataP != undefined && dataP.introduceImg9Path && dataP.introduceImg9Path != '' ? dataP.introduceImg9Path : '',
            "original_price": parseFloat(priceYuan2Fen(parseFloat(original_price).toPrecision(12))),
            "qaurl1": dataP != undefined && dataP.qaImg1Path && dataP.qaImg1Path != '' ? dataP.qaImg1Path : '',
            "qaurl10": dataP != undefined && dataP.qaImg10Path && dataP.qaImg10Path != '' ? dataP.qaImg10Path : '',
            "qaurl2": dataP != undefined && dataP.qaImg2Path && dataP.qaImg2Path != '' ? dataP.qaImg2Path : '',
            "qaurl3": dataP != undefined && dataP.qaImg3Path && dataP.qaImg3Path != '' ? dataP.qaImg3Path : '',
            "qaurl4": dataP != undefined && dataP.qaImg4Path && dataP.qaImg4Path != '' ? dataP.qaImg4Path : '',
            "qaurl5": dataP != undefined && dataP.qaImg5Path && dataP.qaImg5Path != '' ? dataP.qaImg5Path : '',
            "qaurl6": dataP != undefined && dataP.qaImg6Path && dataP.qaImg6Path != '' ? dataP.qaImg6Path : '',
            "qaurl7": dataP != undefined && dataP.qaImg7Path && dataP.qaImg7Path != '' ? dataP.qaImg7Path : '',
            "qaurl8": dataP != undefined && dataP.qaImg8Path && dataP.qaImg8Path != '' ? dataP.qaImg8Path : '',
            "qaurl9": dataP != undefined && dataP.qaImg9Path && dataP.qaImg9Path != '' ? dataP.qaImg9Path : '',
            "regenddate": regenddate1,// 报名截止
            "regstrdate": regstrdate1,// 报名开始
            "titleimg": dataP && dataP.titleImgPath && dataP.titleImgPath != '' ? dataP.titleImgPath : '',
        }
        updateQishu(re).then((data) => {
            if (data.meta.code === '0') {
                message.success('配置成功')
                this.setState({
                    openPeizhiPrice: false,
                })
                this.getDate()
            } else {
                Modal.error({
                    title: '错误提示',
                    content: data.meta.message && data.meta.message != '' ? data.meta.message : '配置失败',
                });
            }
        })


    }

    handleCancel = (e) => {
        this.setState({
            openPeizhiPrice: false,
        })
    }
    // 提交审核
    tijiaoshenheM = (id) => {
        const {tijiaoshenhe} = this.props;
        tijiaoshenhe(id).then(data => {
            if (data.meta.code === '0') {
                message.success('提交审核成功')
                this.getDate()
            } else {
                Modal.error({
                    title: '错误提示',
                    content: data.meta.message && data.meta.message != '' ? data.meta.message : '提交审核失败',
                });
            }
        })
    }

    showLog(id) {
        this.setState({
            rizhiVisible: true,
        })
        const {cShowlog} = this.props;
        cShowlog(5, id).then(data => {
            console.log(data)
        })
    }

    render() {

        const {history, showKechengEdit, getShoumaiList, qishuData, isXinjian, isChakan, canEdit, gShowLog} = this.props;
        let classes = ['系统课程level1', '系统课程level2', '系统课程level3', '系统课程level4', '系统课程level5',];
        const columns = [
            {
                title: "期数ID",
                dataIndex: "phaseId",
                width: "9%",
                key: "phaseId"
            },
            {
                title: "期数名称",
                dataIndex: "phaseName",
                key: "phaseName",
                width: "9%"
            },
            {
                title: "报名开始",
                dataIndex: "userid",
                key: "userid",
                width: "9%",
                render: (text, record) => {
                    let date = new Date()
                    date.setTime(record.regBeginDate)
                    let t = Format(date, 'yyyy-MM-dd HH:mm:ss')
                    return (
                        <span>
                        {t}
                    </span>
                    )
                }
            },
            {
                title: "报名截止",
                dataIndex: "phonenum",
                key: "phonenum",
                width: "9%",
                render: (text, record) => {
                    let date = new Date()
                    date.setTime(record.regEndDate)
                    let t = Format(date, 'yyyy-MM-dd HH:mm:ss')
                    return (
                        <span>
                        {t}
                    </span>
                    )
                }
            },
            {
                title: "正式开课",
                dataIndex: "userid",
                key: "userid",
                width: "9%",
                render: (text, record) => {
                    let date = new Date()
                    date.setTime(record.classBeginDate)
                    let t = Format(date, 'yyyy-MM-dd HH:mm:ss')
                    return (
                        <span>
                                {t}
                            </span>
                    )
                }
            },
            {
                title: "价格",
                dataIndex: "discountPrice",
                key: "discountPrice",
                width: "9%",
                render: (text, record) => {
                    return (
                        <span>
                            ¥{priceFen2Yuan(record.discountPrice)}
                        </span>
                    )
                }
            },
            {
                title: "原价",
                dataIndex: "originalPrice",
                key: "originalPrice",
                width: "9%",
                render: (text, record) => {
                    return (
                        <span>
                            ¥{priceFen2Yuan(record.originalPrice)}
                        </span>
                    )
                }
            },
            {
                title: "期数状态",
                dataIndex: "wxuid",
                key: "wxuid",
                width: "9%",
                render: (text, record) => {
                    return (
                        <span>
                        {record.status === 0 ? '新建中' : record.status === 1 ? '已上架' : record.status === 2 ? '已下架' : ''}
                    </span>
                    )
                }
            },
            {
                title: "审核状态",
                dataIndex: "wxuid",
                key: "wxuid",
                width: "9%",
                render: (text, record) => {
                    return (
                        <span>
                        {record.approveStatus === 0 ? '待提交' :
                            record.approveStatus === 1 ? '待产品审核' :
                                record.approveStatus === 2 ? '待财务审核' :
                                    record.approveStatus === 3 ? '产品审核通过' :
                                        record.approveStatus === 4 ? '审核通过' :
                                            record.approveStatus === 5 ? '产品审核未通过' :
                                                record.approveStatus === 6 ? '财务审核未通过' :
                                                    ''}
                    </span>
                    )
                }
            },
            {
                title: "审核日期",
                dataIndex: "wxuid",
                key: "wxuid",
                width: "9%",
                render: (text, record) => {
                    let date = new Date()
                    date.setTime(record.approveTime)
                    let t = Format(date, 'yyyy-MM-dd')
                    return (
                        <span>
                                {record.approveTime && record.approveTime != 0 ? t : ''}
                            </span>
                    )
                }
            },
            {
                title: "操作",
                key: "action",
                render: (text, record) => (
                    <span>
                        {
                            record.approveStatus != 1 && record.approveStatus != 2 && record.approveStatus != 3 && record.approveStatus != 4 ?
                                <span>
                                    <Button style={{margin: 5}}
                                            type="primary"
                                            onClick={() => {
                                                // 这里判断角色
                                                showKechengEdit()
                                                qishuData(record)
                                                canEdit(true)
                                                isXinjian(false)
                                                isChakan(false)
                                            }}
                                    >
                                    编辑
                                </Button>
                                    <Button style={{margin: 5}}
                                            type="primary"
                                            onClick={() => {
                                                this.setState({
                                                    currentQishu: record,
                                                    openPeizhiPrice: true,
                                                    original_price: '' + (record.originalPrice ? priceFen2Yuan(record.originalPrice) : ''),
                                                    discount_price: '' + (record.discountPrice ? priceFen2Yuan(record.discountPrice) : ''),
                                                })
                                            }}
                                    >
                                    配置价格
                                </Button>
                                    <Button style={{margin: 5}}
                                            type="primary"
                                            onClick={() => {
                                                this.tijiaoshenheM(record.phaseId)
                                            }}
                                    >
                                    提交审核
                                </Button>
                                </span>
                                : record.approveStatus == 4 && record.status == 2 ?
                                <Button style={{margin: 5}}
                                        type="primary"
                                        onClick={() => {
                                            // 这里判断角色
                                            showKechengEdit()
                                            qishuData(record)
                                            canEdit(true)
                                            isXinjian(false)
                                            isChakan(false)
                                        }}
                                >
                                    编辑
                                </Button>
                                :
                                <Button style={{margin: 5}}
                                        type="primary"
                                        onClick={() => {
                                            // 这里判断角色
                                            showKechengEdit()
                                            qishuData(record)
                                            canEdit(false)
                                            isChakan(true)
                                            isXinjian(false)
                                        }}
                                >
                                    查看
                                </Button>
                        }
                        {
                            record.isDelete === 1 ?
                                <Button type="primary"
                                        onClick={this.delIssue.bind(this, record.phaseId, 2)}
                                        style={{margin: 5}}>
                                    恢复
                                </Button>
                                : record.status === 1 ?
                                <Button type="primary"
                                        onClick={() => {
                                            this.soldOut(record.phaseId, 2)
                                        }}
                                        style={{margin: 5}}>
                                    下架
                                </Button> : record.status === 2 ?
                                <div>
                                    <Button type="primary"
                                            onClick={() => {
                                                this.soldOut(record.phaseId, 1)
                                            }}
                                            style={{margin: 5}}>
                                        上架
                                    </Button>
                                    <Button type="primary"
                                            onClick={this.delIssue.bind(this, record.phaseId, 1)}
                                            style={{margin: 5}}>
                                        删除
                                    </Button>
                                </div>
                                : null
                        }
                        <Button type="primary"
                                onClick={this.showLog.bind(this, record.phaseId)}
                                style={{margin: 5}}>
                            日志
                        </Button>
                    </span>
                )
            }
        ];

        const {
            currentQishu, openPeizhiPrice, phaseid, phasename, state, verifystate, kkendOpen, startendOpen, endendOpen,
            original_price, discount_price
        } = this.state;

        return (
            <div style={{padding: 15}}>
                <PageHeader pageName={'期数管理'}/>
                <Modal
                    key={1}
                    visible={this.state.openPeizhiPrice}
                    title="配置价格"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={500}>
                    <div
                        style={{paddingLeft: 0}}>
                        <div
                            className="my-horizontal-div"
                            style={{marginTop: 24, alignItems: "center"}}
                        >
                            <div style={{width: 100}} className="my-content-text">
                                价格(单位:元):
                            </div>
                            <div className="my-horizontal-div margin-left10">
                                <Input
                                    placeholder="统一格式：99.00"
                                    maxLength={10}
                                    type="number"
                                    value={discount_price + ''}
                                    onChange={e => {
                                        let qianbaoCoin = e.target.value ? e.target.value : '';
                                        qianbaoCoin = qianbaoCoin.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
                                        qianbaoCoin = qianbaoCoin.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
                                        qianbaoCoin = qianbaoCoin.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
                                        this.setState({
                                            discount_price: qianbaoCoin,
                                        })
                                    }}
                                    style={{width: 200}}
                                />
                            </div>
                        </div>
                        <div
                            className="my-horizontal-div"
                            style={{marginTop: 24, alignItems: "center", marginLeft: 0}}
                        >
                            <div style={{width: 100}} className="my-content-text margin-left20 ">
                                原价(单位:元):
                            </div>
                            <div className="my-horizontal-div margin-left10">
                                <Input
                                    placeholder="统一格式：99.00"
                                    maxLength={10}
                                    type="number"
                                    value={original_price + ''}
                                    onChange={e => {
                                        let qianbaoCoin = e.target.value ? e.target.value : '';
                                        qianbaoCoin = qianbaoCoin.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
                                        qianbaoCoin = qianbaoCoin.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
                                        qianbaoCoin = qianbaoCoin.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
                                        this.setState({
                                            original_price: qianbaoCoin,
                                        })
                                    }}
                                    style={{width: 200}}
                                />
                            </div>
                        </div>
                        <div
                            className="my-horizontal-div"
                            style={{marginTop: 24, alignItems: "center", paddingBottom: 20}}
                        >
                            <div style={{width: 100}} className="my-content-text ">
                                有效期:
                            </div>
                            <div className="my-horizontal-div margin-left10">
                                <Input disabled
                                       value={'30'}
                                       style={{width: 200}}
                                />
                            </div>
                        </div>
                        <div
                            className="shenhe-div"
                            style={{alignItems: "center", paddingBottom: 50, paddingLeft: 0}}
                        >
                            <Button onClick={this.handleOk} type="primary" style={{width: 150, marginTop: 20}}>
                                保存
                            </Button>
                        </div>
                    </div>
                </Modal>
                <div className="my-horizontal-div" style={{marginTop: 10, alignItems: 'center'}}>
                    <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>期数ID</div>
                        <Input value={phaseid} onChange={(e) => {
                            this.setState({phaseid: e.target.value})
                        }} style={{width: 200}}/>
                    </div>
                    <div className="my-horizontal-div margin-left10" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>期数名称</div>
                        <Input
                            placeholder="统一格式：第3期"
                            maxLength={10}
                            value={phasename} onChange={(e) => {
                            this.setState({phasename: e.target.value})
                        }} style={{width: 200}}/>
                    </div>
                </div>
                <div className="my-horizontal-div" style={{marginTop: 10, alignItems: 'center'}}>
                    <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>报名开始</div>
                        <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                            <RangePicker
                                format="YYYY-MM-DD"
                                placeholder={["开始时间", "结束时间"]}
                                onChange={this.onChangeDateStr}
                                style={{width: 250}}
                            />
                        </div>
                    </div>
                    <div className="my-horizontal-div margin-left10" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>报名截止</div>
                        <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                            <RangePicker
                                format="YYYY-MM-DD"
                                placeholder={["开始时间", "结束时间"]}
                                onChange={this.onChangeDateEnd}
                                style={{width: 250}}
                            />
                        </div>
                    </div>
                </div>
                <div className="my-horizontal-div" style={{marginTop: 10, alignItems: 'center'}}>
                    <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>正式开课</div>
                        <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                            <RangePicker
                                format="YYYY-MM-DD"
                                placeholder={["开始时间", "结束时间"]}
                                onChange={this.onChangeDateKk}
                                style={{width: 250}}
                            />
                        </div>
                    </div>
                    <div className="my-horizontal-div margin-left10" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>期数状态</div>
                        <Select defaultValue={'全部'} style={{width: 100}}
                                onChange={(e) => {
                                    this.setState({state: e})
                                }}>
                            <Option value={-1}>全部</Option>
                            <Option value={0}>新建中</Option>
                            <Option value={1}>已上架</Option>
                            <Option value={2}>已下架</Option>
                            <Option value={3}>已删除</Option>
                        </Select>
                    </div>
                    <div className="my-horizontal-div margin-left10" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>审核状态</div>
                        <Select defaultValue={'全部'} style={{width: 200}}
                                onChange={(e) => {
                                    this.setState({verifystate: e})
                                }}>
                            <Option value={-1}>全部</Option>
                            <Option value={0}>待提交</Option>
                            <Option value={1}>待产品审核</Option>
                            <Option value={2}>待财务审核</Option>
                            <Option value={3}>产品审核通过</Option>
                            <Option value={4}>财务审核通过</Option>
                            <Option value={5}>产品审核未通过</Option>
                            <Option value={6}>财务审核未通过</Option>
                        </Select>
                    </div>
                    <Button type='primary' className='margin-left10' style={{marginLeft: 20}}
                            onClick={this.chaxun}>查询</Button>
                    <Button type='primary' className='margin-left10'
                            onClick={() => {
                                showKechengEdit()
                                qishuData(undefined)
                                canEdit(false)
                                isChakan(false)
                                isXinjian(true)
                            }}>新建一期</Button>
                </div>
                <div className="margin-top10" style={{}}>
                    <Table bordered columns={columns} rowKey={record => record.id} pagination={false}
                           dataSource={getShoumaiList && getShoumaiList.object && getShoumaiList.object.rows ? getShoumaiList.object.rows : []}
                           className="table">
                    </Table>
                    <div className="margin-top10 my-div" style={{alignItems: 'center', flexDirection: 'column'}}>
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            showQuickJumper defaultCurrent={1}
                            pageSize={this.state.pageSize}
                            current={this.state.pageNo}
                            total={getShoumaiList != undefined && getShoumaiList.object ? getShoumaiList.object.rowCount : 0}
                            onChange={this.pageChange.bind(this)}
                            className="page"/>
                    </div>
                </div>
                <Modal
                    visible={this.state.rizhiVisible}
                    title="日志"
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                    footer={null}
                    width={500}>
                    <div style={{width: '100%', height: '60vh', overflow: 'scroll'}}>
                        <div>
                            {
                                this.props.gShowLog && this.props.gShowLog.object && this.props.gShowLog.object.length > 0 ?
                                    this.props.gShowLog.object.map(data => {
                                        return (
                                            <div>
                                                {
                                                    Format1(data.createTime, 'yyyy-MM-dd HH:mm:ss') + '   ' + data.logRemark
                                                }
                                            </div>
                                        )
                                    }) : '无'
                            }
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

    // state1上架2下架
    soldOut(id, type) {
        const {phaseUp2On} = this.props;
        phaseUp2On(id, type).then(data => {
            if (data.meta.code === '0') {
                this.getDate()
                if (type === 1) {
                    message.success('上架成功')
                } else {
                    message.success('下架成功')
                }
            } else {
                if (type === 1) {
                    Modal.error({
                        title: '错误提示',
                        content: data.meta.message && data.meta.message != '' ? data.meta.message : '上架失败',
                    });
                } else {
                    Modal.error({
                        title: '错误提示',
                        content: data.meta.message && data.meta.message != '' ? data.meta.message : '下架失败',
                    });
                }
            }
        })
    }

    // 删除期数 state 1 删除 2 恢复
    delIssue = (id, type) => {
        const {adminPhaseDelete} =this.props;
        adminPhaseDelete(id, type).then(data => {
            if (data.meta.code === '0') {
                this.getDate()
                if (type === 1) {
                    message.success('删除成功')
                } else {
                    message.success('恢复成功')
                }
            } else {
                if (type === 1) {
                    Modal.error({
                        title: '错误提示',
                        content: data.meta.message && data.meta.message != '' ? data.meta.message : '删除失败',
                    });
                } else {
                    Modal.error({
                        title: '错误提示',
                        content: data.meta.message && data.meta.message != '' ? data.meta.message : '恢复失败',
                    });
                }
            }
        })
    }

    // 确认按钮 这里增加药店
    handleOk1 = () => {
        this.setState({
            rizhiVisible: false,
        })
    }

    handleCancel1 = (e) => {
        this.setState({
            rizhiVisible: false,
        })
    }

    // 底部页数字改变
    pageChange(e) {
        this.state.pageNo = e;
        this.state.current = e;
        this.getDate()
    }

}

Shoumaifangshi.propTypes = {
    showKechengEdit: PropTypes.object.isRequired, // 方法
    qishuData: PropTypes.object.isRequired, // 方法
    canEdit: PropTypes.object.isRequired, // 方法
    isChakan: PropTypes.object.isRequired, // 方法
    isXinjian: PropTypes.object.isRequired, // 方法
}

function mapStateToProps(state, props) {
    return {
        getShoumaiList: state.getShoumaiList,
        gShowLog: state.gShowLog
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        shoumaiList: bindActionCreators(shoumaiList, dispatch),
        qishuXinxi: bindActionCreators(qishuXinxi, dispatch),
        updateQishu: bindActionCreators(updateQishu, dispatch),
        tijiaoshenhe: bindActionCreators(tijiaoshenhe, dispatch),
        cShowlog: bindActionCreators(cShowlog, dispatch),
        adminPhaseDelete: bindActionCreators(adminPhaseDelete, dispatch),
        phaseUp2On: bindActionCreators(phaseUp2On, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Shoumaifangshi);