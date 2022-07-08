import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { IMusicData, IMusicInfo } from "@/app/data/interface";

/**
 *  清远舞萌比赛BP机制抽歌器 - Vuex Store定义
 * 
 *  @generator vue-cli
 *  @license MIT
 */

export const injectionKey: InjectionKey<Store<IMusicData>> = Symbol();

export default createStore<IMusicData>({
    state() {
        return {
            updateDate: "",
            version: "",
            musicList: [],
        };
    },
    mutations: {
        setUpdateDate(state: IMusicData, payload: string) {
            state.updateDate = payload;
        },
        setVersion(state: IMusicData, payload: string) {
            state.version = payload;
        },
        setMusicList(state: IMusicData, payload: IMusicInfo[]) {
            state.musicList = payload;
        },
        clear(state: IMusicData) {
            state = {
                updateDate: "",
                version: "",
                musicList: [],
            };
        },
    },
});
