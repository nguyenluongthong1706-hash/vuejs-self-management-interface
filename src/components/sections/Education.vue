<script setup lang="ts">
    import type { UserEducation } from '@type/entities';
    const {education} = defineProps<{
        education : UserEducation
    }>()

</script>
<template>
    <div class="big-card">
        <p class="card-title card-content nowrap-text">{{ education.name }}</p>
        <p class="card-content blue-text">
            <span>{{ education.start_date }}</span> - <span>{{ education.end_date }}</span>
        </p>
        <p class="card-content nowrap-text">{{  education.degree  }}</p>
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