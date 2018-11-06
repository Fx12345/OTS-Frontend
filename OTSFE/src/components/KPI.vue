<template>
   <div>
       <v-app>
           <v-navigation-drawer stateless permanent floating value="true">
               <v-toolbar flat>
                   <v-list>
                       <v-list-tile>
                           <v-toolbar-side-icon @click=""></v-toolbar-side-icon>
                           <v-list-tile-title class="title">
                               F-Bar App
                           </v-list-tile-title>
                       </v-list-tile>
                   </v-list>
               </v-toolbar>
               <v-divider></v-divider>
               <v-list dense class="pt-0">
                   <v-list-tile v-for="item in items" :key="item.title" @click="navigateTo(item.title)">
                       <v-list-tile-action>
                           <v-icon>{{ item.icon }}</v-icon>
                       </v-list-tile-action>
                       <v-list-tile-content>
                           <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                       </v-list-tile-content>
                   </v-list-tile>
               </v-list>
           </v-navigation-drawer>

       </v-app>
    </div>
</template>

<script>
    import VApp from "vuetify/src/components/VApp/VApp";
    export default {
        name: "KPI",
        components: {VApp}
    }
</script>

<style scoped>
    .withW{
       width: 100%;
        height: 100%;
    }
    .cardH {
        background-color: olive;
    }
</style>