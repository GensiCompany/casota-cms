<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách sản phẩm con" />
                <div class="flex gap-5">
                    <nuxt-link :to="`/products/${product._id}`">
                        <a-button type="default">
                            Quay lại
                        </a-button>
                    </nuxt-link>
                    <a-button
                        type="primary"
                        class="!bg-prim-100 !border-prim-100"
                        @click="$refs.VariantDialog.open()"
                    >
                        <i class="fas fa-plus mr-2" />
                        Thêm mới
                    </a-button>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <VariantsTable :variants="variants" :loading="loading" />
        </div>

        <VariantDialog ref="VariantDialog" :product-selected-id="$route.params.id" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import VariantsTable from '@/components/products/variants/Table.vue';
    import VariantDialog from '@/components/products/variants/Dialog.vue';

    export default {
        components: {
            VariantsTable,
            VariantDialog,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                loading: false,
            };
        },

        computed: {
            ...mapState('products/variants', ['variants']),
            ...mapState('products', ['product']),
            breadcrums() {
                return [{
                    label: `${this.product.title}`,
                    link: `/products/${this.product._id}`,
                }, {
                    label: 'Danh sách sản phẩm con',
                    link: `/products/${this.product._id}/variants`,
                }];
            },
        },

        watch: {
            product() {
                this.$store.commit('breadcrumbs/SET_BREADCRUMBS', this.breadcrums);
            },
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('products/fetchDetail', this.$route.params.id);
                    await this.$store.dispatch('products/variants/fetchAll', this.$route.params.id);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Quản lý sản phẩm',
            };
        },
    };
</script>
