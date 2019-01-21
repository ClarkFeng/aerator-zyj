//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '../images/c01.jpg',
      '../images/c02.jpg',
      '../images/c03.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  fishpondmanage:function(){
      wx.navigateTo({
        url: '../fishpondmanage/fishpondmanage',
      })

  },


})
