<template>
	<view class="vrPage">

		<!-- 			<view class="searchBox">
				<image src="../../../static/images/iCons/search.png" class="searchIcon"></image>
				<view class="searchText">搜索VR/AR名称</view>
			</view> -->

		<view class="listView">
			<view class="listItem" v-for="(item, index) in vrItem" :key="index" @click="goDetail(item.id)">
				<image class="listViewPic" :src="item.img"></image>
				<view class="listViewText">{{isLanguage ? item.enname : item.cnname}}</view>
			</view>
		</view>
		<!-- <tabbar :state="3"></tabbar> -->
	</view>
</template>

<script>
	import { getVrList, getVrList_tourist } from '../../../api/vr/index.js'
	import { getFileUrl } from '../../../common/index.js'

	export default {
		data() {
			return {
				vrItem: [],
				language: 1,
				isLanguage: true,
				vrClick: 0,
				isToken: false,
			}
		},
		onShow() {
			const token = wx.getStorageSync('token')
			const language = wx.getStorageSync('language')
			this.language = language
			this.getLanguage()
			if (token) {
				this.getVrList()
				this.isToken = true
			} else {
				this.getVrList_tourist()
				console.log("游客模式开启")
			}
		},
		methods: {
			getLanguage() {
				if (wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			goDetail(id) {
				const that = this
				that.vrClick = wx.getStorageSync('vrClick')
				that.vrClick++
				uni.setStorage({
					key: 'vrClick',
					data: that.vrClick
				})
				if (that.vrClick > 3 && !that.isToken) {
					uni.showModal({
						title: that.isLanguage ? 'Tips' : '提示',
						content: that.isLanguage ? 'Reach the upper limit' : 'VR观看次数已达上限',
						showCancel: true,
						cancelText: that.isLanguage ? 'Login' : '去登录',
						confirmText: that.isLanguage ? 'Other' : '观看其他',
						cancelColor: '#73615D',
						confirmColor: '#8F8F8F',
						success: function(res) {
							if (res.confirm) {
								return
							} else if (res.cancel) {
								uni.reLaunch({
									url: '/pages/index/index'
								});
							}
						}
					});
				} else {
					uni.navigateTo({
						url: './vrDetail?id=' + id
					})
				}
			},
			getVrList_tourist() {
				getVrList_tourist()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						const vrs = []
						data.forEach(item => {
							vrs.push({
								id: item.id,
								cnname: item.vrcnname,
								enname: item.vrenname,
								img: getFileUrl('img', item.cover)
							})
						})
						this.vrItem = vrs
					})
					.catch(err => console.log(err))
			},
			getVrList() {
				getVrList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						const vrs = []
						data.forEach(item => {
							vrs.push({
								id: item.id,
								cnname: item.vrcnname,
								enname: item.vrenname,
								img: getFileUrl('img', item.cover)
							})
						})
						this.vrItem = vrs
					})
					.catch(err => console.log(err))
			}
		}
	}
</script>

<style scoped>
	.vrPage {
		width: 750rpx;
		height: 100%;
		position: relative;
		margin-bottom: calc(118rpx + constant(safe-area-inset-bottom));
		margin-bottom: calc(118rpx + env(safe-area-inset-bottom));
	}

	.searchBox {
		width: 654rpx;
		height: 64rpx;
		margin: 12rpx 48rpx 0;
		background-color: #FFFFFF;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.searchIcon {
		width: 36rpx;
		height: 40rpx;
		margin-left: 18.22rpx;
	}

	.searchText {
		font-size: 28rpx;
		line-height: 40rpx;
		color: #73615D;
		margin-left: 11.28rpx;
	}

	.listView {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 36rpx 48rpx;
	}

	.listViewPic {
		width: 654rpx;
		height: 312rpx;
		border-radius: 20rpx;
	}

	.listViewText {
		margin-top: 20rpx;
		margin-bottom: 36rpx;
		font-size: 28rpx;
		line-height: 20px;
		color: #382321;
	}
</style>
