<template>
    <div class="container cardH">
        <h2>Card Image</h2>
        <p>Image at the top (card-img-top):</p>
        <div class="card" style="width:400px">
            <img class="card-img-top" src="../assets/icons/logo.png" alt="Card image" style="width:100%">
            <div class="card-body">
                <h4 class="card-title">John Doe</h4>
                <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                <a href="#" class="btn btn-primary">See Profile</a>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "KPI"
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