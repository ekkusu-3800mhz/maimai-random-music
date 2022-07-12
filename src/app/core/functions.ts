import { IMusicInfo } from "@/app/data/interface";

/**
 *  清远舞萌比赛BP机制抽歌器 - 公共函数库
 * 
 *  @author 3.80GHz <shinra.dx@outlook.com>
 *  @license MIT
 */

/**
 *  打乱曲目列表数组
 * 
 *  @param {IMusicInfo[]} musicList 原始曲目列表数组
 *  @returns {IMusicInfo[]}
 */

export function musicListShuffle(musicList: IMusicInfo[]): IMusicInfo[] {
    const _list = musicList.slice();
    for (let _i = 0; _i < _list.length; _i++) {
        const _j = Math.floor(Math.random() * (_i + 1));
        const _t = _list[_i];
        _list[_i] = _list[_j];
        _list[_j] = _t;
    }
    return _list;
}
