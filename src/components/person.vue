<template>
  <div class="container">
    <input
      type="file"
      class="hide"
      accept="image/*"
      ref="input"
      id="input"
      @change="uploadImg"
    />
    <div class="userimg" @click="changeimg">
      {{ show }}
      <img :src="'/static/images/' + userimg" alt />
    </div>
    <div class="username">
      <input
        type="text"
        placeholder="点击修改用户名"
        v-model="nickname"
        @blur="changenickname"
      />
    </div>
    <div class="username">
      <input
        type="text"
        placeholder="点击修改签名"
        v-model="signature"
        @blur="changesignature"
      />
    </div>
    <div class="topbar">
      <div
        :class="inwhichindex == index ? 'on baritem' : 'baritem'"
        v-for="(item, index) in baritem"
        :key="index"
        :data-index="item.index"
        @click="changeItem"
      >
        {{ item.name }}
      </div>
    </div>
    <div
      class="myinfo"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      :style="
        'transform:translateX(' +
          moveX +
          ');' +
          'transition:transform ' +
          duration +
          's;'
      "
    >
      <div class="myList myinfoitem" @scroll="scroll">
        <card
          v-for="(item, index) in mywish"
          :key="index"
          :wish="item"
          :limit="true"
        ></card>
      </div>
      <div class="msgList myinfoitem">
        <div class="msg">
          <card
            v-for="(item, index) in mywish"
            :key="index"
            :wish="item"
            :limit="true"
            :msg="true"
          ></card>
        </div>
      </div>
    </div>
    <div class="tarbarin"></div>
    <tarbar class="tarbar"></tarbar>
  </div>
</template>

<script>
import tarbar from "./tarbar.vue";
import card from "./card.vue";
import {
  setuserinfo,
  getmywish,
  upLoadimg,
  getUserMsg,
  getUserinfo,
} from "../commen/http";
export default {
  name: "person",
  components: {
    tarbar,
    card,
  },
  data() {
    return {
      innerHight: 0,
      wishpage: 2,
      nickname: null,
      signature: null,
      userimg: null,
      mywish: null,
      show: "点击修改",
      onload: true,
      baritem: [
        { name: "心愿", index: 0 },
        { name: "消息", index: 1 },
      ],
      praiseList: [],
      inwhichindex: 0,
      beginX: 0,
      startX: 0,
      changeX: 0,
      move: 0,
      moveX: 0,
      transform: "transform:translateX(" + this.moveX + ")",
      duration: 0,
      timer: 0,
      page: 1,
    };
  },

  mounted() {
    this.innerHight = window.innerHeight;
    this.getwish(1);
    this.getUserMsg(1);
    this.nickname = sessionStorage.getItem("nickname");
    this.signature = sessionStorage.getItem("signature");
    this.userimg = sessionStorage.getItem("avatar");
  },
  methods: {
    changeimg: function() {
      this.$refs.input.dispatchEvent(new MouseEvent("click"));
    },
    uploadImg: function() {
      let file = this.$refs.input.files[0];
      let image = new FormData();
      image.append("file", file);
      window.console.log(image.get("file"));
      upLoadimg(image).then((res) => {
        window.console.log(res);
        setuserinfo(
          "avatar",
          res.data.image,
          sessionStorage.getItem("userid"),
          "",
          ""
        );
        this.userimg = res.data.image;
      });
    },
    changenickname: function() {
      setuserinfo(
        "nickname",
        "",
        sessionStorage.getItem("userid"),
        this.nickname,
        ""
      ).then(() => {
        sessionStorage.setItem("nickname", this.nickname);
      });
    },
    changesignature: function() {
      setuserinfo(
        "signature",
        "",
        sessionStorage.getItem("userid"),
        "",
        this.signature
      ).then(() => {
        sessionStorage.setItem("signature", this.signature);
      });
    },
    getwish: function() {
      getmywish(sessionStorage.getItem("userid"), 1).then((res) => {
        window.console.log(res);
        this.mywish = res.data;
      });
    },
    getUserMsg: function(page) {
      getUserMsg(sessionStorage.getItem("userid"), page).then((res) => {
        window.console.log(res);
        this.praiseList = res.data;
        for (let i of this.praiseList) {
          getUserinfo(i.touserid).then((res) => {
            i.touseravatar = res.data.avatar;
          });
        }
      });
    },
    touchStart: function(e) {
      this.startX = e.touches[0].pageX;
      this.beginX = e.touches[0].pageX;
    },
    touchMove: function(e) {
      let time = new Date().getTime();
      if (time - this.timer > 1000 / 60) {
        this.changeX = e.touches[0].pageX - this.startX;
        window.console.log(this.changeX);
        if (Math.abs(this.changeX) > 50) {
          this.move += this.changeX;
          this.moveX = this.move + "px";
        }
        this.startX = e.touches[0].pageX;
        this.timer = time;
      }
    },
    touchEnd: function() {
      if (this.startX - this.beginX < -100) {
        if (this.inwhichindex < this.baritem.length - 1) {
          this.inwhichindex += 1;
          this.moveX = -this.inwhichindex * 100 + "vw";
        } else {
          this.moveX = -this.inwhichindex * 100 + "vw";
        }
      } else if (this.startX - this.beginX > 100) {
        if (this.inwhichindex > 0) {
          this.inwhichindex -= 1;
          this.moveX = -this.inwhichindex * 100 + "vw";
        } else {
          this.moveX = -this.inwhichindex * 100 + "vw";
        }
      } else {
        this.moveX = -this.inwhichindex * 100 + "vw";
      }
      this.move = -window.innerWidth * this.inwhichindex;
    },
    changeItem: function(e) {
      this.duration = 0.2;
      let index = e.currentTarget.dataset.index;
      this.inwhichindex = index;
      this.moveX = -this.inwhichindex * 100 + "vw";
      this.move = -window.innerWidth * this.inwhichindex;
    },
    scroll: function(e) {
      let time = new Date().getTime();
      if (time - this.timer > 10) {
        let clientHeight = e.srcElement.clientHeight;
        let scrollHeight = e.srcElement.scrollHeight;
        let scrollTop = e.srcElement.scrollTop;

        if (clientHeight + scrollTop + 100 >= scrollHeight && this.onload) {
          this.onload = false;
          getmywish(sessionStorage.getItem("userid"), this.wishpage).then(
            (res) => {
              this.onload = true;
              if (res.data) {
                this.wishpage += 1;
                for (let i of res.data) {
                  this.mywish.push(i);
                }
              }
            }
          );
        }
      }
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  overflow: hidden;
  .hide {
    display: none;
  }
  .userimg {
    margin: 2vw;
    width: 20vw;
    height: 20vw;
    min-height: 40px;
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
    min-height: 10px;
    &::placeholder {
      text-align: center;
    }
  }
  .topbar {
    height: 14vw;
    margin: 2vw;
    margin-top: 8vh;
    color: #ffcc01;
    display: flex;
    justify-content: center;
    align-items: center;
    .baritem {
      font-size: 5vw;
      font-weight: 600;
      margin: 2vw 6vw;
    }
    .on {
      border-bottom: 0.5vw solid #ffcc01;
    }
  }
  .myinfo {
    width: 200vw;
    align-self: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .myinfoitem {
      overflow: scroll;
      height: 52vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      .msg div {
        margin-bottom: 4vw;
      }
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
