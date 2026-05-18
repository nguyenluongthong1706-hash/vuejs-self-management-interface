<script setup lang="ts">
import UserHeader from '@components/layout/UserHeader.vue'
import UserSiteBar from '@components/layout/UserSiteBar.vue'
</script>

<template>
    <div class="user-container">
        <UserSiteBar />

        <div class="main">
            <UserHeader />

            <div class="content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<style scoped>
.user-container{
    display:flex;
    height:100vh;
    overflow:hidden;
}

.main{
    flex:1;

    display:flex;
    flex-direction:column;

    overflow:hidden;
}

.content{
    flex:1;

    overflow-y:auto;
}
</style>