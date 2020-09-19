<template>
  <div class="card">
    <div class="userimg">
      <img :src="wish.user_avatar" alt />
    </div>
    <div class="content">
      <div class="to">To:{{wish.to}}</div>
      <div class="time">{{wish.UpdatedAt}}</div>
      <div class="contentp">{{wish.content}}</div>
      <div class="praise">
        <img :src="praise?heart:unheart" alt @click="Praise" />
        {{wish.praise}}
      </div>
    </div>
  </div>
</template>

<script>
import unheart from "../assets/unheart.png";
import heart from "../assets/heart.png";
import { praise } from "../commen/http";
import commen from "../commen/commen";
export default {
  name: "card",
  props: {
    wish: Object
  },
  data() {
    return {
      praise: false,
      heart: heart,
      unheart: unheart
    };
  },
  mounted() {},
  methods: {
    Praise: function() {
      window.console.log(this.wish.ID);
      praise(this.wish.ID, commen.userid).then(res => {
        window.console.log(res);
        this.praise = true;
        this.wish.praise++;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 90vw;
  height: 30vw;
  display: flex;
  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 2vw;
  .userimg {
    width: 14vw;
    height: 14vw;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 70vw;
    .to {
      font-size: 5vw;
      margin: 2vw;
    }
    .time {
      font-size: 2vw;
      margin: 2vw;
    }
    .contentp {
      font-size: 4vw;
      align-self: center;
    }
  }
  .praise {
    width: 6vw;
    height: 6vw;
    align-self: flex-end;
    img {
      width: 4vw;
      height: 4vw;
    }
  }
}
</style>