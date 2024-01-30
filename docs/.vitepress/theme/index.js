// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        // ...
    },
    setup() {
        // 获取前言和路由
        const {frontmatter} = useData();
        const route = useRoute();
        // 评论组件 - https://giscus.app/
        giscusTalk({
                repo: 'sudoskys/Root',
                repoId: 'R_kgDOH0E2Jg',
                category: 'Q&A', // 默认: `General`
                categoryId: 'DIC_kwDOH0E2Js4CQ2Y8',
                mapping: 'pathname', // 默认: `pathname`
                inputPosition: 'top', // 默认: `top`
                lang: 'zh-CN', // 默认: `zh-CN`
                lightTheme: 'preferred_color_scheme', // 默认: `light`
                darkTheme: 'transparent_dark', // 默认: `transparent_dark`
                loading: 'lazy', // 默认: `false`
                reactionsEnabled: '1', // 默认: `true`
                emitMetadata: '0', // 默认: `true`

            }, {
                frontmatter, route
            },
            // 是否全部页面启动评论区。
            // 默认为 true，表示启用，此参数可忽略；
            // 如果为 false，表示不启用。
            // 可以在页面使用 `comment: true` 前言单独启用
            true
        );
    }
};