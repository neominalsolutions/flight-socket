import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

function OnRequest(config: InternalAxiosRequestConfig) {
	console.log('OnRequest', config);

	// her bir request de araya girer ve request header access token eklediğimiz kod

	const token = localStorage.getItem('access_token');
	console.log('token', token);

	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
}

function OnRequestError(error: AxiosError) {
	console.log('OnRequestError', error);
	// request hata olabilir  bu hataları merkezi olarak uygulama sadece buradan monitor edicez. loglayacağız. error transformation işlemleri yapıabilir.

	return Promise.reject(error);
}

function OnResponse(response: AxiosResponse) {
	console.log('onResponse', response);
	// request başarı bir şekilde gitti response döndüğü aşama
	// status 200(OK), 201 (Post), 204 (Put,Delete,Patch),

	// ara işlemler yapabiliriz.
	// login sayfasındaysak dönen responsedaki token set et.
	if (response.status === 200 && response.config.url === 'login') {
		localStorage.setItem('token', response.data['token']);
		window.location.href = '/';
		// Not: uygulama içindeki login işlemleri tüm süreçler baştan başlayacağı için direk js ile hard reload yaparız.
	}

	// response transform edilebilir
	return response;
}

function OnResponseError(error: AxiosError) {
	console.log('onResponseError', error);
	return Promise.reject(error); // catch kodu
}

// merkezi olarak axios'a interceptor özelliği kazandırdık
export function SetupInterceptors(axiosInstance: AxiosInstance) {
	// yani her bir istekte yukarı functionları takibe al callback yap.
	axiosInstance.interceptors.request.use(OnRequest, OnRequestError);
	axiosInstance.interceptors.response.use(OnResponse, OnResponseError);

	return axiosInstance;
}

// ara takip ortadan kaldırmak için kullanılabilir.
export function ClearInterceptors(axiosInstance: AxiosInstance) {
	axiosInstance.interceptors.request.clear();
	axiosInstance.interceptors.response.clear();
	return axiosInstance;
}
