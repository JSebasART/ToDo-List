<template>
  <div id="app" class="bg-cwhite-dark absolute top-0 left-0 w-screen min-h-full">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
