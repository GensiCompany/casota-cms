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

        <div class="mt-8 grid grid-cols-1 gap-5">
            <div class="xl:max-w-[80%] w-full mx-auto">
                <div class="flex justify-between items-center bg-[#f1f1f1] py-3 px-3 rounded-t-sm">
                    <div class="flex items-center gap-3">
                        <span class="bg-prim-100 text-white rounded-full text-center text-lg w-8 h-8 leading-8">1</span>
                        <h2 class="text-xl mb-0">
                            Đây là câu hỏi số 1
                        </h2>
                    </div>
                    <div>
                        <a-dropdown :trigger="['click']">
                            <a-button class="!mr-0" size="small">
                                <i class="fas fa-ellipsis-h" />
                            </a-button>
                            <a-menu slot="overlay" class="!w-40">
                                <a-menu-item>
                                    <nuxt-link to="/">
                                        Xem chi tiết
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item>
                                    <nuxt-link to="/">
                                        Chỉnh sửa
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item class="!text-danger-100">
                                    Xóa
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>
                </div>
                <div class="py-3 px-5 rounded-b-md border-x-[2px] border-b-[2px] border-solid border-gray-10">
                    Đây là câu trả lời cho câu hỏi
                </div>
            </div>

            <div class="xl:max-w-[80%] w-full mx-auto">
                <div class="flex justify-between items-center bg-[#f1f1f1] py-3 px-3 rounded-t-sm">
                    <div class="flex items-center gap-3">
                        <span class="bg-prim-100 text-white rounded-full text-center text-lg w-8 h-8 leading-8">1</span>
                        <h2 class="text-xl mb-0">
                            Đây là câu hỏi số 1
                        </h2>
                    </div>
                    <div>
                        <a-dropdown :trigger="['click']">
                            <a-button class="!mr-0" size="small">
                                <i class="fas fa-ellipsis-h" />
                            </a-button>
                            <a-menu slot="overlay" class="!w-40">
                                <a-menu-item>
                                    <nuxt-link to="/">
                                        Xem chi tiết
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item>
                                    <nuxt-link to="/">
                                        Chỉnh sửa
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item class="!text-danger-100">
                                    Xóa
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>
                </div>
                <div class="py-3 px-5 rounded-b-md border-x-[2px] border-b-[2px] border-solid border-gray-10">
                    Đây là câu trả lời cho câu hỏi
                </div>
            </div>

            <div class="xl:max-w-[80%] w-full mx-auto">
                <div class="flex justify-between items-center bg-[#f1f1f1] py-3 px-3 rounded-t-sm">
                    <div class="flex items-center gap-3">
                        <span class="bg-prim-100 text-white rounded-full text-center text-lg w-8 h-8 leading-8">1</span>
                        <h2 class="text-xl mb-0">
                            Đây là câu hỏi số 1
                        </h2>
                    </div>
                    <div>
                        <a-dropdown :trigger="['click']">
                            <a-button class="!mr-0" size="small">
                                <i class="fas fa-ellipsis-h" />
                            </a-button>
                            <a-menu slot="overlay" class="!w-40">
                                <a-menu-item>
                                    <nuxt-link to="/">
                                        Xem chi tiết
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item>
                                    <nuxt-link to="/">
                                        Chỉnh sửa
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item class="!text-danger-100">
                                    Xóa
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>
                </div>
                <div class="py-3 px-5 rounded-b-md border-x-[2px] border-b-[2px] border-solid border-gray-10">
                    Đây là câu trả lời cho câu hỏi
                </div>
            </div>

            <div class="xl:max-w-[80%] w-full mx-auto">
                <div class="flex justify-between items-center bg-[#f1f1f1] py-3 px-3 rounded-t-sm">
                    <div class="flex items-center gap-3">
                        <span class="bg-prim-100 text-white rounded-full text-center text-lg w-8 h-8 leading-8">1</span>
                        <h2 class="text-xl mb-0">
                            Đây là câu hỏi số 1
                        </h2>
                    </div>
                    <div>
                        <a-dropdown placement="bottomLeft" :trigger="['click']">
                            <a-button class="!mr-0" size="small">
                                <i class="fas fa-ellipsis-h" />
                            </a-button>
                            <a-menu slot="overlay" class="!w-40">
                                <a-menu-item>
                                    <nuxt-link to="/">
                                        Xem chi tiết
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item>
                                    <nuxt-link to="/">
                                        Chỉnh sửa
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item class="!text-danger-100">
                                    Xóa
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>
                </div>
                <div class="py-3 px-5 rounded-b-md border-x-[2px] border-b-[2px] border-solid border-gray-10">
                    Đây là câu trả lời cho câu hỏi
                </div>
            </div>
        </div>

        <FaqsDialog ref="FaqsDialog" />
    </div>
</template>

<script>
    // import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import FaqsDialog from '@/components/faqs/Dialog.vue';

    export default {
        components: {
            FaqsDialog,
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
                link: '/faqs',
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
