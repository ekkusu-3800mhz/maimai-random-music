import axios, { AxiosPromise } from "axios";
import { IMusicInfo } from "./interface";

export default class Data {

    private static _dataUrl = "https://www.diving-fish.com/api/maimaidxprober/music_data";

    private static _imageUrl = "https://www.diving-fish.com/covers/";

    public static fetch(): AxiosPromise<IMusicInfo[]> {
        return axios({
            url: this._dataUrl,
            method: "GET",
        });
    }

    public static fetchCover(musicId: number): string {
        return this._imageUrl + musicId + ".jpg";
    }

}
