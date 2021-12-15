export type PepShadowIntensityType = 'Soft' | 'Regular';

export class PepShadowSettings {
    use: boolean = false;
    type: PepShadowIntensityType = 'Regular';
    intensity: number = 50;
}