<!-- 用户登录页面 -->
<template>
	<view class="content">
		<!-- 回退 -->
		<view class="back" @click="goOff()" :style="{top: scrollTop + 'rpx'}">
			<image class="arrow-left" src="../../static/images/iCons/arrowLeftBrown.png"></image>
		</view>
		<!-- 输入用户名 -->
		<view class="input-box">
			<input type="text" :placeholder="getUsername()" v-model="userInfo.username" placeholder-class="phcolor">
		</view>
		<!-- 输入密码 -->
		<view class="input-box">
			<input type="password" :placeholder="getPassword()" v-model="userInfo.password" placeholder-class="phcolor">
		</view>
		<!-- 忘记密码 -->
		<view class="forgot-btn" @click="forgotPsd()">{{isLanguage ? 'Forgot Password' : '忘记密码'}}</view>
		<!-- 登录按钮 -->
		<view class="index-btn" @click="login()">{{isLanguage ? 'Sign In' : '登录'}}</view>
		<!-- 背景图 -->
		<image class="bg" src="../../static/images/indexBG.png"></image>
	</view>
</template>

<script>
	import { login, getUserInfo } from '../../api/user'
	export default {
		data() {
			return {
				userInfo: {
					username: '',
					password: '',
				},
				language: 0,
				isLanguage: false,
				scrollTop: 0
			}
		},
		onLoad() {
			this.getTop()
			this.scrollTop = this.scrollTop * 2 +14
		},
		onShow() {
			this.getLanguage()
		},
		methods: {
			getUsername() {
				if(this.isLanguage)
					return 'Enter Username'
				else
					return '请输入账号'
			},
			getPassword() {
				if(this.isLanguage)
					return 'Enter Password'
				else
					return '请输入密码'
			},
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			goOff() {
				uni.navigateBack({});
			},
			forgotPsd(){
				uni.navigateTo({
					url: './forgot',
				})
			},
			getTop() {
			  const that = this
			    wx.getSystemInfo({
			      success: function (res) {
			        that.scrollTop = res.statusBarHeight
			      },
			    });
			},
			getInfo(){
				getUserInfo()
				.then(res => {
					const result = JSON.parse(res.data).endata.data
					this.userInfo = result
					uni.setStorage({
						key: 'userInfo',
						data: this.userInfo
					})
				})
				.catch(err => console.log(err))
			},
			// 登录
			login() {
				// 校验账号和密码是否填写完整，否则显示toast提示
				if (!this.userInfo.username) {
					uni.showToast({
						title: '请填写账号',
						icon: 'none'
					})
					return
				}
				if (!this.userInfo.password) {
					uni.showToast({
						title: '请填写密码',
						icon: 'none'
					})
					return
				}
				// 基础校验成功后，调用login接口，传入数据
				login(this.userInfo.username, this.userInfo.password)
					.then(res => {
						const that = this
						const data = JSON.parse(res.data).endata
						// 拿到后端返回的数据，并用toast显示
						uni.showToast({
							title: data.msg,
							icon: 'none'
						})
						if(data.su === 0) {
							return
						} else {
							// 登录成功，调用getUserInfo()函数拿到用户具体信息，并存储到微信缓存中，再跳转至首页
							uni.setStorage({
								key: 'token',
								data: data.token,
								success() {
									that.getInfo()
									uni.reLaunch({
										url: '../home/index',
									})
								}
							})
						}
					})
					.catch(err => console.log(err))
			}
		}
	}
</script>

<style>
	.back{
		height: 60rpx;
		width: 60rpx;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 100rpx;
		position: fixed;
		left: 18rpx;
		z-index: 999;
	
	}
	
	.arrow-left{
		margin-top: 8rpx;
		margin-left: 4rpx;
		height: 46rpx;
		width: 46rpx;
	}
	
	.bg {
	  width: 100%;
		height: 100%;
	  position: fixed;
	  top: 0;
	  left:0;
	  z-index: -99;
	}
	
	.content {
		padding-top: 31vh;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}
	
	.input-box{
		margin-left: 48rpx;
	}
	
	.phcolor{
		color: #73615D;
		font-size: 32rpx;
	}
	
	.forgot-btn{
		width: auto;
		height: auto;
		font-size: 28rpx;
		margin-left: 584rpx;
		margin-top: 22rpx;
		color: #73615D;
	}
	
	.index-btn{
		width: 654rpx;
		height: 84rpx;
		margin-top: 60rpx;
		background-color: #987744;
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		line-height: 84rpx;
		margin-left: 48rpx;
	}
</style>
