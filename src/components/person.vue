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
      <img :src="'http://wuxinke.top/wish_v4/static/images/' + userimg" alt />
    </div>
    <div class="username">
      <input type="text" placeholder="点击修改用户名" v-model="nickname" />
    </div>
    <div class="username">
      <input type="text" placeholder="点击修改签名" v-model="signature" />
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
          <div class="praiser"></div>
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
import commen from "../commen/commen";
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
      wishpage: 1,
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
    };
  },
  mounted() {
    this.innerHight = window.innerHeight;
    this.getwish(1);
    this.getUserMsg();
    this.nickname = commen.nickname;
    this.signature = commen.signature;
    this.userimg = commen.avatar;
  },
  methods: {
    changeimg: function() {
      this.$refs.input.dispatchEvent(new MouseEvent("click"));
    },
    uploadImg: function() {
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
    changenickname: function() {},
    changesignature: function() {},
    getwish: function() {
      getmywish(commen.userid, 1).then((res) => {
        window.console.log(res);
        this.mywish = res.data;
      });
    },
    getUserMsg: function(page) {
      getUserMsg(commen.userid, page).then((res) => {
        window.console.log(res);
        this.praiseList = res.data;
        for (let i of this.praiseList) {
          getUserinfo(i.touserid).then((res) => {
            console.log(res);
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
      console.log(window.innerWidth);
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
        console.log(clientHeight + scrollTop + 100 >= scrollHeight);
        if (clientHeight + scrollTop + 100 >= scrollHeight && this.onload) {
          this.wishpage += 1;
          this.onload = false;
          getmywish(commen.userid, this.wishpage).then((res) => {
            this.onload = true;
            if (res.data) {
              for (let i in res.data) {
                this.mywish.push(i);
              }
            }
          });
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
    margin-top: 8vh;
    color: #ffcc01;
    display: flex;
    justify-content: center;
    align-items: center;
    .baritem {
      font-size: 5vw;
      font-weight: 600;
      margin: 2vw;
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
