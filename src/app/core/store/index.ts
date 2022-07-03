import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { IMusicInfo } from "@/app/data/interface";

export interface State {
    musicList: IMusicInfo[];
}

export const injectionKey: InjectionKey<Store<State>> = Symbol();

export default createStore<State>({
    state() {
        return {
            musicList: [],
        };
    },
    mutations: {
        updateMusicList(state: State, payload: IMusicInfo[]) {
            state.musicList = payload;
        },
    },
});
