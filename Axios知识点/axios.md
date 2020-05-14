# Axios知识点

[TOC]



### 1.引入方式

```
$ npm install axios
$ cnpm install axios //taobao源
$ bower install axios
直接引入：
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

### 2.执行请求

#### 1.执行get请求

```javascript
//向具有指定ID的用户发出的请求
axios.get('/user?ID=12345')
.then(response => {
	console.log(response);
})
.catch(error => {
	console.log(error);
})

//也可以用过params对象传递参数
axios.get('/user',{
    params:{
        ID: 12345
    }
})
.then(response => {
    console.log(response);
})
.catch(error =>{
    console.log(error);
})
```

#### 2.执行post请求

```javascript
axios.post('/user',{
    firstName: 'Fred',
    lastName: 'Flintstone'
})
.then(response => {
    console.log(response);
}).
catch(error => {
    console.log(error);
})
```



#### 3.执行多个请求

```javascript
function getUserAccount(){
	return axios.get('/user/12345');
}
function getUserPermissions(){
    return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(),getUserPermissions()])
.then(axios.spread(account,permissions)=>{
    //现在两个请求都已经完成
});
```

### 3.axios API    ---- 通过相关参数传递给axios进行请求

#### 3.1 axios(config)

```javascript
//发送一个post请求
axios({
	method:'post',
    url:'/user/12345',
    data:{
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
});

```

#### 3.2 axios(url[,config])

```javascript
//发送一个GET请求(GET请求时默认请求模式)
axios('/user/12345');
```

### 4.创建实例

#### 4.1 axios.create([config])

```javascript
var instance = axios.create({
	baseURL: 'http://some-domain.com/api',
    timeout: 1000,
    header: {'X-Custom-Header':'foobar'}
})
```

#### 4.2 请求配置

> 这些是用于请求的可用配置项,只有url是必须的,如果未指定方法,请求将默认为GET

```javascript
{
	url: '/user', //url将用于请求的服务器url
    method: 'get', //请求方法,默认get
    //baseURL将被添加到url前面,除非url是绝对的
    //可以方便的为axios的实例设置baseURL,以便将URL传递给该实例的方法
    baseURL: 'https://some-domain.cpm/api/',
        
    //此方法允许在请求数据发送到服务器之前对其进行更改
    //此方法只适用于'PUT','POST','PATCH'
    //数组中的最后一个函数必须返回一个字符串,一个ArrayBuffer或一个Stream
    transformRequest:[function(data){
        //做任何你想要做的数据转换
        return data;
    }],
    //此方法允许在then/catch之前对响应数据进行更改
    transformResponse:[function(data){
        return data;
    }],
    //headers是要发送的自定义headers
    headers:{'X-Request-With':'XMLHttpRequest'},
    //params 是要与请求一起发送的URL参数
    // 必须是纯对象或URLSearchParams对象
    params: {
        ID : 12345
    },
    // `paramsSerializer`是一个可选的函数，负责序列化`params`
    paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
    //`data`是要作为请求主体发送的数据
    //仅适用于请求方法“PUT”，“POST”和“PATCH”
    data: {
		firstName: 'Fred'
	},
    // `timeout`指定请求超时之前的毫秒数。
	// 如果请求的时间超过'timeout'，请求将被中止。
	timeout: 1000,
    
    // `withCredentials`指示是否跨站点访问控制请求
	withCredentials: false, // default
    // `adapter'允许自定义处理请求，这使得测试更容易。
    adapter: function (config) {
		/* ... */
	},
    // `auth'表示应该使用 HTTP 基本认证，并提供凭据。
	// 这将设置一个`Authorization'头，覆盖任何现有的`Authorization'自定义头，使用`headers`设置。
    auth: {
		username: 'janedoe',
		password: 's00pers3cret'
	},
    //response表示服务器响应的数据类型
    responseType:'json',
    // 'proxy'定义代理服务器的主机名和端口
	// `auth`表示HTTP Basic auth应该用于连接到代理，并提供credentials。
	// 这将设置一个`Proxy-Authorization` header，覆盖任何使用`headers`设置的现有的`Proxy-Authorization` 自定义 headers。
	proxy: {
		host: '127.0.0.1',
		port: 9000,
		auth: : {
			username: 'mikeymike',
			password: 'rapunz3l'
		}
	},
    // “cancelToken”指定可用于取消请求的取消令牌
	// (see Cancellation section below for details)
	cancelToken: new CancelToken(function (cancel) {}),
     
	//`xsrfCookieName`是要用作 xsrf 令牌的值的cookie的名称
	xsrfCookieName: 'XSRF-TOKEN', // default
 
	// `xsrfHeaderName`是携带xsrf令牌值的http头的名称
	xsrfHeaderName: 'X-XSRF-TOKEN', // default
 
	// `onUploadProgress`允许处理上传的进度事件
	onUploadProgress: function (progressEvent) {
	// 使用本地 progress 事件做任何你想要做的
	},
 
	// `onDownloadProgress`允许处理下载的进度事件
	onDownloadProgress: function (progressEvent) {
	// Do whatever you want with the native progress event
	},
 
	// `maxContentLength`定义允许的http响应内容的最大大小
	maxContentLength: 2000,
 
	// `validateStatus`定义是否解析或拒绝给定的promise
	// HTTP响应状态码。如果`validateStatus`返回`true`（或被设置为`null` promise将被解析;否则，promise将被
 	 // 拒绝。
	validateStatus: function (status) {
		return status >= 200 && status < 300; // default
	},
 
	// `maxRedirects`定义在node.js中要遵循的重定向的最大数量。
	// 如果设置为0，则不会遵循重定向。
	maxRedirects: 5, // 默认
 
	// `httpAgent`和`httpsAgent`用于定义在node.js中分别执行http和https请求时使用的自定义代理。
	// 允许配置类似`keepAlive`的选项，
	// 默认情况下不启用。
	httpAgent: new http.Agent({ keepAlive: true }),
	httpsAgent: new https.Agent({ keepAlive: true }),
}
```

### 5.默认配置

#### 5.1全局axios默认值

```javascript
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

#### 5.2自定义实例默认值

```javascript
/在创建实例时设置配置默认值
var instance = axios.create({
   baseURL：'https://api.example.com'
});
//在实例创建后改变默认值
instance.defaults.headers.common ['Authorization'] = AUTH_T6OKEN;
```

### 6.拦截器

#### 6.1 添加拦截器

```javascript
//添加请求拦截器
axios.interceptors.request.use（function（config）{
     //在发送请求之前做某事
     return config;
   }，function（error）{
     //请求错误时做些事
     return Promise.reject（error）;
   }）;
 
//添加响应拦截器
axios.interceptors.response.use（function（response）{
     //对响应数据做些事
     return response;
   }，function（error）{
     //请求错误时做些事
     return Promise.reject（error）;
   }）;
```

#### 6.2 删除拦截器

```javascript
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

#### 6.3 自定义实例添加拦截器

```javascript
var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

### 7.配置优先级

配置方法的优先级是 `axios请求配置 > axios实例配置 > axios全局配置`