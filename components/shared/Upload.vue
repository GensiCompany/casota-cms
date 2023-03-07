<template>
    <div class="flex flex-col items-center gap-y-8 mb-6 w-full">
        <img
            v-if="thumbnail"
            :src="thumbnail"
            onerror="this.src='/images/default-avatar.png'"
            alt=""
            class="w-full h-[200px] rounded-md object-cover"
        >
        <div v-else class="w-full h-[200px] rounded-md border-dashed border border-gray-400 flex justify-center items-center">
            <span><i class="fas fa-plus" /></span>
        </div>
        <input
            id="thumbnailImage"
            class="!hidden"
            type="file"
            accept="image/jpeg, image/png"
            :disabled="isEdit"
            @change="previewThumbnail"
        >
        <div class="flex gap-x-2">
            <div v-if="!isEdit" class="flex items-center w-fit px-2 py-1 rounded-lg border cursor-pointer hover:bg-[#0c4ea4] hover:!text-[#fff] transition duration-150 ease-out hover:ease-in border-[#d3d3d3]" @click="openSelectFile">
                <p class="mb-0 px-3 text-sm  hover:text-[#fff]">
                    Tải lên
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    };
</script>
