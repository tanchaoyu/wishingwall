<template>
  <div class="container">
    <div class="topbar">
      <div
        class="baritem"
        v-for="(item,index) in baritem"
        :key="index"
        :data-index="item.index"
      >{{item.name}}</div>
    </div>
    <div
      class="info"
      @touchstart="touchStart"
      @touchmove="touchMove"
      :style="'transform:translateX('+moveX+')'"
    >
      <div class="hotList infoitem">
        <card v-for="item in wishlist" :key="item" :wish="item"></card>
      </div>
      <div class="square infoitem">
        <div class="iconbox">
          <div class="icon">
            <img src="../assets/wishing1.png" alt />
            <p>许愿</p>
          </div>
          <div class="icon">
            <img src="../assets/confession.png" alt />
            <p>表白</p>
          </div>
          <div class="icon">
            <img src="../assets/wish.png" alt />
            <p>祝福</p>
          </div>
          <div class="icon">
            <img src="../assets/roast.png" alt />
            <p>吐槽</p>
          </div>
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
import { Login, getHotwish } from "../commen/http";
import commen from "../commen/commen";
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
      startX: 0,
      moveX: 0,
      transform: "transform:translateX(" + this.moveX + ")",
    };
  },
  mounted() {
    if (!commen.userid) {
      Login().then((res) => {
        commen.userid = res.data.userid;
      });
    }
    getHotwish(1).then((res) => {
      window.console.log(res);
      this.wishlist = res.data;
    });
  },
  methods: {
    touchStart: function (e) {
      this.startX = e.touches[0].pageX;
    },
    touchMove: function (e) {
      window.console.log(e);
      this.moveX = e.touches[0].pageX - this.startX + "px";
      window.console.log(this.moveX);
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
    height: 14vw;
    background-color: #ffcc01;
    display: flex;
    justify-content: center;
    align-items: center;

    .baritem {
      color: #ffffff;
      font-size: 4vw;
      font-weight: 600;
      margin: 2vw;
    }
  }
  .info {
    width: 200vw;
    display: flex;
  }
  .infoitem {
    width: 100vw;
    min-height: 60vh;
  }
  .hotList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .square {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .iconbox {
    display: flex;
    align-items: center;
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
