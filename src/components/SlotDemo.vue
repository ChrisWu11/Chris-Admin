<template>
  <div>
    <div>
      <slot name="header"></slot>
    </div>
    <hr />
    <div>
      <slot name="link"></slot>
    </div>
    <hr />
    <div>
      <slot v-bind:kris="name1">{{name}}</slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Chris Wu",
      name1:'Kris Wu'
    };
  },
};
</script>