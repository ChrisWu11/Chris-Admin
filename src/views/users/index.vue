<template>
  <div class="container">
    <!-- <button @click="makeWorker">开始线程</button> -->
    <!--在计算时 往input输入值时 没有发生卡顿-->
    <!-- <p><input type="text" /></p> -->

    <SlotDemo>
      <template #header>
        <h1>A secret makes a woman woman</h1>
      </template>

      <template #link>
        <h2 v-html="link"></h2>
      </template>

      <template slot-scope="{kris}">
        Hello {{kris}}
      </template>
    </SlotDemo>
  </div>
</template>

<script>
// import testWorker from "./test.worker.js";
import SlotDemo from "../../components/SlotDemo";
export default {
  name: "UserIndex",
  components: { SlotDemo },
  props: {},
  data() {
    return {
      link:'点击<a href="#">这里</a>'
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // makeWorker() {
    //   let worker = new testWorker();
    //   worker.postMessage(JSON.stringify({ statu: "start" }));
    //   setTimeout(() => {
    //     console.log("initWorker1");
    //   }, 0);
    //   worker.onmessage = function (event) {
    //     console.log("onmessage", event.data.value);
    //   };
    // },
  },
};
</script>

<style scoped lang="less">
</style>
