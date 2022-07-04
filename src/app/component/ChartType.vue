<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { chartType } from "@/app/util/asset-map";
// props定义
const props = defineProps<{
    // 接受父组件传入的谱面类型
    value: string;
    large: boolean;
}>();

const size = ref<string>("");

size.value = (props.large) ? "large" : "small";

</script>

<template>
    <img :class="size" :src="chartType(props.value)" alt="Chart Type" />
</template>

<style lang="less" scoped>
.large {
    width: 100px;
}
.small {
    width: 70px;
}
</style>
