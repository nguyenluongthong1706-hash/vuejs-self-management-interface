<script setup lang="ts">
    import { ref, watch, onMounted, computed, type Ref } from 'vue';
    import { useToast } from 'vue-toastification';

    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';
    import Textarea from '@components/ui/textarea/Textarea.vue';
    import Tech from '@components/sections/Tech.vue';

    import type { UserProduct, ProductLink, ProductTech, Tech as TechType } from '@type/entities';
    import type { FormErrors } from "@type/responses"
    import type { UpdateProductRequest } from '@type/requests'

    import { getTechs } from '@services/techService';

    import { 
        updateProduct, 
        deleteProduct, 
        assignTechs, 
        unassignProductTech, 
        createProductLink, 
        updateProductLink, 
        deleteProductLink 
    } 
    from '@services/productService';

    const products = defineModel<UserProduct[]>('products',{default: []})

    const toast = useToast()

    const props = defineProps<{
        open ?: boolean
        product ?: UserProduct
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const showTechForm = ref<boolean>(false)
    const showLinkForm = ref<boolean>(false)

    const isUpdateProductLoading = ref(false)
    const isDeleteProductLoading = ref(false)
    const isAssignTechLoading = ref(false)
    const isAddLinkLoading = ref(false)

    const updatingLinkIds = ref<string[]>([])
    const deletingLinkIds = ref<string[]>([])
    const unassignTechIds = ref<string[]>([])

    const productErrors = ref<FormErrors>({})
    const techErrors = ref<FormErrors>({})
    const linkErrors = ref<FormErrors>({})
    const linkEditErrors = ref<Record<string, FormErrors>>({})

    const productForm =  ref<{
        name: string
        description: string
        task: string
        image?: File
        startDate: string
        endDate: string
    }>({
        name : '',
        description: '',
        task: '',
        image: undefined,
        startDate: '',
        endDate:'',
    })

    const productLinks = ref<ProductLink[]>([])
    const productTechs = ref<ProductTech[]>([])

    const newProductLink = ref<{title:string, url:string}>({ title:'', url:''})

    const imageUrl = ref<string>('')

    const assignedTechIds = ref<string[]>([])
    const selectedTechIds = ref<string[]>([])

    const techs = ref<TechType[]>([])

    const setIdLoading = (list: Ref<string[]>, id: string, loading: boolean) => {
        if (loading) {
            if (!list.value.includes(id)) {
                list.value.push(id)
            }
        } else {
            list.value = list.value.filter(itemId => itemId !== id)
        }
    }

    const handleEditProduct = async () => {
        if (isUpdateProductLoading.value) return
        if (!props.product) return

        try {
            isUpdateProductLoading.value = true
            productErrors.value = {}

            let payload: UpdateProductRequest = productForm.value;
            if (!productForm.value.image) {
                const { image, ...rest } = productForm.value;
                payload = rest;
            }

            const res = await updateProduct(props.product.id, payload)

            const index = products.value?.findIndex(currentProduct => currentProduct.id === props.product?.id)

            if (index === -1) return

            products.value[index] = res.data

            imageUrl.value = res.data.image

            toast.success('Update product success')
        } catch (error: any) {
            productErrors.value = error.response?.data?.errors
            toast.error(
                error.response?.data?.message ??
                'Update product fail'
            )
        }finally {
            isUpdateProductLoading.value = false
        }
    }

    const handleDeleteProduct = async () => {
        if (isDeleteProductLoading.value) return
        if(!props.product) return

        try {
            isDeleteProductLoading.value = true
            const res = await deleteProduct(props.product.id)

            products.value = products.value.filter(currentProduct => currentProduct.id != props.product?.id)
            emit('close')
            toast.success(res.message)
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        } finally {
            isDeleteProductLoading.value = false
        }
    }

    const handleAssignTechs = async () => {
        if (isAssignTechLoading.value) return
        if(!props.product) return

        const validSelectedIds = selectedTechIds.value.filter(idValue => {
            const matchedOption = techOptions.value.find(
                option => option.key === idValue
            )

            return matchedOption ? !matchedOption.disabled : false
        })
        try {
            isAssignTechLoading.value = true
            techErrors.value = {}
            const techAssignments: { techId: string }[] =
                validSelectedIds.map(idValue => ({
                    techId: idValue
                })
            )
            const res = await assignTechs(props.product.id, {
                techs: techAssignments
            })

            productTechs.value = res.data

            const index = products.value?.findIndex(currentProduct => currentProduct.id === props.product?.id)

            if (index === -1) return

            const product = products.value[index]

            if (!product) return

            product.productTechs = productTechs.value

            const ids = productTechs.value.map(
                productTech => productTech.id
            )

            assignedTechIds.value = ids
            selectedTechIds.value = ids

            showTechForm.value = false

            toast.success(res.message)
        } catch (error: any) {
            techErrors.value = error.response?.data?.errors
            toast.error(error.response?.data?.message)
            
        }finally {
            isAssignTechLoading.value = false
        }
    }

    const handleUnassignTech = async (id: string)=>{
        if (unassignTechIds.value.includes(id)) return
        if (!props?.product) return

        try {
            setIdLoading(unassignTechIds, id, true)

            const res = await unassignProductTech(props.product?.id, id)

            productTechs.value = productTechs.value?.filter(itemValue => 
                itemValue.id !== id
            )

            assignedTechIds.value = assignedTechIds.value.filter(techId => techId !== id)
            selectedTechIds.value = selectedTechIds.value.filter(techId => techId !== id)

            const index = products.value?.findIndex(currentProduct => currentProduct.id === props.product?.id)

            if (index === -1) return

            const product = products.value[index]

            if (!product) return

            product.productTechs = productTechs.value

            toast.success(res.message)
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }finally {
            setIdLoading(unassignTechIds, id, false)
        }
    }

    const handleAddLink = async ()=>{
        if (isAddLinkLoading.value) return
        if(!props.product) return

        try {
            isAddLinkLoading.value = true
            linkErrors.value = {}
            const res = await createProductLink(props.product.id, newProductLink.value)

            const index = products.value?.findIndex(currentProduct => currentProduct.id === props.product?.id)

            if (index === -1) return

            const product = products.value[index]

            if (!product) return

            product.productLinks.push(res.data)
            productLinks.value = product.productLinks
            toast.success(res.message)

            newProductLink.value.title = ""
            newProductLink.value.url = ""
            showLinkForm.value = false
        } catch (error: any) {
            linkErrors.value = error.response?.data?.errors
            toast.error(error.response?.data?.message)
        } finally {
            isAddLinkLoading.value = false
        }
    }

    const handleUpdateLink = async (currentProductLink: ProductLink)=>{
        if (updatingLinkIds.value.includes(currentProductLink.id)) return

        if(!props.product) return

        try {
            setIdLoading(updatingLinkIds, currentProductLink.id, true)
            linkEditErrors.value[currentProductLink.id] = {}

            const res = await updateProductLink(currentProductLink.id, 
                 {
                    title: currentProductLink.title,
                    url: currentProductLink.url
                }
            )

            console.log(res.data)

            const productIndex = products.value.findIndex(
                product => product.id === props.product?.id
            )

            if (productIndex === -1) return

            const product =  products.value[productIndex]

            if (!product) return
            const linkIndex = product.productLinks.findIndex(
                link => link.id === currentProductLink.id
            )

            if (linkIndex === -1) return

            product.productLinks[linkIndex] = res.data

            toast.success(res.message)
        } catch (error: any) {
            linkEditErrors.value[currentProductLink.id] =error.response?.data?.errors
            toast.error(error.response?.data?.message)
        }finally {
            setIdLoading(updatingLinkIds, currentProductLink.id, false)
        }
    }

    const handleDeleteLink = async (id: string)=>{
        if (deletingLinkIds.value.includes(id)) return
        if(!props.product) return

        try {
            setIdLoading(deletingLinkIds, id, true)
            const res = await deleteProductLink(id)

            productLinks.value = productLinks.value.filter(
                link => link.id !== id
            )

            const productIndex = products.value.findIndex(
                product => product.id === props.product?.id
            )

            if (productIndex === -1) return

            const product =  products.value[productIndex]

            if (!product) return

            product.productLinks = productLinks.value

            toast.success(res.message)
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        } finally {
            setIdLoading(deletingLinkIds, id, false)
        }
    }

    const fetchTechs = async () => {
        try {
            const res = await getTechs();

            techs.value = res.data
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Get techs fail")
        }
    }

    onMounted(fetchTechs)

    const techOptions = computed<{key: string;value: string;disabled?: boolean}[]>(() =>
        techs.value.map(tech => ({
            key: tech.id,
            value: tech.name,
            disabled:
                assignedTechIds.value.includes(tech.id)
        }))
    )

    watch(
        ()=>props.product,
        (newProduct)=>{
            if(newProduct){
                productForm.value.name = newProduct.name
                productForm.value.description = newProduct.description
                productForm.value.task = newProduct.task
                productForm.value.startDate = newProduct.startDate
                productForm.value.endDate = newProduct.endDate

                imageUrl.value = newProduct.image
                productLinks.value = newProduct.productLinks
                productTechs.value = newProduct.productTechs
                const ids = newProduct.productTechs.map(
                    productTech => productTech.id
                )

                assignedTechIds.value = ids
                selectedTechIds.value = ids

                showTechForm.value = false
                showLinkForm.value = false
                
                productErrors.value = {}
                techErrors.value = {}
                linkErrors.value = {}
                linkEditErrors.value = {}

                isUpdateProductLoading.value = false
                isDeleteProductLoading.value = false
                isAssignTechLoading.value = false
                isAddLinkLoading.value = false

                updatingLinkIds.value = []
                deletingLinkIds.value = []
                unassignTechIds.value = []
            }
        },
        { immediate: true }
    )
</script>
<template>
    <BaseModal :open="open" @close="emit('close')" style="width: 80vh!important;">
        <h1 style="text-align: center;">Product</h1>
        <!-- Basic Information of product -->
        <Input :error="productErrors?.name?.[0]" label="Name" placeholder="E-commerce website" v-model="productForm.name"/>
        <Textarea :error="productErrors?.description?.[0]" label="Description" placeholder="A website sell ...." v-model="productForm.description"/>
        <Input :error="productErrors?.task?.[0]" label="Task" placeholder="Fullstack Developer" v-model="productForm.task"/>
        <Input :error="productErrors?.image?.[0]" label="Image" type="file" v-model="productForm.image"/>
        <img style="width: 60px; object-fit: contain;" :src="imageUrl" alt="">
        <Input :error="productErrors?.startDate?.[0]" label="Start date" type="date" v-model="productForm.startDate"/>
        <Input :error="productErrors?.endDate?.[0]" label="End date" type="date" v-model="productForm.endDate"/>
        <div style="display: flex; gap: 12px">
            <button class="btn" :disabled="isUpdateProductLoading" @click="handleEditProduct">
                 {{ isUpdateProductLoading ? "Loading..." : "Edit product" }}
            </button>
            <button class="btn" :disabled="isDeleteProductLoading" @click="handleDeleteProduct">
                {{ isDeleteProductLoading ? "Deleting..." : "Delete product" }}
            </button>
        </div>
        <!-- Tech of Product -->
        <div class="section">
            <div class="section-header">
                <h3>Techs of product</h3>
                <button class="btn" @click="showTechForm = !showTechForm">Assign Tech</button>
            </div>
            <div class="section-form" v-if="showTechForm">
                <div style="max-height: 210px; overflow-y: auto;">
                    <Input 
                        :error="techErrors?.techs?.[0]"
                        type="checkbox" 
                        v-model="selectedTechIds" 
                        label="Techs" 
                        :options="techOptions"
                    />
                </div>
                <button class="btn" :disabled="isAssignTechLoading" @click="handleAssignTechs">
                    {{ isAssignTechLoading ? "Loading..." : "Assign Techs" }}
                </button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px; margin: 6px 0;">
                <Tech 
                    allow-unassign-product
                    v-for="tech in productTechs" 
                    :key="tech.id"
                    size="small" 
                    @unassigned="handleUnassignTech"
                    :item="tech"
                    :product-id="props.product?.id"
                    :loading="unassignTechIds.includes(tech.id)"
                />
            </div>
        </div>
        <!-- Link of product -->
        <div class="product-section">
            <div class="section-header">
                <h3>Links of product</h3>
                <button class="btn" @click="showLinkForm = !showLinkForm">Add new link</button>
            </div>
            <div class="section-form" v-if="showLinkForm">
                <Input :error="linkErrors?.title?.[0]" label="Title" placeholder="live Demo" v-model="newProductLink.title"/>
                <Input :error="linkErrors?.url?.[0]" label="Link" placeholder="http://..." v-model="newProductLink.url"/>
                <button class="btn" :disabled="isAddLinkLoading" @click="handleAddLink">
                    {{ isAddLinkLoading ? "Loading..." : "Add new" }}
                </button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px; margin: 6px 0;">
                <div class="url-item" v-for="(productLink, index) in productLinks" :key="index">
                    <div class="row-header">
                        <h4>Url {{ index + 1 }}</h4>
                        <div style="display:flex; gap:10px">
                            <button :disabled="updatingLinkIds.includes(productLink.id)" @click="handleUpdateLink(productLink)">
                                {{ updatingLinkIds.includes(productLink.id) ? "Loading..." : "Edit" }}
                            </button>
                            <button :disabled="deletingLinkIds.includes(productLink.id)" @click="handleDeleteLink(productLink.id)">
                                {{ deletingLinkIds.includes(productLink.id) ? "Deleting..." : "Delete" }}
                            </button>
                        </div>
                    </div>
                    <Input :error="linkEditErrors?.[productLink.id]?.title?.[0]" label="Title" placeholder="live Demo" v-model="productLink.title"/>
                    <Input :error="linkEditErrors?.[productLink.id]?.url?.[0]" label="Link" placeholder="http://..." v-model="productLink.url"/>
                </div>
            </div>
        </div>
    </BaseModal>
</template>
<style scoped>
    .btn{
        padding:6px 12px;
        margin: 12px 0px;
        border-radius: 9px;
        cursor: pointer;
    }
    .row-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .product-section{
        margin: 12px 0;;
    }
    .section-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 12px 0;
    }
    .section-form{
        padding: 6px 12px;
        margin: 12px 0;
        border: 1px solid gray;
        border-radius: 9px;
    }
    .url-item{
        padding: 6px 12px;
        box-shadow: 0px 0px 1px;
        border-radius: 9px;
    }
</style>