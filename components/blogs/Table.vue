<template>
    <div>
        <a-table
            :data-source="blogs"
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
                :custom-render="(text, record, index) => index+1"
            />
            <a-table-column
                key="thumbnail"
                title="Ảnh"
                :width="150"
                align="center"
                data-index="thumbnail"
            >
                <template #default="thumbnail">
                    <div class="border-[1px] border-solid border-gray-5 rounded-md">
                        <img
                            v-if="thumbnail !== ''"
                            :src="thumbnail"
                            alt=""
                            class="rounded-md w-full h-20 object-cover"
                        >
                        <p v-else>
                            Không có dữ liệu
                        </p>
                    </div>
                </template>
            </a-table-column>
            <a-table-column
                key="name"
                title="Tiêu đề"
                :width="300"
            >
                <template #default="record">
                    <nuxt-link :to="`/blogs/${record.slug}`" class="hover:underline overflow-hidden" style="display: -webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp:2">
                        {{ record.title }}
                    </nuxt-link>
                </template>
            </a-table-column>
            <a-table-column
                key="category"
                title="Danh mục"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.category?.title || '- -' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="status"
                title="Trạng thái"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <a-switch
                        :default-checked="record.status === 'active' ? true : false"
                        @change="onChange(record)"
                    />
                </template>
            </a-table-column>
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
                :width="60"
                align="right"
                fixed="right"
            >
                <template #default="scope">
                    <a-dropdown :trigger="['click']">
                        <a-button class="!mr-0" size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <nuxt-link :to="`/blogs/${scope._id}/edit`">
                                    Chỉnh sửa
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item class="!text-danger-100" @click="() => { $refs.confirmDelete.open(), blogSelected = scope }">
                                Xóa
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
        <Pagination :data="pagination" />
        <ConfirmDialog
            ref="confirmDelete"
            title="Xác nhận xóa bài viết"
            content="Bạn chắc chắn xóa bài viết này chứ ?"
            @confirm="confirmDelete"
        />
    </div>
</template>

<script>
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import Pagination from '@/components/shared/Pagination.vue';

    export default {
        components: {
            ConfirmDialog,
            Pagination,
        },

        props: {
            blogs: {
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
                blogSelected: null,
            };
        },

        computed: {
        },

        methods: {
            async confirmDelete() {
                try {
                    await this.$api.blogs.delete(this.blogSelected._id);
                    this.$message.success('Xóa bài viết thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },

            async onChange(_blog) {
                try {
                    await this.$api.blogs.update(
                        _blog._id,
                        { ..._blog, status: _blog === 'active' ? 'inactive' : 'active' },
                    );
                    this.$message.success('Thay đổi trạng thái thành công');
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
