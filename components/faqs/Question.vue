<template>
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
                        <a-menu-item @click="openDetailDialog">
                            <nuxt-link to="/">
                                Xem chi tiết
                            </nuxt-link>
                        </a-menu-item>
                        <a-menu-item @click="openDetailDialog">
                            <nuxt-link to="/">
                                Chỉnh sửa
                            </nuxt-link>
                        </a-menu-item>
                        <a-menu-item class="!text-danger-100" @click="deleteQuetion">
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
</template>

<script>
    export default {
        props: {
            faq: {
                type: Object,
                default: () => {},
            },
        },

        methods: {
            openDetailDialog() {
                this.$emit('open');
            },

            deleteQuetion() {
                this.$emit('delete');
            },
        },
    };
</script>
