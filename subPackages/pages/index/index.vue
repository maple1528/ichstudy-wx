<template>
	<view class="content">
		<view class="index-bg">
			<image class="bg-pic" src="../../static/images/indexPic.png" mode="widthFix"></image>
		</view>
		<view class="btns">
			<view class="index-btn" @click="go('/pages/index/login')">{{isLanguage ? 'Sign In' : '登录'}}</view>
			<view class="index-btn" @click="go('/pages/index/register')">{{isLanguage ? 'Sign Up' : '注册'}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				language: 1,
				isLanguage: true
			}
		},
		onShow() {
			const language = wx.getStorageSync('language')
			this.language = language
			this.getLanguage()
		},
		methods: {
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			go(url){
				uni.navigateTo({
					url,
				})
			}				
		}
	}
</script>

<style>
	.content {
		width: 750rpx;
		height: 100%;
		position: relative;
	}
	
	.index-bg{
		position: absolute;
		width: 100%;
		height: 542rpx;
	}
	
	.bg-pic{
		width: 100%;
	}
	
	.btns{
		display: flex;
		flex-direction: row;
		position: absolute;
		left: 72rpx;
		right: 72rpx;
		top: 1314rpx;
		justify-content: space-between;
	}
	
	.index-btn {
		width: 268rpx;
		height: 82rpx;
		border-radius: 20rpx;
		background-color: #987744;
		text-align: center;
		line-height: 82rpx;
		font-size: 36rpx;
		color: #FFFFFF;
	}
	
</style>
