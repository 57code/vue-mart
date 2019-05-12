import axios from "axios";
import router from './router';
import store from './store';

  axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  });

  axios.interceptors.response.use(null, err => {
    if (err.response.status === 401) {
      // 清空
      store.dispatch("logout");
      // 跳转
      router.push("/login");
    }
    return Promise.reject(err);
  });
