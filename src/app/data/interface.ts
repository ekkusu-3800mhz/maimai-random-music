export interface IMusicInfo {
    basic_info: {
        artist: string;
        bpm: number;
        title: string;
        genre: string;
    };
    level: string[];
    type: "SD" | "DX";
}
