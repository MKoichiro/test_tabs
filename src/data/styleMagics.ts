// プロジェクト全体のcssでのみ使いたい場合はglobalStyles.tsに記述
// ここには、プロジェクト全体のcssとcomponentでも参照したいものを定義

const deviceLiterals = ['pc', 'tb', 'sp'] as const;
export type DeviceUnion = (typeof deviceLiterals)[number];

export type FontSizes = Record<DeviceUnion, number>;
export const fontSizeRatios: ContentsWidths = {
    pc: 62.5,
    tb: 50.0,
    sp: 35.0,
};
export type ContentsWidths = FontSizes;
export const contentsWidths: ContentsWidths = {
    pc: 70,
    tb: 70,
    sp: 90,
};

type BreakPoints = Omit<Record<DeviceUnion, number>, 'sp'>;
export const BREAK_POINTS: BreakPoints = {
    pc: 1024,
    tb: 600,
};

/**
 * CardCarouselMagicsType
 * @param gap_vw carousel item 間の間隔
 * @param activeWidth_vw active item の幅
 * @param inactiveMagnification inactive item の幅を active item の何倍にするか
 */
export interface CardCarouselMagic {
    gap_vw: number;
    activeWidth_vw: number;
    inactiveMagnification: number;
}
export type CardCarouselMagics = Record<DeviceUnion, CardCarouselMagic>;
export const cardCarouselMagics: CardCarouselMagics = {
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

export interface TabCarouselMagic {
    modalBtnWidth: number;
    tabMinWidth: number;
}
export type TabCarouselMagics = Record<DeviceUnion, TabCarouselMagic>;
export const tabCarouselMagics: TabCarouselMagics = {
    pc: {
        modalBtnWidth: 5,
        tabMinWidth: 15,
    },
    tb: {
        modalBtnWidth: 5,
        tabMinWidth: 15,
    },
    sp: {
        modalBtnWidth: 15,
        tabMinWidth: 30,
    },
};
