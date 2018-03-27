import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import PageHeader from "../view/PageHeader";
import {
    Row,
    Col,
    Button,
    Upload,
    message,
    Select,
    Input,
    DatePicker,
    Table,
    Icon,
    Form,
    Modal,
    Pagination,
    Layout,
    Divider,
    Checkbox,
} from "antd";
import "../home.css";
import {imageUrl} from "../../libs/utils/ImageUtils";
import Http from "../../libs/utils/Http";
import PropTypes from "prop-types";
import {shoumaiList, qishuXinxi, addQishu, allShenhetongguoClass,updateQishu,shenhe} from '../shoumaifangshishenhe/ShouMaiAction'
import {priceYuan2Fen,priceFen2Yuan} from '../../libs/utils/PriceUtils'
import {
    AddCourse, CourseSubmitShenHe, DelSection, DelSectionState,
    GetLevelCourse, GetSectionInfo, GetSectionList, UpdateSection, getLevelList,
} from '../../actions/course'
import KechengEdit from '../kecheng/KechengEdit1'

const Option = Select.Option;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;
const {TextArea} = Input;

function Format(dateLong, fmt) { //author: meizz
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



// 课程编辑
class QishuShenhe extends Component {
    constructor(props, context) {
        super(props);
        let dataP = this.props.qishuData;
        console.log(dataP)
        let begindate = dataP!=undefined&&dataP.classBeginDate&&dataP.classBeginDate!=''?dataP.classBeginDate:undefined;
        let regenddate = dataP!=undefined&&dataP.regEndDate&&dataP.regEndDate!=''?dataP.regEndDate:undefined;
        let regstrdate = dataP!=undefined&&dataP.regBeginDate&&dataP.regBeginDate!=''?dataP.regBeginDate:undefined;
        let begindate1 = '';
        let regenddate1 = '';
        let regstrdate1 = '';
        if (begindate) {
            begindate1 = Format(begindate, 'yyyy-MM-dd')
        }
        if (regenddate) {
            regenddate1 = Format(regenddate, 'yyyy-MM-dd HH:mm:ss')
        }
        if (regstrdate) {
            regstrdate1 = Format(regstrdate, 'yyyy-MM-dd HH:mm:ss') // YYYY-MM-DD hh:mm:ss
        }
        this.state = {
            startendOpen: false,
            begindate: begindate1,// 开课时间
            "discount_price": ''+(dataP!=undefined?dataP.discountPrice?priceFen2Yuan(dataP.discountPrice):'':''), // 价格
            "guide_url": dataP!=undefined&&dataP.guideUrl&&dataP.guideUrl!=''?dataP.guideUrl:'',
            "id":  dataP!=undefined&&dataP.phaseId?dataP.phaseId:-1,
            "idlist": dataP!=undefined&&dataP.idlist&&dataP.idlist!=''?dataP.idlist:[],
            "introurl1": dataP!=undefined&&dataP.introduceImg1Path&&dataP.introduceImg1Path!=''?dataP.introduceImg1Path:'',
            "introurl10": dataP!=undefined&&dataP.introduceImg10Path&&dataP.introduceImg10Path!=''?dataP.introduceImg10Path:'',
            "introurl2": dataP!=undefined&&dataP.introduceImg2Path&&dataP.introduceImg2Path!=''?dataP.introduceImg2Path:'',
            "introurl3": dataP!=undefined&&dataP.introduceImg3Path&&dataP.introduceImg3Path!=''?dataP.introduceImg3Path:'',
            "introurl4": dataP!=undefined&&dataP.introduceImg4Path&&dataP.introduceImg4Path!=''?dataP.introduceImg4Path:'',
            "introurl5": dataP!=undefined&&dataP.introduceImg5Path&&dataP.introduceImg5Path!=''?dataP.introduceImg5Path:'',
            "introurl6": dataP!=undefined&&dataP.introduceImg6Path&&dataP.introduceImg6Path!=''?dataP.introduceImg6Path:'',
            "introurl7": dataP!=undefined&&dataP.introduceImg7Path&&dataP.introduceImg7Path!=''?dataP.introduceImg7Path:'',
            "introurl8": dataP!=undefined&&dataP.introduceImg8Path&&dataP.introduceImg8Path!=''?dataP.introduceImg8Path:'',
            "introurl9": dataP!=undefined&&dataP.introduceImg9Path&&dataP.introduceImg9Path!=''?dataP.introduceImg9Path:'',
            "name": dataP!=undefined&&dataP.phaseName&&dataP.phaseName!=''?dataP.phaseName:'',
            "name1": dataP!=undefined&&dataP.phaseName&&dataP.phaseName!=''?dataP.phaseName:'',
            "original_price": ''+(dataP!=undefined?dataP.originalPrice&&dataP.originalPrice!=''?priceFen2Yuan(dataP.originalPrice):'':''), // 原价
            "qaurl1": dataP!=undefined&&dataP.qaImg1Path&&dataP.qaImg1Path!=''?dataP.qaImg1Path:'',
            "qaurl10": dataP!=undefined&&dataP.qaImg10Path&&dataP.qaImg10Path!=''?dataP.qaImg10Path:'',
            "qaurl2": dataP!=undefined&&dataP.qaImg2Path&&dataP.qaImg2Path!=''?dataP.qaImg2Path:'',
            "qaurl3": dataP!=undefined&&dataP.qaImg3Path&&dataP.qaImg3Path!=''?dataP.qaImg3Path:'',
            "qaurl4": dataP!=undefined&&dataP.qaImg4Path&&dataP.qaImg4Path!=''?dataP.qaImg4Path:'',
            "qaurl5": dataP!=undefined&&dataP.qaImg5Path&&dataP.qaImg5Path!=''?dataP.qaImg5Path:'',
            "qaurl6": dataP!=undefined&&dataP.qaImg6Path&&dataP.qaImg6Path!=''?dataP.qaImg6Path:'',
            "qaurl7": dataP!=undefined&&dataP.qaImg7Path&&dataP.qaImg7Path!=''?dataP.qaImg7Path:'',
            "qaurl8": dataP!=undefined&&dataP.qaImg8Path&&dataP.qaImg8Path!=''?dataP.qaImg8Path:'',
            "qaurl9": dataP!=undefined&&dataP.qaImg9Path&&dataP.qaImg9Path!=''?dataP.qaImg9Path:'',
            "regenddate":regenddate1 ,// 报名截止
            "regstrdate": regstrdate1,// 报名开始
            "titleimg": dataP&&dataP.titleImgPath&&dataP.titleImgPath!=''?dataP.titleImgPath:'',
            bianjiKecheng: [],

            shenheYijian: '',// 审核意见
            xiaojieVisible: false,// 是否展示小节model
            levelid:0,
            qishuData:undefined,
        };
    }

    // 获取期数信息
    getQishuXinxi = (phaseId) => {
        const {qishuXinxi} = this.props;
        qishuXinxi(phaseId).then((data) => {
            if(data.meta.code==='0'){
                this.setState({
                    idlist:data.object?data.object.course?data.object.course:[]:[],
                })
            }
            this.getLevelListM()
        })

    }

    componentWillMount() {
        if(this.state.id!=-1){
            this.getQishuXinxi(this.state.id)
        }else {
            this.getLevelListM()
        }
    }

    // 获取课程等级
    getLevelListM = () => {
        const {getLevelList, GetLevelCourse, levelid} = this.props;
        getLevelList().then(data => {
            if (data.meta.code === '0') {
                // {
                //     name: '系统课程level0',
                //         key: '1',
                //     checked: false,
                //     disable: true,
                //     selectedValue:-1,
                // }
                let b1 = []
                for(let i of data.object){
                    let b = {}
                    b.name = i.levelName;
                    b.key = i.levelId;
                    b.checked = false;
                    b.disable = true;
                    b.selectedValue = -1;
                    b1.push(b)
                }
                this.setState({
                    bianjiKecheng:b1
                })
                setTimeout(() => {
                    this.getAllClass()
                }, 100)
            }
        })
    }

    // 获取所有审核通过课程
    getAllClass = () => {
        const {allShenhetongguoClass} = this.props;
        const {idlist} = this.state;
        allShenhetongguoClass().then(data=>{
            if(data.meta.code==='0'){
                let b = this.state.bianjiKecheng;
                for(let bianji in this.state.bianjiKecheng){
                    let bian = b[bianji];
                    if(data.object['' + (b[bianji].key)]&&data.object['' + (b[bianji].key)].length>0){
                        bian.selectedValue = data.object['' + (b[bianji].key)][0].id
                        bian.qishuData = data.object['' + (b[bianji].key)][0]
                        b[b] = bian;
                    }
                }
                if(idlist&&idlist.length!=0){
                    for (let id of idlist){
                        for(let bin in b){
                            let bi = b[bin]
                            if(bi.selectedValue == id){
                                bi.checked = true;
                                b[bin] = bi;
                            }
                        }
                    }
                }
                this.setState({
                    bianjiKecheng:b,
                })
            }
        })
    }


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

    handleImageUpload(field, e) {
        e.preventDefault()
        let file = e.target
        // todo
        Http.post("/admin/testupload", file, this.callback.bind(this, field), this.error)
    }

    error() {
        console.log('上传失败')
    }

    callback(field, result) {
        console.log(result)
        if (result.meta.code === '0') { // 设置相应老师的头像
            this.setState({
                [field]: result.object,
            })
        }
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    render() {
        const {
            startendOpen,
            name,
            guide_url,
            idlist,
            introurl1, introurl2, introurl3, introurl4, introurl5, introurl6, introurl7, introurl8, introurl9, introurl10,
            original_price, discount_price,
            qaurl1, qaurl2, qaurl3, qaurl4, qaurl5, qaurl6, qaurl7, qaurl8, qaurl9, qaurl10,
            titleimg, bianjiKecheng,levelid,qishuData
        } = this.state;

        const {getAllclassList, history, showKechengEdit,canShenhe,canEdit} = this.props;

        return (
            <div style={{padding: 15}}>
                <PageHeader
                    pageName={"期数审核"}
                    showBack={true}
                    backM={() => {
                        showKechengEdit();
                    }}
                />
                {/* 期数名称 */}
                <div
                    className="my-horizontal-div"
                    style={{marginTop: 24, alignItems: "center"}}
                >
                    <div style={{width: 100}} className="my-content-text margin-left10 ">
                        期数名称:
                    </div>
                    <div className="my-horizontal-div margin-left10">
                        <Input
                            disabled={canEdit}
                            value={name}
                            onChange={e => {
                                this.setState({name: e.target.value});
                            }}
                            style={{width: 200}}
                        />
                    </div>
                </div>

                <div
                    className="my-horizontal-div"
                    style={{marginTop: 24, alignItems: "center"}}
                >
                    <div style={{width: 100}} className="my-content-text margin-left10 ">
                        报名日期:
                    </div>
                    <div className="my-horizontal-div margin-left10" style={{alignItems: 'center'}}>
                        <DatePicker
                            disabled={canEdit}
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder={this.state.regstrdate!=''?this.state.regstrdate:"开始时间"}
                            style={{width: 200}}
                            onChange={this.onChangeDate.bind(this, 'regstrdate')}
                            onOpenChange={this.handleStartOpenChange.bind(this, 'startendOpen')}
                        />
                        <div style={{padding: 5}}>至</div>
                        <DatePicker
                            disabled={canEdit}
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder={this.state.regenddate!=''?this.state.regenddate:"结束时间"}
                            style={{width: 200}}
                            onChange={this.onChangeDate.bind(this, 'regenddate')}
                            open={startendOpen}
                            onOpenChange={this.handleEndOpenChange.bind(this, 'startendOpen')}
                        />
                    </div>
                </div>

                <div
                    className="my-horizontal-div"
                    style={{marginTop: 24, alignItems: "center"}}
                >
                    <div
                        style={{width: 100}}
                        className="my-content-text margin-left10  "
                    >
                        正式开课日期:
                    </div>
                    <div className="my-horizontal-div margin-left10">
                        <DatePicker
                            disabled={canEdit}
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder={this.state.begindate!=''?this.state.begindate:"选择时间"}
                            onChange={this.onChangeDate.bind(this, 'begindate')}
                            style={{width: 200}}
                        />
                    </div>
                </div>
                {/* 图片上传 */}
                <div style={{
                    border: "1px dashed #ccc",
                    margin: "24px 10px", padding: 30,
                }}>
                    <div className="my-content-text">本期头图</div>
                    <div className="my-horizontal-div margin-top10" style={{justifyContent: 'space-between'}}>
                        <div style={{width: '45%',}}>
                            {
                                titleimg != '' ?
                                    <div className="my-horizontal-div">
                                        <div  style={{width: '100%',}}>
                                            <img src={imageUrl(titleimg)} style={{width: '100%', height: 'auto'}}/>
                                        </div>
                                    </div> : null
                            }
                        </div>
                    </div>
                    <div className="my-content-text margin-top10">课程介绍</div>
                    <div className="my-horizontal-div margin-top10" style={{justifyContent: 'space-between'}}>
                        <div style={{width: '45%',}}>
                            {
                                introurl1 != '' ?
                                    <div className="my-horizontal-div">
                                        <div  style={{width: '100%',}}>
                                            <img src={imageUrl(introurl1)} style={{width: '100%', height: 'auto'}}/>
                                        </div>
                                    </div> : null
                            }{
                            introurl2 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(introurl2)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            introurl3 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(introurl3)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            introurl4 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(introurl4)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            introurl5 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(introurl5)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            introurl6 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(introurl6)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            introurl7 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(introurl7)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            introurl8 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(introurl8)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            introurl9 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(introurl9)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            introurl10 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(introurl10)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }
                        </div>
                    </div>
                    <div className="my-content-text margin-top10">常见问题</div>
                    <div className="my-horizontal-div margin-top10" style={{justifyContent: 'space-between'}}>
                        <div style={{width: '45%',}}>
                            {
                                qaurl1 != '' ?
                                    <div className="my-horizontal-div">
                                        <div  style={{width: '100%',}}>
                                            <img src={imageUrl(qaurl1)} style={{width: '100%', height: 'auto'}}/>
                                        </div>
                                    </div> : null
                            }{
                            qaurl2 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(qaurl2)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            qaurl3 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(qaurl3)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            qaurl4 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(qaurl4)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            qaurl5 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(qaurl5)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            qaurl6 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(qaurl6)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            qaurl7 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(qaurl7)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            qaurl8 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(qaurl8)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            qaurl9 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(qaurl9)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }{
                            qaurl10 != '' ?
                                <div className="my-horizontal-div">
                                    <div  style={{width: '100%',}}>
                                        <img src={imageUrl(qaurl10)} style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                </div> : null
                        }
                        </div>
                    </div>
                </div>
                {/* 入学指南 */}
                <div
                    className="my-horizontal-div shenhe-div"
                    style={{marginTop: 30, alignItems: "center", paddingBottom: 20, paddingTop: 30}}
                >
                    <div style={{width: 100}} className="my-content-text margin-left10 ">
                        入学指南:
                    </div>
                    <div className="my-horizontal-div margin-left10">
                        <Input
                            disabled={canEdit}
                            value={guide_url}
                            onChange={e => {
                                this.setState({guide_url: e.target.value});
                            }}
                            style={{width: 500}}
                        />
                    </div>
                </div>
                {/* 选择本期包含课程 */}
                <div
                    className="shenhe-div"
                    style={{alignItems: "center",paddingLeft:10}}
                >
                    <div className="my-title-text">
                        配置课程
                    </div>
                    <div className="my-horizontal-div margin-top10">
                        <div className="my-content-text" style={{width: 200}}>课程名</div>
                        <div className="my-content-text" style={{marginLeft: 20,width:150}}>版本</div>
                        <div className="my-content-text" style={{marginLeft: 20}}>操作</div>
                    </div>
                    <div>
                        {
                            bianjiKecheng.map((bianji, w) => {
                                if(!bianji.checked){
                                    return null
                                }
                                return (
                                    <div className="my-horizontal-div margin-top10" style={{alignItems: 'center'}}>
                                        <div className="my-content-text" style={{width: 200}}>
                                            <Checkbox checked={bianji.checked}
                                                      disabled
                                                      onChange={() => {
                                                          let b = bianjiKecheng;
                                                          bianji.checked = !bianji.checked;
                                                          b[w] = bianji;
                                                          this.setState({
                                                              bianjiKecheng:b,
                                                          })
                                                      }}><span style={{color:'#666'}}>{bianji.name}</span></Checkbox>
                                        </div>
                                        <div className="my-content-text" style={{marginLeft: 20,}}>
                                            {
                                                getAllclassList.object['' + (bianji.key)] ?
                                                    <Select
                                                        disabled
                                                        defaultValue={
                                                            getAllclassList.object['' + (bianji.key)] != undefined && getAllclassList.object['' + (bianji.key)].length > 0 ?
                                                                getAllclassList.object['' + (bianji.key)][0].vresionname : '暂无'
                                                        }
                                                        style={{width: 150,color:'#666'}}
                                                        onChange={(e) => {
                                                            let b = bianjiKecheng;
                                                            bianji.selectedValue = e.id;
                                                            bianji.qishuData = e;
                                                            b[w] = bianji;
                                                            this.setState({
                                                                bianjiKecheng:b,
                                                            })
                                                        }}>
                                                        {
                                                            getAllclassList.object['' + (bianji.key)] ? getAllclassList.object['' + (bianji.key)].map((cClass) => {
                                                                return (
                                                                    <Option
                                                                        value={cClass}>{cClass.vresionname}</Option>
                                                                )
                                                            }) : null
                                                        }
                                                    </Select>
                                                    : <div className="ant-select ant-select-disabled"
                                                           style={{
                                                               width: 150,
                                                               borderStyle: 'solid',
                                                               borderWidth: 1,
                                                               borderRadius: 5,
                                                               background:'#f5f5f5',
                                                               padding: 5,
                                                               paddingLeft: 10,
                                                               color:'#666',
                                                               borderColor: 'rgba(0, 0, 0, 0.20)'
                                                           }}>
                                                    暂无
                                                </div>
                                            }
                                        </div>
                                        <div style={{marginLeft: 20,}}>
                                            {
                                                getAllclassList.object['' + (bianji.key)]&&getAllclassList.object['' + (bianji.key)].length>0?
                                                    <Button type="primary" onClick={()=>{
                                                        this.setState({
                                                            levelid:bianji.key,
                                                            qishuData:bianji.qishuData,
                                                            xiaojieVisible:true,
                                                        })
                                                    }}>
                                                        查看
                                                    </Button>
                                                    :null
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Modal
                    visible={this.state.xiaojieVisible}
                    title="版本详情"
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel}
                    footer={null}
                    style={{ top: '5vh' }}
                    width={800}>
                    <div style={{width:'100%',height:'75vh',overflow:'scroll'}}>
                        {
                            this.state.xiaojieVisible?
                                <KechengEdit levelid={levelid} qishuData={qishuData} canEdit={false}/>
                                :null
                        }
                    </div>
                </Modal>
                <div
                    className="shenhe-div"
                    style={{alignItems: "center",paddingLeft:10}}
                >
                    <div className="my-title-text">
                        配置价格
                    </div>
                    <div className="my-horizontal-div">
                        <div
                            className="my-horizontal-div"
                            style={{marginTop: 24, alignItems: "center"}}
                        >
                            <div style={{width: 100}} className="my-content-text">
                                价格(单位:元):
                            </div>
                            <div className="my-horizontal-div margin-left10">
                                <Input
                                    disabled={canEdit}
                                    value={discount_price+''}
                                    onChange={e => {
                                        let qianbaoCoin = e.target.value?e.target.value:'';
                                        qianbaoCoin = qianbaoCoin.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
                                        qianbaoCoin = qianbaoCoin.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
                                        qianbaoCoin = qianbaoCoin.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
                                        this.setState({
                                            discount_price:qianbaoCoin,
                                        })
                                    }}
                                    style={{width: 200}}
                                />
                            </div>
                        </div>
                        <div
                            className="my-horizontal-div"
                            style={{marginTop: 24, alignItems: "center",marginLeft:20}}
                        >
                            <div style={{width: 100}} className="my-content-text margin-left20 ">
                                原价(单位:元):
                            </div>
                            <div className="my-horizontal-div margin-left10">
                                <Input
                                    disabled={canEdit}
                                    value={original_price+''}
                                    onChange={e => {
                                        let qianbaoCoin = e.target.value?e.target.value:'';
                                        qianbaoCoin = qianbaoCoin.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
                                        qianbaoCoin = qianbaoCoin.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
                                        qianbaoCoin = qianbaoCoin.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
                                        this.setState({
                                            original_price:qianbaoCoin,
                                        })
                                    }}
                                    style={{width: 200}}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="my-horizontal-div"
                        style={{marginTop: 24, alignItems: "center"}}
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
                </div>
                {
                    !canShenhe?
                        <div
                            className="shenhe-div"
                            style={{alignItems: "center",paddingBottom:200,paddingLeft:10}}
                        >
                            <div>
                                <div className="my-title-text">
                                    审核意见
                                </div>
                                <TextArea
                                    disabled={canShenhe}
                                    value={this.state.shenheYijian}
                                    onChange={(e)=>{
                                        this.setState({
                                            shenheYijian:e.target.value,
                                        })
                                    }}
                                    style={{width:'60%',marginTop:10}}
                                    rows={4} />
                            </div>
                            <div className="margin-top10 my-horizontal-div">
                                <Button disabled={canShenhe} onClick={()=>{this.editXiaojie(0)}} type="primary" style={{width:150,marginTop:20,}}>
                                    通过
                                </Button>
                                <Button disabled={canShenhe} onClick={()=>{this.editXiaojie(1)}} type="danger" style={{width:150,marginTop:20,marginLeft:20}}>
                                    驳回
                                </Button>
                            </div>
                        </div>
                        :null
                }
            </div>
        );
    }

    // 确认按钮 这里增加药店
    handleOk1 = () => {
        this.setState({
            xiaojieVisible: false,
        })
    }

    handleCancel = (e) => {
        this.setState({
            xiaojieVisible: false,
        })
    }

    // 编辑小节
    editXiaojie = (state) => {
        const {
            shenheYijian,id
        } = this.state;
        const {shenhe,showKechengEdit,shenheType} = this.props;
        if(state===1&&shenheYijian===''){
            Modal.error({
                title:'提示',
                content:'驳回必须填写意见',
            });
            return
        }
        shenhe(id,shenheType,state,shenheYijian).then((data)=>{
            if(data.meta.code==='0'){
                message.success('提交成功')
                showKechengEdit()
            }else {
                Modal.error({
                    title:'错误提示',
                    content:data.meta.message&&data.meta.message!=''?data.meta.message:'提交失败',
                });
            }
        }).catch(e=>{console.log(e)})
    };

    handleOk = () => {
        this.setState({
            xiaojieVisible: false
        });
    };
}

QishuShenhe.propTypes = {
    showKechengEdit: PropTypes.object.isRequired, // 方法
    canEdit: PropTypes.object.isRequired, // 可编辑
    canShenhe: PropTypes.object.isRequired, // 方法
    qishuData: PropTypes.object.isRequired, // 方法
    shenheType: PropTypes.object.isRequired, // type 1产品审核2财务审核
};

function mapStateToProps(state, props) {
    return {
        getAllclassList: state.getAllclassList,
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        qishuXinxi: bindActionCreators(qishuXinxi, dispatch),
        updateQishu: bindActionCreators(updateQishu, dispatch),
        addQishu: bindActionCreators(addQishu, dispatch),
        allShenhetongguoClass: bindActionCreators(allShenhetongguoClass, dispatch),
        shenhe: bindActionCreators(shenhe, dispatch),
        getLevelList: bindActionCreators(getLevelList, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QishuShenhe);
