<template>
  <div class="demo-image__lazy" style="width: 60%">
    <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
  </div>
</template>

<script>
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    return {
      urls: [
        'https://img2.baidu.com/it/u=2831754413,1406689270&fm=253&fmt=auto&app=120&f=PNG?w=500&h=277',
        'https://img0.baidu.com/it/u=3266021230,1597875162&fm=253&fmt=auto&app=120&f=JPEG?w=660&h=371',
        'https://img0.baidu.com/it/u=13155902,1059857425&fm=253&fmt=auto&app=138&f=BMP?w=640&h=408'
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">

</style>
