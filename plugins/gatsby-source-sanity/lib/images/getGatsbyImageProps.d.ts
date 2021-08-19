import { IGatsbyImageData, Layout } from 'gatsby-plugin-image';
export declare type ImageNode = ImageAsset | ImageObject | ImageRef | string | null | undefined;
export declare const EVERY_BREAKPOINT: number[];
export declare enum ImageFormat {
    NO_CHANGE = "",
    WEBP = "webp",
    JPG = "jpg",
    PNG = "png"
}
declare type ImagePalette = {
    darkMuted?: ImagePaletteSwatch;
    lightVibrant?: ImagePaletteSwatch;
    darkVibrant?: ImagePaletteSwatch;
    vibrant?: ImagePaletteSwatch;
    dominant?: ImagePaletteSwatch;
    lightMuted?: ImagePaletteSwatch;
    muted?: ImagePaletteSwatch;
};
declare type ImagePaletteSwatch = {
    background?: string;
    foreground?: string;
    population?: number;
    title?: string;
};
declare type ImageDimensions = {
    width: number;
    height: number;
    aspectRatio: number;
};
declare type ImageMetadata = {
    palette?: ImagePalette;
    dimensions: ImageDimensions;
    lqip?: string;
};
declare type ImageAssetStub = {
    url: string;
    assetId: string;
    extension: string;
    metadata: ImageMetadata;
};
declare type ImageAsset = ImageAssetStub & {
    _id: string;
};
declare type ImageRef = {
    _ref: string;
};
declare type ImageObject = {
    asset: ImageRef | ImageAsset;
};
export declare type ImageArgs = {
    maxWidth?: number;
    maxHeight?: number;
    sizes?: string;
    toFormat?: ImageFormat;
};
declare type SanityLocation = {
    projectId: string;
    dataset: string;
};
declare type ImageFit = 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
export declare type GatsbyImageDataArgs = {
    width?: number;
    height?: number;
    aspectRatio?: number;
    layout?: Layout;
    sizes?: string;
    placeholder?: 'blurred' | 'dominantColor' | 'none';
    fit?: ImageFit;
};
export declare function getGatsbyImageData(image: ImageNode, { fit, ...args }: GatsbyImageDataArgs, loc: SanityLocation): IGatsbyImageData | null;
export {};
