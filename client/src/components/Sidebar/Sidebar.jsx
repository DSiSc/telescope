import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import imagine from 'assets/img/bg-index.jpg';
import logo from 'assets/img/jsta.png';

import HeaderLinks from '../Header/HeaderLinks.jsx';

import asideMenuConfig from '../../menuConfig';

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

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }
  render() {
    const sidebarBackground = {
      backgroundImage: `url(${imagine})`,
    };
    const appLocale = getLocale(cookie.load("language"));
    addLocaleData(...appLocale.data);

    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="black"
        data-image={imagine}
      >
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo">
          <a href="#/" className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a href="#/" className="simple-text logo-normal">
            Justitia 
          </a>
        </div>
        <div className="sidebar-wrapper">
          <IntlProvider
            locale={appLocale.locale}
            messages={appLocale.messages}
            formats={appLocale.formats}
          >
            <ul className="nav">
              {this.state.width <= 991 ? <HeaderLinks /> : null}
              {asideMenuConfig.map((prop, key) => {
                if (!prop.redirect) {
                  return (
                    <li
                      className={
                        prop.upgrade
                          ? 'active active-pro'
                          : this.activeRoute(prop.path)
                      }
                      key={key}
                    >
                      <NavLink
                        to={prop.path}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <p>{prop.name =='Dashboard' ?(
                        <FormattedMessage
                          id="page.localeProvider.dashboard"
                          defaultMessage="DASHBOARD"
                          description="DASHBOARD"
                        />) : ('')}</p>
                        <p>{prop.name =='Blocks' ?(
                        <FormattedMessage
                          id="page.localeProvider.blocks"
                          defaultMessage="Blocks"
                          description="Blocks"
                        />) : ('')}</p>
                        <p>{prop.name =='Nodes' ?(
                        <FormattedMessage
                          id="page.localeProvider.nodes"
                          defaultMessage="Nodes"
                          description="Nodes"
                        />) : ('')}</p>
                        <p>{prop.name =='Transactions' ?(
                        <FormattedMessage
                          id="page.localeProvider.transactions"
                          defaultMessage="Transactions"
                          description="Transactions"
                        />) : ('')}</p>
                        <p>{prop.name =='Chains' ?(
                        <FormattedMessage
                          id="page.localeProvider.chain"
                          defaultMessage="chains"
                          description="chains"
                        />) : ('')}</p>
                        <p>{prop.name =='Contracts' ?(
                        <FormattedMessage
                          id="page.localeProvider.contracts"
                          defaultMessage="Contracts"
                          description="Contracts"
                        />) : ('')}</p>
                        
                      </NavLink>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            </IntlProvider>
        </div>
      </div>
    );
  }
}

export default Sidebar;
