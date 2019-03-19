$(function  () {
  /* 1.  */

  barCharts()
  pieCharts()
})
/**
 * 柱状图
 */
var barCharts = function  () {
  /* 假装这是动态数据 */
  var data = [
    {
      name: '一月',
      value: 300
    },
    {
      name: '二月',
      value: 500
    },
    {
      name: '三月',
      value: 400
    },
    {
      name: '四月',
      value: 300
    },
    {
      name: '五月',
      value: 600
    },
    {
      name: '六月',
      value: 450
    }
  ]
  var xdata = [], ydata = [];
  data.forEach(function (item, i) {  
    xdata.push(item.name)
    ydata.push(item.value)
  })
  var box = document.querySelector('.picTable:first-child')
  var myCharts = echarts.init(box)
  var options = {
      title: {
        text: '注册人数'
      },
      legend: {
        data: ['注册人数']
      },
      tooltip: {
        
      },
      xAxis: [{
        data: ['一月', '二月', '三月', '四月', '五月', '六月'],
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: '注册人数',
        type: 'bar',
        barWidth: '50%',
        data: [10, 52, 200, 334, 390, 330]
      }]
  }
  options.xAxis[0].data = xdata;
  options.series[0].data = ydata
  myCharts.setOption(options)
}

/**
 * 饼图
 */
var pieCharts = function  () {
  var box = document.querySelector('.picTable:last-child')
  var myCharts = echarts.init(box)
  option = {
    title: {
      text: '热门品牌销售',
      subtext: '2019年1月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['李宁', '阿迪', '耐克', '匡威', '回力']
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '李宁' },
          { value: 310, name: '阿迪' },
          { value: 234, name: '耐克' },
          { value: 135, name: '匡威' },
          { value: 1548, name: '回力' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myCharts.setOption(option)
}