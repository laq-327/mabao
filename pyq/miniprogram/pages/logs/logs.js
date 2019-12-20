Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: "未登录",
    src: "/images/beijing1.jpg",
    den:"登录"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  handleGetUserInfo: function (e) {
    console.log(e);
    const { userInfo } = e.detail;//获取用户信息
    wx.setStorageSync("userinfo", userInfo);
    this.setData({
      nickname: e.detail.userInfo.nickName,//将用户信息显示出来
      src: e.detail.userInfo.avatarUrl,
      den:"欢迎登录"//按钮上面的字体变化
    })
  }
})