<template>
    <div>
        <a-table
            :data-source="feedbacks"
            :pagination="false"
            :scroll="{ x: 1000 }"
            :row-key="(row) => row._id"
            :loading="loading"
        >
            <a-table-column
                key="index"
                title="STT"
                align="center"
                :width="60"
                :custom-render="
                    (text, record, index) =>index + 1"
            />
            <a-table-column
                key="avatar"
                title="Ảnh đại diện"
                :width="120"
                data-index="avatar"
                align="center"
            >
                <template #default="avatar">
                    <img :src="avatar" alt="" class="rounded-full mx-auto w-16 h-16 object-cover">
                </template>
            </a-table-column>
            <a-table-column
                key="fullname"
                title="Tên hiển thị"
                :width="150"
                data-index="fullname"
            />
            <a-table-column
                key="content"
                title="Nội dung"
                :width="300"
                data-index="content"
            >
                <template #default="content">
                    <span class="line-clamp-3">{{ content }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="position"
                title="Chức danh"
                :width="150"
                data-index="position"
                align="center"
            />
            <a-table-column
                key="status"
                title="Hiển thị"
                :width="120"
                align="center"
            >
                <template #default="feedback">
                    <a-switch
                        :default-checked="feedback.status === 'active' ? true : false"
                        @click="updateStatus(feedback)"
                        @change="onChange"
                    />
                </template>
            </a-table-column>
            <a-table-column
                key="createdAt"
                data-index="createdAt"
                title="Ngày tạo"
                align="center"
                :width="130"
            >
                <template #default="createdAt">
                    {{ createdAt | dateFormat('dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column
                key="action"
                title="Thao tác"
                align="center"
                :width="100"
            >
                <template #default="feedback">
                    <a-button
                        type="primary"
                        shape="circle"
                        class="!leading-[10px]"
                        @click="() => {
                            feedbackSelected = feedback,
                            $refs.feedbackDialog.open(feedback)
                        }"
                    >
                        <i class="isax isax-edit" />
                    </a-button>
                    <a-button
                        type="primary"
                        shape="circle"
                        class="!leading-[10px]"
                        @click="() => {
                            feedbackSelected = feedback,
                            $refs.confirmDelete.open()}"
                    >
                        <i class="isax isax-trash" />
                    </a-button>
                </template>
            </a-table-column>
        </a-table>

        <Pagination :data="pagination" />

        <ConfirmDialog
            ref="confirmDelete"
            title="Xóa phản hồi"
            content="Bạn chắc chắn xóa phản hồi này ?"
            @confirm="confirmDelete"
        />
        <FeedbackDialog ref="feedbackDialog" :feedback="feedbackSelected" />
    </div>
</template>

<script>
    import Pagination from '@/components/shared/Pagination.vue';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import FeedbackDialog from '@/components/feedbacks/Dialog.vue';

    export default {
        components: {
            ConfirmDialog,
            FeedbackDialog,
            Pagination,
        },

        props: {
            feedbacks: {
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
                feedbackSelected: null,
                statusWitch: null,
            };
        },
        computed: {
        },

        watch: {
        },
        methods: {
            async updateStatus(feedback) {
                this.feedbackSelected = feedback;
                try {
                    this.$api.feedbacks.update(this.feedbackSelected._id, { status: this.statusWitch ? 'active' : 'inactive' });
                    this.statusWitch = null;
                    this.$message.success('Thay đổi trạng thái thành công');
                } catch (e) {
                    this.$handleError(e);
                }
            },
            onChange(feedback) {
                this.statusWitch = feedback;
            },
            async confirmDelete() {
                try {
                    await this.$api.feedbacks.delete(this.feedbackSelected._id);
                    this.$message.success('Xóa thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
