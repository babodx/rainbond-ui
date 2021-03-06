import React, { PureComponent, Fragment } from "react";
import { Row, Col, Button, Modal, Dropdown, Menu, Table, Card, Alert, Tooltip } from "antd";
import { connect } from "dva";
import { Link } from "dva/router";
import DescriptionList from "../../components/DescriptionList";
import globalUtil from "../../utils/global";

const { Description } = DescriptionList;

/*
  access_type : no_port|无端口、
                http_port|http协议，可以对外访问 、
                not_http_outer|非http、
                可以对外访问的、
                not_http_inner|非http对内，如mysql,
                http_inner| http对内
*/

// @connect(({ user, appControl, global }) => ({ visitInfo: appControl.visitInfo }))
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleClickLink = (item) => {
    window.open(item.key);
  };
  renderHttpPort = (visitInfo) => {
    const { showModal } = this.state;
    const links = visitInfo.map((item)=>{
      return {url:item.access_info[0].access_urls,service_cname:item.access_info[0].service_cname}
    })
    if (links.length === 1) {
      return (
        <Tooltip title="跳转到应用对外访问端口对应的域名地址">
          <Button type="primary"
            onClick={() => {
              window.open(links[0].url);
            }}
          >
            访问
          </Button>
        </Tooltip>
      );
    } 
    return (
      <Tooltip 
      placement="topLeft"
      arrowPointAtCenter
      title="跳转到应用对外访问端口对应的域名地址">
        <Dropdown
          overlay={
            <Menu>
              {links.map(item => <Menu.Item key={item}>
                <a target="_blank" href={item.url}>{item.service_cname} </a>
              </Menu.Item>)}
            </Menu>
            }
          placement="bottomRight"
        >
          <Button type="primary">
                访问
          </Button>
        </Dropdown>
      </Tooltip>
    );
  };

  render() {
    const { linkList } = this.props;
    return this.renderHttpPort(linkList);
  }
}
