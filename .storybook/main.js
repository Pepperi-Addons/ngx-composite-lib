module.exports = {  
  "stories": [
    "../projects/ngx-composite-lib/**/*.stories.mdx",
    "../projects/ngx-composite-lib/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss"
  ],
  "framework": "@storybook/angular",
  "core": {
    "builder": "webpack5"
  }
}

//@pepperi-addons/ngx-lib/theming