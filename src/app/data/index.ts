import axios, { AxiosPromise } from "axios";
import { IMusicInfo } from "./interface";

export default class Data {

    private static _dataUrl = "https://www.diving-fish.com/api/maimaidxprober/music_data";

    public static fetch(): AxiosPromise<IMusicInfo[]> {
        return axios({
            url: this._dataUrl,
            method: "GET",
        });
    }

}
