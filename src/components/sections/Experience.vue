<script setup lang="ts">
    import type { UserWorkExperience } from '@type/entities';
    const {workExperience} = defineProps<{
        workExperience : UserWorkExperience
    }>()
</script>
<template>
    <div class="big-card">
        <p class="card-title card-content nowrap-text">{{ workExperience.position }}</p>
        <p class="card-content blue-text">
            <span>{{ workExperience.start_date }}</span> - <span>{{ workExperience.end_date }}</span>
        </p>
        <p class="card-content nowrap-text">{{ workExperience.place_at }}</p>
    </div>
</template>
<style scoped>
    .big-card{
        width: 540px;
        padding: 9px 15px;
        border-radius: 12px;
        box-shadow: 0px 0px 6px rgba(0,0,0,0.3);
        box-sizing: border-box;
    }
    
    .card-title{
        font-size: 21px !important;
        font-weight: 700;
    }
    .card-content{
        font-size: 18px;
        margin: 9px 0;
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