<script setup lang="ts"></script>
<template>
    <div class="auth-container">
        <router-view/>
    </div>
</template>
<style scoped>
    .auth-container{
        height:100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(1, 1, 1, 0.83);
    }
</style>