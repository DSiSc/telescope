import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import cookie from 'react-cookies';
import LiteTable from './LiteTable';

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

class Main extends Component {
 	constructor(props) {
	    super(props);
	    this.state = {
	      lang: 'en-US'
	    };
  	}
  render() {
    
  	const appLocale = getLocale(cookie.load("language"));
    addLocaleData(...appLocale.data);
    return (
    	<IntlProvider
          locale={appLocale.locale}
          messages={appLocale.messages}
          formats={appLocale.formats}
        >
      	<LiteTable />
    	</IntlProvider>
    );
  }
}

export default Main