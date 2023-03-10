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
                    <div class="border-[1px] border-solid border-gray-5 rounded-md overflow-hidden">
                        <img
                            v-if="thumbnail !== ''"
                            :src="thumbnail"
                            alt=""
                            class="w-full h-20 object-cover"
                        >
                        <p v-else>
                            Không có dữ liệu
                        </p>
                    </div>
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
                    {{ createdAt | dateFormat('dd/MM/yyyy') }}
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
                        <i class="isax isax-edit" />
                    </a-button>
                    <a-button
                        type="primary"
                        shape="circle"
                        @click="() => {
                            categorySelected = category,
                            $refs.confirmDelete.open()
                        }"
                    >
                        <i class="isax isax-trash" />
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
    import CategoryDialog from '@/components/blogs/categories/Dialog.vue';

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
                    await this.$api.blogsCategories.delete(this.categorySelected._id);
                    this.$message.success('Xóa danh mục thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
