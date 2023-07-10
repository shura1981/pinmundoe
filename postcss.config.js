import purgecss from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';

const purgecssConfig = purgecss({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    css: ['./src/**/*.scss'],
})

const postcssPlugins = ({ env }) => ({
    plugins: [
        // env === 'production' ? purgecssConfig : false,
        // purgecssConfig,
        autoprefixer()
    ]
})

export default postcssPlugins;