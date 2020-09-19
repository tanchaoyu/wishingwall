<template>
  <div class="contain">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <router-link to="/index">
      <div class="icon">
        <img src="../assets/index.png" alt />
      </div>
    </router-link>
    <router-link to="/publish">
      <div class="icon">
        <img src="../assets/edit.png" alt />
      </div>
    </router-link>
    <router-link to="/person">
      <div class="icon">
        <img src="../assets/person.png" alt />
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "tarbar",
  components: {}
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
    justify-content: center;
    align-items: center;
    img {
      height: 6vh;
      width: 6vh;
    }
  }
}
</style>
