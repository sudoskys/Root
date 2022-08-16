# 前言


Welcome to IdontKnowRoot ，本站基于 mkdocs.org，致力于给予小白全详细的刷机起步指导，不必因为教程老旧，描述不清而发愁。

同时，本仓库 issue 不接受具体指导的提问，只接受文档的改进建议，如果你发现了本文的的错误或不足，欢迎向[项目仓库](https://github.com/sudoskys/Root/)提 issue 和 PR ！

但是，你可以在 [这里](https://github.com/sudoskys/Root/discussions) 发起讨论，但是！如果问题是太过简单可以自力更生搜索到的，提问会被打回。



你可以点击右上角来对文档提出修改，或者使用 [GithubDev](https://github.dev/sudoskys/Root)

>本站大多数资料都是综合收集来的，不许商用，需要商用请和引用页内的源取得授权


## **资料连结**



原始导出的长文PDF版本在 [这里](https://github.com/sudoskys/Root/)

你也可以在 [这里](https://github.com/sudoskys/Root/) 看到这篇教程

你可以在 [这里](https://push.dianas.cyou/LIS/Share/Root/) 下载相关文件包

工具包备份分流地址如下

- 暂无

在操作过程中，你可以在**以下平台获取相关支持**

- 分享站 https://kamiui.ml/E52shuaji/
- 橘色小狐狸官网 https://orangefox.download/zh-CN
- 搞机助手 https://gjzsr.com/
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


## **交流原则**

在与人交流情况下，请**务必遵循**以下守则:

[如何获取别人的帮助？](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md)


你可能曾经试过向大牛提问，但是这些提问往往石沉大海，于是你就纳闷了，这些大牛们平时在网上看都性格好好和蔼可亲的样子，怎么一向他们提问变得那么冷漠了？反差实在是太大了。[^32]

其实，出现这样的情况，往往不是对方耍大牌，而是你提问的方式错了。所以这篇文章让大家了解几个原则，让你更好地提问，并获得高回复率。

### 原则一、向适当的人提问适当的问题。
   
领域内专家喜欢艰巨的任务和激发思考的好问题。如果你提的问题在百度知道都可以找到答案，就莫怪他们鄙视你了，你也应该反省一下，你自己为什么那么懒？！这些懒人们在高手眼中就像是蛀虫一样，本来大牛们的时间就不多，与其忽视你的傻问题，不如花时间去回答其他更有意义的问题。

### 原则二、提问前先搜一搜。

将你的问题放进搜索引擎过滤一遍，这其实不是什么难事，事实证明，90%的问题都可以用搜索引擎解决了，百度不行，用Google，Google不行用知乎。

什么？怎么搜索？！

打开 bing.com

什么？链接在哪里？！

看原则二！


### 原则三、提问前先试试自己解决。
    
如果你的问题在网络上找不到答案，你也需要自行思考试图解决，解决不了，再向大牛们提问，大牛们喜欢看勤于思考，喜欢自己动手的人，不要以为你可以随便地忽悠大牛，大牛们的经验比你丰富，一眼就可以看得出你对待问题的态度，所以，认真地思考，准备好你的问题。

### 原则四、准确地描述问题。

问题的描述应该包含以下内容：

清晰的细节；
    问题发生的背景；
    提问前做过的调查研究及对其的理解；
    提问前为确定问题而采取的诊断步骤；
    注意：千万不要用什么「跪求」，「在线等」，「紧急」等之类哗众取宠的词语来吸引大牛的注意，在大牛们看来，这些问题根本不值得去回答。

### 原则五、问题解决后向大牛汇报一下结果。

别的不说，别人帮你解决了问题，你得向别人说声谢谢吧，这是最基本的礼节。

如果你厚道的话，也可以将解决问题的过程写下来，让以后有问题的人不要重蹈覆辙。这个举动不仅是在总结经验，而且是在为自己攒人品，大牛们看到你的总结会欣赏你的作为，以后就更加喜欢回答你的问题，说不定你以后还有机会和大牛们吃吃饭呢。

### 原则六、如果期望别人积极地帮助你

??? help "答案"
    
    **打钱啊**


## 贡献者

本教程由 Sudoskys 引录编辑 
[Jasmine](https://blog.dianas.cyou/)

**由以下人士参与校对**

- [ZH/NSFW]狼-公开备忘录
- 笨蛋ovo 
- Aidenpers Ultra
- 小迅的皮套
- Chi_Tang
- slQYa

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

[^21]:[底层刷机教程/全解析](https://wiki.pchelper666.com/%E5%BA%95%E5%B1%82%E5%88%B7%E6%9C%BA%E6%95%99%E7%A8%8B)

[^22]:[**高通9008线刷救黑砖教程**](https://www.bilibili.com/read/cv15031395/](https://www.bilibili.com/read/cv15031395/)

[^23]:[保留root去更新系统](https://www.coolapk.com/feed/37647626)
[^24]:[自制简易Magisk模块教程-辉少菌](https://www.coolapk.com/feed/16164846)
[^25]:[自制简易Magisk模块教程](https://www.coolapk.com/feed/37576170)
[^26]:[MagiskInstallation](https://topjohnwu.github.io/Magisk/install.html)
[^27]:[MagiskDeveloperGuides](https://topjohnwu.github.io/Magisk/guides.html|https://e7kmbb.github.io/Magisk/guides.html)
[^28]:[联发科不建议玩机](https://www.coolapk.com/feed/37080982)
[^29]:[Root升级系统](https://www.coolapk.com/feed/34860331)
[^30]:[简单认识手机各个分区](https://www.coolapk.com/feed/38367093)
[^31]:[手动给予安卓应用root权限的方法](https://www.coolapk.com/feed/37543497)
[^32]:[如何提问，并获得高回复率] (https://zhuanlan.zhihu.com/p/19779979)
[^33]:[Android Root原理分析及防Root新思路](https://blog.csdn.net/hsluoyc/article/details/50560782)

[^34]:[Root卡刷原理](https://www.zhihu.com/question/20098750/answer/173038749)

[^35]:[Fastboot 原理](https://wowothink.com/5ade33b8/)

[^36]:[Bootloader 原理](https://www.zhihu.com/question/47496619/answer/195494376)

[^37]:[MTK刷机原理](https://websetnet.net/zh-CN/%E7%8E%B0%E5%9C%A8%E5%8F%AF%E4%BB%A5%E8%BD%BB%E6%9D%BE%E7%BB%95%E8%BF%87Mediateks-sp%E9%97%AA%E5%AD%98%E5%B7%A5%E5%85%B7%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81/)

[^38]:[高通9008刷机原理](https://www.xda-developers.com/how-to-unbrick-oneplus-nord-msmdownloadtool/)