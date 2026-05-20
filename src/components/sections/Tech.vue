<script setup lang="ts">
    import type { Tool, Tech } from "@type/entities";
    
    const props = withDefaults(
        defineProps<{
            size ?: 'big' | 'small'
            isTool ? : boolean
            item ?: Tool | Tech
        }>(), 
        {
            size: 'big',
            isTool: false
        }
    );
</script>
<template>
    <div class="technology-item" :class="{'technology-item--small' : props.size === 'small'}">
        <img :class="{'technology-item--small__icon' : props.size === 'small'}" :src="props.item?.icon" alt="">
        <p :class="{'technology-item--small__name' : props.size === 'small'}">{{ props.item?.name }}</p>
    </div>
</template>
<style scoped>
    .technology-item{
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
    .technology-item--small{
        width: 75px !important;
    }
    .technology-item--small__name{
        font-size: 15px !important;
        font-weight: 600 !important;
    }
    .technology-item--small__icon{
        width: 30px !important;
        height: 30px !important;
    }
    .technology-item img{
        width: 60px;
        height: 60px;
        object-fit: contain;
    }
    .technology-item p{
        font-size: 21px;
        font-weight: 700;
    }
</style>