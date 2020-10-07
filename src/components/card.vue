<template>
  <div v-show="!msg || (msg && praiseList[0]) ? true : false">
    <div class="msg" v-show="msg ? true : false">
      <div class="praiseavatar">
        <img
          :src="item.avatar ? '/' + item.avatar : ''"
          alt=""
          v-for="(item, index) in praiseList"
          :key="index"
        />
      </div>
      <div class="praisename">
        <div v-for="(item, index) in praiseList" :key="index">
          {{ item.nickname }},
        </div>
      </div>
      <div>等{{ praiseList.length }}人赞了你</div>
    </div>
    <div :class="limit ? 'card ' : 'card wishinfo'" @click="toWishinfo">
      <div class="userimg" v-show="!msg">
        <img :src="'/' + wish.user_avatar" alt />
      </div>
      <div :class="msg ? 'content msgcontent' : 'content'">
        <div class="to">To:{{ wish.to }}</div>
        <div class="time">{{ wish.UpdatedAt }}</div>
        <div class="contentp">{{ wish.content }}</div>
        <div class="by">By:{{ wish.user_name }}</div>
        <div class="praise">
          <img :src="praise ? heart : unheart" alt @click.stop="Praise" />
          {{ wish.praise }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import unheart from "../assets/unheart.png";
import heart from "../assets/heart.png";
import { praise, getPraise, getUserinfo } from "../commen/http";
import commen from "../commen/commen";
export default {
  name: "card",
  props: {
    wish: Object,
    limit: Boolean,
    msg: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      praise: false,
      heart: heart,
      unheart: unheart,
      praiseList: [],
    };
  },
  created() {},
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
      for (let i of this.wish.praiseList) {
        getUserinfo(i).then((res) => {
          this.praiseList.push(res.data);
        });
      }
    });
    this.wish.UpdatedAt = this.wish.UpdatedAt.replace("T", " ").replace(
      "+08:00",
      " "
    );
  },
  methods: {
    Praise: function() {
      if (this.praise) {
        window.console.log(this.praise);
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
.msg {
  margin: 1vw;
  width: 90vw;
  display: flex;
  align-items: center;
  .praiseavatar {
    display: flex;
    align-items: center;
    margin-right: 1vw;
    img {
      width: 6vw;
      height: 6vw;
      border-radius: 50% 50%;
    }
  }
  .praisename {
    div {
      font-size: 2vw;
    }
  }
  div {
    font-size: 2vw;
  }
}
.card {
  width: 90vw;
  height: 36vw;
  display: flex;
  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 1vw;
  margin: 1vw;
  .userimg {
    width: 10vw;
    height: 10vw;
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
      font-size: 3vw;
      margin-top: 1vw;
      margin-left: 1vw;
    }
    .time {
      font-size: 2vw;
      margin: 1vw;
    }
    .contentp {
      width: 80%;
      height: 16vh;
      margin-left: 2vw;
      font-size: 3vw;
      text-align: start;
      text-overflow: ellipsis;
    }
    .by {
      font-size: 2vw;
      margin: 1vw;
      align-self: flex-end;
    }
  }
  .msgcontent {
    width: 95%;
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
