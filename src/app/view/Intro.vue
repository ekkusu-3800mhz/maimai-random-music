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
const levels = ref<string[]>(["7", "7+", "8", "8+", "9", "9+", "10", "10+",
    "11", "11+", "12", "12+", "13", "13+", "14", "14+"]);
// 记录选择的难度
const form = ref({
    levelInput: "13",
    remainSong: store.state.remainSong,
    playerBan: store.state.playerBan,
    randomSong: store.state.randomSong,
});
const randomType = ref<number>(0);

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
    if (form.value.levelInput == "") {
        ElMessage({
            showClose: true,
            message: "请先选择难度，再进行抽取",
            type: "error",
        });
    } else {
        if (randomType.value === 1) {
            store.commit("setLevelInput", form.value.levelInput);
            store.commit("setRandomSong", form.value.randomSong);
            push({
                name: "Random",
            });
        }
        if (randomType.value === 2) {
            store.commit("setLevelInput", form.value.levelInput);
            store.commit("setPlayerBan", form.value.playerBan);
            store.commit("setRemainSong", form.value.remainSong);
            push({
                name: "BP",
            });
        }
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
                    <el-col :xs="24" :sm="9" :md="9">
                        <el-card>
                            <el-form :model="form" label-position="top">
                                <el-form-item label="歌曲等级">
                                    <el-select v-model="form.levelInput" placeholder="请选择歌曲等级" size="large">
                                        <el-option v-for="lv in levels" :key="lv" :label="'Lv. ' + lv" :value="lv"/>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="抽取类型">
                                    <el-radio-group v-model="randomType">
                                        <el-radio :label="1" size="large">仅进行抽歌</el-radio>
                                        <el-radio :label="2" size="large">BP（Ban & Pick）机制选曲</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="曲数设定">
                                    <template v-if="randomType == 1">
                                        <strong>从程序中随机抽取&nbsp;&nbsp;</strong>
                                        <el-input-number v-model="form.randomSong" :min="1" :max="5" />
                                        <strong>&nbsp;&nbsp;曲。</strong>
                                    </template>
                                    <template v-if="randomType == 2">
                                        <p>
                                            <strong>每位选手禁用&nbsp;&nbsp;</strong>
                                            <el-input-number v-model="form.playerBan" :min="1" :max="5" />
                                            <strong>&nbsp;&nbsp;曲，</strong>
                                        </p>
                                        <p>
                                            <strong>最终留下&nbsp;&nbsp;</strong>
                                            <el-input-number v-model="form.remainSong" :min="1" :max="5" />
                                            <strong>&nbsp;&nbsp;曲。</strong>
                                        </p>
                                    </template>
                                </el-form-item>
                                <el-form-item class="btn-group">
                                    <template v-if="randomType > 0">
                                        <el-button type="primary" size="large" @click="randMusic()"><el-icon><Refresh /></el-icon>&nbsp;&nbsp;开始抽歌</el-button>
                                    </template>
                                    <template v-else>
                                        <el-button type="primary" size="large" :disabled="true">请选择抽取类型</el-button>
                                    </template>
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
