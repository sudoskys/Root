
## 社区



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

请使用Zygisk，riru已经停止维护。如果你使用Zygisk，那么Riru就无法使用，这样的话Lsposed也无法使用。不过Lsposed已经推出了Zygisk版。

低于安卓9的版本的Miui不要开启Zygisk模式，亲测卡米

[MagiskHide没了，Zygisk又是啥？](https://www.bilibili.com/read/cv14287396)

[LSPosed（第三期） - Riru版和Zygisk版安装使用指南【手机改造计划】](https://www.bilibili.com/read/cv17028007)

[GitHub - LSPosed/LSPosed: LSPosed Framework](https://github.com/LSPosed/LSPosed)

[Xposed-Modules-Repo](https://github.com/Xposed-Modules-Repo)

[LSPosed](https://t.me/s/LSPosed)

下载模块后，在面具的设置中开启 Zygisk，同时在模块中从本地安装 LSposed。重启设备，桌面就新增 LSPosed 的APP。

## 安全验证

Google 那边已经给开发者提供了一个基于 SafetyNet 认证的反盗版功能（anti-piracy feature），开发者如果使用这套机制，那么已经 root、无法通过 SafetyNet 认证的设备就没办法在 Play 商店搜索、下载和更新对应的 App。[^7]

SafetyNet 是 Google 移动服务套件的功能，这意味着，只有装有 GMS 并且应用调用了相关接口的情况下，我们才需要通过 SafetyNet 验证。逃避国内应用的 root 检测大部分情况下并不需要通过 SafetyNet 认证，只要使模块和 Magisk 不对这些应用生效即可，无需在意 SafetyNet 结果。

推荐 [YASNAC](https://play.google.com/store/apps/details?id=rikka.safetynetchecker)。下载此软件，然后进行一次测试，我们便知道自己的设备是否启用了基于硬件的安全验证。

留意 `evaluationType` 一项的结果，根据前文的解释，若此结果为 `basic`，则意味着没有启用基于硬件的安全验证，若此结果为 `hardware`，则增强安全验证已经启用。

如果选项为 `basic`，我们可以：

开启 Zygisk，使用排除列表，将需要的应用添加进排除列表中；依照前面的说法，排除列表中的应用是不受 Magisk 影响的，并且由于系统没有基于硬件的安全验证，此时设备仍然可以通过 SafetyNet；然而**其代价是所有模块在此应用上均无效果**；


Zygisk模式下用Shamiko模块的白名单模式很好用。就是默认全局对所有应用隐藏Root，除了超级用户授权过的应用可以获得Root权限，其他新装软件都完全请求不到和检测到Root，配置教程请读前文或者：[酷安图文分享](https://www.coolapk1s.com/feed/37950576)

附：

[SafeNet通过性检查](https://play.google.com/store/apps/details?id=rikka.safetynetchecker)

[Shizuku](https://shizuku.rikka.app/zh-hans/)


## 刷机原理？

### REC

Recovery也就是我们常用来三清和卡刷用的东西。

安卓刷机和 系统OTA 升级原理相同，系统OTA升级使用的是官方的Recovery，用官方recovery刷官方包。

但是官方recovery有对要刷入的包进行签名校验，所以官方recovery是不能刷入第三方包的，对官方包的任何修改都会导致官方recovery刷入官方包失败。

所以如果需要刷入其他包，那就必须要刷入一个第三方recovery，第三方recovery不会对ROM包进行签名校验，所以可以刷入任何ROM作者针对该机型做的包。

如果刷入了与手机机型不匹配的 Rom包，你的手机很可能变成真砖或者基带丢失..[^34]

![](https://s3.bmp.ovh/imgs/2022/08/16/d277c357ef54f02d.png)


### Fastboot



在安卓手机中 Fastboot 是一种比Recovery更底层的刷机模式，计算机通过 Usb 线将已有的各分区文件（光盘映象文件）直接覆写到指定分区中。[^35]

!!! info 
 
    Android设备和PC之间的协议通信，除了`fastboot`协议还有使用`adb`协议。
    adb用于 Android 设备系统起来后的调试，允许访问Android 系统。
    fastboot 用于 Android 设备开发过程中刷写镜像使用以及 Android 设备无法开机时进入 fastboot 模式救砖使用。

这种方式下，你可以选择保留资料刷机。也可以用指令操作手机。(解锁Bootloader需要清除数据，如果解锁过了，可以保留)

刷坏了recovery模式都进不了的情况下也可以通过fastboot刷回来。

fastboot模式其实是调用spl进行刷机的，所以如果刷spl坏了，fastboot模式应该也进不了，也就是砖了


### 9008 深刷

高通的紧急下载模式（EDL） ，9008 就是 download 模式，作为最底层的联机模式，机器 Rec，fastboot 都被篡改或清除时，唯一能进入还不会被摧毁的就是 download 模式，除了链接电脑机器任何跟刷写系统无关的功能全部关闭不运行。

高通的QPST线刷模式，因联机之后端口名字叫Qualcomm HS-USB QDLoader 9008 (COMx)而得名。这种模式下，可以彻底删除手机系统后刷入新系统。



### Mtk 深刷
[^21]

!!! tip
    联发科的底层刷机模式没有高通那么麻烦。该模式在MTK内部被称为MTK in-house developed loader。MTK的该模式与高通略有不同，该模式具有帮助系统寻找Uboot的功能。该模式除了具有启动功能之外，还具有下载功能。首先还是需要明确的是mtk芯片都有一个boot rom，如果没有这个rom，那么程序是无法被下载到Nand Flash中的，然后此时的Flash上是为空的，没有任何数据的。系统在上电之后它会检测是启动模式还是下载模式，如果是下载模式，它会初始化一个usb的串口，将Preloader加载到内部的SRAM中，跳转到Preloader中去执行，初始化好Flash和外部RAM之后，依次将preloader、lk、kernel、android下载到nand flash中去。


装有联发科技芯片组的设备具有BROM（引导只读存储器），通常会加载预加载器可执行文件并随后引导Android系统，但还具有一种称为下载模式的替代引导模式。 它严格用于OEM维修，可用于拆开设备，就像 高通的紧急下载模式（EDL）。 由联发科制造的专有程序称为“ SP Flash Tool”，可以利用此接口强制刷新设备上的系统软件。

小米已经提交修复此漏洞，此方法限制于 天矶920 之前。

[^7]:[Android 玩机「神器」的矛盾与新生：Magisk Canary 更新详解 - 少数派 (sspai.com)](https://sspai.com/post/69945)

[^34]:[Root卡刷原理](https://www.zhihu.com/question/20098750/answer/173038749)

[^35]:[Fastboot 原理](https://wowothink.com/5ade33b8/)


[^21]:[底层刷机教程/全解析](https://wiki.pchelper666.com/%E5%BA%95%E5%B1%82%E5%88%B7%E6%9C%BA%E6%95%99%E7%A8%8B)



[^37]:[MTK刷机原理](https://websetnet.net/zh-CN/%E7%8E%B0%E5%9C%A8%E5%8F%AF%E4%BB%A5%E8%BD%BB%E6%9D%BE%E7%BB%95%E8%BF%87Mediateks-sp%E9%97%AA%E5%AD%98%E5%B7%A5%E5%85%B7%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81/)

[^38]:[高通9008刷机原理](https://www.xda-developers.com/how-to-unbrick-oneplus-nord-msmdownloadtool/)

