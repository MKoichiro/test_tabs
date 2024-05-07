// プロジェクト全体のcssでのみ使いたい場合はglobalStyles.tsに記述
// ここには、プロジェクト全体のcssとcomponentでも参照したいものを定義

export interface ContentsWidthType {
    pc: number;
    tb: number;
    sp: number;
}
export const $contentsWidth: ContentsWidthType = {
    pc: 70,
    tb: 70,
    sp: 90,
};

export const getCurrentDevice = (): 'pc' | 'tb' | 'sp' => {
    if (innerWidth > 1024) {
        return 'pc';
    } else if (innerWidth > 600) {
        return 'tb';
    } else {
        return 'sp';
    }
};

export interface CardCarouselMagicsType {
    gap_vw: number; // carousel item 間の間隔
    activeWidth_vw: number; // active item の幅
    inactiveMagnification: number; // inactive item の幅を active item の何倍にするか
}

export const cardCarouselMagics: { [key: string]: CardCarouselMagicsType } = {
    pc: {
        gap_vw: 5,
        activeWidth_vw: 80,
        inactiveMagnification: 0.5,
    },
    tb: {
        gap_vw: 5,
        activeWidth_vw: 80,
        inactiveMagnification: 0.5,
    },
    sp: {
        gap_vw: 5,
        activeWidth_vw: 80,
        inactiveMagnification: 0.5,
    },
};
