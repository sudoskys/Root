# 快速开始

此页面为快速开始，介绍整个流程。下文所说的安卓版本均为 **内核版本**。

我为 `VAB分区` `SELinux` 撰写的其他科普专题，请点击左侧导航栏。

## 什么是 Root

Root，即超级用户，是 Android 系统中的最高权限，拥有 Root 权限的用户可以对系统进行任意修改，包括删除系统自带的应用、修改系统文件、更换系统字体、更换系统主题、更换系统开机动画等等。

但是厂商并不希望用户获取 Root 权限，因为这会破坏系统安全，并且可能会被不法分子利用。

目前，最流行的 Root 框架是 `Magisk`，我们使用 `adb` 和 `fastboot` 工具链接手机和烧录 `Magisk` 修补后的分区文件，来获取 Root 权限。

下文将会主要介绍这种方法。

::: tip
因为 Android 阵营厂商众多，的确很难保证他们步伐齐一，所以本教程只会介绍通用的刷机方法和几个专题。
如果你的机型不在本教程中，可以尝试在 [xda-developers](https://forum.xda-developers.com/) 或 知乎，酷安 上搜索你的机型。
:::

## 还没有买手机？

如果你还没有买手机，可以参考 [Bootloader 解锁各厂商支持列表](https://github.com/KHwang9883/MobileModels/blob/master/misc/bootloader-kernel-source.md)。

::: info 为什么现在很多厂家不允许解锁 Bootloader？

**为了系统安全**

据工信部信管〔2016〕407号文件规定，移动智能终端是指接入公众移动通信网络、具有操作系统、可由用户自行安装和卸载应用软件的移动通信终端产品。
根据移动智能终端和预置APP的监管实践和用户实际使用需求，《通告》所称“移动智能终端”范围，主要包括接入公众移动通信网络的智能手机、平板电脑、可穿戴设备等大众消费类通信终端产品，不含工业终端、车载终端等面向特定行业和用途的数据终端，也不含未接入公众移动通信网络的智能终端产品。

而根据 [关于进一步规范移动智能终端应用软件预置行为的通告](https://www.gov.cn/zhengce/2022-12/15/content_5732078.htm) 内容，为避免“刷机”带来的**安全风险**，保护用户权益，《通告》要求生产企业完善移动智能终端权限管理机制，提升操作系统安全性，采取技术和管理措施预防“刷机”行为。
进一步明确生产企业对**预置APP**的**登记、审核、监测、留存、下架**等全链条管理责任。
:::

## 流程(线刷)

引用 少数派教程[^3] 的大致流程图如下：

![引用自少数派](https://user-images.githubusercontent.com/75739606/207025077-5d0231c7-08b1-4856-98c9-15c3efc1410a.png)

要查询你的机型是否可以刷机，需要做以下几步调查：

- 是否允许解锁 Bootloader
- 是否有可用的同系统版本的 Rom 包
- 刷写分区是 `boot` 还是 `init_boot`
- 如果没有，是否有其他玩家成功刷入
- 如果没有，论坛询问其他玩家

## 备份数据

首先截屏你的 `设置` > `关于手机` > `版本信息`，截图发送到你的电脑备用。

然后利用手机自带的备份功能，备份好你的数据，比如短信、通讯录、照片、视频、聊天记录、音乐等等。

接下来的操作会清除你的手机数据，所以请务必备份你的数据到**其他存储设备**。


## 准备刷写环境

### 寻找一键工具箱

如果你的机型有一键工具箱，那么你可以直接使用它来刷机，类似 大侠阿木的 [一加全能工具箱](https://optool.daxiaamu.com)。

如果你觉得仍然有必要学习刷机的话，那么你可以继续阅读本教程。

### 准备 **Magisk**

为了准备修补系统分区获取 Root 权限，请从 [Github](https://github.com/topjohnwu/Magisk/releases) 下载最新版本 Magisk。

`Ramdisk` 是系统中的一个小分区，`Ramdisk` 告诉系统需要加载哪些东西。而 Magisk 的目的就是修改 `Ramdsik`，把自己加进开机需要加载的系统组件中。

::: warning
安装 `Magisk Manager` 后如果主页面 `Ramdisk` 为 `是`，那么你才可以用面具刷写机器，反之只能放弃线刷。
当 `Ramdisk` 的值为「否」时，表示需要修改的 Ramdisk 被放在了 `recovery.img` 中，我们需要提取并修改 `recovery.img`，具体详情需要查阅专题。
:::

::: tip
少数小米设备存在检测设备信息错误的问题，Ramdisk 虽然显示为 `否`，但实际上需要修改 boot.img，具体请询问相同机型的刷机爱好者。
:::


### 安装手机驱动

你必须安装驱动才能调试你的设备。不同的安卓系统需要不同的驱动，它们一般由手机厂商提供。

如果你持有 `Google` 手机，你可以安装 [Google USB 驱动](https://developer.android.com/studio/run/win-usb)。

其他厂商的驱动如下表所示：

| OEM                        | Driver URL                                                                                                                                                                                       |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Acer                       | [https://www.acer.com/worldwide/support/](https://www.acer.com/worldwide/support/)                                                                                                               |
| Alcatel Mobile             | [https://www.alcatelmobile.com/support/](https://www.alcatelmobile.com/support/)                                                                                                                 |
| Asus                       | [https://www.asus.com/support/Download-Center/](https://www.asus.com/support/Download-Center/)                                                                                                   |
| Blackberry                 | [https://swdownloads.blackberry.com/Downloads/entry.do?code=4EE0932F46276313B51570F46266A608](https://swdownloads.blackberry.com/Downloads/entry.do?code=4EE0932F46276313B51570F46266A608)       |
| Dell                       | [https://support.dell.com/support/downloads/index.aspx?c=us&amp;cs=19&amp;l=en&amp;s=dhs&amp;~ck=anavml](https://support.dell.com/support/downloads/index.aspx?c=us&cs=19&l=en&s=dhs&~ck=anavml) |
| FCNT                       | [https://www.fcnt.com/support/develop/#anc-03](https://www.fcnt.com/support/develop/#anc-03)                                                                                                     |
| HTC                        | [https://www.htc.com/support](https://www.htc.com/support)                                                                                                                                       |
| Huawei                     | [https://consumer.huawei.com/en/support/index.htm](https://consumer.huawei.com/en/support/index.htm)                                                                                             |
| Intel                      | [https://www.intel.com/software/android](https://www.intel.com/software/android)                                                                                                                 |
| Kyocera                    | [https://kyoceramobile.com/support/drivers/](https://kyoceramobile.com/support/drivers/)                                                                                                         |
| Lenovo                     | [https://support.lenovo.com/us/en/GlobalProductSelector](https://support.lenovo.com/us/en/GlobalProductSelector)                                                                                 |
| LGE                        | [https://www.lg.com/us/support/software-firmware](https://www.lg.com/us/support/software-firmware)                                                                                               |
| Motorola                   | [https://motorola-global-portal.custhelp.com/app/answers/detail/a_id/88481/](https://motorola-global-portal.custhelp.com/app/answers/detail/a_id/88481)                                          |
| MTK                        | [http://online.mediatek.com/Public%20Documents/MTK_Android_USB_Driver.zip](http://online.mediatek.com/Public%20Documents/MTK_Android_USB_Driver.zip)(ZIP download)                               |
| Samsung                    | [https://developer.samsung.com/galaxy/others/android-usb-driver-for-windows](https://developer.samsung.com/galaxy/others/android-usb-driver-for-windows)                                         |
| Sharp                      | [http://k-tai.sharp.co.jp/support/](http://k-tai.sharp.co.jp/support/)                                                                                                                           |
| Sony Mobile Communications | [https://developer.sonymobile.com/downloads/drivers/](https://developer.sonymobile.com/downloads/drivers/)                                                                                       |
| Toshiba                    | [https://support.toshiba.com/sscontent?docId=4001814](https://support.toshiba.com/sscontent?docId=4001814)                                                                                       |
| Xiaomi                     | [https://web.vip.miui.com/page/info/mio/mio/detail?postId=18464849&amp;app_version=dev.20051](https://web.vip.miui.com/page/info/mio/mio/detail?postId=18464849&app_version=dev.20051)           |
| ZTE                        | [http://support.zte.com.cn/support/news/NewsDetail.aspx?newsId=1000442](http://support.zte.com.cn/support/news/NewsDetail.aspx?newsId=1000442)                                                   |
>表中数据来自 [Install OEM USB drivers](https://developer.android.com/studio/run/oem-usb#Drivers)

### 安装 `adb` 和 `fastboot` 工具

[手动安装](https://developer.android.google.cn/tools/releases/platform-tools)

- **Windows10 系统**

按住 `shift` 键，点击 `右键`，选择 `在此处打开 PowerShell 窗口`。

输入以下命令：

```shell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
scoop install aria2
scoop install main/adb
```

等待安装完成。

- **Linux 系统**

```shell
# Debian
sudo apt install android-tools-adb 
sudo apt install android-tools-fastboot
# CentOS
sudo yum install android-tools
sudo yum install android-tools-fastboot
# Arch
sudo pacman -S android-tools
```

- **macOS 系统**

```shell
brew install android-platform-tools
```

#### 测试 `adb` 链接

在 `关于手机` 中找到 `版本号`，连续点击，进入开发者模式，打开 `USB调试`。

使用**可靠**的 USB 数据线连接手机和电脑。

在弹出窗口中选择 `允许文件传输` 和 `一律允许此设备进行 USB 调试`。

打开 `PowerShell` 或 `终端`，输入 `adb devices` 列出设备，如果出现以下结果，说明链接成功。

```shell
List of devices attached
xxx device
```

::: tip
如果你在之后的步骤中遇到了 `xxx offline` 的问题（例如在切换到同设备的其他系统）。
请按照下面的操作重启链接。

- 拔掉 USB 数据线
- 在电脑终端输入 `adb kill-server` 关闭 `adb` 服务，然后输入 `adb start-server` 重启 `adb` 服务
- 在手机中关闭 `USB调试`
- 撤销 `USB调试` 的授权
- 重新插入 USB 数据线
- 重新打开 `USB调试` 并授权
  :::

#### 使用 `adb` 和 `fastboot` 工具的小技巧

- ADB

```shell
adb reboot bootloader     #进入 Bootloader 模式-
adb shell                 #启动 ADB 终端--
adb push <local> <remote> #从本地复制文件到设备---
adb pull <remote> <local> #从设备复制文件到本地----
``` 

- Fastboot

```shell
fastboot reboot
```

## 解锁 Bootloader

::: danger
解锁 Bootloader 会清除你的手机数据。
解锁 Bootloader 后，你可能会面临失去保修，损坏 `TTE` ，无法使用某些应用，无法升级系统等问题。
:::

**请阅读 [Bootloader 解锁支持列表](https://github.com/KHwang9883/MobileModels/blob/master/misc/bootloader-kernel-source.md)。**

Bootloader 是 Android 系统开始运行前的一个小程序，它是运行的第一个程序。

Bootloader 由 OEM厂商（华为、小米和三星等）锁定，或由运营商限制，以防止用户安装其他系统。我们需要解锁 Bootloader 才能。

解锁 Bootloader 会清除手机内的所有数据，所以在解锁前请做好备份。

一些安卓厂商会开放解锁 Bootloader
的权限，比如一加，或者设置一些门槛，比如小米采用[答题](https://github.com/MlgmXyysd/Xiaomi-BootLoader-Questionnaire)
来测试用户水平。

有些安卓厂商会禁止解锁 Bootloader ，比如华为的部分机型。

::: tip
除了官方的解锁方式，还有一些第三方的解锁方式，比如 [9008短接/线刷]() 和 [MTK漏洞]()。
当然，还有万能的淘宝。
:::

### 解锁步骤

使用可靠的 USB 数据线连接手机和电脑。

在 `关于手机` 中找到 `版本号`，连续点击，进入开发者模式，打开 `OEM解锁` 和 `USB调试`。OEM 必须一直开启。

使用ADB命令 `adb reboot bootloader` 重启手机，进入 `Bootloader` 模式。

::: tip 进入 Bootloader 模式的其他方法
你可以使用 `adb` 工具指示手机进入 `Bootloader` 模式。
对于某些手机，你还也可以使用按键组合进入 `Bootloader` 模式，比如按 `电源键` 重启，马上按住 `音量键-`。
:::

输入 `fastboot flashing unlock` 解锁。详见 [安卓开发者文档-锁定/解锁引导加载程序](https://source.android.com/docs/core/architecture/bootloader/locking_unlocking)。

在手机上使用音量键选择 `UNLOCK THE BOOTLOADER`，按 `电源键` 确认。

## 准备文件

在手机的 `关于手机` 中，寻找系统版本号，记录下来。然后去下载对应的全量包或 `boot` 分区文件。

::: info 关于全量包
官方 ROM 的压缩包，例如 [Google](https://developers.google.com/android/images)、[小米](https://www.miui.com/shuaji-393.html)、[Moto](https://mirrors.lolinet.com/firmware/moto/)，它们由厂商发布，可从固定的发布页面、机型论坛等下载**符合**你的**机型和型号**的 Rom.
一些厂商同时提供了 OTA包 和 全量包 ，我们优先下载全量包，解压后即可获得 `boot.img`，也就是我们所需要的 `boot` 分区的镜像文件。
如果你使用的是第三方开发者制作的 ROM，也同样需要下载系统全量包解压获取，而部分开发者也会单独释出 `boot.img` 为玩家提供便利。
如果你的机型没有释放对应的 ROM 包，但是机器为联发科（天矶<920），你可以利用芯片漏洞提取 `boot.img`。
:::

下载全量包后，如果打开发现 `pyload.bin`，那么你需要使用 `payload dumper` 工具解包，请下载 [payload-dumper-go](https://github.com/ssut/payload-dumper-go/releases) 按照操作解包。

::: tip 工具如何使用
请打开浏览器的翻译功能，翻译 [这个页面](https://github.com/ssut/payload-dumper-go)。
:::

解包的过程需要大约 `镜像大小*3` 硬盘空间。

::: warning Android 13 注意
Android 13 及更高版本的设备的架构中，包含通用 ramdisk 的为新 `init_boot` 映像，而不是传统的 `boot` 映像。
所以如果你的设备是 Android 13 及更高版本，你需要使用 `init_boot.img` 镜像文件。参考 [安卓开发文档-通用Boot镜像](https://source.android.com/docs/core/architecture/partitions/generic-boot?hl=zh-cn)。
:::

### 准备修补

将镜像通过文叔叔或数据线传递到手机，打开 `Magisk Manager` ，点击 `Magisk` 后边的`安装`，选择安装方式为 `选择并修改一个文件` ，从手机端复制 `boot.img` 文件到手机并选中该文件，点击`开始` ，仔细阅读修改结果并从结果中复制patch后的文件（一般在 `Download` 文件夹下，文件名类似`magisk_patched-24100_gk0te.img`）到电脑。

::: info
有些安卓10及以上机型刷入修改的 `boot` 后可能会由于 `vbmeta.img` 的验证导致设备无法启动 ，可尝试保持 `boot` 镜像 中的 `vbmeta`,此选项在最新版面具中已支持。
:::

现在你有了修补后的 boot 分区镜像文件和原始的 boot 分区镜像文件，把它们都复制到电脑上备用。

### 准备刷写

::: info A/B分区
从安卓 7.0 开始，厂商们引入了新的OTA升级方式 `A/B System Updates`，这种升级方式将 `boot` 等分区变为两套，叫做 `slot A` (boot_a,system_a...) 和 `slot B`(boot_b, system_b...)，平时使用的叫主分区，不用的叫备用分区。
系统升级时主备切换可以做到无缝升级。

为了解决双倍占用的问题，就有了 VAB 虚拟AB分区 (普遍见于安卓11以上的机器)。
VAB 的一个分区出现问题，另一个也会受到影响。

你可以在 运行 `adb shell getprop ro.boot.slot_suffix` 获取当前分区。
:::

- 临时启动

如果你的机器支持 `fastboot boot`，那么你可以使用 `fastboot boot <修改后的 boot.img 路径>` 来临时启动 `Magisk`。 但是下次启动就会失去 `Root` 权限。

- 刷写

使用 `adb` 命令 `adb reboot bootloader` 重启手机，进入 `Bootloader` 模式。

使用 `fastboot` 命令 `fastboot devices` 检查设备是否连接，如果没有则为驱动问题。

使用 `fastboot` 命令 `fastboot flash boot <修改后的 boot.img 路径>` 刷写镜像。

输出类似以下结果，说明刷写成功。
```shell
PS C:\114514\Downloads> fastboot flash boot .\magisk_patched-20000_AAAAA.img
Sending 'boot' (29079 KB)                          OKAY [  0.936s]
Writing 'boot'                                     OKAY [  0.878s]
Finished. Total time: 2.085s
```
::: warning Android 13 注意
Android 13 及更高版本的设备的架构中，包含通用 ramdisk 的为新 `init_boot` 映像，而不是传统的 `boot` 映像。
如果你的机器有 `init_boot.img` 分区，那么你需要用命令 `fastboot flash init_boot` 刷写修补后的 `init_boot` 分区。
:::

::: warning Android 12 注意
如果你的机型是 `A/B` 分区，那么你需要刷写 `boot_a` **和** `boot_b` 分区，否则可能不生效。
:::

使用 `fastboot` 命令 `fastboot reboot` 重启手机。

如果重启失败，刷写回原始的 boot 分区镜像文件，就可以修复。

如果重启成功，打开 `Magisk Manager` ，如果显示 `安装`，那么说明刷写成功。

但是刷机并没有完全结束，你还需要进行一些配置。

[^3]:https://sspai.com/post/67932

















