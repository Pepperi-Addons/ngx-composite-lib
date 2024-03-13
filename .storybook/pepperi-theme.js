// .storybook/pepperi-theme.js
//default theme
// import { create } from '@storybook/theming';

// export default create({
//     base: 'light',
//     brandTitle: 'Pepperi storybook for ngx-composite-lib ',
//     brandUrl: 'http://www.pepperi.com',
//     brandImage: '/pepperi-logo.png', //'https://www.pepperi.com/wp-content/uploads/2015/05/pepperi-logo.png',
// });


import { create } from "@storybook/theming";

const mainBrand = "rgb(131, 179, 12)";
const darkBrand = "rgb(110, 150, 10)";
// const secondaryBrand = "rgb(110, 150, 10)";
// const secondaryBrand = "rgb(254, 80, 0)";
const secondaryBrand = "rgb(209, 65, 0)";
const bWLightest = "rgb(255, 255, 255)";
const bWLighter = "rgb(247, 247, 247)";
const bWLight = "rgb(240, 240, 240)";
const bWBase = "rgb(204, 204, 204)";

const textVal = "51, 51, 51";
const textMain = "rgb(" + textVal + ")";
const textDim = "rgba(" + textVal + ", 0.7)";
const textDisabled = "rgba(" + textVal + ", 0.35)";

export default create({
    base: "light",
    colorPrimary: mainBrand,
    colorSecondary: secondaryBrand,

    // UI
    // General BG
    appBg: bWLightest,
    // Body BG
    appContentBg: "white",
    appBorderColor: bWBase,
    appBorderRadius: 4,

    // Typography
    fontBase: '"Inter", sans-serif',
    fontCode: '"Fira Code", monospace',
    
    // Text colors
    textColor: textMain,
    textInverseColor: textDim,
    textMutedColor: textDisabled,

    // Toolbar default and active colors
    barTextColor: mainBrand,
    barSelectedColor: darkBrand,
    barBg: bWLighter,

    // Form colors
    inputBg: "white",
    inputBorder: bWLight,
    inputTextColor: "black",
    inputBorderRadius: 4,

    brandTitle: "Pepperi storybook for ngx-composite-lib ",
    brandUrl: "http://www.pepperi.com",
    brandImage: "https://yonatankof.com/misc/pepp/PepperiLogoGreenBlack.svg",
    brandTarget: "_self",
});
