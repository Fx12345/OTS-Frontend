<template>
  <div id="app" class="maxSize">
    <div id="main">
      <Navigation></Navigation>
          <router-view/>
    </div>
  </div>
</template>

<script>
  import Navigation from './components/Navigation.vue';

  export default {
      name: 'app',
      components: {
          Navigation

      }
  }
</script>

<style>
  body {
    overflow:hidden;
  }
  .maxSize {
    min-height: 100%;
    height: auto !important;
    height: 100%;
    width: auto;
    background-color: #66c8ff;
  }


</style>
