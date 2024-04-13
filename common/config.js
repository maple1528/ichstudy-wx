let baseURL = '';

// 判断是什么环境，请求走响应的地址
if(process.env.NODE_ENV==='development'){
	// 开发环境
	baseURL = 'https://api.ichstudy.com'
}
else {
	// 测试环境
	baseURL = 'https://testapi.ichstudy.com'
}

export default baseURL