<template>
  <div class="container">
    <back name="许愿墙"></back>
    <div class="editbox">
      <div class="to">
        To:
        <input type="text" placeholder="XXX" v-model="to" />
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

      <div
        :class="anonymous ? 'anonymousbtn anonymousbtnopen' : 'anonymousbtn'"
        @click="Anonymous"
      >
        <div
          :class="anonymous ? 'leftcircle anonymousbtnopen' : 'leftcircle'"
        ></div>
        <div :class="anonymous ? 'anonymous anonymousopen' : 'anonymous'">
          匿
        </div>
        <div
          :class="anonymous ? 'rightcircle anonymousbtnopen' : 'rightcircle'"
        ></div>
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
    Anonymous: function() {
      if (this.anonymous) {
        this.anonymous = false;
      } else {
        this.anonymous = true;
      }
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
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vw;
    height: 46vh;
    color: #aba9a9;
    .content {
      width: 100%;
      height: 27.6vh;
      border: 0.5vw solid #fbdc65;
      border-radius: 2px;
      font-size: 4vw;
      box-shadow: 1px 1px 1px #c59e9e;
      padding-top: 2vw;
      min-height: 200px;
    }
    .to {
      height: 9.2vh;
      width: 40%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      align-self: flex-start;
      font-size: 4vw;
      min-height: 20px;
      input {
        height: 100%;
        width: 80%;
        font-size: 4vw;
      }
      input::placeholder {
        color: #aba9a9;
      }
    }

    .anonymousbtn {
      margin-top: 6vw;
      margin-right: 4vw;
      min-height: 20px;
      align-self: flex-end;
      width: 4vw;
      height: 5vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.2vw solid #fce075;
      border-bottom: 0.2vw solid #fce075;
      background: #fff;
      .leftcircle {
        position: absolute;
        z-index: -1;
        width: 5vw;
        height: 5vw;
        border-radius: 25px 0 0 25px;
        border: 0.2vw solid #fce075;
        transform: translateX(-5vw);
        border-right: 0px;
      }
      .rightcircle {
        position: absolute;
        z-index: -1;
        width: 5vw;
        height: 5vw;
        border-radius: 0 25px 25px 0;
        border: 0.2vw solid #fce075;
        border-left: 0px;
        transform: translateX(3vw);
      }
      .anonymous {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 5vw;
        height: 5vw;
        border-radius: 50% 50%;
        background: #e0ba22;
        color: #fff;
        font-size: 2vw;
        transform: translateX(-5vw);
        transition: transform 0.5s;
      }
      .anonymousopen {
        transform: translateX(3vw);
      }
    }
    .anonymousbtnopen {
      background: #fce075;
    }
  }
  .send {
    width: 30vw;
    height: 6vh;
    background-color: #ffcc01;
    border-radius: 10px;
    font-size: 4vw;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10vw;
    min-height: 50px;
  }
}
</style>
