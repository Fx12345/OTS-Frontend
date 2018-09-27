<template>
  <div class="home">
    <div class="row">
      <div class="col-md-2">
        <KPI></KPI>
      </div>
      <div class="col-md-10">
        <div class="water">
        <WorldMap></WorldMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import WorldMap from '@/components/WorldMap.vue';
import KPI from '@/components/KPI.vue';

export default {
  name: 'home',
  components: {
    WorldMap,
      KPI
  }
}
</script>

<style scoped>
.water{
  background-color: #66c8ff;

}
</style>