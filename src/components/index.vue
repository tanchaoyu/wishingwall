<template>
  <div class="container">
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
      class="info"
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
      <div class="hotList infoitem">
        <card
          v-for="(item, index) in wishlist"
          :key="index"
          :wish="item"
          :limit="true"
        ></card>
      </div>
      <div class="square infoitem" @touchmove.prevent>
        <div class="iconbox">
          <div
            class="icon"
            v-for="(item, index) in iconList"
            :key="index"
            :data-index="index"
            @click="changeType"
          >
            <img :src="item.img" alt />
            <p :id="index == iconindex ? 'inicon' : ''">{{ item.name }}</p>
          </div>
        </div>
        <div class="xuyuanList">
          <div class="squarebox">
            <div class="squareavatar">
              <img
                :src="
                  xuyuanLish[squareindex].user_avatar == ''
                    ? ''
                    : '/' + xuyuanLish[squareindex].user_avatar
                "
                alt
              />
            </div>
            <div class="squarecontent" @click="toWishinfo">
              <p class="time">{{ xuyuanLish[squareindex].CreatedAt }}</p>
              <p class="tosb">To:{{ xuyuanLish[squareindex].to }}</p>
              <p class="wishcontent">{{ xuyuanLish[squareindex].content }}</p>
              <div class="changeicon">
                <img src="../assets/last.png" alt="" @click.stop="lastWish" />
                <img src="../assets/next.png" alt="" @click.stop="nextWish" />
              </div>
              <div class="heart">
                <img :src="praise ? heart : unheart" alt @click.stop="Praise" />
                {{ xuyuanLish[squareindex].praise }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tarbarin"></div>
    <tarbar class="tarbar"></tarbar>
  </div>
</template>
<script>
import axios from "axios";
import unheart from "../assets/unheart.png";
import heart from "../assets/heart.png";
import tarbar from "./tarbar.vue";
import card from "./card.vue";
import {
  getAPP,
  LoginWx,
  getHotwish,
  getTypewish,
  getPraise,
  praise,
} from "../commen/http";
import commen from "../commen/commen";
import xuyuan from "../assets/wishing1.png";
import biaobai from "../assets/confession.png";
import zhufu from "../assets/wish.png";
import tucao from "../assets/roast.png";
export default {
  name: "index",
  components: {
    tarbar,
    card,
  },
  data() {
    return {
      wishlist: null,
      baritem: [
        { name: "热门", index: 0 },
        { name: "广场", index: 1 },
      ],
      iconList: [
        { img: xuyuan, type: "xvyuan", name: "许愿" },
        { img: biaobai, type: "biaobai", name: "表白" },
        { img: zhufu, type: "zhufu", name: "祝福" },
        { img: tucao, type: "tucao", name: "吐槽" },
      ],
      loading: true,
      wishpage: 1,
      typepage: 2,
      inwhichindex: 0,
      squareindex: 0,
      iconindex: 0,
      beginX: 0,
      startX: 0,
      changeX: 0,
      move: 0,
      moveX: 0,
      duration: 0,
      transform: "transform:translateX(" + this.moveX + ")",
      xuyuanLish: [
        {
          user_avatar: "default",
          CreatedAt: "default",
          to: "default",
          content: "default",
        },
      ],
      praise: false,
      heart: heart,
      unheart: unheart,
      praiseList: [],
      timer: 0,
    };
  },
  mounted() {
    if (!commen.userid) {
      getAPP().then((res) => {
        if (res.data) {
          let url = window.location.search;
          let params = new URLSearchParams(url);
          let code = params.get("code");
          axios({
            url: "https://api.weixin.qq.com/sns/oauth2/access_token",
            method: "get",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            params: {
              //公众号id
              appid: res.data.appId,
              //公众号secret
              secret: res.data.secret,
              code: code,
              grant_type: "authorization_code",
            },
          }).then(function(res) {
            let openid = res.openid;
            if (openid) {
              LoginWx(openid).then((res) => {
                commen.userid = res.data.userid;
                commen.nickname = res.data.nickname;
                commen.avatar = res.data.avatar;
                commen.signature = res.data.signature;
              });
            }
          });
        }
      });
      /* LoginWx("code").then((res) => {
        commen.userid = res.data.userid;
        commen.nickname = res.data.nickname;
        commen.avatar = res.data.avatar;
        commen.signature = res.data.signature;
      }); */
    }
    getHotwish(1).then((res) => {
      this.wishlist = res.data;
    });
    this.getTypewish(1, "xvyuan");

    this.timer = new Date().getTime();
  },
  methods: {
    touchStart: function(e) {
      this.duration = 0;
      this.startX = e.touches[0].pageX;
      this.beginX = e.touches[0].pageX;
    },
    touchMove: function(e) {
      let time = new Date().getTime();
      if (time - this.timer > 1000 / 60) {
        this.changeX = e.touches[0].pageX - this.startX;
        window.console.log(this.changeX);
        if (Math.abs(this.changeX) > 10) {
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
    getTypewish: function(page, type) {
      getTypewish(page, type).then((res) => {
        for (let i of res.data) {
          i.CreatedAt = i.CreatedAt.replace("T", " ").replace("+08:00", " ");
        }
        this.xuyuanLish = res.data;
        this.getPraise(this.xuyuanLish[0].ID);
      });
    },
    changeItem: function(e) {
      this.duration = 0.2;
      let index = e.currentTarget.dataset.index;
      this.inwhichindex = index;
      this.moveX = -this.inwhichindex * 100 + "vw";
      this.move = -window.innerWidth * this.inwhichindex;
    },
    changeType: function(e) {
      this.squareindex = 0;
      let index = e.currentTarget.dataset.index;
      let type = this.iconList[index].type;
      this.getTypewish(1, type);

      this.iconindex = index;
    },
    scroll: function(e) {
      let time = new Date().getTime();
      if (time - this.timer > 10) {
        let clientHeight = e.srcElement.clientHeight;
        let scrollHeight = e.srcElement.scrollHeight;
        let scrollTop = e.srcElement.scrollTop;

        if (clientHeight + scrollTop + 100 >= scrollHeight && this.onload) {
          this.wishpage += 1;
          this.onload = false;
          getHotwish(commen.userid, this.wishpage).then((res) => {
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
    lastWish: function() {
      let time = new Date().getTime();
      if (time - this.timer > 100) {
        if (this.squareindex > 0) {
          this.squareindex--;
          this.getPraise(this.xuyuanLish[this.squareindex].ID);
        } else {
          alert("已经是最新一条");
        }
      }
    },
    nextWish: function() {
      let time = new Date().getTime();
      if (time - this.timer > 100) {
        if (this.squareindex < this.xuyuanLish.length - 1) {
          this.squareindex++;
          this.getPraise(this.xuyuanLish[this.squareindex].ID);
          if (this.squareindex >= this.xuyuanLish.length / 2) {
            let type = this.iconList[this.iconindex].type;
            getTypewish(this.typepage, type).then((res) => {
              if (res.data) {
                this.typepage++;
                for (let i of res.data) {
                  this.xuyuanLish.push(i);
                }
              }
            });
          }
        } else {
          alert("已经是最后一条");
        }
      }
    },
    toWishinfo: function() {
      this.$router.push({
        name: "wishinfo",
        query: { info: this.xuyuanLish[this.squareindex] },
      });
    },
    getPraise: function(ID) {
      getPraise(ID).then((res) => {
        if (res.data != null) {
          this.xuyuanLish[this.squareindex].praiseList = res.data;
          let userid = function() {
            return commen.userid;
          };
          let praised = res.data.find(userid);
          if (praised) {
            this.praise = true;
          } else {
            this.praise = false;
          }
        } else {
          this.praise = false;
        }
      });
    },
    Praise: function() {
      if (this.praise) {
        window.console.log(this.praise);
      } else {
        praise(this.xuyuanLish[this.squareindex].ID, commen.userid).then(
          (res) => {
            window.console.log(res);
            this.praise = true;
            this.xuyuanLish[this.squareindex].praise++;
          }
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  background-color: #f6f4f4;
  min-height: 90vh;
  overflow: hidden;
  .topbar {
    height: 8vh;
    background-color: #ffcc01;
    display: flex;
    justify-content: center;
    align-items: center;

    .baritem {
      color: #ffffff;
      font-size: 4vw;
      font-weight: 600;
      padding: 2vw;
      margin: 1vw;
    }
  }
  .info {
    width: 200vw;
    max-height: 82vh;
    display: flex;
  }
  .infoitem {
    width: 100vw;
    min-height: 60vh;
  }
  .hotList {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .xuyuanList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .square {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .squarecontent {
    background: #fff;
    width: 100%;
    height: 45vh;
    display: flex;
    flex-direction: column;
    border-radius: 2vw;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    .changeicon {
      position: absolute;
      margin-top: 30vh;
      width: 6vw;
      display: flex;
      flex-direction: column;
      align-self: flex-end;
      transform: translate(-30px);
      img {
        width: 8vw;
        height: 8vw;
      }
    }
    .heart {
      position: absolute;
      align-self: flex-end;
      margin-top: 40vh;
      margin-right: 8vw;
      img {
        width: 6vw;
        height: 6vw;
      }
    }
  }
  .squarecontent p {
    font-size: 4vw;
    color: #a5a3a3;
    margin: 2vw;
    text-align: start;
  }
  .iconbox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
  }
  .icon {
    width: 16vw;
  }
  .icon img {
    width: 12vw;
    height: 12vw;
    margin: 1vw;
  }
  .icon p {
    font-size: 3vw;
    color: #ffcc01;
  }
  #inicon {
    font-size: 4vw;
  }
  .squarebox {
    margin-top: 2vw;
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .squareavatar {
    width: 20vw;
    height: 20vw;
    margin: 3vw;
  }
  .squareavatar img {
    width: 100%;
    height: 100%;
    border-radius: 50% 50%;
    margin-bottom: 3vw;
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
  .on {
    border-bottom: 0.5vw solid #fff;
  }
}
</style>
