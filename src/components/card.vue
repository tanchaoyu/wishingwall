<template>
  <div v-show="!msg || (msg && praiseList[0]) ? true : false">
    <div class="msg" v-show="msg ? true : false">
      <div class="praiseavatar">
        <img
          :src="item.avatar ? '/static/images/' + item.avatar : ''"
          alt=""
          v-for="(item, index) in showList"
          :key="index"
        />
      </div>
      <div class="praisename">
        <div v-for="(item, index) in showList" :key="index">
          {{ item.nickname }},
        </div>
      </div>
      <div>等{{ praiseList.length }}人赞了你</div>
    </div>
    <div :class="limit ? 'card ' : 'card wishinfo'" @click="toWishinfo">
      <div class="userimg" v-show="!msg">
        <img :src="'/static/images/' + wish.user_avatar" alt />
      </div>
      <div :class="msg ? 'content msgcontent' : 'content'">
        <div class="del" v-show="owner ? true : false" @click.stop="deleteWish">
          <img :src="dele" alt="" />
        </div>
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
import dele from "../assets/del.png";
import { praise, getPraise, getUserinfo, deleteWish } from "../commen/http";

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
      showList: [],
      timer: 0,
      dele: dele,
      owner: false,
    };
  },
  created() {},
  mounted() {
    if (this.wish.userid == sessionStorage.getItem("userid")) {
      this.owner = true;
    }
    getPraise(this.wish.ID).then((res) => {
      if (res.data != null) {
        this.wish.praiseList = res.data;
        let userid = sessionStorage.getItem("userid");
        let praised = false;
        for (let i of res.data) {
          window.console.log(userid);
          window.console.log(i);
          if (i == userid) {
            praised = true;
            break;
          }
        }
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
          if (this.showList.length < 5) {
            this.showList.push(res.data);
          }
        });
      }
    });
    this.wish.UpdatedAt = this.wish.UpdatedAt.replace("T", " ").replace(
      "+08:00",
      " "
    );
    this.timer = new Date().getTime();
  },
  methods: {
    Praise: function() {
      let time = new Date().getTime();
      if (time - this.timer > 100) {
        if (this.praise) {
          window.console.log(this.praise);
        } else {
          praise(this.wish.ID, sessionStorage.getItem("userid")).then((res) => {
            window.console.log(res);
            this.praise = true;
            this.wish.praise++;
          });
        }
      }
    },
    toWishinfo: function() {
      this.$router.push({ name: "wishinfo", query: { info: this.wish } });
    },
    deleteWish: function() {
      if (this.wish.userid == sessionStorage.getItem("userid")) {
        let confirm = window.confirm("确认删除");
        if (confirm) {
          deleteWish(this.wish.ID, sessionStorage.getItem("userid")).then(
            () => {
              this.$router.push({ name: "index" });
            }
          );
        }
      }
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
    display: flex;
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 70vw;
    .del {
      position: absolute;
      align-self: flex-end;
      width: 6vw;
      height: 6vw;
      transform: translate(-3vw);
      img {
        width: 100%;
        height: 100%;
      }
    }
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
      height: 12vh;
      margin-left: 2vw;
      font-size: 3vw;
      text-align: start;
      overflow: hidden;
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
  min-height: 46vh;
  height: auto;
  margin-top: 4vw;
  .content {
    .contentp {
      width: 90%;
      margin-top: 4vw;
      min-height: 30vh;
      height: auto;
    }
  }
}
</style>
