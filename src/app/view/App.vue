<script lang="ts" setup>
import { ref } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

/**
 *  清远舞萌比赛BP机制抽歌器 - 基础路由视图
 * 
 *  @author 3.80GHz <shinra.dx@outlook.com>
 *  @license MIT
 */

const locale = ref(zhCn);
</script>

<template>
    <ElConfigProvider :locale="locale">
        <router-view />
    </ElConfigProvider>
</template>

<style lang="less">
body {
    background-color: #fcfcfc;
    font-family: Roboto, Noto Sans SC, Noto Sans JP, Microsoft YaHei, '微软雅黑', Arial, sans-serif !important;
    font-weight: 300;
}
img {
    pointer-events: none;
}
</style>
