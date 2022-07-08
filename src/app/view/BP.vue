<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { injectionKey } from "@/app/core/store";

import { IMusicInfo } from "@/app/data/interface";

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

const props = defineProps<{
    level: string;
}>();

const { push } = useRouter();
const store = useStore(injectionKey);

if (store.state.musicList.length == 0) {
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

let musicLength = 7;

const selectedList = ref<IMusicInfo[]>([]);
const bannedListA = ref<IMusicInfo[]>([]);
const bannedListB = ref<IMusicInfo[]>([]);

const step = ref<number>(1);

function levelFilter(music: IMusicInfo): boolean {
    let matched = false;
    music.level.forEach((lv: string) => {
        matched = (props.level == lv) ? true : false;
    });
    return matched;
}

setTimeout(() => {
    // 过滤指定等级的歌曲
    let musicList: IMusicInfo[] = store.state.musicList.filter(levelFilter);
    for (let i = 0; i < musicLength; i++) {
        // 随机一个数组索引
        let index = Math.round(Math.random() * musicList.length);
        // 利用随机生成的索引号抽取对应的歌曲
        selectedList.value.push(musicList[index]);
        // 从源数组中删除该索引号的歌曲条目
        musicList.splice(index, 1);
    }
    loading.close();
    console.log(selectedList.value);
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
    if (bannedListA.value.length < 2) {
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
    if (bannedListA.value.length != 2) {
        ElMessage({
            showClose: true,
            message: "1P必须禁用2首歌曲",
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
    if (bannedListB.value.length < 2) {
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
    if (bannedListB.value.length != 2) {
        ElMessage({
            showClose: true,
            message: "2P必须禁用2首歌曲",
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
            <PageTitle />
    <el-row justify="center">
        <el-col :xs="24" :sm="24">
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
                    <el-col :xs="24" :sm="7">
                        <el-card>
                            <h3 style="text-align: center;">
                                <span v-if="step === 1" style="color: #409EFF;">1P选手禁用歌曲</span>
                                <span v-else>1P选手禁用歌曲</span>
                            </h3>
                            <p style="text-align: center;" v-if="step === 1">（点按歌曲条目解禁选曲）</p>
                            <div v-for="musicA in bannedListA" :key="musicA.id" @click="unbanA(musicA)">
                                <SongSummary :music="musicA" :current-level="props.level" />
                            </div>
                            <div class="submit-area" v-if="bannedListA.length > 0">
                                <template v-if="step === 1">
                                    <el-button type="primary" size="large" @click="confirmA()"><el-icon><CircleCheck /></el-icon>&nbsp;&nbsp;确认</el-button>
                                </template>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="24" :sm="10">
                        <el-card>
                            <h2 style="text-align: center;" v-if="step !== 4">Lv.{{props.level}} 歌曲随机抽取结果</h2>
                            <h2 style="text-align: center; color: #F56C6C;" v-else>本轮 Lv.{{props.level}} 决定曲</h2>
                            <p style="text-align: center;" v-if="step !== 4">（点按歌曲条目禁选该曲）</p>
                            <div v-for="music in selectedList" :key="music.id" @click="ban(music)">
                                <SongInfo :music="music" :current-level="props.level" />
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="24" :sm="7">
                        <el-card>
                            <h3 style="text-align: center;">
                                <span v-if="step === 2" style="color: #409EFF;">2P选手禁用歌曲</span>
                                <span v-else>2P选手禁用歌曲</span>
                            </h3>
                            <p style="text-align: center;" v-if="step === 2">（点按歌曲条目解禁选曲）</p>
                            <div v-for="musicB in bannedListB" :key="musicB.id" @click="unbanB(musicB)">
                                <SongSummary :music="musicB" :current-level="props.level" />
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

