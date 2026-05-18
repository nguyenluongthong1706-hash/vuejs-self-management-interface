<script setup lang="ts">
    import { useRoute } from 'vue-router';

    import { useUserStore } from '@stores/useUserStore';
    
    const route = useRoute()
    const userStore = useUserStore()

</script>
<template>
    <div class="header">
        <div class="tongLeSiteBar">
            <button>Expand</button>
        </div>
        <div class="header-info">
            <p>{{route.name }}</p>
            <div class="user-info">
                <img v-if="userStore.user?.avatar" :src="userStore.user?.avatar" alt="">
                <div v-else class="avatar h-avatar">NT</div>
                <p>{{ userStore.user?.name }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .header{
        position: sticky;
        top:0;
        z-index:1000;
        display:flex;
        align-items:center;
        border-bottom:1px solid gray;
        background:white;
    }
    .tongLeSiteBar{
        padding: 15px 30px;
        border-right: 1px solid rgb(204, 204, 204);
    }
    .tongLeSiteBar button{
        padding: 6px 12px;
    }
    .header-info{
        display:flex;
        flex:1;
        align-items: center;
        justify-content: space-between;
        padding: 15px 30px;
    }
    .user-info{
        display: flex;
        align-items: center;
    }
    .avatar{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        margin-right: 15px;
    }
    .h-avatar{
        background-color: aquamarine;
        color: blue;
        font-size: 12px;
    }
</style>