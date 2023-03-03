<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Cài đặt câu hỏi thường gặp" />
                <div class="flex gap-5">
                    <a-button type="primary" class="!bg-prim-100 !border-prim-100">
                        <i class="fas fa-plus mr-2" />
                        Thêm mới
                    </a-button>
                </div>
            </div>
        </div>

        <div class="card mt-4">
            <QuestionsTable :questions="questions || []" :loading="loading" :pagination="pagination || {}" />
        </div>
    </div>
</template>

<script>
    // import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import QuestionsTable from '@/components/questions/Table.vue';

    export default {
        components: {
            QuestionsTable,
        },

        async fetch() {
            // await this.fetchData();
        },
        data() {
            return {
                loading: false,
            };
        },

        computed: {
            // ...mapState('images', ['images', 'pagination']),
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Câu hỏi thường gặp',
                link: '/questions',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    // await this.$store.dispatch('images/fetchAll');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Câu hỏi thường gặp',
            };
        },
    };
</script>
