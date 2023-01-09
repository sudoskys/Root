# 前言

Welcome to IdontKnowRoot

本站基于广泛调研的基础，打破圈层壁垒，致力于给予小白全详细的刷机起步指导或给经常刷机的人一个速查手册，不必因为教程混乱，分散，老旧或描述不清而耗费心力。

你可以点击右上角来对文档提出修改，或者使用 [GithubDev](https://github.dev/sudoskys/Root) 添加内容！

本仓库 issue 不接受关于具体刷机如何操作的询问，只接受文档的改进建议，如果你发现了本文的的错误或不足，欢迎向[项目仓库](https://github.com/sudoskys/Root/)提 issue 和 PR ！

不过，你可以在 [Github-Discussions](https://github.com/sudoskys/Root/discussions) 发起讨论。但是请提问前先查阅网络信息。描述不清晰的，一看就没读文档的，模糊的提问会被关闭。

!!! tip "开始之前，你需要知道的..."
    本教程仅供参考，阅读者**需要自己承担因尝试解锁，Root导致的后果**。

## **文档结构简介**

如果你对自己的动手能力感到怀疑，可以选择花钱请专业人士操作。

**这个教程需要一台 WIN7及以上/Linux 的电脑。请先提前阅读一遍教程，而不是一步一步来。Win用户最好使用 Win10 ，避免驱动问题**

**刷机大概有几种方法**： Rec，Fastboot，Fastbootd，9008，mtk端口

**刷机的一般流程是**

![引用自少数派](https://user-images.githubusercontent.com/75739606/207025077-5d0231c7-08b1-4856-98c9-15c3efc1410a.png)
>引用自少数派[^3]

因为 Android 阵营厂商众多，的确很难保证他们步伐齐一，也就不存在某种一定通行的「通法」能够搞定任一 Android 设备的 `Magisk` 刷入。

所以，本文档会从

- 准备
- 刷机
- 优化

三个主要章节展开相关叙述，其中在第二节会描述不同的常用对策方法。

>在此提示:本站大多数资料都是综合收集来的，不许商用，需要商用请和引用页内的源取得授权

## **相关资料连结**

原始导出的长文PDF版本在 [这里](https://github.com/sudoskys/Root/)

你也可以在 [这里](https://github.com/sudoskys/Root/) 看到这篇教程

你可以在 [这里](https://push.dianas.cyou/LIS/Share/Root/) 下载相关文件包

工具包备份分流地址如下

- 暂无

在操作过程中，你可以在**以下平台获取相关支持**

- 分享站/模块 <https://kamiui.ml/E52shuaji/>
- 橘色小狐狸官网 <https://orangefox.download/zh-CN>
- 搞机助手 <https://gjzsr.com/>
- 还可以的论坛 <https://mi.fiime.cn>
- TWRP官方 <https://twrp.me/Devices>
- 小米Rom下载站？ <http://xiaomirom.com>
- XDAMagiskForum <https://forum.xda-developers.com/f/magisk.5903/>
- viQOO工具箱 <https://gitee.com/mouzei/viqoo>
- 通用系统镜像列表 <https://github.com/phhusson/treble_experimentations/wiki/Generic-System-Image-%28GSI%29-list>
- 小米各机型 MIUI 历史版本分类索引 <https://miuiver.com/>
- 面具模块 <https://magisk.suchenqaq.club/>

>本文档与上述平台无利益关系，凭内容判定列举,欢迎补充

## **社区交流原则**

在与人交流情况下，请**务必遵循**以下守则:

[如何获取别人的帮助？](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md)

你可能曾经试过向大牛提问，但是这些提问往往石沉大海，于是你就纳闷了，这些大牛们平时在网上看都性格好好和蔼可亲的样子，怎么一向他们提问变得那么冷漠了？反差实在是太大了。[^32]

其实，出现这样的情况，往往不是对方耍大牌，而是你提问的方式错了。

### 原则一、先初步判定问题

无 Log ，不帮忙，没有情况说明，谁也不知道你在做什么。

### 原则二、提问前先搜一搜

将你的问题放进搜索引擎过滤一遍，这其实不是什么难事，事实证明，90%的问题都可以用搜索引擎解决了，百度不行，用Google，Google不行用知乎。

打开 bing.com

### 原则三、提问前先试试自己解决

如果你的问题在网络上找不到答案，需要先自行思考试图解决。

### 原则四、准确地描述问题

问题的描述应该包含以下内容：

清晰的细节；
    问题发生的背景；
    提问前做过的调查研究及对其的理解；
    提问前为确定问题而采取的诊断步骤；
    注意：千万不要用什么「跪求」，「在线等」，「紧急」等之类哗众取宠的词语来吸引大牛的注意，在大牛们看来，这些问题根本不值得去回答。

### 原则五、感谢

别人帮你解决了问题，说声谢谢。

### 原则六、如果期望别人积极地帮助你

??? help "答案"

    **打钱啊**

## 贡献者

本教程由 Sudoskys 引录编辑
[Jasmine](https://blog.dianas.cyou/)

**由以下人士参与校对/编写**

- github@Scirese
- tg@狼 |ZH/EN/(JA)|o0kam1
- tg@Chi_Tang
- github@liuran001
- github@Dedicatus5457
- github@lz233
- tg@Aidenpers Ultra
- tg@小迅的皮套
- tg@slQYa
- github@solstice23

**由以下服务商托管运行**

![Vercel](https://img.shields.io/badge/Vercel-black?style=flat&logo=Vercel&logoColor=white)

**Theme:Mkdocs.org**

下面，让我们开始刷机！

## 引录



[^3]:[Android玩家必备神器入门：从零开始安装Magisk](https://sspai.com/post/67932)





























[^32]:[如何提问，并获得高回复率](https://zhuanlan.zhihu.com/p/19779979)

















