<template>
  <div class="backctn" @click="goBack">
    <img src="../assets/back.png" alt="" />
    {{ name }}
  </div>
</template>

<script>
export default {
  name: "back",
  props: {
    name: String,
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.backctn {
  width: 100vw;
  background: #ffcc01;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 8vh;
  font-size: 4vw;
  color: #fff;
}
.backctn img {
  width: 6vw;
  height: 8vw;
  margin: 2vw;
}
</style>
