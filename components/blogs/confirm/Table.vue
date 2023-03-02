<template>
    <div>
        <a-table
            :data-source="businessAreas"
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
                :custom-render="(text, record, index) => $helpers.getTableIndex(pagination, index)"
            />
            <a-table-column
                key="thumbnail"
                title="Ảnh"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <img :src="record.thumbnail" alt="/" class="rounded-md h-16 w-full object-cover"/>
                </template>
            </a-table-column>
            <a-table-column
                key="title"
                title="Tiêu đề"
                :width="150"
            >
                <template #default="record">
                    <nuxt-link :to="`/bussiness-area/${record.slug}`" class="hover:underline overflow-hidden" style="display: -webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp:2">
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
                    <span>{{ record.category.label || '- -' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="name"
                title="Tác giả"
                :width="200"
                align="center"
            >
                <template #default="record">
                    <span class="line-clamp-3">{{ record.name || '- -' }}</span>
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
                    {{ createdAt | dateFormat('HH:mm dd/MM/yyyy') }}
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
                                <nuxt-link :to="`/bussiness-area/confirm/${scope.slug}`">
                                    Xem chi tiết
                                </nuxt-link>
                            </a-menu-item>
                            <!-- <a-menu-item>
                                <p @click="() => { $refs.confirmPass.open(), postSelected = scope }">
                                    Chấp nhận
                                </p>
                            </a-menu-item>
                            <a-menu-item class="!text-danger-100" @click="() => { $refs.confirmReject.open(), postSelected = scope }">
                                Xóa
                            </a-menu-item> -->
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
        <Pagination :data="pagination" />
        <ConfirmDialog
            ref="confirmReject"
            title="Không phê duyệt bài viết"
            content="Bạn chắc chắn không phê duyệt bài viết ?"
            @confirm="confirmReject"
        />
        <ConfirmDialog
            ref="confirmPass"
            title="Duyệt bài viết"
            content="Bạn chắc chắn duyệt bài viết này chứ ?"
            @confirm="confirmPass"
        />
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import { STATUS, STATUS_OPTIONS } from '@/constants/businessAreas/status';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import Pagination from '@/components/shared/Pagination.vue';

    export default {
        components: {
            ConfirmDialog,
            Pagination,
        },

        props: {
            businessAreas: {
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
                STATUS,
                STATUS_OPTIONS,
                postSelected: null,
            };
        },

        computed: {
            STATUS_LABEL() {
                return this.mapDataFromOptions(STATUS_OPTIONS, 'value', 'label');
            },

            STATUS_COLOR() {
                return this.mapDataFromOptions(STATUS_OPTIONS, 'value', 'color');
            },
        },

        methods: {
            mapDataFromOptions,
            async confirmReject() {
                try {
                    await this.$api.postConfirms.reject(this.postSelected.slug);
                    this.$message.success('Thao tác thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
            async confirmPass() {
                try {
                    await this.$api.postConfirms.confirm(this.postSelected.slug);
                    this.$message.success('Xóa bài viết thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
