<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header show-back :text="`Khách hàng: ${user.fullname || ''}`" />
                <div class="flex gap-5">
                    <a-button
                        :loading="loading"
                        type="primary"
                        class="!bg-prim-100 !border-prim-100"
                        @click="$refs.UsersForm.submit()"
                    >
                        <i class="fas fa-check mr-2" />
                        Cập nhật
                    </a-button>
                </div>
            </div>
        </div>
        <a-spin :spinning="loading">
            <div class="mt-6">
                <UsersForm
                    ref="UsersForm"
                    :user="user"
                    :is-edit="true"
                    @submit="updateUser"
                />
            </div>
        </a-spin>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import UsersForm from '@/components/users/Form.vue';

    export default {
        components: {
            UsersForm,
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
            ...mapState('users', ['user']),
            breadcrumbs() {
                return [{
                    label: 'Quản lý khách hàng',
                    link: '/users',
                }, {
                    label: 'Chi tiết khách hàng',
                    link: `/users/${this.user._id}`,
                }];
            },
        },

        watch: {
            user() {
                this.$store.commit('breadcrumbs/SET_BREADCRUMBS', this.breadcrumbs);
            },
        },

        destroyed() {
            this.$store.commit('users/SET_STATE', { prop: 'user', data: {} });
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('users/fetchDetail', this.$route.params.id);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async updateUser(form) {
                try {
                    this.loading = true;
                    await this.$api.users.update(this.$route.params.id, form);
                    this.$message.success('Cập nhật người dùng thành công');
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
                title: 'Quản lý khách hàng',
            };
        },
    };
</script>
