import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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
  message,
  Popconfirm
} from "antd";
import moment from "moment";
import PageHeader from "../view/PageHeader";
import "../home.css";
import {
  GetDailyList,
  AddDaily,
  DelDaily,
  UpdateDaily,
  ExampleDown
} from "../../actions/meiriyiju";
import Http from "../../libs/utils/Http";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { TextArea } = Input;
const confirm = Modal.confirm;
const success = Modal.success;
const Option = Select.Option;
const { Content } = Layout;
const { Header } = Layout;
const { Footer } = Layout;

function Format(date, fmt) {
  //author: meizz
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
class Meiriyiju extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      current: 1,
      endDate: "",
      pageno: 1,
      pagesize: 20,
      phaseid: "",
      phasename: "",
      state: 0,
      strDate: "",
      verifystate: 0,
      loading: false,
      loading1: false,
      visible: false,
      visible1: false,
      movieName: "",
      juziDate: "",
      jingdiantaici: ""
    };
  }
  select = () => {
    const { GetDailyList } = this.props;
    GetDailyList(
      this.state.endDate,
      this.state.current,
      this.state.pagesize,
      this.state.phaseid,
      this.state.phasename,
      this.state.state,
      this.state.strDate,
      this.state.verifystate
    )
      .then(data => {
        if (data.meta.code == 0) {
        } else {
        }
      })
      .catch(e => {});
  };

  componentWillMount() {
    const { GetDailyList } = this.props;
    GetDailyList(
      this.state.endDate,
      this.state.pageno,
      this.state.pagesize,
      this.state.phaseid,
      this.state.phasename,
      this.state.state,
      this.state.strDate,
      this.state.verifystate
    )
      .then(data => {
        if (data.meta.code == 0) {
        } else {
          if (data.meta.message && data.meta.message != "") {
            Modal.error({
              title: "错误提示",
              content: data.meta.message
            });
          }
        }
      })
      .catch(e => {});
  }

  onChangeDate = (dates, dateString) => {
    this.setState({
      strDate: dateString[0],
      endDate: dateString[1]
    });
  };

  // 批量导入
  piliangdaoru = () => {
    this.refs.pldr.click();
  };
  handleImageUpload(e) {
    e.preventDefault();
    let file = e.target;
    Http.post(
      "/phase/adminUploadExcel",
      file,
      this.callback.bind(this),
      this.error
    );
  }
  error() {
    console.log("上传失败");
  }
  callback(result) {
    // console.log(result);
    if (result.meta.code === "0") {
      this.setState({
        current: 1
      });
      this.select();
      message.success("导入数据成功!");
    } else {
      Modal.error({
        title: "错误提示",
        content: result.meta.message
      });
    }
  }

  // 查询
  chaxun = () => {
    this.state.current = 1;
    // this.setState({
    //     current:1
    // })
    this.select();
  };

  onChange = page => {
    this.state.current = page;
    this.select();
  };
  // 删除
  delJuzi = date => {
    const { DelDaily } = this.props;
    let date2 = new Date();
    date2.setTime(date);
    let t = Format(date2, "yyyy-MM-dd");
    DelDaily(t, "", "")
      .then(data => {
        if (data.meta.code === "0") {
          this.select();
          message.success("删除成功!");
        } else {
        }
      })
      .catch(e => {});
  };

  render() {
    const { dailList, Daoru } = this.props;

    const {
      visible,
      visible1,
      loading,
      loading1,
      movieName,
      jingdiantaici
    } = this.state;
    const columns = [
      {
        title: "编号",
        dataIndex: "id",
        width: "20%",
        key: "id",
        render: (text, record, w) => {
          let i = ++w;
          return <span>{i}</span>;
        }
      },
      {
        title: "日期",
        dataIndex: "dailyDate",
        key: "dailyDate",
        width: "20%",
        render: (text, record) => {
          let date = new Date();
          date.setTime(record.dailyDate);
          let t = Format(date, "yyyy-MM-dd");
          return <span>{t}</span>;
        }
      },
      {
        title: "经典台词",
        dataIndex: "dialogue",
        key: "dialogue",
        width: "20%"
      },
      {
        title: "电影名",
        dataIndex: "movieName",
        key: "movieName",
        width: "20%"
      },

      {
        title: "操作",
        key: "action",
        width: "20%",
        render: (text, record, w) => {
          return (
            <span>
              <Button
                onClick={() =>
                  this.bianji(
                    record.dailyDate,
                    record.movieName,
                    record.dialogue,
                    w
                  )
                }
                type="primary"
              >
                编辑
              </Button>
              <Popconfirm
                title="确定要删除么?"
                onConfirm={() => this.delJuzi(record.dailyDate)}
              >
                <Button style={{ marginLeft: 10 }} type="primary">
                  删除
                </Button>
              </Popconfirm>
            </span>
          );
        }
      }
    ];

    return (
      <div style={{ padding: 15 }}>
        <PageHeader pageName={"每日一句"} />
        <div
          className="my-horizontal-div"
          style={{ marginTop: 24, alignItems: "center" }}
        >
          <div className="my-content-text ">日期:</div>
          <div className="my-horizontal-div margin-left10">
            <RangePicker
              format="YYYY-MM-DD"
              placeholder={["开始时间", "结束时间"]}
              onChange={this.onChangeDate}
              style={{ width: 320 }}
            />

            <Button
              onClick={this.chaxun}
              style={{ marginLeft: 10 }}
              type="primary"
            >
              查询
            </Button>
          </div>
        </div>

        <div
          className="my-horizontal-div"
          style={{ marginTop: 24, alignItems: "center" }}
        >
          <Button
            style={{ marginLeft: 10 }}
            onClick={this.showModal}
            type="primary"
          >
            新建句子
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={this.piliangdaoru}
            type="primary"
          >
            批量导入
          </Button>
          <input
            ref="pldr"
            style={{ display: "none" }}
            type="file"
            onChange={this.handleImageUpload.bind(this)}
          />
          <Button style={{ marginLeft: 10 }} onClick={()=>{
              window.open(this.props.getConfig&&this.props.getConfig.object&&this.props.getConfig.object.resource_daily_demo&&
              this.props.getConfig.object.resource_daily_demo!=''?(this.props.getConfig.object.resource_domain+this.props.getConfig.object.resource_daily_demo):'')
          }} type="primary">
            示例下载
          </Button>
        </div>

        <div className="content_" style={{ marginTop: 24 }}>
          <Table
            bordered
            columns={columns}
            showHeader={true}
            rowKey={record => record.id}
            pagination={false}
            dataSource={dailList && dailList.rows ? dailList.rows : []}
            className="table"
          />
        </div>

        <br />
        <Footer className="footer" style={{ backgroundColor: "white" }}>
          <Pagination
              showTotal={total => `共 ${total} 条`}
            pageSize={this.state.pagesize}
            className="page"
            showQuickJumper={false}
            current={this.state.current}
            onChange={this.onChange.bind(this)}
            total={dailList && dailList.rowCount ? dailList.rowCount : 0}
          />
        </Footer>

        {/* 新建句子模态框 */}
        <Modal
          visible={visible}
          title="新建句子"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              保存
            </Button>
          ]}
        >
          <div className="my-horizontal-div" style={{ alignItems: "center" }}>
            <div className="my-content-text my-input-before-text ">日期:</div>
            <div className="my-horizontal-div margin-left10">
              <DatePicker
                format="YYYY-MM-DD"
                // placeholder={["开始时间", "结束时间"]}
                onChange={this.xinjianjuziDate}
                style={{ width: 200 }}
              />
            </div>
          </div>
          <div
            className="my-horizontal-div"
            style={{ marginTop: 10, alignItems: "center" }}
          >
            <div className="my-content-text my-input-before-text ">电影名:</div>
            <div className="my-horizontal-div margin-left10">
              <Input
                  maxLength={15}
                value={movieName}
                onChange={e => {
                  this.setState({ movieName: e.target.value });
                }}
                style={{ width: 200 }}
              />
            </div>
          </div>
          <div
            className="my-horizontal-div"
            style={{ marginTop: 10, alignItems: "center" }}
          >
            <div className="my-content-text my-input-before-text ">
              经典台词:
            </div>
            <div className="my-horizontal-div margin-left10">
              <div style={{ minWidth: 200 }}>
                <TextArea
                    maxLength={62}
                  placeholder=""
                  rows={4}
                  value={jingdiantaici}
                  onChange={e => {
                    // console.log(e.target.value);
                    this.setState({ jingdiantaici: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>

        {/* 编辑句子模态框 */}
        <Modal
          visible={visible1}
          title="句子编辑"
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
          footer={[
            <Button key="back" onClick={this.handleCancel1}>
              取消
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading1}
              onClick={this.handleOk1}
            >
              保存
            </Button>
          ]}
        >
          <div className="my-horizontal-div" style={{ alignItems: "center" }}>
            <div className="my-content-text my-input-before-text ">日期:</div>
            <div className="my-horizontal-div margin-left10">
              <DatePicker
                value={moment(this.state.juziDate, "YYYY-MM-DD")}
                format="YYYY-MM-DD"
                // placeholder={["开始时间", "结束时间"]}
                onChange={this.xinjianjuziDate}
                style={{ width: 200 }}
              />
            </div>
          </div>
          <div
            className="my-horizontal-div"
            style={{ marginTop: 10, alignItems: "center" }}
          >
            <div className="my-content-text my-input-before-text ">电影名:</div>
            <div className="my-horizontal-div margin-left10">
              <Input
                  maxLength={18}
                value={movieName}
                onChange={e => {
                  this.setState({ movieName: e.target.value });
                }}
                style={{ width: 200 }}
              />
            </div>
          </div>
          <div
            className="my-horizontal-div"
            style={{ marginTop: 10, alignItems: "center" }}
          >
            <div className="my-content-text my-input-before-text ">
              经典台词:
            </div>
            <div className="my-horizontal-div margin-left10">
              <div style={{ minWidth: 200 }}>
                <TextArea
                    maxLength={72}
                  placeholder=""
                  rows={4}
                  value={jingdiantaici}
                  onChange={e => {
                    // console.log(e.target.value);
                    this.setState({ jingdiantaici: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  // 示例下载
  exampleDown = () =>{
   const { ExampleDown } = this.props;
   ExampleDown().then( data=>{
     if(data.meta.code === '0'){
        let url = data.object.resource_domain + data.object.resource_daily_demo;
        window.open(url);
     }else{

     }
   }).catch(e=>{})
  }

  bianji = (date, dianying, taici) => {
    let date1 = new Date();
    date1.setTime(date);
    let t = Format(date1, "yyyy-MM-dd");
    this.setState({
      visible1: true,
      juziDate: t,
      movieName: dianying,
      jingdiantaici: taici
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  xinjianjuziDate = (e, value) => {
    // console.log(value);
    this.setState({
      juziDate: value
    });
  };
  handleOk = () => {
    const { AddDaily, GetDailyList } = this.props;
    AddDaily(
      this.state.juziDate,
      this.state.movieName,
      this.state.jingdiantaici
    )
      .then(data => {
        if (data.meta.code === "0") {
          message.success("添加成功!");
          this.select();
          // GetDailyList(
          //   this.state.endDate,
          //   this.state.pageno,
          //   this.state.pagesize,
          //   this.state.phaseid,
          //   this.state.phasename,
          //   this.state.state,
          //   this.state.strDate,
          //   this.state.verifystate
          // )
          //   .then(data => {
          //     if (data.meta.code == 0) {
          //     } else {
          //     }
          //   })
          //   .catch(e => {});
        } else {
          message.error(data.meta.message);
          this.handleCancel();
        }
      })
      .catch(e => {});
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 500);
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      juziDate: "",
      movieName: "",
      jingdiantaici: ""
    });
  };
  // 编辑句子
  handleOk1 = () => {
    const { UpdateDaily } = this.props;
    UpdateDaily(
      this.state.juziDate,
      this.state.movieName,
      this.state.jingdiantaici
    )
      .then(data => {
        if (data.meta.code === "0") {
          this.select();
          message.success("修改成功!");
        } else {
        }
      })
      .catch(e => {});
    this.setState({ loading1: true });
    setTimeout(() => {
      this.setState({ loading1: false, visible1: false });
    }, 500);
  };
  handleCancel1 = () => {
    this.setState({
      visible1: false,
      juziDate: "",
      movieName: "",
      jingdiantaici: ""
    });
  };
}

function mapStateToProps(state, props) {
  return {
    dailList: state.GetDailyList.object,
      getConfig: state.getConfig
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    GetDailyList: bindActionCreators(GetDailyList, dispatch),
    AddDaily: bindActionCreators(AddDaily, dispatch),
    DelDaily: bindActionCreators(DelDaily, dispatch),
    UpdateDaily: bindActionCreators(UpdateDaily, dispatch),
    ExampleDown: bindActionCreators(ExampleDown, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Meiriyiju);
