$(function () {  
  // 区域滚动
  mui('.mui-scroll-wrapper').scroll({
    indicators: false
  });
  // 轮播
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
  });
})