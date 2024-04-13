// 引入封装好的请求
import request from "../../common/request.js"

// 获取banner列表
export function getBannerList() {
	return request({ // 需与后端沟通，看后端接收什么样的请求
		url: '/banner/', // 请求的地址
		method: 'POST', // 请求的方法
		data: { // 请求的数据
			endata: {
				action: 'getbanner'
			}
		}
	})
}