<template>
    <div>
        <a-table
            :data-source="orders"
            :pagination="false"
            :scroll="{ x: 1250 }"
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
                key="shippingName"
                title="Người nhận"
                :width="180"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.shippingInfo ? record.shippingInfo.shippingName : '--' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="shippingPhone"
                title="Điện thoại"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.shippingInfo ? record.shippingInfo.shippingPhone : '--' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="shippingAddress"
                title="Địa chỉ"
                :width="200"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.shippingInfo ? record.shippingInfo.shippingAddress : '--' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="shippingFee"
                title="Phí Ship"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.shippingFee | currencyFormat }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="totalPrice"
                title="Tổng tiền"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.totalPrice | currencyFormat }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="finalPrice"
                title="Thanh toán"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.finalPrice | currencyFormat }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="status"
                title="Trạng thái"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <a-tag :color="STATUS_COLOR[record.status]">
                        {{ STATUS_LABEL[record.status] }}
                    </a-tag>
                </template>
            </a-table-column>
            <a-table-column
                key="action"
                title="Thao tác"
                align="center"
                :width="100"
            >
                <template #default="record">
                    <a-dropdown placement="bottomRight" :trigger="['click']">
                        <a-button class="!mr-0" size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay" class="!w-40">
                            <a-menu-item>
                                <nuxt-link :to="`/orders/${record._id}`">
                                    Xem chi tiết
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item v-if="record.status === STATUS.DRAFT">
                                <nuxt-link :to="`/orders/${record._id}/edit`">
                                    Chỉnh sửa
                                </nuxt-link>
                            </a-menu-item>

                            <a-menu-item
                                v-if="record.status === STATUS.ACCEPT"
                                class="!text-link-100"
                                @click="() => {
                                    orderSelected = record,
                                    statusSelected = STATUS.DELIVERING,
                                    $refs.StatusDialog.open();
                                }"
                            >
                                Chuyển hàng
                            </a-menu-item>
                            <a-menu-item
                                v-if="record.status === STATUS.DELIVERING"
                                class="!text-link-100"
                                @click="() => {
                                    orderSelected = record,
                                    statusSelected = STATUS.SUCCESS,
                                    $refs.StatusDialog.open();
                                }"
                            >
                                Giao thành công
                            </a-menu-item>

                            <a-menu-item
                                v-if="record.status === STATUS.PENDING"
                                class="!text-link-100"
                                @click="() => {
                                    orderSelected = record,
                                    statusSelected = STATUS.ACCEPT,
                                    $refs.StatusDialog.open();
                                }"
                            >
                                Chấp nhận
                            </a-menu-item>
                            <a-menu-item
                                v-if="record.status === STATUS.PENDING"
                                class="!text-danger-100"
                                @click="() => {
                                    orderSelected = record,
                                    statusSelected = STATUS.REJECT,
                                    $refs.StatusDialog.open();
                                }"
                            >
                                Từ chối
                            </a-menu-item>

                            <a-menu-item
                                v-if="record.status === STATUS.DRAFT || record.status === STATUS.REJECT"
                                class="!text-danger-100"
                                @click="() => {
                                    orderSelected = record,
                                    $refs.ConfirmDialog.open();
                                }"
                            >
                                Xóa
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>

        <Pagination :data="pagination" />

        <ConfirmDialog
            ref="ConfirmDialog"
            title="Xóa danh mục"
            content="Bạn chắc chắn xóa danh mục này ?"
            @confirm="confirmDelete"
        />

        <ConfirmDialog
            ref="StatusDialog"
            title="Xác nhận chuyển trạng thái"
            @confirm="confirmStatus"
        >
            <div>Bạn muốn chuyển trạng thái đơn hàng sang <span class="font-semibold">{{ STATUS_LABEL[statusSelected] }}</span> chứ ?</div>
        </ConfirmDialog>
    </div>
</template>

<script>
    import Pagination from '@/components/shared/Pagination.vue';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import { STATUS_OPTIONS, STATUS } from '@/constants/orders/status';
    import { mapDataFromOptions } from '@/utils/data';

    export default {
        components: {
            Pagination,
            ConfirmDialog,
        },
        props: {
            orders: {
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
                orderSelected: null,
                statusSelected: null,
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

            async confirmDelete() {
                try {
                    await this.$api.orders.delete(this.orderSelected._id);
                    this.$message.success('Xóa đơn hàng thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },

            async confirmStatus() {
                try {
                    await this.$api.orders.update(
                        this.orderSelected._id,
                        { ...this.orderSelected, status: this.statusSelected },
                    );
                    this.$message.success('Chuyển trạng thái đơn hàng thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
