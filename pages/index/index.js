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
    // var wxcode = wx.getStorageSync('wxcode') 
    // console.log("#####我的微信session为："+wxcode);
      wx.navigateTo({
        url: '../fishpondmanage/fishpondmanage',
      })

  },

  farmerdetail:function(){
    wx.navigateTo({
      url: '../farmerdetail/farmerdetail',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {


  },

})
