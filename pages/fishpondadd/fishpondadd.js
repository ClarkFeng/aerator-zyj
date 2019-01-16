// pages/fishpondadd/fishpondadd.js
Page({
  
  savefishpond:function(){
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000,
      mask: true,
      success: function () {
        setTimeout(function () {
          wx.navigateBack({
            url: '../index/index',
          })
        }, 2000)//延迟时间
      }
    });
  },

});