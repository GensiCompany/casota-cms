<template>
    <div>
        <a-table
            :data-source="products"
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
                :custom-render="(text, record, index) => index + 1"
            />
            <a-table-column
                key="thumbnail"
                title="Ảnh Thumbnail"
                :width="150"
                align="center"
            >
                <template #default="record">
                    <div class="border-[1px] border-solid border-gray-5 rounded-md">
                        <img
                            v-if="record.thumbnail !== ''"
                            :src="record.thumbnail"
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
                title="Tiêu đề"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <nuxt-link :to="`/products/${record._id}/variants`" class="!text-link-100 !underline hover:!no-underline">
                        {{ record.title || '--' }}
                    </nuxt-link>
                </template>
            </a-table-column>
            <a-table-column
                key="shortDescription"
                title="Mô tả ngắn"
                :width="150"
                align="center"
            >
                <template #default="record">
                    <span class="line-clamp-2">{{ record.shortDescription || '--' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="status"
                title="Trạng thái"
                :width="100"
                align="center"
            >
                <template #default="record">
                    <a-tag :color="STATUS_COLOR[record.status]">
                        {{ STATUS_LABEL[record.status] }}
                    </a-tag>
                </template>
            </a-table-column>
            <a-table-column
                key="createdAt"
                title="Ngày tạo"
                :width="100"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.createdAt | dateFormat() }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="action"
                title="Thao tác"
                align="center"
                :width="80"
            >
                <template #default="record">
                    <a-dropdown placement="bottomRight" :trigger="['click']">
                        <a-button class="!mr-0" size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay" class="!w-40">
                            <a-menu-item>
                                <nuxt-link :to="`/products/${record._id}/variants`">
                                    Xem sản phẩm con
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item>
                                <nuxt-link :to="`/products/${record._id}/edit`">
                                    Chỉnh sửa
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item
                                class="!text-danger-100"
                                :disabled="record.isDeleted"
                                @click="() => {
                                    productselected = record,
                                    $refs.ConfirmDialog.open();
                                }"
                            >
                                {{ record.isDeleted ? "Không thể xóa" : "Xóa" }}
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
        <Pagination :data="pagination" />
        <ConfirmDialog
            ref="ConfirmDialog"
            title="Xóa người dùng"
            @confirm="confirmDelete"
        >
            <div class="text-center">
                <p class="text-lg">
                    Bạn chắc chắn xóa sản phẩm này chứ?
                </p>
                <span class="block"><span class="font-semibold">Lưu ý</span>: hành động sẽ không thể hoàn tác</span>
            </div>
        </ConfirmDialog>
    </div>
</template>

<script>
    import Pagination from '@/components/shared/Pagination.vue';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import { mapDataFromOptions } from '@/utils/data';
    import { USER_GENDER_OPTIONS } from '@/constants/user/gender';
    import { USER_STATUS_OPTIONS } from '@/constants/user/status';

    export default {
        components: {
            Pagination,
            ConfirmDialog,
        },
        props: {
            products: {
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
                USER_GENDER_OPTIONS,
                USER_STATUS_OPTIONS,
                productselected: null,
            };
        },

        computed: {
            GENDER_LABEL() {
                return this.mapDataFromOptions(USER_GENDER_OPTIONS, 'value', 'label');
            },
            STATUS_LABEL() {
                return this.mapDataFromOptions(USER_STATUS_OPTIONS, 'value', 'label');
            },
            STATUS_COLOR() {
                return this.mapDataFromOptions(USER_STATUS_OPTIONS, 'value', 'color');
            },
        },

        methods: {
            mapDataFromOptions,

            async confirmDelete() {
                try {
                    await this.$api.products.delete(this.productselected._id);
                    this.$message.success('Xóa sản phẩm thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
