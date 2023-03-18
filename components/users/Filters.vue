<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SearchFilter
            label="Tên khách hàng"
            placeholder="Tên khách hàng"
        />
        <SearchFilter
            label="Email khách hàng"
            placeholder="Tìm email khách hàng"
            query="email"
        />
        <SearchFilter
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            query="email"
        />
        <SelectFilter
            label="Giới tính"
            placeholder="Chọn giới tính"
            query="gender"
            :options="USER_GENDER_OPTIONS"
        />
    </div>
</template>

<script>
    import { USER_GENDER_OPTIONS } from '@/constants/user/gender';
    import SelectFilter from '@/components/filters/Select.vue';
    import SearchFilter from '@/components/filters/Search.vue';

    export default {
        components: {
            SelectFilter,
            SearchFilter,
        },

        data() {
            return {
                USER_GENDER_OPTIONS,
            };
        },
    };
</script>
