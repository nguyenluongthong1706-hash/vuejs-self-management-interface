<script setup lang="ts">
    import logo from "@assets/logo.svg"
    
    const {size = "big", isTool = false} = defineProps<{
        size ?: string
        isTool ? : boolean
    }>()
</script>
<template>
    <div class="tech-item" :class="{'small-size' : size === 'small'}">
        <img :class="{'small-size-img' : size === 'small'}" :src="logo" alt="">
        <p :class="{'small-size-text' : size === 'small'}">Title</p>
    </div>
</template>
<style scoped>
    .tech-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 120px;
        padding: 9px 0;
        gap:12px;
        border-radius: 12px;
        box-shadow: 0px 0px 6px rgba(0,0,0,0.3);
    }
    .small-size{
        width: 75px !important;
    }
    .small-size-text{
        font-size: 15px !important;
        font-weight: 600 !important;
    }
    .small-size-img{
        width: 30px !important;
        height: 30px !important;
    }
    .tech-item img{
        width: 60px;
        height: 60px;
        object-fit: contain;
    }
    .tech-item p{
        font-size: 21px;
        font-weight: 700;
    }
</style>