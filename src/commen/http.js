import commen from "../commen/commen";
import axios from "axios";

const getAPP = () => {
  return new Promise(function(resolve) {
    axios({
      url: "",
      method: "post",
    }).then(function(res) {
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
const setuserinfo = (type, avatar, userid, nickname, signature) => {
  return new Promise(function(resolve) {
    axios({
      url: baseUrl + "/user/setting/" + type,
      method: "post",
      params: {
        type: type,
        avatar: avatar,
        userid: userid,
        nickname: nickname,
        signature: signature,
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
  getAPP,
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
