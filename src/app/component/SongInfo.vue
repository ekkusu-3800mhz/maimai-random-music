<script lang="ts" setup>
import { defineProps } from "vue";

import { IMusicInfo } from "@/app/data/interface";
import { cover } from "@/app/util/asset-map";

import ChartType from "@/app/component/ChartType.vue";

/**
 *  清远舞萌比赛BP机制抽歌器 - 大号歌曲信息卡片组件
 * 
 *  @author 3.80GHz <shinra.dx@outlook.com>
 *  @license MIT
 */

const props = defineProps<{
    music: IMusicInfo;
    currentLevel: string;
}>();

/**
 *  根据难度类型选择背景颜色
 * 
 *  @param {string[]} level
 *  @returns {string}
 */
function parseDifficulty(level: string[]): string {
    switch (level.indexOf(props.currentLevel)) {
        case 0:
            return "chart-card-bsc";
        case 1:
            return "chart-card-adv";
        case 2:
            return "chart-card-exp";
        case 3:
            return "chart-card-mst";
        case 4:
            return "chart-card-rem";
        default:
            return "";
    }
}
</script>

<template>
    <el-row justify="center">
        <el-col class="chart-item" :xs="24" :sm="24">
            <el-card :class="parseDifficulty(props.music.level)">
                <el-row justify="left">
                    <el-col :xs="6" :sm="6">
                        <img :src="cover(props.music.id)" class="song-cover" alt="Cover" />
                        <ChartType :large="true" :value="props.music.type" class="chart-type" />
                    </el-col>
                    <el-col class="song-info" :xs="18" :sm="18">
                        <h3 class="song-title">{{props.music.basic_info.title}}</h3>
                        <p class="song-level">{{props.music.basic_info.artist}}</p>
                        <p class="song-level">分类：{{props.music.basic_info.genre}}</p>
                    </el-col>
                </el-row>
            </el-card>
            
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.chart-card-bsc {
    background-color: #6fe163;
    border-color: #025235;
}
.chart-card-adv {
    background-color: #f8df3a;
    border-color: #c7450c;
}
.chart-card-exp {
    background-color: #ff828e;
    border-color: #c02138;
}
.chart-card-mst {
    background-color: #c27ff4;
    border-color: #67148d;
}
.chart-card-rem {
    background-color: #e5ddea;
    border-color: #8c2cd5;
}
.chart-item {
    position: relative;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    text-align: center;
}
.chart-type {
    margin-left: -0.85rem;
}
.song-cover {
    width: 100%;
    border-radius: 10%;
    margin-left: -0.8rem;
    margin-top: -0.5rem;
    margin-bottom: -0.6rem;
    box-shadow: 1px 2px 2px #333;
}
.song-info {
    text-align: left;
    color: #ffffff;
    text-shadow: 1px 1px 3px #000000;
    padding-left: 0.5rem;
}
.song-title {
    margin-top: -0.4rem;
    font-size: 18px;
}
.song-level {
    font-weight: 400;
    font-size: 16px;
    margin-top: -0.8rem;
}
.song-badge {
    display: none;
}
.song-badge-xs {
    display: block;
    text-align: center;
    background-color: rgba(255, 255, 255, 60%);
    border-radius: 5px;
    margin-top: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.3rem;
}
@media (min-width: 768px) {
    .song-cover {
        margin-left: -0.8rem;
        margin-top: -0.5rem;
        margin-bottom: 0rem;
    }
    .song-title {
        margin-top: -0.5rem;
        font-size: 24px;
    }
    .song-level {
        font-size: 16px;
        margin-top: -0.9rem;
    }
}
</style>
