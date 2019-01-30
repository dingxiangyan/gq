<template>
<div class="task">
  <button v-on:click="$emit('ondd', $event.target.value)"></button>
</div>
</template>

<script>
  export default {
    name: "task"
  };
</script>

<style scoped>

</style>
