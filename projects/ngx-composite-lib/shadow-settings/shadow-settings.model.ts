import { PepSizeType } from "@pepperi-addons/ngx-lib";

export type PepShadowIntensityType = 'soft' | 'regular' | 'hard';

export class PepShadowSettings {
    use = false;
    size: PepSizeType = 'md';
    intensity: PepShadowIntensityType = 'regular';
}