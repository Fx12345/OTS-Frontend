<template>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand">Oil Tycoon Simulator</a>
            </div>
            <ul class="nav navbar-nav">
                <li class="active"><router-link to="/">Home</router-link></li>
                <li><router-link to="/about">Dashboard</router-link></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#"><span class="glyphicon glyphicon-user"></span> User</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Leave Game</a></li>
            </ul>
        </div>
    </nav>
   <!-- <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link> -->
</template>

<script>
    export default {
        name: "Navigation"
    }
</script>

<style scoped>

</style>