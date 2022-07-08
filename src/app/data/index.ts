import axios, { AxiosPromise } from "axios";
import { IMusicData } from "./interface";

/**
 *  清远舞萌比赛BP机制抽歌器 - 歌曲数据库请求封装类
 * 
 *  @author 3.80GHz <shinra.dx@outlook.com>
 *  @license MIT
 */

export default class Data {

    private static _dataUrl = "/data/music.json";

    public static fetch(): AxiosPromise<IMusicData> {
        return axios({
            url: this._dataUrl,
            method: "GET",
        });
    }

}
