// @ts-ignore
import {createRequire} from 'module'
import {defineConfig} from 'vitepress'
import {pagefindPlugin} from 'vitepress-plugin-pagefind'
// https://vitepress.dev/reference/site-config

// @ts-ignore
export default defineConfig({
        lang: 'zh-CN',
        title: 'Root Docs',
        base: "/",
        description: 'Teach people how to master their own Phone',
        lastUpdated: true,
        cleanUrls: true,
        locales: {
            root: {
                label: 'Chinese',
                lang: 'zh',
                link: '/'
            }
        },
        head: [
            ['meta', {name: 'theme-color', content: '#4b56c1'}]
        ],
        vite: {
            plugins: [pagefindPlugin()],
        },
        themeConfig: {
            nav: navBar(),
            siteTitle: 'Root My Phone',
            logo: '',
            sidebar: {
                '/': sidebarGuide(),
            },
            editLink: {
                pattern: 'https://github.com/sudoskys/Root/edit/main/docs/:path',
                text: 'Edit On GitHub'
            },
            socialLinks: [
                {icon: 'github', link: 'https://github.com/sudoskys/Root'}
            ],
            footer: {
                message: 'Released under the GFDL License.',
                copyright: 'Copyright © 2022-present Us'
            },
            lastUpdated: {
                text: 'Updated at',
                formatOptions: {
                    forceLocale: true,
                },
            },
            outline: [1, 3],
        },
    }
)


function navBar() {
    return [
        // {text: 'Deploy Guide', link: '/docs/getting-started', activeMatch: '/docs/'},
        {
            text: "About Docs",
            items: [
                {
                    text: 'Changelog',
                    link: 'https://github.com/sudoskys/Root/pulls?q='
                }
            ]
        }
    ]
}

function sidebarGuide() {
    return [
        {
            text: '基础指南',
            collapsed: false,
            items: [
                {text: '快速刷机', link: '/docs/flash'},
                {text: '救砖', link: '/docs/unbrick'},
                {text: '调整环境', link: '/docs/optimize'},
                {text: '卡刷教程', link: '/docs/brush'},
                {text: '9008 刷写', link: '/docs/9008flash'},
                {text: 'MTK芯片漏洞', link: '/docs/mtk_vul'},
            ]
        },
        {
            text: '知识读本',
            collapsed: false,
            items: [
                {text: '关于分区', link: '/docs/partition'},
                {text: '刷写 GSI 通用镜像', link: '/docs/gsi'},
                {text: 'KernelSu 方案', link: '/docs/kernelsu'},
            ]
        }
    ]
}


