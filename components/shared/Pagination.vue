<template>
    <div v-if="data.total" class="flex flex-wrap justify-between items-center pt-5 gap-2">
        <div class="flex items-center gap-2 order-2 lg:order-1">
            <span>Tổng {{ data.total | numberFormat }}</span>
            <a-select
                :value="data.total"
                class="w-24"
                size="small"
                @change="(total) => changePerPage(total)"
            >
                <a-select-option v-for="total in PAGINATION_CONFIG.PER_PAGE_OPTIONS" :key="total" :value="total">
                    {{ total }}/ trang
                </a-select-option>
            </a-select>
        </div>
        <a-pagination
            v-if="pagination && pagination.total"
            v-model.number="pagination.page"
            class="ct-pagination order-1 lg:order-2 flex justify-center w-full lg:w-auto"
            :total="pagination.total"
            :page-size="pagination.total"
            show-less-items
            @change="handleChangePage"
        />
        <div class="flex items-center gap-2 order-3 lg:order-3">
            <span class="whitespace-nowrap">Đi tới page</span> <a-input-number
                v-model="goTo"
                class="!w-16 !text-center"
                size="small"
                :min="1"
                @pressEnter="handleChangePage(goTo)"
            />
        </div>
    </div>
</template>

<script>
    import _assign from 'lodash/assign';
    import _cloneDeep from 'lodash/cloneDeep';
    import _omit from 'lodash/omit';
    import PAGINATION_CONFIG from '@/configs/pagination';

    export default {
        props: {
            router: {
                type: Boolean,
                default: true,
            },
            data: {
                type: Object,
                required: true,
            },
            isQuery: {
                type: Boolean,
                default: true,
            },
            query: {
                type: String,
                default: 'page',
            },
            limitQuery: {
                type: String,
                default: 'limit',
            },
        },

        data() {
            return {
                PAGINATION_CONFIG,
                pagination: _cloneDeep({
                    ...this.data,
                    page: parseInt(this.data?.page, 10),
                    total: parseInt(this.data?.total, 10),
                }),
                goTo: 1,
            };
        },

        watch: {
            data(value) {
                this.pagination = _cloneDeep({
                    ...value,
                    page: parseInt(value.page, 10),
                });
                this.goTo = +value.page;
            },
        },

        methods: {
            handleChangePage(page) {
                if (this.isQuery) {
                    this.pushParam({
                        [this.query]: Number.isInteger(page) ? page : undefined,
                    });
                } else {
                    this.$emit('changePage', { page });
                }
            },

            changePerPage(total) {
                if (this.isQuery) {
                    this.pushParam({
                        [this.limitQuery]: total,
                        [this.query]: 1,
                    });
                } else {
                    this.$emit('changePage', { total });
                }
            },

            pushParam(params) {
                this.$emit('change', {
                    ...this.pagination,
                    ...params,
                });
                if (this.router) {
                    const path = this.$route.path;

                    const otherParams = _omit(this.$route.query, Object.keys(params));
                    const query = _assign({}, otherParams, params);

                    this.$router.push({ path, query });
                }
            },
        },
    };
</script>

<style lang="scss">
    .ant-pagination-item {
        @apply overflow-hidden;
        &-link {
            i {
                top: -3px;
                @apply relative;
            }
        }
        &-active {
            @apply bg-prim-100 border-prim-100;
            a {
                color: white !important;
            }
        }
    }
</style>
