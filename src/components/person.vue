<template>
  <div class="container">
    <input type="file" class="hide" accept="image/*" ref="input" id="input" @change="uploadImg" />
    <div class="userimg" @click="changeimg">
      {{show}}
      <img :src="userimg" alt />
    </div>
    <div class="username">
      <input type="text" placeholder="点击修改用户名" v-model="nickname" />
    </div>
    <div class="username">
      <input type="text" placeholder="点击修改签名" v-model="signature" />
    </div>
    <div class="topbar">
      <div class="baritem">心愿</div>
      <div class="baritem">消息</div>
    </div>
    <div class="myList">
      <card v-for="(item,index) in mywish" :key="index" :wish="item"></card>
    </div>
    <div class="tarbarin">111</div>
    <tarbar class="tarbar"></tarbar>
  </div>
</template>

<script>
import tarbar from "./tarbar.vue";
import card from "./card.vue";
import commen from "../commen/commen";
import { setuserinfo, getmywish, upLoadimg, getUserMsg } from "../commen/http";
export default {
  name: "person",
  components: {
    tarbar,
    card,
  },
  data() {
    return {
      nickname: null,
      signature: null,
      userimg: null,
      mywish: null,
      show: "点击修改",
    };
  },
  mounted() {
    this.getwish();
    this.getUserMsg();
  },
  methods: {
    changeimg: function () {
      this.$refs.input.dispatchEvent(new MouseEvent("click"));
    },
    uploadImg: function () {
      let that = this;
      let file = this.$refs.input.files[0];
      let image = new FormData();
      image.append("file", file);
      window.console.log(image.get("file"));
      upLoadimg(image).then((res) => {
        window.console.log(res);
        setuserinfo("avatar", res.data.image, commen.userid);
      });
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (res) => {
        let img = res.target;
        window.console.log(img);
        that.userimg = img.result;
        that.show = null;
      };
      window.console.log(file);
    },
    changenickname: function () {},
    changesignature: function () {},
    getwish: function () {
      getmywish(commen.userid, 1).then((res) => {
        window.console.log(res);
        this.mywish = res.data;
      });
    },
    getUserMsg: function () {
      getUserMsg(commen.userid, 1).then((res) => {
        window.console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: url("../assets/personbg.png");
  background-repeat: no-repeat;
  background-color: #f6f4f4;
  background-size: 100vw 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .hide {
    display: none;
  }
  .userimg {
    margin: 2vw;
    width: 20vw;
    height: 20vw;
    border-radius: 50% 50%;
    font-size: 4vw;
    background: cornsilk;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 20vw;
      height: 20vw;
      border-radius: 50% 50%;
      position: absolute;
    }
  }
  .username input {
    width: 60vw;
    margin: 2vw;
    font-size: 4vw;
    text-align: center;
    &::placeholder {
      text-align: center;
    }
  }
  .topbar {
    height: 14vw;
    margin: 2vw;
    margin-top: 10vw;
    color: #ffcc01;
    display: flex;
    justify-content: center;
    align-items: center;
    .baritem {
      font-size: 5vw;
      font-weight: 600;
      margin: 2vw;
    }
  }
  .tarbar {
    position: fixed;
    top: 90vh;
    z-index: 10;
  }
  .tarbarin {
    top: 90vh;
    height: 10vh;
  }
}
</style>