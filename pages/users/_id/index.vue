<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header show-back :text="`Khách hàng: ${user.fullname || ''}`" />
                <div class="flex gap-5">
                    <nuxt-link :to="`/users/${user._id}/edit`">
                        <a-button type="primary" class="!bg-prim-100 !border-prim-100">
                            <i class="isax isax-edit mr-2" />
                            Chỉnh sửa
                        </a-button>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="mt-6">
            <UsersForm ref="UsersForm" :user="user" />
        </div>
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
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [
                {
                    label: 'Quản lý khách hàng',
                    link: '/users',
                }, {
                    label: 'Chi tiết khách hàng',
                    link: `/users/${this.user._id}`,
                },
            ]);
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
        },

        head() {
            return {
                title: 'Quản lý khách hàng',
            };
        },
    };
</script>
