export class PepColorSettings {
    use: boolean;
    value: string;
    opacity = 50;
  
    constructor(use = false, value = 'hsl(0, 0%, 57%)', opacity = 50) {
        this.use =  use;
        this.value = value;
        this.opacity = opacity;
    }
}