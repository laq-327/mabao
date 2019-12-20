//固定图表 用于查看过去一晚上的图表情况 利用OneNet导入的数据 提供滑动功能！

var wxCharts = require('../../utils/wxchart2.js');//不知道两个具体的区别，因此分别命名为chart2/charts
var app = getApp();
var lineChart = null;
var startPos = null;
Page({
  data: {
  },
  goto: function () {
    console.log('tap1')
    wx.navigateTo({
      url: '/pages/jiance/jiance',//前往湿度记录图表
    })
  },
  tapback: function () {
    console.log('tap')

    wx.switchTab({
       url: '/pages/index/index',//回到首页
    })
  },
  taptopyq: function () {
    console.log('taptopyq')
    wx.navigateTo({
      url: '/pages/fabu/fabu',//前往发朋友圈界面
    })
  },
  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  // 通过touchHandler,moveHandler,touchEndHandler来监测用户是否进行滑动，同时设置图表可滑动，利用showtooltip的函数用户点击可以查看具体数据的功能。
  createSimulationData: function () {
    var categories = [];
    var data = [32.55, 35.40, 32.71, 43.62, 46.31, 49.07, 53.33, 46.05, 89.40, 96.25, 96.62, 96.43, 96.87, 97.79, 96.62, 97.18, 94.72, 94.98];
    for (var i = 0; i < 20; i++) {
      categories.push('23：49：' + (i + 10));

    }
    return {
      categories: categories,
      data: data
    }
  },
  onLoad: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: false,
      series: [{
        name: '湿度',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + '%';
        }
      }],
      xAxis: {
        disableGrid: false
      },
      yAxis: {
        title: '湿度(%)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 40
      },//设置y轴参数名字，以及数据格式
      width: windowWidth,
      height: 200,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
      }
      // 设置图表的基本参数，如高度、宽度、图表类型（line）等，通过设置min使图表显示更为合理，图表效率提升，改善用户体验，配置enableScroll，dataLabel来实现滑动和查看具体数据的功能
    });
  }
});