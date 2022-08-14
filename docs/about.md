
## 社区


[Fiime :fontawesome-solid-paper-plane:](https://fiime.cn/){ .md-button }

[Fiime](https://fiime.cn/)

[Magisk](https://forum.xda-developers.com/f/magisk.5903/)

[AKR社区](https://www.akr-developers.com/)

## [Magisk](https://github.com/topjohnwu/Magisk)

使用任何模块之前请考虑格机风险。模块推荐请自己查社区（酷安等）

### 资源分享

[刷机资源](https://kamiui.ml/E52shuaji/)

[插件仓库-FiimeROM](https://mi.fiime.cn/libcangku)

[Magisk 资源分享](https://shuajinet.com/)

[Magisk仓库模块](http://tx48.top/)


### 社区模块库

[Magisk Modules Repository - Androidacy](https://www.androidacy.com/magisk-modules-repository/?utm_source=old-repo-link&utm_medium=web&utm_campaign=redirects)

## [LSPosed](https://github.com/LSPosed/LSPosed)

> LSPposed是一个模块框架，可以在不接触任何APK的情况下更改系统和应用程序的行为。这意味着模块可以适用于不同的版本甚至ROM，而无需任何更改（只要原始代码没有更改太多）。它也很容易撤消。由于所有更改都在内存中完成，因此您只需停用模块并重新启动即可恢复原始系统。
> 

请使用Zygisk，riru已经停止维护。如果你使用Zygisk，那么Riru就无法使用，这样的话Lsposed也无法使用。不过Lsposed已经推出了Zygisk版本。Zygisk模式下用Shamiko模块的白名单模式，真的是yyds。就是默认全局对所有应用隐藏Root，除了超级用户授权过的应用可以获得Root权限，其他新装软件都完全请求不到和检测到Root。低于安卓9的版本的Miui不要开启Zygisk模式，亲测卡米

[MagiskHide没了，Zygisk又是啥？](https://www.bilibili.com/read/cv14287396)

[LSPosed（第三期） - Riru版和Zygisk版安装使用指南【手机改造计划】](https://www.bilibili.com/read/cv17028007)

[GitHub - LSPosed/LSPosed: LSPosed Framework](https://github.com/LSPosed/LSPosed)

[Xposed-Modules-Repo](https://github.com/Xposed-Modules-Repo)

[LSPosed](https://t.me/s/LSPosed)

下载模块后，在面具的设置中开启 Zygsik，同时在模块中从本地安装 LSposed。重启设备，桌面就新增 LSPosed 的APP。

## 安全验证^7

Google 那边已经给开发者提供了一个基于 SafetyNet 认证的反盗版功能（anti-piracy feature），开发者如果使用这套机制，那么已经 root、无法通过 SafetyNet 认证的设备就没办法在 Play 商店搜索、下载和更新对应的 App。

SafetyNet 是 Google 移动服务套件的功能，这意味着，只有装有 GMS 并且应用调用了相关接口的情况下，我们才需要通过 SafetyNet 验证。逃避国内应用的 root 检测大部分情况下并不需要通过 SafetyNet 认证，只要使模块和 Magisk 不对这些应用生效即可，无需在意 SafetyNet 结果。

推荐 [YASNAC](https://play.google.com/store/apps/details?id=rikka.safetynetchecker)。下载此软件，然后进行一次测试，我们便知道自己的设备是否启用了基于硬件的安全验证。

留意 `evaluationType` 一项的结果，根据前文的解释，若此结果为 `basic`，则意味着没有启用基于硬件的安全验证，若此结果为 `hardware`，则增强安全验证已经启用。

如果选项为 `basic`，我们可以：

• 开启 Zygisk，使用排除列表，将需要的应用添加进排除列表中；依照前面的说法，排除列表中的应用是不受 Magisk 影响的，并且由于系统没有基于硬件的安全验证，此时设备仍然可以通过 SafetyNet；然而**其代价是所有模块在此应用上均无效果**；

Zygisk模式下用Shamiko模块的白名单模式，真的是yyds。就是默认全局对所有应用隐藏Root，除了超级用户授权过的应用可以获得Root权限，其他新装软件都完全请求不到和检测到Root，配置教程请读：

[图文分享](https://www.coolapk.com/feed/37950576)

附：

[](https://play.google.com/store/apps/details?id=rikka.safetynetchecker)

[Shizuku](https://shizuku.rikka.app/zh-hans/)

### 附录

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


