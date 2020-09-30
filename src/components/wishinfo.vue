<template>
  <div class="wishinfoctn">
    <back name="详情"></back>
    <card :wish="wish"></card>
    <div class="praisectn">
      <div class="praise" v-for="(item, index) in praiseList" :key="index">
        <img
          :src="'http://wuxinke.top/wish_v4/static/images/' + item.avatar"
          alt=""
        />
        <p>{{ item.nickname }}觉得很赞</p>
      </div>
    </div>
  </div>
</template>

<script>
import card from "./card.vue";
import back from "./back.vue";
import { getUserinfo } from "../commen/http";
export default {
  name: "wishinfo",
  components: {
    back,
    card,
  },
  data() {
    return {
      wish: null,
      praiseList: [],
    };
  },
  created() {
    this.wish = this.$route.query.info;
  },
  mounted() {
    console.log(this.wish);
    for (let i of this.wish.praiseList) {
      getUserinfo(i).then((res) => {
        console.log(res);
        this.praiseList.push(res.data);
      });
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.wishinfoctn {
  background: #f6f4f4;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .praisectn {
    margin-top: 2vw;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .praise {
      width: 100vw;
      display: flex;
      align-items: center;
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
      img {
        margin: 2vw;
        width: 14vw;
        height: 14vw;
        border-radius: 50% 50%;
      }
      p {
        font-size: 4vw;
      }
    }
  }
}
</style>
