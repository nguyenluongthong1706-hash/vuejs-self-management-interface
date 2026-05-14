<script setup lang="ts">
    import logo from "@assets/logo.svg" 
</script>
<template>
    <div class="medium-card">
        <img class="card-img" :src="logo" alt="">
        <div class="card-body">
            <p class="card-title card-content nowrap-text">Job Seeking</p>
            <p class="card-content blue-text">
                <span>4/5/2025</span> - <span>30/8/2025</span>
            </p>
            <p class="card-content two-line-text">Description...</p>
            <p class="card-content two-line-text">Go to <a href="">Live Demo</a></p>
            <div class="tech-list">
                <img :src="logo" alt="icon" class="tech-img">
                <img :src="logo" alt="icon" class="tech-img">
                <div class="tech-box" >+1</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .medium-card{
        max-width: 330px;
        padding: 9px 15px;
        border-radius: 12px;
        box-shadow: 0px 0px 6px rgba(0,0,0,0.3);
        box-sizing: border-box;
    }
    .card-body{
        margin: 6px 0;
    }
    .card-img{
        width: 100%;
        height: 240px;
        object-fit: contain;
    }
    .card-title{
        font-size: 21px !important;
        font-weight: 700;
    }
    .card-content{
        font-size: 18px;
        margin: 9px 0;
    }
    .tech-list{
        display: flex;
        gap: 6;
        align-items: center;
    }
    .tech-img{
        width: 30px;
        height: 30px;
        border-radius: 100%;
        object-fit: contain;
    }
    .tech-box{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(244, 244, 244);
        color: blue;
        font-weight: 700;
        width: 30px;
        height: 30px;
        border-radius: 100%;
    }
    .two-line-text{
        display:  -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal!important;;
        overflow-wrap: break-word;
    }
    .nowrap-text{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .blue-text{
        color: blue !important;
    }
</style>