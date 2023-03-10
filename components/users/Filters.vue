<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SelectFilter
            class="col-span-2"
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

    export default {
        components: {
            SelectFilter,
        },

        data() {
            return {
                USER_GENDER_OPTIONS,
            };
        },
    };
</script>
