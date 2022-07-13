<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { injectionKey } from "@/app/core/store";

import { IMusicInfo } from "@/app/data/interface";
import { musicListShuffle } from "@/app/core/functions";

import { ElLoading, ElMessage } from "element-plus";
import { CircleCheck } from "@element-plus/icons-vue";
import PageTitle from "@/app/component/PageTitle.vue";
import SongInfo from "@/app/component/SongInfo.vue";
import SongSummary from "@/app/component/SongSummary.vue";

/**
 *  清远舞萌比赛BP机制抽歌器 - 选手BAN歌视图
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

let musicLength = store.state.playerBan * 2 + store.state.remainSong;

const selectedList = ref<IMusicInfo[]>([]);
const bannedListA = ref<IMusicInfo[]>([]);
const bannedListB = ref<IMusicInfo[]>([]);

const step = ref<number>(1);

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

function ban(music: IMusicInfo): void {
    if (step.value === 1) {
        banA(music);
    }
    if (step.value === 2) {
        banB(music);
    }
}

/**
 *  1PBAN歌
 * 
 *  @param {IMusicInfo} music 歌曲条目
 *  @returns {void}
 */

function banA(music: IMusicInfo): void {
    if (bannedListA.value.length < store.state.playerBan) {
        bannedListA.value.push(music);
        let index: number = selectedList.value.indexOf(music);
        selectedList.value.splice(index, 1);
    } else {
        ElMessage({
            showClose: true,
            message: "1P禁用曲目以达到上限",
            type: "error",
        });
    }
}

/**
 *  1P解除BAN歌
 * 
 *  @param {IMusicInfo} music 歌曲条目
 *  @returns {void}
 */

function unbanA(music: IMusicInfo): void {
    if (step.value === 1) {
        selectedList.value.unshift(music);
        let index: number = bannedListA.value.indexOf(music);
        bannedListA.value.splice(index, 1);
    }
}

/**
 *  1P确认BAN歌选择
 * 
 *  @returns {void}
 */

function confirmA(): void {
    if (bannedListA.value.length !== store.state.playerBan) {
        ElMessage({
            showClose: true,
            message: `1P必须禁用${store.state.playerBan}首歌曲`,
            type: "error",
        });
    } else {
        step.value = 2;
    }
}

/**
 *  2PBAN歌
 * 
 *  @param {IMusicInfo} music 歌曲条目
 *  @returns {void}
 */

function banB(music: IMusicInfo): void {
    if (bannedListB.value.length < store.state.playerBan) {
        bannedListB.value.push(music);
        let index: number = selectedList.value.indexOf(music);
        selectedList.value.splice(index, 1);
    } else {
        ElMessage({
            showClose: true,
            message: "2P禁用曲目以达到上限",
            type: "error",
        });
    }
}

/**
 *  2P解除BAN歌
 * 
 *  @param {IMusicInfo} music 歌曲条目
 *  @returns {void}
 */

function unbanB(music: IMusicInfo): void {
    if (step.value === 2) {
        selectedList.value.unshift(music);
        let index: number = bannedListB.value.indexOf(music);
        bannedListB.value.splice(index, 1);
    }
}

/**
 *  1P确认BAN歌选择
 * 
 *  @returns {void}
 */

function confirmB(): void {
    if (bannedListB.value.length !== store.state.playerBan) {
        ElMessage({
            showClose: true,
            message: `2P必须禁用${store.state.playerBan}首歌曲`,
            type: "error",
        });
    } else {
        step.value = 4;
    }
}
</script>

