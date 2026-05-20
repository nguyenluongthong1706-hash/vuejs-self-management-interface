<script setup lang="ts">
    import { useRouter, useRoute } from "vue-router";
    import logo from "@assets/logo.svg"

    const router = useRouter()
    const route = useRoute()

    const navItems = [
        {name: "Profile", path: "/"},
        {name: "Tech Stack", path: "/tech-stack"}
    ]
</script>
<template>
    <div class="sidebar">
        <div class="sidebar-logo">
            <img class="logo" :src="logo" alt="">
        </div>
        <div>
            <p class="nav-title">Navigation</p>
            <div v-for="nav in navItems">
                <button 
                    class="nav-item"    
                    :class="{'is-active' : route.path === nav.path}" 
                    @click="router.push(nav.path)"
                >
                    {{ nav.name }}
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .sidebar{
        height: 100vh;
        padding: 15px 24px;
        border-right:1px solid gray
    }
    .sidebar-logo{
        display: flex;
        justify-content: center;
        align-self: center;
    }
    .logo{
        width: 80px;
        height: 80px;
    }
    .nav-title{
        margin: 15px 0;
    }
    .nav-item{
        width: 192px;
        padding: 9px 15px;
        margin: 3px 0;
        border-radius: 9px;
        background-color: inherit;
        border: none;
        text-align: left;
    }
    .nav-item:hover{
        background-color: rgb(95, 146, 218);
        color: white;
    }
    .is-active{
        background-color: rgb(95, 146, 218);
        color: white;
    }
</style>