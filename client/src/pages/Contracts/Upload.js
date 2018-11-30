import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Grid, Row, Col } from 'react-bootstrap';
import 'codemirror/lib/codemirror.css';

import cookie from 'react-cookies';
import Dialog from 'react-bootstrap-dialog';

import compose from "recompose/compose"
import {connect} from "react-redux"
import { FormattedMessage } from 'react-intl';
import {tableOperations, tableSelectors} from "state/redux/tables/"

require('codemirror/mode/javascript/javascript');



const {
  uploadContract

} = tableOperations

const {
  uploadContractSelector

} = tableSelectors


export  class Upload extends Component {
  static displayName = 'Upload';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChange = (editor, data, value) => {
    this.setState({
      value,
    });
  };

  renderCodeMirror = () => {
    const options = {
      mode: 'javascript',
      lineNumbers: true,
      tabSize: '2',
    };

    return (
      <CodeMirror
        value={this.state.value}
        options={options}
        onChange={this.onChange}
      />
    );
  };

  submint =async() =>{
    let value = '';
    if(this.state.value.indexOf('\n') !=-1) {
       value=this.state.value.replace(/\n/g,"<br>");
    }else{
      value = this.state.value
    }
    await this.props.getuploadContract(cookie.load("changechain"), this.props.id, value)
    if (this.props.uploadContract.message == "success") {
      alert("上传成功")
      this.props.close()
      window.location.reload()
    }else {
      alert("上传失败")
    }
  }
  close = () =>{
    this.props.close()
  }
  render() {
    return (
      <IceContainer>
        <Row wrap>
          <Col l="24" xxs="24">
            {this.renderCodeMirror()}
          </Col>
        </Row>
        <Row>
          <div className = "button">
            <button className="cliockbutton" onClick = {() => this.submint()}>
               <FormattedMessage
                id="page.localeProvider.submit"
                defaultMessage='Submit'
                description='Submit'
              />
            </button>
            <button className="cliockbutton" onClick = {() => this.close()}> 
               <FormattedMessage
                id="page.localeProvider.close"
                defaultMessage='Close'
                description='Close'
              />
            </button>
          </div>
        </Row>
        <Dialog ref={(el) => { this.dialog = el }} />
      </IceContainer>
    );
  }
}

export default compose(
  connect(
    state => ({
      uploadContract : uploadContractSelector(state)
    }),
    {
      getuploadContract : uploadContract
    }
  )
)(Upload)