<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :title="title"
    >
        <template v-if="content">
            <span class="text-lg">{{ content }}</span>
        </template>
        <slot v-else />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="handleCancel">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28 !bg-prim-100 border-transparent"
                :type="confirmBtnType"
                @click="handleConfirm"
            >
                <i :class="confirmIcon" /> {{ confirmBtn }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: 'Xác nhận',
            },
            content: String,
            confirmBtn: {
                type: String,
                default: 'Xác nhận',
            },
            confirmIcon: String,
            confirmBtnType: {
                type: String,
                default: 'primary',
            },
            cancelBtn: {
                type: String,
                default: 'Hủy',
            },
        },

        data() {
            return {
                visible: false,
                loading: false,
            };
        },

        methods: {
            open(roomType) {
                this.roomType = roomType;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleConfirm() {
                await this.$emit('confirm');
                this.close();
            },

            handleCancel() {
                this.$emit('cancel');
                this.close();
            },
        },
    };
</script>