<template>
    <el-container>
        <el-main>
            <el-row justify="center">
                <el-col :xs="24" :lg="18">
                    <PageTitle title="BP机制选曲" />
                </el-col>
            </el-row>
            <el-row justify="center">
                <el-col :xs="24" :lg="18">
                    <el-card>
                        <el-steps :active="step" align-center>
                            <el-step title="随机抽歌" />
                            <el-step title="1P禁用歌曲" />
                            <el-step title="2P禁用歌曲" />
                            <el-step title="最终结果" />
                        </el-steps>
                    </el-card>
                </el-col>
            </el-row>
            <div class="main-content">
                <el-row justify="center" :gutter="20">
                    <el-col :xs="24" :sm="7" :lg="5" class="hidden-xs-only">
                        <el-card>
                            <h3 style="text-align: center;">
                                <span v-if="step === 1" style="color: #409EFF;">1P选手禁用歌曲</span>
                                <span v-else>1P选手禁用歌曲</span>
                            </h3>
                            <p style="text-align: center;" v-if="step === 1">（点按歌曲条目解禁选曲）</p>
                            <div v-for="musicA in bannedListA" :key="musicA.id" @click="unbanA(musicA)">
                                <SongSummary :music="musicA" :current-level="store.state.levelInput" />
                            </div>
                            <div class="submit-area" v-if="bannedListA.length > 0">
                                <template v-if="step === 1">
                                    <el-button type="primary" size="large" @click="confirmA()"><el-icon><CircleCheck /></el-icon>&nbsp;&nbsp;确认</el-button>
                                </template>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="24" :sm="10" :lg="8">
                        <el-card>
                            <h2 style="text-align: center;" v-if="step !== 4">Lv.{{store.state.levelInput}} 歌曲随机抽取结果</h2>
                            <h2 style="text-align: center; color: #F56C6C;" v-else>本轮 Lv.{{store.state.levelInput}} 决定曲</h2>
                            <p style="text-align: center;" v-if="step !== 4">（点按歌曲条目禁选该曲）</p>
                            <div v-for="music in selectedList" :key="music.id" @click="ban(music)">
                                <SongInfo :music="music" :current-level="store.state.levelInput" />
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="24" :sm="7" :lg="5" class="hidden-xs-only">
                        <el-card>
                            <h3 style="text-align: center;">
                                <span v-if="step === 2" style="color: #409EFF;">2P选手禁用歌曲</span>
                                <span v-else>2P选手禁用歌曲</span>
                            </h3>
                            <p style="text-align: center;" v-if="step === 2">（点按歌曲条目解禁选曲）</p>
                            <div v-for="musicB in bannedListB" :key="musicB.id" @click="unbanB(musicB)">
                                <SongSummary :music="musicB" :current-level="store.state.levelInput" />
                            </div>
                            <div class="submit-area" v-if="bannedListB.length > 0">
                                <template v-if="step === 2">
                                    <el-button type="primary" size="large" @click="confirmB()"><el-icon><CircleCheck /></el-icon>&nbsp;&nbsp;确认</el-button>
                                </template>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="24" class="hidden-sm-and-up player-ban">
                        <el-card>
                            <h3 style="text-align: center;">
                                <span v-if="step === 1" style="color: #409EFF;">1P选手禁用歌曲</span>
                                <span v-else>1P选手禁用歌曲</span>
                            </h3>
                            <p style="text-align: center;" v-if="step === 1">（点按歌曲条目解禁选曲）</p>
                            <div v-for="musicA in bannedListA" :key="musicA.id" @click="unbanA(musicA)">
                                <SongSummary :music="musicA" :current-level="store.state.levelInput" />
                            </div>
                            <div class="submit-area" v-if="bannedListA.length > 0">
                                <template v-if="step === 1">
                                    <el-button type="primary" size="large" @click="confirmA()"><el-icon><CircleCheck /></el-icon>&nbsp;&nbsp;确认</el-button>
                                </template>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="24" class="hidden-sm-and-up player-ban">
                        <el-card>
                            <h3 style="text-align: center;">
                                <span v-if="step === 2" style="color: #409EFF;">2P选手禁用歌曲</span>
                                <span v-else>2P选手禁用歌曲</span>
                            </h3>
                            <p style="text-align: center;" v-if="step === 2">（点按歌曲条目解禁选曲）</p>
                            <div v-for="musicB in bannedListB" :key="musicB.id" @click="unbanB(musicB)">
                                <SongSummary :music="musicB" :current-level="store.state.levelInput" />
                            </div>
                            <div class="submit-area" v-if="bannedListB.length > 0">
                                <template v-if="step === 2">
                                    <el-button type="primary" size="large" @click="confirmB()"><el-icon><CircleCheck /></el-icon>&nbsp;&nbsp;确认</el-button>
                                </template>
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
.player-ban {
    margin-top: 0.9rem;
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

