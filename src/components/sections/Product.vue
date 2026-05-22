<script setup lang="ts">
    import logo from "@assets/logo.svg" 

    import type { UserProduct } from "@type/entities";

    const props = defineProps<{product: UserProduct}>()
</script>
<template>
    <div class="product-card">
        <img class="product-image" :src="product.image" alt="">
        <div class="card-body">
            <p class="card-title card-text nowrap-text">{{ props.product.name }}</p>
            <p class="card-text date-text">
                <span>{{ props.product.startDate }}</span> - <span>{{ props.product.endDate }}</span>
            </p>
            <p class="card-text two-line-text">{{ props.product.description }}</p>
            <p class="card-text two-line-text">link <a target="_blank" @click.stop="" v-for="link in props.product.productLinks" :href="link.url" :key="link.id"> &spades;{{ link.title }}&sbquo;</a></p>
            <div class="tech-list">
                <img v-for="tech in props.product.productTechs.slice(0, 2)" :src="tech.icon" alt="icon" class="tech-icon" :key="tech.id">
                <div v-if="props.product.productTechs.length > 2" class="tech-overflow" >+ {{ props.product.productTechs.length - 2 }}</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .product-card{
        max-width: 270px;
        padding: 9px 15px;
        border-radius: 12px;
        box-shadow: 0px 0px 6px rgba(0,0,0,0.3);
        box-sizing: border-box;
    }
    .card-body{
        margin: 6px 0;
    }
    .product-image{
        width: 100%;
        height: 150px;
        object-fit: contain;
    }
    .card-title{
        font-size: 21px !important;
        font-weight: 700;
    }
    .card-text{
        font-size: 18px;
        margin: 9px 0;
    }
    .tech-list{
        display: flex;
        gap: 6;
        align-items: center;
    }
    .tech-icon{
        width: 30px;
        height: 30px;
        border-radius: 100%;
        object-fit: contain;
    }
    .tech-overflow{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(244, 244, 244);
        color: blue;
        font-weight: 700;
        width: 30px;
        height: 30px;
        border-radius: 100%;
    }
    .two-line-text{
        display:  -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal!important;;
        overflow-wrap: break-word;
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