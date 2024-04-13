import baseURL from "./config.js"

// 对于文件路径都需要通过这个工具函数处理，整个项目中还有许多可以提取的工具函数未提取，统一按功能模块放到utils中更好
// 重写文件路径
function getFileUrl(type, name) {
	return `${baseURL}/fstream/?endata={%27filetype%27:%27${type}%27,%27filename%27:%27${name}%27}`
}

export { getFileUrl }
