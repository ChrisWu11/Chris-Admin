(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aa745"],{"10a1":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{ref:"chart_ref",staticStyle:{width:"600px",height:"400px"}})])},i=[],r={name:"ChartIndex",components:{},props:{},data:function(){return{}},computed:{},watch:{},created:function(){},mounted:function(){this.initChart()},methods:{initChart:function(){var t=this.$echarts.init(this.$refs.chart_ref),e={xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value"},series:[{data:[150,230,224,218,135,147,260],type:"line"}]};t.setOption(e)}}},c=r,s=n("2877"),o=Object(s["a"])(c,a,i,!1,null,"b61ed35c",null);e["default"]=o.exports}}]);