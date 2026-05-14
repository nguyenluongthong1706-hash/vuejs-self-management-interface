<script setup lang="ts">
    import UserHeader from '@components/layout/UserHeader.vue';
    import UserSiteBar from '@components/layout/UserSiteBar.vue';
</script>
<template>
    <div class="user-container">
        <UserSiteBar/>
        <div class="main">
            <UserHeader/>
            <router-view/>
        </div>
    </div>
</template>
<style scoped>
    .user-container{
        display: flex;
        box-sizing: border-box;
    }
    .main{
        flex:1;
        box-sizing: border-box;
    }
</style>