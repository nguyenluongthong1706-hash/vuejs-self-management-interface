<script setup lang="ts">
    import type { UserWorkExperience } from '@type/entities';
    const {workExperience} = defineProps<{
        workExperience : UserWorkExperience
    }>()
</script>
<template>
    <div class="work-experience-card">
        <p class="card-title card-text nowrap-text">{{ workExperience.position }}</p>
        <p class="card-text date-text">
            <span>{{ workExperience.startDate }}</span> - <span>{{ workExperience.endDate }}</span>
        </p>
        <p class="card-text nowrap-text">{{ workExperience.organization }}</p>
    </div>
</template>
<style scoped>
    .work-experience-card{
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
    .card-text{
        font-size: 18px;
        margin: 9px 0;
    }
    
    .nowrap-text{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .date-text{
        color: blue !important;
    }
</style>