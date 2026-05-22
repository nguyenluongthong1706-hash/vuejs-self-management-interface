<script setup lang="ts">
    import { useRoute } from 'vue-router';

    import { useUserStore } from '@stores/useUserStore';
    
    const route = useRoute()
    const userStore = useUserStore()

</script>
<template>
    <div class="header">
        <div class="sidebar-toggle">
            <button>Expand</button>
        </div>
        <div class="header-info">
            <p>{{route.name }}</p>
            <div class="user-info">
                <img class="avatar" v-if="userStore.user?.avatar" :src="userStore.user?.avatar" alt="">
                <div v-else class="avatar avatar-fallback">NT</div>
                <p>{{ userStore.user?.name }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .header{
        position: sticky;
        top:0;
        z-index:100;
        display:flex;
        align-items:center;
        border-bottom:1px solid gray;
        background:white;
    }
    .sidebar-toggle{
        padding: 15px 30px;
        border-right: 1px solid rgb(204, 204, 204);
    }
    .sidebar-toggle button{
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
        width: 60px;
        height: 60px;
        border-radius: 100%;
        margin-right: 15px;
    }
    .avatar-fallback{
        background-color: aquamarine;
        color: blue;
        font-size: 12px;
    }
</style>