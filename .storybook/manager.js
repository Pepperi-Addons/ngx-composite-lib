import { addons } from '@storybook/addons';
import pepperiTheme from './pepperi-theme';

addons.setConfig({
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'right',
    enableShortcuts: true,
    isToolshown: true,
   // theme: pepperiTheme,
    selectedPanel: undefined,
    initialActive: 'sidebar',
    sidebar: {
        showRoots: false,
        collapsedRoots: ['other'],
    },
}); 