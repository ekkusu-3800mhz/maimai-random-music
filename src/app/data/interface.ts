/**
 *  清远舞萌比赛BP机制抽歌器 - 曲目数据库接口结构定义
 * 
 *  @author 3.80GHz <shinra.dx@outlook.com>
 *  @license MIT
 */

export interface IMusicData {
    version: string;
    updateDate: string;
    musicList: IMusicInfo[];
}

export interface IMusicInfo {
    basic_info: {
        artist: string;
        bpm: number;
        title: string;
        genre: string;
    };
    level: string[];
    type: "SD" | "DX";
    id: string;
}
