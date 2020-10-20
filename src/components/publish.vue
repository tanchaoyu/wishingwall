<template>
  <div class="container" @touchmove.prevent>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <router-link :to="{ path: '/edit', query: { type: typelist[0] } }">
      <div class="icon xuyuan">
        <img src="../assets/wishing1.png" alt />
        许愿
      </div>
    </router-link>
    <router-link :to="{ path: '/edit', query: { type: typelist[1] } }">
      <div class="icon biaobai">
        <img src="../assets/confession.png" alt />
        表白
      </div>
    </router-link>
    <router-link to="/index">
      <div class="err">
        <img src="../assets/err.png" alt />
      </div>
    </router-link>
    <router-link :to="{ path: '/edit', query: { type: typelist[2] } }">
      <div class="icon zhufu">
        <img src="../assets/wish.png" alt />
        祝福
      </div>
    </router-link>
    <router-link :to="{ path: '/edit', query: { type: typelist[3] } }">
      <div class="icon tucao">
        <img src="../assets/roast.png" alt />
        吐槽
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "publish",
  components: {},
  data() {
    return {
      typelist: ["xvyuan", "biaobai", "zhufu", "tucao"],
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  background: #fbefd5;
  background-size: 100vw 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100vh;
  a {
    user-select: none;
  }
  .icon {
    width: 18vw;
    height: 18vw;
    font-size: 4vw;
    margin-bottom: 10vw;
    color: #ffcc01;
    user-select: none;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .err {
    width: 10vw;
    height: 10vw;
    font-size: 4vw;
    margin-bottom: 10vw;
    color: #ffcc01;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .xuyuan {
    transform: translateY(-15vw);
  }
  .biaobai {
    transform: translateY(-35vw);
  }
  .zhufu {
    transform: translateY(-35vw);
  }
  .tucao {
    transform: translateY(-15vw);
  }
  .err {
    transform: translateY(-5vw);
  }
}
</style>
