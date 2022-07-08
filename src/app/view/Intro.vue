<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { injectionKey } from "@/app/core/store";

import Data from "@/app/data";
import { AxiosResponse } from "axios";
import { IMusicData } from "@/app/data/interface";

import { ElMessage, ElLoading } from "element-plus";
import { Refresh } from '@element-plus/icons-vue';

/**
 *  清远舞萌比赛BP机制抽歌器 - 难度选择视图
 * 
 *  @author 3.80GHz <shinra.dx@outlook.com>
 *  @license MIT
 */

const { push } = useRouter();
const store = useStore(injectionKey);

// 定义可选的难度
const levels = ref<string[]>(["12", "12+", "13", "13+", "14",]);
// 记录选择的难度
const levelInput = ref<string>("");

// 默认打开Loader
const loading = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: "正在载入歌曲列表",
    background: "white",
});

// 加载曲目数据库
setTimeout(() => {
    let response = Data.fetch();
    response.then((res: AxiosResponse<IMusicData>) => {
        store.commit('setUpdateDate', res.data.updateDate);
        store.commit('setVersion', res.data.version);
        store.commit('setMusicList', res.data.musicList);
        loading.close();
    });
}, 500);

// 开始抽取
function randMusic(): void {
    if (levelInput.value == "") {
        ElMessage({
            showClose: true,
            message: "请先选择难度，再进行抽取",
            type: "error",
        });
    } else {
        push({
            name: "BP",
            params: {
                level: levelInput.value,
            },
        });
    }
}
</script>

<template>
    <el-container>
        <el-main>
            <div class="page-header">
                <p>
                    <img src="/images/logo.png" class="logo" alt="舞萌DX LOGO" />
                </p>
                <h1>清远舞萌DX比赛 THE 3rd. 决赛歌曲随机抽取器</h1>
                <p>曲库版本：{{store.state.version}}&nbsp;&nbsp;&nbsp;&nbsp;更新日期：{{store.state.updateDate}}</p>
            </div>
            <div class="main-content">
                <el-row justify="center">
                    <el-col :xs="24" :sm="10" :md="10">
                        <el-card>
                            <el-form label-position="top">
                                <el-form-item label="歌曲等级">
                                    <el-radio-group v-model="levelInput">
                                        <el-radio v-for="lv in levels" :key="lv" :label="lv" size="large" />
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item class="btn-group">
                                    <el-button type="primary" size="large" @click="randMusic()"><el-icon><Refresh /></el-icon>&nbsp;&nbsp;开始抽歌</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-main>
    </el-container>
    <el-backtop />
</template>

<style lang="less" scoped>
.main-content {
    padding-top: 2rem;
    padding-bottom: 3rem;
}
.btn-group {
    text-align: center;
}
.tutorial-img {
    width: 100%;
}
.page-header {
    text-align: center;
}
.page-header > h1 {
    font-size: 28px;
    font-weight: 300;
}
.logo {
    padding-top: 2rem;
    width: 10rem;
}
@media (min-width: 768px) {
    .page-header > h1 {
        font-size: 36px;
        font-weight: 300;
    }
    .logo {
        padding-top: 2rem;
        width: 15rem;
    }
    .main-content {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
}
</style>
