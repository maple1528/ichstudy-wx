<!-- 使用web-view跳转到VR的网页地址 -->
<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(options) {
			this.url = options.url
		},
		methods: {
		}
	}
</script>

<style scoped>
</style>
