/*
  封装axios请求函数，完成下列功能：
    1. 复用请求地址 /api
      场景：每个接口都有/api地址，希望复用

    2. 请求成功就是功能成功
       请求失败就是请求失败或功能失败

       promise对象状态成功 --> 功能成功
       promise对象状态成功 --> 请求失败或功能失败

      场景：每次发送完请求，为了判断是否功能成功：if (res.data.code === 200) {}, 太麻烦了
    
    3. 成功得到成功的数据data，不要res.data.data
       失败得到失败的原因message，不要res.data.message

    4. 发送请求的时候可以携带公共参数：token

    5. 设置请求的进度条
      npm i nprogress
      npm i @types/nprogress -D 下载类型声明文件
*/

import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { v4 as uuidv4 } from "uuid";

// https://www.npmjs.com/package/nprogress
NProgress.configure({ showSpinner: false });

// 创建一个axios实例：功能和axios基本一致
// request就近似看做axios就好
const request = axios.create({
	// 基础路径：所有通过request发送请求的接口的请求地址，都会自动在前面加上baseURL
	// 公共的请求地址前缀
	baseURL: "/api", // 所以：所有请求地址会自动在前面加上/api
	// 请求超时时间：超过10s请求会中断，就会失败
	timeout: 10000,
	// 公共请求头参数: 静态的，写死的
	headers: {},
});

/*
  每次发送请求的时候，创建一个promise对象
    const promise = Promise.resolve(config) // config请求配置对象
      .then(请求拦截器成功的回调, 请求拦截器失败的回调)
      .then(发送请求的函数, undefined)
      .then(响应拦截器成功的回调, 响应拦截器失败的回调)

      then方法返回值：一定是一个promise对象，他的状态：
        1. 如果内部报错就是失败状态，结果值就是错误原因
        2. 如果内部返回一个失败的promise对象，也是失败状态，结果值就是失败状态的promise的结果值
        3. 否则就是成功状态，结果值看函数的返回值 或 成功promise对象的结果值

      1. Promise.resolve(config) 返回值成功promise对象，promise对象内部的结果值是config
        所以：返回一个成功状态promise对象，结果值为config
      2. .then(请求拦截器成功的回调, 请求拦截器失败的回调)
        触发请求拦截器成功的回调，并接受到config参数
        所以：返回一个成功的promise，结果值为config
      3. .then(发送请求的函数, undefined)
        触发发送请求的函数，此时会发送请求，携带config
      4. .then(响应拦截器成功的回调, 响应拦截器失败的回调)
        请求成功 -> 响应拦截器成功的回调
        请求成功 -> 响应拦截器失败的回调
      5. 组件代码：await request({ method: xxx })

    promise就是最终 request({ method: xxx }) 函数调用的返回值
*/

let userTempId = localStorage.getItem("userTempId");

if (!userTempId) {
	userTempId = uuidv4();
	localStorage.setItem("userTempId", userTempId);
}

// 拦截器：请求的生命周期函数

// 请求拦截器函数：发送请求之前触发的函数
request.interceptors.request.use(
	// 成功时触发
	(config: any) => {
		/*
      config是请求的配置对象
        将来发送请求：
          request({
            method: 'GET',
            url: 'xxx',
            params: { xxx }
          })

        config就是这个对象：{
          method: 'GET',
          url: 'xxx',
          params: { xxx }
        }
    */
		// 开始进度条
		NProgress.start();

		// 每次发送请求之前都会触发当前函数。再次在headers中携带了token参数
		// 所以真正请求时就有token参数了

		// 添加未登录前用户临时id
		// config.headers.userTempId = uuidv4(); // 调用函数会生成一个唯一的id
		config.headers.userTempId = userTempId;

		// 必须返回config，因为下一步就要发送请求，发送请求需要config
		return config;
	}
	// 失败时触发：不可能触发
	// () => {}
);

// 响应拦截器函数：得到响应之后触发的函数
request.interceptors.response.use(
	/*
    请求成功失败看响应状态码 status
      status 请求成功/失败
      code   功能成功/失败

      status > 199 && status <= 299 都是请求成功，2xx代表请求成功
      非2xx代表请求失败（1xx,3xx,4xx,5xx）

    http协议：
      响应状态码 status
        1xx 请求未完成，还需要进一步处理
        2xx 请求成功
          200 
        3xx 重定向，请求资源在其他地址，要去其他地址访问
          301 重定向到新地址
          304 重定向到浏览器缓存
        4xx 客户端错误
          401 未授权
          403 禁止访问
          404 找不到资源
        5xx 服务端错误
          500
  */
	// 成功时触发：请求成功
	(response) => {
		/*
      请求成功，response包含请求成功的内容：
        config: 请求的配置对象
        headers：响应头
        data：响应体数据
        status：响应状态码
        request: 发送请求的xhr对象

        一般只需要使用data。响应体数据
    */
		// 结束进度条
		NProgress.done();

		// 请求成功，并不代表功能成功
		// 判断功能是否成功
		if (response.data.code === 200) {
			// 功能成功：1. 将promise对象的状态改为成功状态 2. 返回成功的数据即可 response.data.data
			return response.data.data;
		} else {
			// 功能失败：1. 将promise对象的状态改为失败状态 3. 返回失败的原因 response.data.message
			alert(response.data.message);
			return Promise.reject(response.data.message);
		}
	},
	// 失败时触发：请求失败
	(error) => {
		/*
      请求失败。error就是请求失败的原因
    */
		// 结束进度条
		NProgress.done();

		alert(error);
		return Promise.reject(error);
	}
);

export default request;
