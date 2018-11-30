import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/map';
import 'echarts/map/js/world';

const geoCoordMap = {
  '中国 · 北京': [116.20, 39.58]
};

const data = [
  {
    name: '中国 · 北京',
    value: 10,
  }
];
const v = [
  3
]

function formtGCData(geoData, gcData, srcNam, dest) {
  const tGeoDt = [];
  gcData.map((value) => {
    if (srcNam !== value.name) {
      if (dest) {
        tGeoDt.push({
          coords: [geoData[srcNam], geoData[value.name]],
        });
      } else {
        tGeoDt.push({
          coords: [geoData[value.name], geoData[srcNam]],
        });
      }
    }
    return null;
  });
  return tGeoDt;
}

function formtVData(geoData, vData, srcNam) {
  const tGeoDt = [];
  for (let i = 0, len = vData.length; i < len; i++) {
    const tNam = vData[i].name;
    if (srcNam !== tNam) {
      tGeoDt.push({
        name: tNam,
        value: geoData[tNam],
        symbolSize: v[i],
        itemStyle: {
          normal: {
            color: '#FFD24D',
            borderColor: 'gold',
          },
        },
      });
    }
  }
  tGeoDt.push({
    name: srcNam,
    value: geoData[srcNam],
    symbolSize: 8,
    itemStyle: {
      normal: {
        color: '#f70404',
        borderColor: '#fff',
        opacity : '1 !import'
      },
    },
  });
  return tGeoDt;
}

// var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
const planePath = 'arrow';

const option = {
  geo: {
    name: 'Enroll distribution',
    type: 'map',
    map: 'world',
    label: {
      emphasis: {
        show: false,
      },
    },
    itemStyle: {
      normal: {
        areaColor: '#022548',
        borderColor: '#0DABEA',
        opacity : '0.2'
      },
      emphasis: {
        areaColor: '#011B34',
      },
    },
  },
  series: [
    {
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.1,
        color: '#FFB973',
        symbol: planePath,
        symbolSize: 5,
      },
      lineStyle: {
        normal: {
          color: '#FFB973',
          width: 0,
          opacity: 0.2,
          curveness: 0,
        },
      },
      data: formtGCData(geoCoordMap, data, '中国 · 北京', true),
    },
    {
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.1,
        color: '#9CE6FE',
        symbol: planePath,
        symbolSize: 5,
      },
      lineStyle: {
        normal: {
          color: '#65A2C2',
          width: 0,
          opacity: 0.4,
          curveness: 0,
        },
      },
      data: formtGCData(geoCoordMap, data, '中国 · 北京', false),
    },
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        period: 4,
        scale: 4,
        brushType: 'stroke',
      },
      label: {
        normal: {
          show: false,
          position: 'right',
          formatter: '{b}',
        },
      },
      symbolSize: 5,
      itemStyle: {
        normal: {
          color: '#fff',
          borderColor: 'gold',
        },
      },
      data: formtVData(geoCoordMap, data, '中国 · 北京'),
    },
  ],
};

/**
 * 图例参考：http://gallery.echartsjs.com/editor.html?c=xS197j1RtM
 */
export default class RealTimeTradeChart extends Component {
  static displayName = 'RealTimeTradeChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }

  updateDate = () => {
    const date = new Date();
    this.setState({
      date: `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    });
  };

  componentDidMount() {
    setInterval(this.updateDate, 1000);
  }

  render() {
    return (
      <IceContainer className = "timetrade" style = {{background : '#f0f5f9' , padding : "20px", margin: "0px"}}>
        <ReactEcharts option={option} style={{ height: '500px' , width : '100%' }} />
      </IceContainer>
    );
  }
}
