<template>
  <div :class="limit ? 'card ' : 'card wishinfo'" @click="toWishinfo">
    <div class="userimg">
      <img
        :src="'http://wuxinke.top/wish_v4/static/images/' + wish.user_avatar"
        alt
      />
    </div>
    <div class="content">
      <div class="to">To:{{ wish.to }}</div>
      <div class="time">{{ wish.UpdatedAt }}</div>
      <div class="contentp">{{ wish.content }}</div>
      <div class="praise">
        <img :src="praise ? heart : unheart" alt @click="Praise" />
        {{ wish.praise }}
      </div>
    </div>
  </div>
</template>

<script>
import unheart from "../assets/unheart.png";
import heart from "../assets/heart.png";
import { praise, getPraise } from "../commen/http";
import commen from "../commen/commen";
export default {
  name: "card",
  props: {
    wish: Object,
    limit: Boolean,
  },
  data() {
    return {
      praise: false,
      heart: heart,
      unheart: unheart,
    };
  },

  mounted() {
    getPraise(this.wish.ID).then((res) => {
      if (res.data != null) {
        this.wish.praiseList = res.data;
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
  methods: {
    Praise: function() {
      if (this.praise) {
        console.log(this.praise);
      } else {
        praise(this.wish.ID, commen.userid).then((res) => {
          window.console.log(res);
          this.praise = true;
          this.wish.praise++;
        });
      }
    },
    toWishinfo: function() {
      this.$router.push({ name: "wishinfo", query: { info: this.wish } });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 90vw;
  height: 36vw;
  display: flex;
  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  margin: 1vw;
  .userimg {
    width: 14vw;
    height: 14vw;
    margin: 2vw;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50% 50%;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 70vw;
    .to {
      font-size: 4vw;
      margin: 1vw;
    }
    .time {
      font-size: 2vw;
      margin: 1vw;
    }
    .contentp {
      width: 80%;
      height: 16vh;
      margin-left: 2vw;
      font-size: 4vw;
      text-align: start;
      text-overflow: ellipsis;
    }
  }
  .praise {
    width: 10vw;
    height: 10vw;
    align-self: flex-end;
    font-size: 3vw;
    img {
      width: 6vw;
      height: 6vw;
    }
  }
}
.wishinfo {
  width: 90vw;
  height: 46vh;
  margin-top: 4vw;
  .content {
    .contentp {
      width: 90%;
      margin-top: 4vw;
      height: 40vh;
    }
  }
}
</style>
