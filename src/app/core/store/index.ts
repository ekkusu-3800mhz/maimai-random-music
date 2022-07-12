import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { IMusicData, IMusicInfo } from "@/app/data/interface";

/**
 *  清远舞萌比赛BP机制抽歌器 - Vuex Store定义
 * 
 *  @generator vue-cli
 *  @license MIT
 */

interface State extends IMusicData {
    levelInput: string;
    playerBan: number;
    remainSong: number;
    randomSong: number;
}

export const injectionKey: InjectionKey<Store<State>> = Symbol();

export default createStore<State>({
    state() {
        return {
            updateDate: "",
            version: "",
            musicList: [],
            levelInput: "",
            playerBan: 2,
            remainSong: 3,
            randomSong: 3,
        };
    },
    mutations: {
        setUpdateDate(state: State, payload: string) {
            state.updateDate = payload;
        },
        setVersion(state: State, payload: string) {
            state.version = payload;
        },
        setMusicList(state: State, payload: IMusicInfo[]) {
            state.musicList = payload;
        },
        setLevelInput(state: State, payload: string) {
            state.levelInput = payload;
        },
        setRandomSong(state: State, payload: number) {
            state.randomSong = payload;
        },
        setPlayerBan(state: State, payload: number) {
            state.playerBan = payload;
        },
        setRemainSong(state: State, payload: number) {
            state.remainSong = payload;
        },
        clear(state: State) {
            state.updateDate = "";
            state.version = "";
            state.musicList = [];
            state.levelInput = "";
        },
    },
});
