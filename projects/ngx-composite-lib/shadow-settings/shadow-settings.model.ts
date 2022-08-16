import { PepSizeType } from "@pepperi-addons/ngx-lib";

export type PepShadowIntensityType = 'soft' | 'regular' | 'hard';
export class PepShadowSettings {
    use: boolean;
    size: PepSizeType;
    intensity: PepShadowIntensityType;

    constructor(use: boolean = false, size: PepSizeType = 'md', intensity: PepShadowIntensityType = 'soft') {
        this.use =  use;
        this.size = size;
        this.intensity = intensity;
    }
}