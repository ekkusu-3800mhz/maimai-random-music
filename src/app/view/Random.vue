<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { injectionKey } from "@/app/core/store";

import { IMusicInfo } from "@/app/data/interface";
import { musicListShuffle } from "@/app/core/functions";

import { ElLoading } from "element-plus";
import PageTitle from "@/app/component/PageTitle.vue";
import SongInfo from "@/app/component/SongInfo.vue";

/**
 *  清远舞萌比赛BP机制抽歌器 - 随机抽歌视图
 * 
 *  @author 3.80GHz <shinra.dx@outlook.com>
 *  @license MIT
 */

const { push } = useRouter();
const store = useStore(injectionKey);

if (store.state.musicList.length == 0) {
    push({
        name: "Intro",
    });
}
if (store.state.levelInput == "") {
    push({
        name: "Intro",
    });
}

const loading = ElLoading.service({
    fullscreen: true,
    background: "white",
    lock: true,
    text: "正在抽取歌曲",
});

let musicLength = store.state.randomSong;

const selectedList = ref<IMusicInfo[]>([]);

const step = ref<number>(2);

function levelFilter(music: IMusicInfo): boolean {
    let matched = false;
    for (let l = 0; l < music.level.length; l++) {
        if (store.state.levelInput == music.level[l]) {
            matched = true;
            break;
        }
    }
    return matched;
}

setTimeout(() => {
    // 过滤指定等级的歌曲
    let musicList: IMusicInfo[] = store.state.musicList.filter(levelFilter);
    let shuffled: IMusicInfo[] = musicListShuffle(musicList);
    selectedList.value = shuffled.splice(0, musicLength);
    loading.close();
}, 3000);
</script>

<template>
    <el-container>
        <el-main>
            <el-row justify="center">
                <el-col :xs="24" :sm="16" :md="12" :lg="12">
                    <PageTitle title="随机选曲" />
                </el-col>
            </el-row>
            <el-row justify="center">
                <el-col :xs="24" :sm="16" :md="12" :lg="12">
                    <el-card>
                        <el-steps :active="step" align-center>
                            <el-step title="随机抽歌" />
                            <el-step title="最终结果" />
                        </el-steps>
                    </el-card>
                </el-col>
            </el-row>
            <div class="main-content">
                <el-row justify="center">
                    <el-col :xs="24" :sm="16" :md="12" :lg="12">
                        <el-card>
                            <h2 style="text-align: center;">Lv.{{store.state.levelInput}} 歌曲随机抽取结果</h2>
                            <div v-for="music in selectedList" :key="music.id">
                                <SongInfo :music="music" :current-level="store.state.levelInput" />
                            </div>
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
    margin-top: -0.9rem;
    padding-top: 2rem;
    padding-bottom: 3rem;
}
.btn-group {
    text-align: center;
}
.tutorial-img {
    width: 100%;
}
.submit-area {
    text-align: center;
    margin-top: 0.3rem;
}
@media (min-width: 768px) {
    .main-content {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
}
</style>

