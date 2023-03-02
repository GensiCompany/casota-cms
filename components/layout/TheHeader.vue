<template>
    <div class="bg-white py-4 px-4 md:px-6 flex justify-between items-center drop-shadow">
        <div>
            <div class="md:hidden cursor-pointer" @click="toggleSidebar">
                <i class="isax isax-textalign-justifycenter relative top-[3px] text-2xl" />
            </div>
            <div class="hidden md:flex items-center gap-4 !text-black">
                <i class="isax isax-textalign-justifycenter relative top-[3px] text-2xl cursor-pointer" @click="$emit('toggleSidebar')" />
                <Breadcrumb :links="breadcrumbs" class="max-w-[400px]" />
            </div>
        </div>
        <div class="flex items-center gap-6">
            <!-- <NotificationPopover /> -->
            <a href="tel:0963395763" class="font-semibold text-xl">
                <i class="isax isax-call text-2xl mr-2 relative -top-[2px]" />
                <span>0963395763</span>
            </a>
            <div class="flex items-center gap-2">
                <a-avatar>
                    <i class="isax isax-user text-black" />
                </a-avatar>
                <a-dropdown :trigger="['click']">
                    <div class="cursor-pointer font-semibold">
                        {{ authUser.fullName }}
                        <i class="isax isax-arrow-down" />
                    </div>
                    <template #overlay>
                        <a-menu class="!mt-3">
                            <a-menu-item class="!py-2">
                                <i class="mr-4 fas fa-user" />Cập nhật thông tin
                            </a-menu-item>
                            <a-menu-item class="!py-2">
                                <i class="mr-4 fas fa-key" />Đổi mật khẩu
                            </a-menu-item>
                            <a-menu-item class="!py-2" @click="logout">
                                <i class="mr-4 fas fa-sign-out-alt" />Đăng xuất
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
        <a-drawer
            class="header-sidebar-drawer"
            :visible="sidebarVisible"
            placement="left"
            @close="sidebarVisible = false"
        >
            <TheSidebar class="h-full" />
        </a-drawer>
        <!-- <UpdateInfoDialog ref="updateInfoDialog" />
        <UpdatePasswordDialog ref="updatePasswordDialog" /> -->
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import TheSidebar from '@/components/layout/TheSidebar.vue';
    // import NotificationPopover from '@/components/notifications/Popover.vue';
    // import UpdateInfoDialog from '@/components/auth/dialogs/UpdateInfo.vue';
    // import UpdatePasswordDialog from '@/components/auth/dialogs/UpdatePassword.vue';
    import Breadcrumb from '@/components/shared/Breadcrumb.vue';

    export default {
        components: {
            TheSidebar,
            // NotificationPopover,
            // UpdateInfoDialog,
            // UpdatePasswordDialog,
            Breadcrumb,
        },

        data() {
            return {
                sidebarVisible: false,
            };
        },

        computed: {
            ...mapState('breadcrumbs', ['breadcrumbs']),

            authUser() {
                return this.$auth.user || {};
            },
        },

        methods: {
            toggleSidebar() {
                this.sidebarVisible = !this.sidebarVisible;
            },

            logout() {
                // trigger logout and remove data in local storage
                // await this.$auth.logout();
                // localStorage.removeItem('auth');
                this.$router.push('/login');
            },
        },
    };
</script>

<style lang="scss">
    .header-sidebar-drawer {
        .ant-drawer-body {
            @apply p-0 h-full #{!important};
        }
    }
</style>
