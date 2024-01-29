// @ts-ignore
import {createRequire} from 'module'
import {defineConfig} from 'vitepress'

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
                    dateStyle: 'full',
                    timeStyle: 'medium'
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
                {text: '救砖和善后工作', link: '/docs/index'},
                {text: '关于卡刷', link: '/docs/index'},
                {text: '线刷详细教程', link: '/docs/index'},
                {text: 'MTK漏洞', link: '/docs/index'},
            ]
        },
        {
            text: '知识读本',
            collapsed: false,
            items: [
                {text: '关于 AB 分区的事情', link: '/docs/vab'},
                {text: '关于 AB 分区的事情', link: '/docs/vab'},
            ]
        }
    ]
}


