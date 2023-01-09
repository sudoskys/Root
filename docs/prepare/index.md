# 快问快答

## 我的手机能 Root 吗？

第一看手机厂商能不能解锁 Bootloader ,第二看你使用的机型是否有 全量系统包 或者 对应的第三方Recovery包.

如果不是特别小众或厂商故意封锁,大部分手机都可以 Root.

- 除了小米、一加、Google 等品牌之外，大多数的品牌可能会在解锁 Bootloader 后失去保修（如 OPPO、真我、三星、索尼、摩托罗拉），还有的可能会导致某些功能的永久失效（如三星解锁后会物理熔断 Knox，导致无法使用三星支付

## 等一下，你想 Root 模拟器？

模拟器一般自带 Root,但是这个 Root 提供的功能有限。而面具相比于模拟器自带的 Root，可以额外使用面具的模块，还可以通过模块阻止 App 检测手机应用。

[Magisk Delta](https://huskydg.github.io/magisk-files/) 支持 Android 7+ 模拟器：NoxPlayer、MEmu、LDPlayer 等平台，可以将 Magisk 安装到 Magisk 应用程序的系统分区中。

[initrd-magisk](https://github.com/HuskyDG/initrd-magisk) 可以将 Magisk 集成到 Android-x86 项目中，[它的 Wiki](https://github.com/HuskyDG/initrd-magisk/wiki)

## 等一下，你想 Root Windows WSA？

请使用 [MagiskOnWSALocal](https://github.com/LSPosed/MagiskOnWSALocal) 项目。

## 不能Root,但是想用

假如你经过后面的尝试，发现厂商锁住了 Bootloader,魔改了分区，锁定了端口，甚至把系统组件放进了 Data里... 就是不能Root...

但是我好想用模块啊！！！

答：你可以去试一下 LSPatch？它可以把模块打包进应用里！

>LSPatch: A non-root Xposed framework extending from LSPosed

想使用它很简单，但是它只支持 9 以上的安卓系统。下面是它的使用教程。

- [简单的 LSPatch 使用教程](https://duzhaokun123.github.io/2022/05/06/simple-lspatch-guide.html#q0-lspatch-%E6%98%AF%E4%BB%80%E4%B9%88)

- [项目与下载地址](https://github.com/LSPosed/LSPatch)

- [一个教程](https://www.jipa.work/lspatch)

## 本节参考

```
[^1]:**所需资料打包**<https://push.dianas.cyou/LIS/Share/Root/>

[^3]:[Android玩家必备神器入门：从零开始安装Magisk](https://sspai.com/post/67932)

[^17]:[一些常识基础](https://mi.fiime.cn/tutorial)

[^28]:[联发科不建议玩机](https://www.coolapk1s.com/feed/37080982)

[^30]:[简单认识手机各个分区](https://www.coolapk1s.com/feed/38367093)

[^33]:[Android-Root原理分析及防Root新思路](https://blog.csdn.net/hsluoyc/article/details/50560782)

[^36]:[Bootloader原理](https://www.zhihu.com/question/47496619/answer/195494376)

[^39]:[为什么内存不叫运存？](https://www.zhihu.com/question/327171923/answer/716602933)

[^41]:[[新手必看]华为刷机你一定要知道的](https://zhuanlan.zhihu.com/p/416456337)

[^42]:[部分华为麒麟手动获取BL解锁码](https://zhuanlan.zhihu.com/p/397173427)

[^45]:[关于ProjectTreble和AndroidGSI](https://bbs.liuxingw.com/t/9315/2.html)

```
