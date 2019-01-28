// pages/aeratordetail/aeratordetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:'',
      description:'',
      bindequipmentid:'',
      datas:'',
      offstatus:0,
      status:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({

      name: options.name,
      description: options.description,
      bindequipmentid: options.bindequipmentid
    })
    console.log("接收的name是" + that.data.name);
    console.log("接收的description是" + that.data.description);
    console.log("接收的bindequipmentid是" + that.data.bindequipmentid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  delme:function(){

  },

  bindme:function(){
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
      }
    })

  },

  posOpen:function(){
    wx.showLoading({
      title: '处理中',
      mask: true,
    })
    this.downlink("posOpen");

  },

  stop:function(){
    wx.showLoading({
      title: '处理中',
      mask: true,
    })
    this.downlink("stop");

  },

  downlink: function (commandName){
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess 直接写this就变成了wx.request()的this了
    //{"uuid":"xxxx","commandName":"xxxxx"}
    // var arrChk = new Array();
    var uuid = this.data.bindequipmentid;
    if (uuid==''){
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '操作失败，该增氧机还未绑定',
        // success(res) {
        //   if (res.confirm) {
        //     console.log('用户点击确定')
        //   } else if (res.cancel) {
        //     console.log('用户点击取消')
        //   }
        // }
      })

      return;
    }
    // var arry = { "uuid": uuid };
    // arrChk.push(arry);

    var jsons = { "uuid": uuid, "commandName": commandName };
    var jsonStr = JSON.stringify(jsons);
    console.log("jsonStr:" + jsonStr);
    wx.request({
      url: app.globalData.url + '/api/zyj/downlink', // 仅为示例，并非真实的接口地址
      data: jsonStr,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data);
        if(res.data.issuccess==1){
          var times = 0
          that.setData({
            datas :res.data.datas,
          })
          
          var i =setInterval(function(){
              times++;
              if(times>30){
                console.log('#######成功到达30次')
               
                that.setData({
                  offstatus: 1,
                  status:"99"
                })
                
              }
            if (that.data.offstatus==1){//停止定时器
              clearInterval(i)
              wx.hideLoading();
              if(that.data.status=="succ"){
                wx.showToast({
                  title: '操作成功',
                  icon: 'success',
                  duration: 2000
                })
              } else if (that.data.status == "99"){
                wx.showModal({
                  title: '错误提示',
                  content: '请求超时，操作失败',
                  showCancel: false
                })
              }else{
                wx.showModal({
                  title: '错误提示',
                  content: '操作失败',
                  showCancel: false
                })
              }
              that.setData({
                offstatus: 0,
              })
              return;
            }
            that.queryOrderStatus();

          },2000)

        }else{
          wx.showModal({
            title: '错误提示',
            content: res.data.msg,
            showCancel: false
          })
          wx.hideLoading();
        } 
        
      },
      fail(res) {
        console.log(res.data)
        wx.showModal({
          title: '错误提示',
          content: res.data,
          showCancel: false
        })
        wx.hideLoading();
      },
      complete(res) {
        //wx.hideLoading();
        //wx.stopPullDownRefresh() //停止下拉刷新
      },
    })

  },

  queryOrderStatus:function(){
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess 直接写this就变成了wx.request()的this了
    console.log(that.data.datas)
    wx.request({
      url: app.globalData.url + '/api/zyj/downlink/query', // 仅为示例，并非真实的接口地址
      data: {"datas":that.data.datas},
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
          console.log("###请求下行数据执行情况")
          console.log(res.data)
        if (res.data.status!=""){
          that.setData({
            offstatus: 1,
            status: res.data.status
          })
        }
      },
      fail(res) {
        console.log(res.data)
      },
      complete(res) {

      },
    })

  },

})