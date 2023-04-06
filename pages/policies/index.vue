<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Quản lý chính sách" />
                <div v-if="!isCreate" class="flex gap-5">
                    <nuxt-link to="/policies/create">
                        <a-button type="primary" class="!bg-prim-100 !border-prim-100">
                            <i class="fas fa-plus mr-2" />
                            Thêm mới
                        </a-button>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <PoliciesTable
                :policies="policies"
                :loading="loading"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import PoliciesTable from '@/components/policies/Table.vue';
    import { PAGE, PAGE_OPTIONS } from '@/constants/policies/page';

    export default {
        components: {
            PoliciesTable,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                PAGE_OPTIONS,
                loading: false,
            };
        },

        computed: {
            ...mapState('policies', ['policies']),
            isCreate() {
                const dataHandle = [];
                this.policies.forEach((element) => {
                    if (Object.values(PAGE).includes(element.page)) {
                        dataHandle.push(element);
                    }
                });
                return dataHandle.length === PAGE_OPTIONS.length;
            },
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Danh sách chính sách',
                link: '/policies',
            }]);
        },

        methods: {
            mapDataFromOptions,

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
        },

        head() {
            return {
                title: 'Quản lý chính sách',
            };
        },
    };
</script>
