/* eslint-disable vue/no-v-model-argument */
<template>
    <div class="bg-white a-the-sidebar-vertical max-h-screen h-full flex flex-col drop-shadow-xl" :class="[collapsed ? 'w-auto' : '!w-[260px]']">
        <div class="h-[65px] flex justify-center items-center" :class="[collapsed ? 'px-4' : 'px-6']">
            <!-- <nuxt-link class="flex justify-center items-center mt-1" to="/">
                <img src="/images/logo-white.svg" width="50">
            </nuxt-link> -->
            <div v-show="!collapsed" class="text-white font-semibold text-3xl pt-5">
                <img class="mx-auto" src="/images/logo.png" alt="/logo">
            </div>
        </div>
        <a-menu
            :open-keys="openKeys"
            :default-selected-keys="activeKeys"
            :inline-collapsed="collapsed"
            class="w-[260px] !mt-4 flex-grow overflow-y-auto custom-scroll overflow-x-hidden !p-4"
            mode="inline"
            @click="handleClick"
            @openChange="handleOpenChange"
        >
            <template v-for="sidebarItem in sidebar">
                <a-sub-menu v-if="sidebarItem.childs" :key="sidebarItem.route">
                    <template slot="title">
                        <i :class="sidebarItem.icon" class="!text-2xl" />
                        <span class="truncate">{{ sidebarItem.label }}</span>
                    </template>
                    <template v-for="sidebarItemChild in sidebarItem.childs">
                        <a-menu-item v-if="sidebarItemChild.route" :key="sidebarItemChild.route">
                            <span class="truncate">{{ sidebarItemChild.label }}</span>
                        </a-menu-item>
                    </template>
                </a-sub-menu>
                <a-menu-item v-else :key="sidebarItem.route">
                    <i :class="sidebarItem.icon" class="!text-2xl" />
                    <span class="truncate">{{ sidebarItem.label }}</span>
                </a-menu-item>
            </template>
        </a-menu>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                sidebar: [{
                    route: '/products',
                    label: 'Sản phẩm',
                    icon: 'isax isax-shop',
                    childs: [
                        {
                            route: '/products',
                            label: 'Danh sách sản phẩm',
                            icon: 'isax isax-note',
                        },
                        {
                            route: '/products/categories',
                            label: 'Danh mục sản phẩm',
                            icon: 'isax isax-note',
                        },
                    ],
                }, {
                    route: 'banners',
                    label: 'Quản lý Banner',
                    icon: 'isax isax-gallery',
                }, {
                    route: '/blogs',
                    label: 'Quản lý Blog',
                    icon: 'isax isax-note',
                }, {
                    route: '/categories',
                    label: 'Danh mục',
                    icon: 'isax isax-task',
                }, {
                    route: '/clients',
                    label: 'Khách hàng',
                    icon: 'isax isax-profile-2user',
                }, {
                    route: '/orders',
                    label: 'Đơn hàng',
                    icon: 'isax isax-shopping-cart',
                }, {
                    route: '/questions',
                    label: 'Câu hỏi thường gặp',
                    icon: 'isax isax-message-question',
                }, {
                    route: '/contact',
                    label: 'Liên hệ',
                    icon: 'isax isax-send-2',
                }, {
                    route: '/contact-infor',
                    label: 'Thông tin liên hệ',
                    icon: 'isax isax-like-dislike',
                }],
                isOpen: true,
                openKeys: [],
                logoutVisible: false,
                collapsed: false,
            };
        },

        computed: {
            activeKeys() {
                return [this.$route.path];
            },
        },

        async mounted() {
            this.collapsed = window.innerWidth < 768 ? false : localStorage.getItem('collapsed') === 'true' || false;
        },

        methods: {
            handleClick({ key }) {
                this.$router.push(key);
            },

            handleOpenChange(keys) {
                this.openKeys = keys?.length ? [keys?.pop()] : [];
            },

            toggleCollapsed() {
                this.collapsed = !this.collapsed;
                localStorage.setItem('collapsed', this.collapsed);
            },
        },
    };
</script>

<style lang="scss">
    .a-the-sidebar-vertical:not(.a-menu--collapse) {
        .ant-menu {
            @apply bg-white;
        }
        .ant-menu-inline {
            @apply border-0;
        }
        .ant-menu-sub {
            .ant-menu-item {
                @apply pl-8 #{!important};
            }
        }
        .ant-menu-submenu-arrow {
            @apply text-right;
        }
        .ant-menu-item, .ant-menu-submenu-title {
            height: auto !important;
            @apply text-black flex items-center;
            @apply m-0 px-4 my-3 rounded  #{!important};

            >span {
                @apply flex-grow;
            }

            i {
                @apply text-2xl w-4 mr-4  #{!important};
            }

            .ant-menu-submenu-arrow {
                @apply mr-0;
                &::after, &::before {
                    @apply bg-prim-100 #{!important};
                }
            }

            &-selected {
                @apply bg-prim-100;
                @apply text-white;
                &::after {
                    @apply hidden;
                }
            }
        }
        .ant-menu-vertical {
            @apply border-r-0 #{!important};
        }
    }
</style>
