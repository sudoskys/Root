# 准备

!!! danger
    刷机有风险，出事我不管。

先下载一个 [Mt管理器](https://www.coolapk.com/apk/bin.mt.plus)，用来执行文件操作。

然后在 [Magisk仓库](https://github.com/topjohnwu/Magisk/releases/latest/) 安装最新版本的 Magisk，如果不能下载请复制Github的 apk 链接请填入[镜像站](https://ghproxy.com/) 下载


## 准备设备

本教程用到的工具我**已经打入附带的文件包** [^1]


### 提前注意

**安卓系统的版本需要是 5.0~12.0 之间 (2022)**

!!! warning "注意"
    **解锁BL或救砖都会让你的文件被清空，需要备份**


!!! warning "注意"
    - 解锁设备将允许修改系统重要组件，并有可能在一定程度上导致设备受损
    - 解锁后设备安全性将失去保证
    - 解锁后部分对系统安全性依赖高的功能和服务失效
    - 解锁后部分系统功能遭到修改后，将影响系统新版本升级
    - 解锁后由于刷机导致的硬件故障，售后维修网点可以按非保修处理
    - 三星设备解锁后会永久性熔断 KNOX 安全认证
    - 大部分手机的版权认证 DRM 等级也会从 L1 下降至 L3、无法通过 Play 商店认证等。
    - 谷歌安全认证下降

不建议你在主力机上解锁 Bootloader，而且，如果厂商明确表示不能解锁 Bootloader ，**请放弃**。如果一定要刷机并且报着变砖的觉悟，可以尝试**深刷**强解。


### 准备驱动文件

准备你的手机对应的机型的驱动文件，文件包提供 Vivo 和 Oppo 的两种驱动文件[1^]。
个人建议下载一个泛用型驱动 [universal adb drivers](https://adb.clockworkmod.com/)。少数情况下不能识别的话，需要我们用「手机厂商名 + adb driver」的关键词搜索得到相关的下载和安装教程。

安装完驱动请重启。 [相关手机驱动下载-FiimeROM](https://mi.fiime.cn/qudong)
[相关驱动站点](https://kamiui.ml/E52shuaji/)

!!! tip "**对于非深刷玩家如何检查是否链接？**"  
    💡 重启后在设备开机状态下连接电脑，打开终端，输入`adb devices`，如果返回了设备名称，说明 adb 配置完成；用 `adb reboot bootloader`进入 fastboot 界面（这步不适用fastbootd设备,即安卓十），键入 `fastboot reboot`后，若设备重启，说明 fastboot 正常。


### 准备设备和平台工具

Win7 或以上电脑一台，能传输文件的数据线一条（**最好是原装线，不能用充电线**），电脑下载解压[安卓平台文件包](https://dl.google.com/android/repository/platform-tools_r33.0.2-windows.zip)或[Linux版本安卓平台工具包](https://dl.google.com/android/repository/platform-tools-latest-linux.zip)或[Mac版本](https://dl.google.com/android/repository/platform-tools-latest-darwin.zip)，退出所有手机助手类软件。

解压工具包，你会看到 adb 和 fastboot ，这是我们针对 Android 设备进行高级调试和安装的工具。

如果你不想配置ADB全局环境的话，以后执行 Adb 命令需要在工具目录下，按住 Shift 右键鼠标打开终端，命令替换为`.\adb`或者`.\fastboot`，如果需要配置全局环境，请按照[这篇文档](https://www.sunzn.com/2018/08/02/Windows-10-%E4%B8%8B%E9%85%8D%E7%BD%AE-ADB-%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F/)配置。

Linux 需要使用其自带包管理器安装 `android-platform-tools`

!!! tip "提示[^3]"
    如果你已经安装了 [choco](https://chocolatey.org/) 或 [homebrew](https://brew.sh/) 等包管理工具的话，Windows 输入`choco install adb universal adb-drivers -y`，Mac 输入 `brew install android-platform-tools`能最方便的完成 adb 和 fastboot 的配置。Windows 用户可以参照  [Windows 操作系统下的 ADB 环境配置](https://sspai.com/post/40471) 这篇文章；macOS 用户可以尝试  [此脚本](https://github.com/corbindavenport/nexus-tools) 或是参考 [使用 Mac 为 Android 手机刷原生系统](https://sspai.com/post/38535) 进行手动配置。最后最最不济，可以尝试在 Google  [开发者页面](https://developer.android.com/studio/releases/platform-tools?hl=zh-cn) 下载对应 adb 包，解压后在对应的目录下执行指令亦可，或者是尝试 [WebADB](https://app.webadb.com/#/) 或  [adb 在线执行器](https://adb.http.gs/) 这样的在线 adb 工具，比较考验浏览器的兼容性。


然后打开手机的USB调试开关允许计算机调试，确认你的**驱动线和驱动**都**没有问题**！

!!! info
    通过 `adb devices` 命令确认已经连上手机。


### 准备申请解锁BL 或 深度测试

>旧芯片可尝试深刷强行解锁

BL 是 bootloader 的简称 就是 手机开机时，最先运行的小程序：开机引导程序 ，Bootloader 锁，主要是在引导过程中对系统签名，内核签名及 Recovery 签名进行检验，如果签名不一致，即终止引导。绿机器人儿用它来进行开机自检和初始化手机硬件，它会指引手机找到系统分区并启动操作系统，相当于电脑上的BIOS。

而厂商，通常会对手机的bootloader上锁，这样它就只能运行厂商认证过的操作系统和recovery了。如果boatloader发现要运行的系统不是指定的系统，就会阻止它运行。

不同的手机解锁方式不同，你甚至可以去线下店让服务人员解锁。或者从自己的社区中获取本机型的解锁信息。部分手机解锁很麻烦，比如华为，想要解锁只能去淘宝买解锁码，而且当你刷回官方 ROM 时，会自动加锁。

我们通过OEM解锁，在开发者选项中打开「OEM 解锁」（除了少部分流入我国市场的国外运营商有锁机外，此选项基本都可供用户开启。）

当然对于大多数手机，需要申请测试或者使用其他渠道解锁。

对于小米手机，可以通过这个地址 [申请解锁](https://www.miui.com/unlock/download.html) 下载工具，然后打开手机设置，进入关于手机–>系统版本点10下，在`设备解锁状态`中绑定账号和设备，进入`Fastboot`模式(关机后，同时按住开机键和音量下键)，打开刚才下载的工具，点击 `解锁` 后系统会恢复出厂系统并解锁。

!!! danger 
    **解bl锁会清除手机（恢复出厂设置）所有数据，记得提前备份好。**

!!! danger "不可逆"
    解锁 Bootloader 的手机会发生熔断，熔断是硬件级别的，你选择了确定解锁的那一刻就熔断了，操作不可逆，不是你再次上锁就能恢复的。
    熔断丢保修，不能用pay，外版本来就没保修不能用pay你爱怎么熔怎么熔。

    线刷官方四件套固件无需解锁，所以不会断溶。

**如果你的设备不能进行官方解锁，可以尝试深刷强解 。**

!!! note
    在小米4c/4s发布时间以前的所有小米/红米机型没有BL锁，跳过此步骤即可。

附上 [小米解锁教程](https://web.vip.miui.com/page/info/mio/mio/detail?postId=28646781&boardId=5415551&isComment=&isRecommend=0&app_version=dev.211029&ref=share)


### 什么，你用华为？

华为用户请跳转到后面的专门章节查看介绍。

