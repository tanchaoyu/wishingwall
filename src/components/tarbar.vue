<template>
  <div class="contain">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <router-link to="/index">
      <div class="icon">
        <img src="../assets/index.png" alt />
        <div>首页</div>
      </div>
    </router-link>
    <router-link to="/publish">
      <div class="icon">
        <img src="../assets/edit.png" alt />
        <div>许愿</div>
      </div>
    </router-link>
    <router-link to="/person">
      <div class="icon">
        <img src="../assets/person.png" alt />
        <div>我的</div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "tarbar",
  components: {},
};
</script>
<style lang="scss" scoped>
.contain {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  width: 100vw;
  height: 10vh;
  .icon {
    width: 30vw;
    height: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
      color: #fbdc65;
      font-size: 2vw;
    }
    img {
      height: 4vh;
      width: 4vh;
    }
  }
}
</style>
