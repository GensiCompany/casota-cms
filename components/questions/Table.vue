<template>
    <div>
        <a-table
            :data-source="questions"
            :pagination="false"
            :scroll="{ x: 1200 }"
            :row-key="(row) => row._id"
            :loading="loading"
            bordered
        >
            <a-table-column
                key="index"
                title="STT"
                align="center"
                :width="60"
                :custom-render="(text, record, index) => index + 1"
            />
            <a-table-column
                key="question"
                title="Câu hỏi"
                :width="100"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.title }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="anwser"
                title="Câu trả lời"
                :width="100"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.email }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="status"
                title="Trạng thái"
                :width="150"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.status }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="action"
                title="Thao tác"
                align="center"
                :width="100"
            >
                <template #default="record">
                    <a-button
                        type="primary"
                        shape="circle"
                    >
                        <i class="isax isax-pen" />
                        <span class="hidden">{{ record }}</span>
                    </a-button>
                    <a-button
                        type="primary"
                        shape="circle"
                    >
                        <i class="isax isax-trash" />
                    </a-button>
                </template>
            </a-table-column>
        </a-table>
        <Pagination class="mt-5" :data="pagination" />
        <ConfirmDialog
            ref="confirmDelete"
            title="Xóa danh mục"
            content="Bạn chắc chắn xóa danh mục này ?"
            @confirm="confirmDelete"
        />
    </div>
</template>

<script>
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import Pagination from '@/components/shared/Pagination.vue';

    export default {
        components: {
            Pagination,
            ConfirmDialog,
        },
        props: {
            questions: {
                type: Array,
                default: () => [],
            },
            loading: {
                type: Boolean,
                default: false,
            },
            pagination: {
                type: Object,
                required: false,
            },
        },

        data() {
            return {
                categorySelected: null,
            };
        },
        computed: {
        },
        methods: {
            async confirmDelete() {
                try {
                    await this.$api.postCategories.delete(this.categorySelected._id);
                    this.$message.success('Xóa thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
