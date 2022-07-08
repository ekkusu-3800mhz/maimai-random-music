/**
 *  清远舞萌比赛BP机制抽歌器 - 静态素材路径处理函数
 * 
 *  @author 3.80GHz <shinra.dx@outlook.com>
 *  @license MIT
 */

// 素材基础路径
const basePath = "/images/";
// 素材文件后缀
const assetSuffix = ".png";

// 谱面类型
const musicTypeDict: Record<string, string> = {
    "SD": image("type/SD"),
    "DX": image("type/DX"),
};

/**
 *  选择谱面类型素材
 * 
 *  @param {string} type 谱面类型
 *  @returns {string}
 */

export function chartType(type: string): string {
    if (type === "") {
        return "";
    }
    return musicTypeDict[type];
}

/**
 *  构建完整的素材URL
 * 
 *  @param {string} path 素材路径
 *  @returns {string}
 */

function image(path: string): string {
    return basePath + path + assetSuffix;
}

/**
 *  整数前补零
 * 
 *  @param {number} number 源整数
 *  @param {number} length 补零长度
 *  @returns {string}
 */

function padding(number: number, length: number): string {
    return (Array(length).join("0") + number).slice(-length);
}

/**
 *  转换歌曲封面ID
 * 
 *  @param {string} musicIdStr 歌曲ID字符串
 *  @returns {string}
 *  @link {https://github.com/Diving-Fish/mai-bot/commit/3bea2d558aef0bf0fe916e6b4257d38cdeba60a4}
 */

function parseCoverId(musicIdStr: string): string {
    let musicId: number = Number.parseInt(musicIdStr);
    if (musicId >= 10001) {
        musicId -= 10000;
    }
    return padding(musicId, 4);
}

/**
 *  选择封面素材
 * 
 *  @param {string} musicId 歌曲ID字符串
 *  @returns {string}
 */

export function cover(musicId: string): string {
    return image(`cover/${parseCoverId(musicId)}`);
}
