<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SearchFilter
            class="col-span-2"
            label="Tìm kiếm"
            placeholder="Tìm kiếm theo tên, nội dung..."
            query="searchKey"
        />
        <SelectFilter
            class="col-span-2"
            label="Trạng thái"
            placeholder="Trạng thái"
            query="status"
            :options="STATUS_OPTIONS"
        />
    </div>
</template>

<script>
    import { STATUS_OPTIONS } from '@/constants/blogs/status';
    import SearchFilter from '@/components/filters/Search.vue';
    import SelectFilter from '@/components/filters/Select.vue';

    export default {
        components: {
            SearchFilter,
            SelectFilter,
        },

        data() {
            return {
                STATUS_OPTIONS,
            };
        },
    };
</script>
