<script setup lang="ts">
    import { useToast } from "vue-toastification";
    
    import type { Tool, Tech } from "@type/entities";

    import { unassignTech } from "@services/techService";
    import { unassignTool } from "@services/toolService";

    const toast = useToast()
    
    const props = withDefaults(
        defineProps<{
            size ?: 'big' | 'small'
            isTool ? : boolean
            allowUnassign ?: boolean
            item ?: Tool | Tech
        }>(), 
        {
            size: 'big',
            isTool: false,
            allowUnassign: false
        }
    );

    const items = defineModel<Tool[] | Tech[]>()

    const handleUnassign = async ()=>{
        if(props.item && props.allowUnassign){
            if(props.isTool ){
                try {
                    const res = await unassignTool(props.item.id)

                    items.value = items.value?.filter(itemValue => 
                        itemValue.id !== props.item?.id
                    )

                    toast.success(res.message)
                } catch (error: any) {
                    toast.error(error.response?.data?.message)
                }
            }else{
                try {
                    const res = await unassignTech(props.item.id)

                    items.value = items.value?.filter(itemValue => 
                        itemValue.id !== props.item?.id
                    )

                    toast.success(res.message)
                } catch (error: any) {
                    toast.error(error.response?.data?.message)
                }
            }
        }
    }
</script>
<template>
    <div class="technology-item" :class="{'technology-item--small' : props.size === 'small'}">
        <img :class="{'technology-item--small__icon' : props.size === 'small'}" :src="props.item?.icon" alt="">
        <p class="nowrap-text" :class="{'technology-item--small__name' : props.size === 'small'}">{{ props.item?.name }}</p>
        <button v-if="allowUnassign" @click.stop="handleUnassign" class="delete-btn">X</button>
    </div>
</template>
<style scoped>
    .technology-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 120px;
        padding: 9px 0;
        gap:12px;
        border-radius: 12px;
        box-shadow: 0px 0px 6px rgba(0,0,0,0.3);
    }
    .technology-item--small{
        width: 75px !important;
    }
    .technology-item--small__name{
        font-size: 15px !important;
        font-weight: 600 !important;
    }
    .technology-item--small__icon{
        width: 30px !important;
        height: 30px !important;
    }
    .technology-item img{
        width: 60px;
        height: 60px;
        object-fit: contain;
    }
    .technology-item p{
        font-size: 18px;
        font-weight: 700;
        max-width: 80%;
    }
    .nowrap-text{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .delete-btn{
        position: absolute;
        top:3px;
        right: 3px;
        background-color: rgb(254, 40, 40);
        color: white;
        padding: 1px 6px;
        border:none;
        border-radius: 6px;
    }
</style>