<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header show-back text="Thêm mới sản phẩm" />
                <div class="flex gap-x-5">
                    <a-button
                        type="primary"
                        :loading="loading"
                        @click="$refs.ProductsForm.submit()"
                    >
                        Xuất bản
                    </a-button>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <ProductsForm
                ref="ProductsForm"
                @submit="submitForm"
            />
        </div>
    </div>
</template>

<script>
    import ProductsForm from '@/components/products/Form.vue';

    export default {
        components: {
            ProductsForm,
        },

        data() {
            return {
                loading: false,
            };
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Sản phẩm',
                link: '/products',
            }, {
                label: 'Thêm mới sản phẩm',
                link: '/products/create',
            }]);
        },

        methods: {
            async submitForm(payload) {
                try {
                    this.loading = true;
                    await this.$api.products.create(payload);
                    this.$message.success('Đăng sản phẩm mới thành công');
                    this.$router.push('/products');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Thêm mới sản phẩm',
            };
        },
    };
</script>
