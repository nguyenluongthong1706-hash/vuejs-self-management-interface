<script setup lang="ts"></script>
<template>
    <form class="auth-form">
        <h1 class="auth-title">Register</h1>
        <input class="input" type="name" placeholder="Enter your name">
        <input class="input" type="email" placeholder="Enter your email">
        <input class="input" type="password" placeholder="Enter your password">
        <input class="input" type="password" placeholder="Confirm your password">
        <div class="btn-box">
            <button class="btn">Login</button>
        </div>
    </form>
</template>
<style scoped>
    .auth-form{
        width: 500px;
        padding: 15px 42px;
        border-radius: 15px;
        background-color: white;
        box-sizing: border-box;
    }
    .auth-title{
        text-align: center;
    }
    .input{
        width: 100%;
        padding:3px 6px;
        margin: 12px 0;
        border: 1px solid rgb(90, 90, 90);
        border-radius: 6px;
    }
    .btn-box{
        display: flex;
        justify-content: center;
    }
    .btn{
        padding: 6px 15px;
        margin-top: 12px;
        background-color: rgb(41, 115, 228);
        border: 2px solid white;
        border-radius: 9px;
        color:white
    }
</style>