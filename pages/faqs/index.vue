<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Cài đặt câu hỏi thường gặp" />
                <div class="flex gap-5">
                    <a-button type="primary" class="!bg-prim-100 !border-prim-100" @click="$refs.FaqsDialog.open()">
                        <i class="fas fa-plus mr-2" />
                        Thêm mới
                    </a-button>
                </div>
            </div>
        </div>

        <a-empty v-if="faqs.length === 0" class="block !mt-20">
            <span slot="description">
                Không có dữ liệu
            </span>
        </a-empty>
        <div v-else class="mt-8 grid grid-cols-1 gap-5">
            <FaqsQuestion
                v-for="faq in faqs"
                :key="faq._id"
                :faq="faq"
                :loading="loading"
                @open="$refs.FaqsDialog.open(faq)"
            />
        </div>

        <FaqsDialog ref="FaqsDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import FaqsDialog from '@/components/faqs/Dialog.vue';
    import FaqsQuestion from '@/components/faqs/Question.vue';

    export default {
        components: {
            FaqsDialog,
            FaqsQuestion,
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
            ...mapState('faqs', ['faqs', 'pagination']),
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Câu hỏi thường gặp',
                link: '/faqs',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('faqs/fetchAll');
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
