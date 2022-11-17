# 线刷指南


- 电脑
- 一台解锁 Bootloader 的安卓 ？ 以上的手机
- 一根良好的数据线
- Magisk.zip(Root需选) 
- 全量包/OTA包/boot.img 三选一

## 准备


### 链接手机

!!! warning
    线必须是原装线或者质量靠谱的线，否则会出现 `USB Error` ！

如果你没有使用 MTK ，请通过`adb devices`命令再次确认已经连上手机。

!!! tip "找不到adb？？"
    如果你不想配置ADB全局环境的话，以后执行 Adb 命令需要在工具目录下，按住 Shift 右键鼠标打开终端，命令替换为`.\adb`或者`.\fastboot`，如果需要配置全局环境，请按照[这篇文档](https://www.sunzn.com/2018/08/02/Windows-10-%E4%B8%8B%E9%85%8D%E7%BD%AE-ADB-%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F/)配置。


### 准备 **Magisk**

你可以从 [Github](https://github.com/topjohnwu/Magisk/releases) 或者 文件包 [1^] 下载它，推荐去 Github 下载，越新越好。如果不能下载 Github 文件请复制 apk 链接填入[这里](https://ghproxy.com/)

**安装Magisk Manager APP后如果它显示`Ramdisk` 为"是"，那么你才可以进行下面的操作。**

!!! help
    Ramdisk 是系统中的一个小分区，Ramdisk 告诉系统接下来要加载哪些东西。Magisk 的目的是修改 Ramdsik，把自己加进开机需要加载的系统组件中。App 中 Ramdisk 的值为「否」时，表示需要修改的 Ramdisk 被放在了 recovery.img 中，我们需要提取并修改 recovery.img。具体操作方法见节尾。

Tips：极少数小米设备存在检测设备信息错误的问题，Ramdisk 虽然显示为「否」，但实际上是需要修改 boot.img,具体请询问相同机型的刷机爱好者。


## 准备修补的img

>这里你可以看一下首页的链接支持获取更多支持。

官方 ROM 的压缩包，例如 [Google](https://developers.google.com/android/images)、[小米](https://www.miui.com/shuaji-393.html)、[Moto](https://mirrors.lolinet.com/firmware/moto/)，它们由厂商发布，可从固定的发布页面、机型论坛等下载**符合**你的**机型和型号**的 Rom
一些厂商同时提供了 OTA包 和 全量包 ，我们优先下载全量包，解压后即可获得 `boot.img`，也就是我们所需要的 boot 分区的镜像文件。

如果你使用的是第三方开发者制作的 ROM，也同样需要下载系统全量包解压获取，而部分开发者也会单独释出 `boot.img` 为玩家提供便利。如果你比较幸运，在论坛中有人分享了自己修改好的镜像，可以直接获取进行刷写。

如果你的机型没有释放对应的 Rom包 ，且你是联发科（天矶<920），你可以使用 MTK深刷 提取 `boot.img`（请见MTK强解小节，注意解锁 Bootloader 后才可以提取）。

像Google 给出的刷机包，解压其中的 image 包可以直接获得我们想要的各种镜像文件。但部分厂商给出的升级包以及部分第三方 ROM 的刷机包中解压出来只有 payload.bin，无法进一步解压获得我们想要的各种镜像文件，需要进行 payload 解包。

找到 `boot.img` 和 `vbmeta.img` 两个文件，复制到电脑上备用。

!!! info "**如何 payload 解压 OTA 包获取其中的 boot.img**"

    *Payload 工具打包版本已经在工具包中给出。源仓库直接拉取源码会因为依赖版本问题难以运行。*
    
    下面是拉取源码进行解包的指南，如果失败请尝试找到打包完毕的exe工具(首页附有)。

    解压 payload.bin 需要用到特殊的工具，我们可以在 Github 上找到开源的 [payload dumper](https://github.com/vm03/payload_dumper)，这是一个基于 python 3 的命令行工具。

    以 zip 格式下载源代码，本地解压得到 payload_dumper-master 文件夹，下属两个 py 后缀的 python 文件。将 ROM 的 .zip 包解压缩后，把其中的 payload.bin 文件移送到 payload_dumper-master 中。

    ```bash
    pip3 install protobuf #安装 protobuf
    ## 定位到 payload_dumper-master 文件夹
    python3 -m pip install protobuf
    python3 -m pip install -r requirements.txt
    python3 payload_dumper.py payload.bin
    ```


准备好 boot.img 后，打开最新的 `Magisk` ，点击 `Magisk` 后边的`安装`，选择安装方式为 `选择并修改一个文件` ，从电脑端复制 `boot.img` 文件到手机并选中该文件，点击`开始` ，仔细阅读修改结果并从结果中复制patch后的文件（一般在 `Download` 文件夹下，文件名类似`magisk_patched-24100_gk0te.img`）到电脑。

!!! help "AVB验证"
    **安卓10及以上需勾选 vbmeta 选项**
    
    有些机型刷入修改的 boot 后可能会由于 vbmeta.img 的验证导致设备无法启动 ，可尝试保持 boot镜像 中的 vbmeta ,此选项在最新版面具中已支持。


由于 ROM code 和 BootLoader 通常都是由设备厂商 OEM 提供，而各家实际做法和研发能力不尽相同，为了让设备厂商更方便的引入 Verified boot 功能，Google 在 Android O上推出了一个统一的验证启动框架 Android verified boot 2.0，好处是既保证了基于该框架开发的verified boot 功能能够满足 CDD 要求，也保留了各家 OEM 定制启动校验流程的弹性。

!!! danger "警告"
    ⚠️ **请对操作使用到的镜像(提取或修改)在电脑上留存副本，防止不测！！**


## 线刷 Fastboot刷入镜像


复制修改镜像后的完整路径（**在 Windows 中，选中文件 > Shift + 右键，会多出「复制为路径」命令**）。

**手机重启到 Bootloader**

```
adb reboot bootloader
```

**如果面具中 Ramdisk 为 yes**
```
fastboot flash boot <修改后的 boot.img 路径>
```

**刷入完成后重启**
```
fastboot reboot
```

如果想要谨慎一点，比如说修改的镜像文件是从网上下载的，想先试试看能否正常启动，则可以用命令：`fastboot boot`。这样顺利启动系统后即可暂时拥有 Magisk ，不过重启后就会失效。

文件包中有Han.GJZS-v2.12.1附带了很多工具，可以使用ADB和FastBoot（不懂不要用）


### 小米线刷工具 MIflash

MiFlash 是由小米发布的刷机工具。可以选择刷机不上 BL 锁（对刷 MIUI 海外版来说是必须），自定义刷机脚本，EDL 刷机模式等。

你可以在以下地址获取它的相关信息，因为是特定机型工具，所以不展开叙述。

https://miuiver.com/miflash/

https://xiaomirom.com/download-xiaomi-flash-tool-miflash/


## 面具 Ramdisk 为「否」的机型

我们使用面具修补的 「Recovery Mode」 选项来解决这个问题。

具体操作步骤如下：

1. 下载当前系统的全量包，如果你使用了第三方 Recovery，那么 recovery.img 就是这个第三方的镜像。提取 recovery.img **或者** MTK 中执行 `python mtk r recovery recovery.img`，先备份，然后传到手机上。

2. 修改镜像：打开面具，在选择修补文件后，会多出一个「Recovery Mode」的选项。

3. 刷入镜像：使用的命令是 `fastboot flash recovery <修改后的 recovery.img 路径>` **或者**  `python mtk w recovery <修改后的 recovery.img 路径>`

这几步完成后，重启手机。和修改 boot.img 不同的是，我们需要立即按下设备进入 Recovery 的组合键，这样才能挂载 Magisk 。这是因为我们是通过修改 recovery.img 的方式挂载 Magisk 的，只有在按下组合键的情况下，设备才会启动 recovery 分区，从而实现 Magisk 的挂载。

按下组合键后，设备不会进入 Recovery 模式，而是会闪屏过后直接进入一个有 Magisk 的系统。每一次重启都要这样做才能挂载 Magisk。进入系统后就没有特别需要注意的问题了。

而想要进入真正的 Recovery ，我们需要在按下组合键后的闪屏界面长按音量 + 键。


