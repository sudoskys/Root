# 前言


Welcome to IdontKnowRoot ，本站基于 [mkdocs.org](https://www.mkdocs.org)，致力于给予小白全详细的刷机起步指导，不必因为教程老旧，描述不清而发愁。


如果你发现了本文的的错误或不足，欢迎向[项目仓库](https://github.com/sudoskys/Root/)提 issue 和 PR ！

你可以点击右上角来对文档提出修改，或者使用 [GithubDev](https://github.dev/sudoskys/Root)

>本站大多数资料都是综合收集来的，不许商用，需要商用请和引用页内的源取得授权


## **资料连结**



原始导出的长文PDF版本在 [这里](https://github.com/sudoskys/Root/)

你也可以在 [这里](https://github.com/sudoskys/Root/) 看到这篇教程

你可以在 [这里](https://push.dianas.cyou/LIS/Share/Root/) 下载相关文件包。
工具包备份分流地址如下

- 暂无

在操作过程中，你可以在以下平台获取相关支持

- 分享站 https://kamiui.ml/E52shuaji/
- 橘色小狐狸官网 https://orangefox.download/zh-CN
- 还可以的论坛 https://mi.fiime.cn
- Twrp官方 https://twrp.me/Devices
- 小米Rom下载站？ http://xiaomirom.com
- XDAMagiskForum https://forum.xda-developers.com/f/magisk.5903/

##  **文档结构**

本教程仅供参考，阅读者**需要自己承担因尝试解锁导致的后果**。

如果你对自己的动手能力感到怀疑，可以选择付费请人！**这个教程需要一台 WIN7及以上/Linux 的电脑。请先提前阅读一遍教程，而不是一步一步来。最好使用 Win10 ，避免驱动问题**


**刷机大概有几种方法：** rec，fastboot，fastbootd，9008，mtk端口。
![c3v64ptb34tc8qacv7jg.png](https://s1.328888.xyz/2022/08/13/TGFaP.png)

同时因为 Android 阵营厂商众多，的确很难保证他们步伐齐一，也就不存在某种一定通行的「通法」能够搞定任一 Android 设备的 `Magisk` 刷入。

但是本文档会从 

- 准备
- 刷机
- 优化

三个章节展开相关叙述，其中在第二节会描述不同的常用对策方法



## 贡献者

本教程由 Sudoskys 引录编辑 
[Jasmine](https://blog.dianas.cyou/)

**由以下人士参与校对**

- [ZH/NSFW]狼-公开备忘录
- 笨蛋ovo 
- Aidenpers Ultra
- 小迅的皮套
- Chi_Tang


## 引录



[^1]:**所需资料打包**<https://push.dianas.cyou/LIS/Share/Root/>

[^2]: ****root、刷rec、rom通用教程<****[sudo0m.github.io/2022/05/29/root、刷rec、rom通用教程/](http://sudo0m.github.io/2022/05/29/root%E3%80%81%E5%88%B7rec%E3%80%81rom%E9%80%9A%E7%94%A8%E6%95%99%E7%A8%8B/)****>****

[^3]:[Android 玩家必备神器入门：从零开始安装 Magisk - 少数派 (sspai.com)](https://sspai.com/post/67932)

[^4]:Magisk官方教程<[https://topjohnwu.github.io/Magisk/](https://topjohnwu.github.io/Magisk/)>

[^5]:Magisk官方论坛<[https://forum.xda-developers.com/f/magisk.5903/](https://forum.xda-developers.com/f/magisk.5903/)>

[^6]:[每个 Android 玩家都不可错过的神器（一）：Magisk 初识与安装 - 少数派 (sspai.com)](https://sspai.com/post/53043)

[^7]:[Android 玩机「神器」的矛盾与新生：Magisk Canary 更新详解 - 少数派 (sspai.com)](https://sspai.com/post/69945)

[^8]:**Root隐藏教程**：[图文分享 - 酷安 (coolapk.com)](https://www.coolapk.com/feed/37950576)

[^9]:**酷安MiaoHan 的专栏** [https://www.coolapk.com/feed/32286938](https://www.coolapk.com/feed/32286938)

[^10]:[APKMirror - Free APK Downloads - Free and safe Android APK downloads](https://www.apkmirror.com/)

[^11]:[Clash For Magisk简介 - CFM (adlyq.ml)](https://docs.adlyq.ml/)

[^12]:****小米手機各種刷機方式的疑問?**** [https://www.mobile01.com/topicdetail.php?f=634&t=3725269](https://www.mobile01.com/topicdetail.php?f=634&t=3725269)

[^13]:****[通过 ADB 给手机刷入第三方 Recovery](https://blog.linioi.com/posts/8/)**** 

[^14]:****小米如何刷入第三方Recovery**** [https://zhuanlan.zhihu.com/p/428730333](https://zhuanlan.zhihu.com/p/428730333)

[^15]: 告诉大家如何防止掉基带问题 [https://www.coolapk.com/feed/21305538](https://www.coolapk.com/feed/21305538)

[^16]:酷安Rannki原创 [https://www.coolapk.com/feed/21305538](https://www.coolapk.com/feed/21305538?shareKey=NWMzMGQxYTU4OWMwNWZlNzJjZTc~&shareUid=1294855&shareFrom=com.coolapk.market_10.5.3)

[^17]:常识基础 [https://mi.fiime.cn/tutorial](https://mi.fiime.cn/tutorial)

[^18]:**刷入原生ROM的通用教程等教程** [https://fiime.cn/thread/359](https://fiime.cn/thread/359)

[^19]:****[Violet 机型 PE/Plus 刷入教程](https://blog.linioi.com/posts/10/)****

[^20]:****[如何在 Redmi Note 7 Pro 上刷机？](https://blog.linioi.com/posts/11/)****

[^21]:[https://wiki.pchelper666.com/底层刷机教程](https://wiki.pchelper666.com/%E5%BA%95%E5%B1%82%E5%88%B7%E6%9C%BA%E6%95%99%E7%A8%8B)

[^22]:**高通9008线刷救黑砖教程** [https://www.bilibili.com/read/cv15031395/](https://www.bilibili.com/read/cv15031395/)

[^23]:保留root去更新系统 https://www.coolapk.com/feed/37647626

[24^]:自制简易Magisk模块教程-辉少菌 https://www.coolapk.com/feed/16164846
[25^]:自制简易Magisk模块教程 https://www.coolapk.com/feed/37576170
[26^]:MagiskInstallation https://topjohnwu.github.io/Magisk/install.html
[27^]:MagiskDeveloperGuides https://topjohnwu.github.io/Magisk/guides.html|https://e7kmbb.github.io/Magisk/guides.html