<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header show-back text="Quản lý khách hàng" />
                <div class="flex gap-5">
                    <a-button type="primary" class="!bg-prim-100 !border-prim-100">
                        <i class="fas fa-plus mr-2" />
                        Thêm mới
                    </a-button>
                </div>
            </div>
        </div>
        <div class="mt-6">
            <UsersForm ref="UsersForm" />
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
            ...mapState('users', ['users', 'pagination']),
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [
                {
                    label: 'Quản lý khách hàng',
                    link: '/users',
                }, {
                    label: 'Thêm mới khách hàng',
                    link: '/users/create',
                },
            ]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('users/fetchAll');
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
