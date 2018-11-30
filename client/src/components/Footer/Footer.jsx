import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

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

class Footer extends Component {
  render() {
    const appLocale = getLocale(cookie.load("language"));
    addLocaleData(...appLocale.data);
    return (
      <footer className="footer">
        <Grid fluid>
          <nav className="pull-left">
            <IntlProvider
              locale={appLocale.locale}
              messages={appLocale.messages}
              formats={appLocale.formats}
            >
              <ul>
                <li>
                  <a href="#/">
                    <FormattedMessage
                      id="page.localeProvider.dashboard"
                      defaultMessage="DASHBOARD"
                      description="DASHBOARD"
                    />
                  </a>
                </li>
                <li>
                  <a href="#/blocks">
                    <FormattedMessage
                      id="page.localeProvider.blocks"
                      defaultMessage="Blocks"
                      description="Blocks"
                    />
                  </a>
                </li>
                <li>
                  <a href="#/nodes">
                    <FormattedMessage
                      id="page.localeProvider.nodes"
                      defaultMessage="Nodes"
                      description="Nodes"
                    />
                  </a>
                </li>
                <li>
                  <a href="#/transactions">
                    <FormattedMessage
                      id="page.localeProvider.transactions"
                      defaultMessage="Transactions"
                      description="Transactions"
                    />
                  </a>
                </li>
                <li>
                  <a href="#/chains">
                    <FormattedMessage
                      id="page.localeProvider.chain"
                      defaultMessage="chains"
                      description="chains"
                    />
                  </a>
                </li>
                <li>
                  <a href="#/contracts">
                    <FormattedMessage
                      id="page.localeProvider.contracts"
                      defaultMessage="Contracts"
                      description="Contracts"
                    />
                  </a>
                </li>
              </ul>
            </IntlProvider>
          </nav>
          <p className="copyright pull-right">
            <a href="https://github.com/DSiSc/justitia" >Justitia </a>Copyright
            &copy; {new Date().getFullYear()} | All rights reserved
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
