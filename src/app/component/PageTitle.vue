<script lang="ts" setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { injectionKey } from "@/app/core/store";
import { ArrowLeft } from "@element-plus/icons-vue";

/**
 *  清远舞萌比赛BP机制抽歌器 - 选手BAN歌视图标题组件
 * 
 *  @author 3.80GHz <shinra.dx@outlook.com>
 *  @license MIT
 */

const props = defineProps<{
    title: string;
}>();

const { push } = useRouter();
const store = useStore(injectionKey);

// Page go back
function back(): void {
    store.commit("clear");
    push({
        name: "Intro",
    });
}
</script>

<template>
    <el-row class="page-title" justify="center">
        <el-col :xs="24" :sm="24">
            <el-card>
                <el-row>
                    <el-col :xs="20" :sm="16">
                        <el-page-header :icon="ArrowLeft" :content="title" @back="back()" />
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.page-title {
    margin-top: 0.5rem;
    padding-bottom: 1rem;
}
@media (min-width: 768px) {
    .page-title {
        margin-top: 0.5rem;
    }
}
</style>
