<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <div class="not-found">
        <h1>404</h1>
        <p>Page not found</p>
        <button @click="router.push('/')">Back to home</button>
    </div>
</template>

<style scoped>
.not-found {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.not-found h1 {
    font-size: 72px;
    margin: 0;
}

.not-found p {
    font-size: 18px;
    margin: 0;
}

.not-found button {
    padding: 8px 18px;
    border-radius: 8px;
    cursor: pointer;
}
</style>