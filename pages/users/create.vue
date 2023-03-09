<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header show-back text="Thêm mới người dùng" />
                <div class="flex gap-5">
                    <a-button
                        :loading="loading"
                        type="primary"
                        class="!bg-prim-100 !border-prim-100"
                        @click="$refs.UsersForm.submit()"
                    >
                        <i class="fas fa-pen mr-2" />
                        Tạo mới
                    </a-button>
                </div>
            </div>
        </div>
        <a-spin :spinning="loading">
            <div class="mt-6">
                <UsersForm ref="UsersForm" :is-edit="true" @submit="createUser" />
            </div>
        </a-spin>
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import UsersForm from '@/components/users/Form.vue';

    export default {
        components: {
            UsersForm,
        },

        data() {
            return {
                loading: false,
            };
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [
                {
                    label: 'Quản lý người dùng',
                    link: '/users',
                }, {
                    label: 'Thêm mới người dùng',
                    link: '/users/create',
                },
            ]);
        },

        methods: {
            mapDataFromOptions,

            async createUser(form) {
                try {
                    this.loading = true;
                    await this.$api.users.create(form);
                    this.$message.success('Tạo mới người dùng thành công');
                    this.$nuxt.refresh();
                    this.$router.push('/users');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Thêm mới người dùng',
            };
        },
    };
</script>
