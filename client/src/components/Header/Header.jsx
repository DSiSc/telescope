/* eslint no-lonely-if: 0, no-shadow:0 */
import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import HeaderLinks from './HeaderLinks';
import routerConfig from '../../routerConfig';

import { IntlProvider, addLocaleData ,FormattedMessage} from 'react-intl';
import cookie from 'react-cookies';

function getLocale(lang) {
  let result = {};
  switch (lang) {
    case 'zh-CN':
      result = require('./locales/zh-Hans');
      break;
    case 'en-US':
      result = require('./locales/en-US');
      break;
    default:
      result = require('./locales/en-US');
  }

  return result.default || result;
}


class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false,
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true,
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle('nav-open');
    const node = document.createElement('div');
    node.id = 'bodyClick';
    node.onclick = () => {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle('nav-open');
    };
    document.body.appendChild(node);
  }
  getBrand() {
    let name;
    routerConfig.map((prop) => {
      if (prop.collapse) {
        prop.views.map((prop) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    let pathname;
    switch(name) {
      case "Dashboard" : pathname = 
        <FormattedMessage
          id="page.localeProvider.dashboard"
          defaultMessage="Dashboard"
          description="Dashboard"
        />;break;
      case "Nodes" : pathname = 
        <FormattedMessage
          id="page.localeProvider.nodes"
          defaultMessage="Nodes"
          description="Nodes"
        />;break;
        case "Blocks" : pathname = 
        <FormattedMessage
          id="page.localeProvider.blocks"
          defaultMessage="Blocks"
          description="Blocks"
        />;break;
        case "Chains" : pathname = 
        <FormattedMessage
          id="page.localeProvider.chains"
          defaultMessage="Chains"
          description="Chains"
        />;break;
        case "Contracts" : pathname = 
        <FormattedMessage
          id="page.localeProvider.contracts"
          defaultMessage="Contracts"
          description="Contracts"
        />;break;
        case "Transactions" : pathname = 
        <FormattedMessage
          id="page.localeProvider.transactions"
          defaultMessage="Transactions"
          description="Transactions"
        />;break;
      default : break;


    }

    return pathname;
  }
  render() {
    const appLocale = getLocale(cookie.load("language"));
    addLocaleData(...appLocale.data);
    return (
      <Navbar fluid>
        <Navbar.Header>
          <IntlProvider
            locale={appLocale.locale}
            messages={appLocale.messages}
            formats={appLocale.formats}
          >
            <Navbar.Brand>
              <a href="#pablo">{this.getBrand()}</a>
            </Navbar.Brand>
          </IntlProvider>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <HeaderLinks />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
