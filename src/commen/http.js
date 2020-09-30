import axios from "axios";
import commen from "../commen/commen";
const baseUrl = "http://wuxinke.top/wish_v4";

const Login = () => {
  return new Promise(function(resolve) {
    axios({
      url: baseUrl + "/user/loginwx",
      method: "post",
      params: {
        code: "code",
      },
    }).then(function(res) {
      window.console.log(res);
      resolve(res);
    });
  });
};
const LoginWx = (openid) => {
  return new Promise(function(resolve) {
    axios({
      url: baseUrl + "/user/loginWxWeb",
      method: "post",
      params: {
        openid: openid,
      },
    }).then(function(res) {
      window.console.log(res);
      resolve(res);
    });
  });
};
const publishWish = (type, anonymous, to, content) => {
  return new Promise(function(resolve) {
    axios({
      url: baseUrl + "/wish",
      method: "post",
      headers: { "content-type": "application/json" },
      data: {
        userid: commen.userid,
        anonymous: anonymous,
        to: to,
        content: content,
        type: type,
      },
    }).then((res) => {
      window.console.log(res);
      resolve(res);
    });
  });
};
const getHotwish = (page) => {
  return new Promise(function(resolve) {
    axios({
      url: baseUrl + "/wish/hot",
      method: "get",
      params: {
        page: page,
      },
    }).then((res) => {
      window.console.log(res);
      resolve(res);
    });
  });
};
const getTypewish = (page, type) => {
  return new Promise(function(resolve) {
    axios({
      url: baseUrl + "/wish/list/" + type,
      method: "get",
      params: {
        page: page,
      },
    }).then((res) => {
      window.console.log(res);
      resolve(res);
    });
  });
};
const praise = (wishid, userid) => {
  return new Promise(function(resolve) {
    axios({
      url: baseUrl + "/wish/praise/" + wishid,
      method: "post",
      params: {
        wishid: wishid,
        userid: userid,
      },
    }).then((res) => {
      window.console.log(res);
      resolve(res);
    });
  });
};
const upLoadimg = (param) => {
  let config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  let url = baseUrl + "/file/image";
  return new Promise(function(resolve) {
    axios.post(url, param, config).then((res) => {
      window.console.log(res);
      resolve(res);
    });
  });
};
const setuserinfo = (type, info, userid) => {
  return new Promise(function(resolve) {
    axios({
      url: baseUrl + "/user/setting/" + type,
      method: "post",
      params: {
        type: type,
        avatar: info,
        userid: userid,
      },
    }).then((res) => {
      window.console.log(res);
      resolve(res);
    });
  });
};
const getmywish = (userid, page) => {
  return new Promise(function(resolve) {
    axios({
      url: baseUrl + "/user/wishes",
      method: "get",
      params: {
        userid: userid,
        page: page,
      },
    }).then((res) => {
      window.console.log(res);
      resolve(res);
    });
  });
};
const getUserMsg = (userid, page) => {
  return new Promise(function(resolve) {
    axios({
      url: baseUrl + "/user/msg",
      method: "get",
      params: {
        userid: userid,
        page: page,
      },
    }).then((res) => {
      window.console.log(res);
      resolve(res);
    });
  });
};
const getPraise = (id) => {
  return new Promise(function(resolve) {
    axios({
      url: baseUrl + "/wish/praise/" + id,
      method: "get",
    }).then((res) => {
      window.console.log(res);
      resolve(res);
    });
  });
};
const getUserinfo = (userid) => {
  return new Promise(function(resolve) {
    axios({
      url: baseUrl + "/user/info/" + userid,
      method: "get",
    }).then((res) => {
      window.console.log(res);
      resolve(res);
    });
  });
};
export {
  Login,
  LoginWx,
  publishWish,
  getHotwish,
  getTypewish,
  praise,
  setuserinfo,
  getmywish,
  upLoadimg,
  getUserMsg,
  getPraise,
  getUserinfo,
};
