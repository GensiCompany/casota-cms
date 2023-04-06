<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Thêm mới chính sách" />
                <div class="flex gap-5">
                    <nuxt-link to="/policies">
                        <a-button>
                            Quay lại
                        </a-button>
                    </nuxt-link>
                    <a-button
                        type="primary"
                        :loading="loading"
                        class="!bg-prim-100 !border-prim-100"
                        @click="$refs.PolicyForm.submit()"
                    >
                        <i class="fas fa-plus mr-2" />
                        Thêm mới
                    </a-button>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <PolicyForm ref="PolicyForm" @submit="create" />
        </div>
    </div>
</template>

<script>
    import PolicyForm from '@/components/policies/Form.vue';

    export default {
        components: {
            PolicyForm,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                loading: false,
            };
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Danh sách chính sách',
                link: '/policies',
            }, {
                label: 'Thêm chính chính sách',
                link: '/policies/create',
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('policies/fetchAll');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async create(form) {
                try {
                    this.loading = true;
                    await this.$api.policies.create(form);
                    this.$message.success('Thêm chính sách thành công');
                    this.$nuxt.refresh();
                    this.$router.push('/policies');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Thêm chính chính sách',
            };
        },
    };
</script>
