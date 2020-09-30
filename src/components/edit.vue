<template>
  <div class="container">
    <back name="许愿墙"></back>
    <div class="editbox">
      <div class="to">
        To:
        <input type="text" placeholder="xxx" v-model="to" />
      </div>
      <textarea
        name
        id="content"
        cols="30"
        rows="10"
        placeholder=" 写下你的心愿..."
        class="content"
        v-model="content"
      ></textarea>
      <div class="by">
        By:
        <input type="text" placeholder="xxx" v-model="by" />
      </div>
    </div>
    <div class="send" @click="send">发送</div>
  </div>
</template>
<script>
import { publishWish } from "../commen/http";
import back from "./back.vue";
export default {
  name: "edit",
  components: {
    back,
  },
  data() {
    return {
      anonymous: false,
      content: null,
      to: null,
      by: null,
      type: String,
    };
  },
  mounted() {
    this.type = this.$route.query.type;
  },
  methods: {
    send: function() {
      window.console.log(this.content);
      console.log(this.type);
      publishWish(this.type, this.anonymous, this.to, this.content).then(
        (res) => {
          window.console.log(res);
          if (res.status == 200) {
            window.alert("发送成功");
            this.$router.push({ name: "index" });
          } else {
            window.alert("发送失败");
          }
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .editbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vw;
    height: 46vh;
    color: #aba9a9;
    .content {
      width: 100%;
      height: 60%;
      border: 10px solid #fbdc65;
      border-radius: 10px;
      font-size: 42px;
      box-shadow: 1px 4px 4px #c59e9e;
      padding: 3vw;
    }
    .to {
      height: 20%;
      width: 40%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      align-self: flex-start;
      font-size: 50px;
      input {
        height: 100%;
        width: 80%;
        font-size: 50px;
      }
      input::placeholder {
        color: #aba9a9;
      }
    }
    .by {
      height: 20%;
      width: 40%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      align-self: flex-end;
      font-size: 50px;
      input {
        height: 100%;
        width: 30%;
        font-size: 50px;
      }
      input::placeholder {
        color: #aba9a9;
      }
    }
  }
  .send {
    width: 30vw;
    height: 6vh;
    background-color: #ffcc01;
    border-radius: 10px;
    font-size: 50px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10vw;
  }
}
</style>
