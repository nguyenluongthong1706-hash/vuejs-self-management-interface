<script setup lang="ts">
  const {open = false, style} = defineProps<{
    open ?: boolean
    style ?: string | Record<string, any>
  }>()

  const emit = defineEmits<{
    (e : 'close') : void
  }>()
</script>
<template >
    <div v-if="open" class="modal-overlay" @click.self="emit('close')">
        <div :style="style" class="modal">
            <button @click="emit('close')" class="close">X</button>
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 33px;
  border-radius: 12px;
  min-width: 70vh;
  max-width: 80vh;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
}
.close{
  position:absolute;
  top: 12px;
  right: 12px;
  padding: 6px 9px;
  background-color: red;
  color: white;
  border:none;
  font-weight: 700;
  text-align: center;
}
</style>