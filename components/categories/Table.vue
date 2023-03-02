<template>
    <div>
        <a-table
            :data-source="categories"
            :pagination="false"
            :scroll="{ x: 1200 }"
            :row-key="(row) => row._id"
            :loading="loading"
        >
            <a-table-column
                key="index"
                title="STT"
                align="center"
                :width="60"
                :custom-render="(text, record, index) => index + 1"
            />
            <a-table-column
                key="thumbnail"
                title="Thumbnail danh mục"
                :width="150"
                data-index="thumbnail"
            >
                <template #default="thumbnail">
                    <img v-if="thumbnail !== ''" :src="thumbnail" alt="" class="rounded-md w-full h-20 object-cover">
                    <p v-else>Không có dữ liệu</p>
                </template>
            </a-table-column>
            <a-table-column
                key="title"
                title="Tên danh mục"
                :width="300"
                data-index="title"
                align="center"
            />
            <a-table-column
                key="createdAt"
                data-index="createdAt"
                title="Ngày tạo"
                align="center"
                :width="150"
            >
                <template #default="createdAt">
                    {{ createdAt | dateFormat('HH:mm dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column
                key="action"
                title="Thao tác"
                align="center"
                :width="100"
                fixed="right"
            >
                <template #default="category">
                    <a-button
                        type="primary"
                        shape="circle"
                        @click="() => {
                            categorySelected = category,
                            $refs.categoryDialog.open(category)
                        }"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="css-i6dzq1 mx-auto"
                        ><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                    </a-button>
                    <a-button
                        type="primary"
                        shape="circle"
                        @click="() => {
                            categorySelected = category,
                            $refs.confirmDelete.open()}"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="css-i6dzq1 mx-auto"
                        ><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line
                            x1="10"
                            y1="11"
                            x2="10"
                            y2="17"
                        /><line
                            x1="14"
                            y1="11"
                            x2="14"
                            y2="17"
                        /></svg>
                    </a-button>
                </template>
            </a-table-column>
        </a-table>

        <ConfirmDialog
            ref="confirmDelete"
            title="Xóa danh mục"
            content="Bạn chắc chắn xóa danh mục này ?"
            @confirm="confirmDelete"
        />
        <CategoryDialog ref="categoryDialog" :category="categorySelected" />
    </div>
</template>

<script>
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import CategoryDialog from '@/components/categories/Dialog.vue';

    export default {
        components: {
            ConfirmDialog,
            CategoryDialog,
        },

        props: {
            categories: {
                type: Array,
                default: () => [],
            },
            loading: {
                type: Boolean,
                default: false,
            },
        },

        // async asyncData({ store, query }) {
        //     await store.dispatch('posts/categories/fetchAll', query);
        // },

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
                    await this.$api.categories.delete(this.categorySelected._id);
                    this.$message.success('Xóa thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
