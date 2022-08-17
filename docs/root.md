# 刷机 

!!! warning "须知"
    阅读者**需要自己承担因尝试 Root 导致的后果**。如果你对自己的动手能力感到怀疑，可以请人！

    深刷的，能去售后就去售后

    
在 Linux 中，我们只需要打上 su 的命令，就可以拥有管理员权限。
su是运行环境变量PATH下面的一个可执行文件，当任意软件运行su时，软件的权限就会被提升到Root权限。

未Root的安卓系统是没有su这个文件的，所以Root一个手机，就是将su文件放入到系统运行环境变量PATH下面。 之后软件运行su程序，就可以提升到Root权限。

所以Root就是赋予手机管理员权限，本质就是将su程序放入手机系统文件夹下面。


取得 Root 的方式大致分为两种
- 第三方 Rec 接管
- Magisk 修补 Boot 镜像

**用户手段有深刷，实现方式有卡刷，线刷。**

!!! tip "Do you know?"
    Magisk 是一个强大的 Android 框架，是一个通用的第三方 systemless 接口，通过这样的方式实现一些较强大的功能。它修改启动分区，并保留了系统文件。这种修改只是虚拟地覆盖在原始文件 上。当某些东西请求系统文件时，修改后的版本将被发送到magisk指定的位置。但是由于所有系统文件都是完整的，因此可以欺骗SafetyNet认为一切正常。应用仍然可以在有被root的手机上运行。它通过挂载一个与系统文件相隔离的文件系统来加载自定义内容，为系统分区打开了一个通往平行世界的入口，所有改动在那个世界（Magisk 分区）里发生，在必要的时候却又可以被认为是（从系统分区的角度而言）没有发生过。当被挂载的 Magisk 分区被隐藏甚至被取消挂载时，原有系统分区的完整性丝毫未损。因此严格来说 Magisk 可以被看作是一种文件系统。

![示意图](https://s3.bmp.ovh/imgs/2022/08/16/95cafb324009b035.png)






!!! danger
    下面开始刷机，请不要在晚上刷机！
    
    
    
    
## 线刷/深刷 修补 Boot 提取权限

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


Tips：极少数小米设备存在检测设备信息错误的问题，Ramdisk 虽然显示为「否」，但实际上是需要修改 boot.img。






### 准备修补的img

官方 ROM 的压缩包，例如 [Google](https://developers.google.com/android/images)、[小米](https://www.miui.com/shuaji-393.html)、[Moto](https://mirrors.lolinet.com/firmware/moto/)，由厂商发布，可从固定的发布页面、机型论坛等获取相关链接。一些厂商同时提供了 OTA 包和全量包，我们优先下载全量包，解压后即可获得 boot.img，也就是我们所需要的 boot 分区的镜像文件。请去官网或者其他平台下载**符合**你的**机型和型号**的rom包！
使用ZIP解压工具解压完整的ROM卡刷包（最新MIUI系统安装包），找到`boot.img`
和`vbmeta.img`两个文件，复制出来备用。


接下来，寻找 Recovery 包或 img 镜像放电脑上，如果是 img 文件则可以直接使用，如果是压缩包则解压找出 img 或者 payload 解包。

如果你使用的是第三方开发者制作的 ROM，也同样需要下载系统全量包解压获取，而部分开发者也会单独释出 boot.img 为玩家提供便利。如果你比较幸运，在论坛中有人分享了自己修改好的镜像，可以直接获取进行刷写。

!!! info "**payload 解压 OTA 包获取其中的 boot.img**"

    *Payload 工具已经在工具包中给出，目前此工具因为依赖版本问题难以运行。*

    像Google 给出的刷机包，解压其中的 image 包可以直接获得我们想要的各种镜像文件。但部分厂商给出的升级包以及部分第三方 ROM 的刷机包中解压出来只有 payload.bin，无法进一步解压获得我们想要的各种镜像文件。

    解压 payload.bin 需要用到特殊的工具，我们可以在 Github 上找到开源的 [payload dumper](https://github.com/vm03/payload_dumper)，这是一个基于 python 3 的命令行工具。

    以 zip 格式下载源代码，本地解压得到 payload_dumper-master 文件夹，下属两个 py 后缀的 python 文件。将 ROM 的 .zip 包解压缩后，把其中的 payload.bin 文件移送到 payload_dumper-master 中。

    ```bash
    pip3 install protobuf #安装 protobuf
    ## 定位到 payload_dumper-master 文件夹
    python3 -m pip install protobuf
    python3 -m pip install -r requirements.txt
    python3 payload_dumper.py payload.bin
    ```



**如果没有，且你是联发科（天矶<920），你可以使用 MTK深刷 进行提取（请见MTK强解小节，注意解锁 Bootloader 后才可以提取）。**

准备好 boot.img 后，打开打开`Magisk Manager`APP，点击`Magisk`后边的`安装`，选择安装方式为`选择并修改一个文件`，从电脑端复制 `boot.img` 文件到手机并选中该文件，点击`开始` ，仔细阅读修改结果并从结果中复制patch后的文件（一般在`Download`文件夹下，文件名类似`magisk_patched-24100_gk0te.img`）到电脑。

!!! danger "警告"
    ⚠️ **你所用到的镜像(提取或修改)都要留存副本！否则变砖警告！**






## 卡刷 第三方 Recovery

有的Recovery作者附带了刷入脚本，这样的直接运行脚本按着走就行了，这里讲一下通用方法。

手机关机，**长按 音量减键 + 电源键** 进入 `FASTBOOT` 模式。用数据线把手机和电脑连接起来。以 `OrangeFox` 为示例。在上述步骤的下载后会得到一个压缩包，打开该压缩包，解压其中的 `recovery.img` 到任意一个位置。 压缩包是为了在有第三方 Recovery 的情况下刷入/更新 OrangeFox ，但是我们目前并没有，所以我们需要解压其中的 `recovery.img` 来使用 `fastboot` 刷入。如果你选择使用 LR.Team 定制版 TWRP，可以选择一键刷入版，就不会有下一步~~复杂~~
的操作。

然后打开终端，输入 `fastboot flash recovery 上一步解压的 recovery.img 的文件地址` （或者 `.\fastboot`？） **这一步需要配置好 ADB 环境。**

不出意外，会输出：

```
sending recovery OKAY（传输Recovery）
writing recovery OKAY（刷入Recovery）
finished.
```

**执行完毕后长按 音量加键 + 电源键**，出第一屏即一秒左右可松手，进入 `Recovery`模式。当然你也可以使用 `fastboot reboot recovery`来进入 `Recovery`模式。

一般情况下，会出现一个英文界面，从上往下依次写着 `Mount` `Dectypt` ，这是让你解密 Data 。输入你的锁屏密码即可，**记得输入完后点击右下角的勾**。

解密DATA分区后，才能刷入第三方ROM，可以理解为是对官方系统的保护.

解密DATA会格式化数据，解密完成后，DATA被清空，当然也包括内置卡上也空了。**所以一定先备份好手机上的一切重要资料，包括手机存储/内置卡/外置卡上重要数据！**

经过十秒左右秒钟的解密后，不出意外会显示欢迎界面，点击屏幕下方勾即可。然后就是挂载 `System` 的界面，滑动下方滑块即可。

最后就进入了主界面。

!!! info
    💡 如果你是卡刷官方包后，不做任何操作是肯定会恢复官方recovery的，关于如何防止恢复官方recovery办法。进入Recovery后，不是特别老的机型，一般都需要做一下防覆盖，否则重启进系统后刷的Recovery会被官方Recovery覆盖。最常用的办法是卡刷完官方ROM包后刷个Magisk.zip就OK了。如果你并不想ROOT但是又不想恢复官方recovery，可以再卡刷完ROM后。签名boot、当然有的TWRP高级里没有签名boot功能，但是一般情况下都会有防止覆盖TWRP功能，这俩个功能实现原理不一样，但是它俩都可以防止恢复官方recovery (资料来自搞机助手，非常感谢).（如果你不想使用 Magisk，可以试试 OrangeFox 的防止还原 Recovery 的功能，在 `设置`–> `OTA`下。


!!! help
    橙狐改简体中文：点击底部的 `Menu` –> 右上角的齿轮图标 –> `Regional` –> 点击 `Language` 下的 `English` ，选择 `Chinese Simplified` 。
> 

[^13]


💡 给手机刷入 Recovery 其实也不需要电脑，用另一部手机借助 [Termux](https://f-droid.org/zh_Hans/packages/com.termux/) 也是同样可以的。在 Termux 配置好 ADB 环境后，照上述步骤刷入即可。安装 Termux 的那部手机无需 ROOT。



### 特殊情况说明

**新款联发科机型必须关闭AVB2.0校验**

否则任何对系统的修改都会导致卡在Fastboot。涉及的机型包括但不限于红米6，6A，9，9A，红米Note8Pro，红米10X4G，5G，红米K30U，小米Play，以及之后的联发科机型。至于AVB2.0怎么关闭，不同机型不同安卓版本方法不用，可以在TWRP里找这个功能，或者找刷过的大佬问方法。

**红米3S进入Recovery模式的方法是长按三键**

附上 Redmi Note 7 Pro教程

[如何在 Redmi Note 7 Pro 上刷机？](https://blog.linioi.com/posts/11/)

相关Recovery下载

[小米Recovery下载|Recovery大全-FiimeROM](https://mi.fiime.cn/Recovery)

[Devices](https://twrp.me/Devices/)

[OrangeFox Recovery Downloads](https://orangefox.download/zh-CN)

[偶然发现的仓库](https://kamiui.ml/E52shuaji/)






## 深刷 高通9008刷机

**理论上高通处理器都可以用这个方法**

!!! info "用这个方法必须要满足两个最基本条件"
    
    1.能找到 QPST 专用刷机包

    2.确认手机能进9008端口


*💡 高通 QPST 线刷其实就是利用高通芯片自带的9008端口，将手机系统内的所有分区的镜像文件，直接刷写手机。这个刷机方式比 REC卡刷 和 fastboot 线刷，更底层、高效、强大。这种方式，不需要进入手机的任何分区，就可以直接刷写手机固件。*


!!! note
    高通的 QPST线刷模式，因联机之后端口名字叫Qualcomm HS-USB QDLoader 9008 (COMx)而得名。该模式下，用户可通过QPST及其衍生工具（本质为QPST命令行调用）直接对手机的Flash芯片进行读写操作，而不需要解锁Bootloader。常见刷机工具有QPST，MiFlash（Pro）等工具，刷机包中一般会有一个分区表xml文件。以及一个eif文件。XML文件命名一般为Rawprogram（数字）.XML和Patch（数字）.XML,EIF文件一般命名为prog_存储芯片类型（比如UFS和EMMC）*firehose*(SOC型号，比如MSM8998或者SDM855)_（内存类型，一般是DDR）.eif，只要带有这两个文件的，一般都是高通支持9008的刷机包。 进入9008模式，高通略为麻烦。MSM8994及以前的SoC，可以通过Fastboot命令直接进入9008模式：`adb reboot edl`
> 

---

此方案无需改线，无需触点短接等操作，需要电脑进行操作

!!! tip 
    基带什么的每个机子都不一样，9008不能写所有分区,所以最好备份好完整字库
    如果刷坏没备份，不能正常使用sim卡，部分型号不能连wifi，甚至要换主板。
    有些机型需要授权9008.

我们将手机的变砖分为四个程度

1. 能亮屏，按键有反应 开机卡住 连接USB电脑有反应
2. 黑屏 ，按键有反应 连接电脑有反应
3. 屏幕不亮 按键无反应 连接电脑有反应
4. 砖头什么样 手机什么样---黑砖

**首先去下载高通的线刷工具，一般下载最新版本的即可。**

`https://qpsttool.com/category/download`

运行该线刷工具，需要电脑识别到端口9008，在电脑设备管理器中可以找到，如果没有反应需要电脑安装9008的驱动。
`https://www.aliyundrive.com/s/KTLkyyjTsDB`

接着需要下载官方固刷包进行刷入就可以了

### 刷包成功后出现的几种情况

1.数据线自动断开链接，手机充电灯亮起-----刷写成功

2.无反应！------换包刷写，或试另一种刷写方式


**💡 按住手机上下音量+电源调试手机进入9008模式，其次电脑识别到9008端口**


## 深刷 MTK联发科 刷入/强解

!!! note
    联发科的底层刷机模式没有高通那么麻烦。该模式在 MTK 内部被称为 MTK in-house developed loader。MTK 的该模式与高通略有不同，该模式具有帮助系统寻找Uboot的功能。该模式除了具有启动功能之外，还具有下载功能。首先还是需要明确的是mtk芯片都有一个boot rom，如果没有这个rom，那么程序是无法被下载到 Nand Flash中的，然后此时的Flash上是为空的，没有任何数据的。系统在上电之后它会检测是启动模式还是下载模式，如果是下载模式，它会初始化一个usb的串口，将Preloader加载到内部的SRAM中，跳转到Preloader中去执行，初始化好Flash和外部RAM之后，依次将preloader、lk、kernel、android下载到nand flash中去。刷机工具是SP Flash Tools ，需要验证的对应的DA文件，或者 MTKclinet



### 准备 MTK 工具/工具箱

!!! tip 
    最好备份好完整字库

💡 **解释**：MTk 工具依赖安卓的一种漏洞来实现 Root ，提取 boot.img，在使用前请关注你的社区（酷安等）。工具箱的使用都有说明，请自行咨询或查阅资料。

!!! warning
    **天矶920 以后的设备不受此方法支持！（天矶1200仍旧支持）**


[GitHub - bkerler/mtkclient: Inofficial MTK reverse engineering and flash tool](https://github.com/bkerler/mtkclient)

MTK 提供不同平台的版本，但是因为依赖 Python，所以你需要从文件包或从 [Download Python | Python.org](https://www.python.org/downloads/) 安装Python（**确保安装时勾选 ADD PYTHON to PATH**）

并使用 `pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple` 配置国内镜像源。


这里以Windows系统为演示系统。乌班图看[这里](https://zhuanlan.zhihu.com/p/452973221)

### 初始化

在 mtkclient-main 文件夹下右键打开命令行
执行 `python setup.py install`


🛠 下面每执行一次命令，都需要重复关机状态下 “插上USB同时按住音量加减及开机键，待到看到命令行变成这个后就松手”步骤。   **一定不要输错命令！！！！！！！**



**备份 Root 前手机全部分区**

`python mtk rl out`
自救命令，使用mtkclient写入备份的镜像
`python mtk wl out`

**这个步骤如果备份用户数据会耗费8小时，你可以备份到userdata时中断并删除 usedata.img。**

!!! warning
    **将项目目录下的out文件夹复制出来，防止后续覆盖**

### 强解 Bootloader

如果你OEM已经解锁且Bl也已经解锁的，请跳过这步。

如果你没有获取到深度测试或者官方解锁的，可以用 `python mtk da seccfg unlock` 尝试解锁，风险自担，**这一步会清除你手机的全部数据，请注意**

强解后请重置手机，输入 `python mtk reset` （**如果是MTK 可以不清除设备所有数据**）重置。完毕后长按开机键开机，开机第一屏会有提示，按一下开机键即可解决，因为重置过手机，所以第一次开机时间会有点长，耐心等待即可。待到开机后，设置中打开开发者选项就可以看到OEM解锁选项变灰，出现一行小字引导加载程序已解锁。开机前会有一段英文提示，即为解锁成功（可以用 `fastboot oem lks` 验证，返回 0 代表解锁成功）

附：重新锁回使用 `python mtk da seccfg lock` ，谨慎使用。

### 提取boot与vbmeta

使用如下命令，提取手机中的 boot 和 vbmeta.img 镜像
`python mtk r boot,vbmeta boot.img,vbmeta.img`


手机关机，待到关机完成，插上USB同时按住音量加减及开机键待到看到命令行提取的数字闪动后，请松手。

提取完毕后，boot与vbmeta 的镜像文件会在目录中，然后**请备份它们到一个其他的文件夹**

!!! note
    **按照上文【准备修补的img】小节准备修补后的镜像，注意一定要使用最新版本的面具，会解决很多问题。**

有的手机没有 vbmeta 分区，会有提示，没关系。
**准备修补后的镜像**，重命名为`boot.patched`，放入项目根目录


!!! help
    🛠 个别如遇无法开机等问题，可尝试保持boot镜像中的vbmeta,此选项在最新版面具中已支持。


执行命令刷入，重启手机，安装面具即可发现root成功
`python mtk w boot,vbmeta boot.patched,vbmeta.img.empty`

### 备份 Root 后的手机

使用如下命令备份手机全部镜像，以便可以在手机变砖时进行自救。
`python mtk rl out`
自救命令，使用mtkclient写入备份的镜像
`python mtk wl out`

!!! tip
    **这个步骤如果备份用户数据会耗费8小时，你可以备份到userdata时中断并删除 usedata.img。**
    **然后将项目目录下的out文件夹复制出来，防止后续覆盖，还有就是一定不要输错命令！！！！！！！**


!!! help
    🛠 如果在解锁中遇到问题请先去 [https://github.com/bkerler/mtkclient/issues](https://github.com/bkerler/mtkclient/issues) ，搜索遇到的问题，如果是新的bug欢迎向作者反馈。需注明机型和提供相应的preloader。还有就是花钱请人救砖。



## 线刷 Fastboot刷入镜像

卡刷是最值得推荐的，过程也不复杂，只要刷机过程保持电量充足，刷机包正确，刷机过程不对手机进行操作，一般都是能成功刷入的。

1. 无需第三方 **Recovery**
2. 不影响系统升级（完整包升级）

复制修改镜像后的完整路径（**在 Windows 中，选中文件 > Shift + 右键，会多出「复制为路径」命令**），在终端中输入：

```
## 手机重启到 Bootloader
adb reboot bootloader
## 如果 Ramdisk 为 yes
fastboot flash boot <修改后的 boot.img 路径>
 ## 刷入完成后重启
fastboot reboot
```

如果想要谨慎一点，比如说修改的镜像文件是从网上下载的，想先试试看能否正常启动，则可以用命令：`fastboot boot`。这样顺利启动系统后即可暂时拥有 Magisk ，不过重启后就会失效。

文件包中有Han.GJZS-v2.12.1附带了很多工具，可以使用ADB和FastBoot（不懂不要用）

-----

## 结束

确认 Root 没有问题后，再打开 Magisk App 中选择**安装 > 直接安装**，来「永久」写入 Magisk。

系统更新时想要保留 Magisk 的，重新打包刷入一次是最为通用稳妥的办法。

!!! info
    Magisk 工作机制是「拦截」，Magisk通过挂载一个与系统文件相隔离的文件系统来加载自定义内容，为系统分区打开了一个通往平行世界的入口，所有改动在那个世界（Magisk 分区）里发生，在必要的时候却又可以被认为是（从系统分区的角度而言）没有发生过。Magisk 可以被看作是一种文件系统，这种文件系统通过巧妙的实现方式避开了对系统文件的直接修改
 
## 突发救砖

---

1. 刷机包与手机自带的BOOT版本不匹配，这个时候只需要从ROM包里提取boot.img文件单刷，然后再重新刷机就好了。
2. 刷完后卡在第一屏或重启，可以进 RECOVERY 里面，双WIPE (**清除手机数据) 之后再刷机就可以解决问题**，一些ROM包会提示不用WIPE，但如果你出现上述情况，也可以双WIPE试试。
3. 如果你实在不行了，那么准备好保存好的原始 boot.img 和 vbmeta.img 刷入。

!!! note
    因为未知原因导致安装失败也不要怕，操作中你应该保留了一份原来的镜像，按照最后一步的方法将原来的镜像重新刷回去就能正常开机。**

### 安装模块变砖防护策略

- 安装 MM管理器 或 自动神仙救砖 插件
- 备份 Root 后的系统

移除模块重新开机

而如果你因为安装了未知模块而翻车无法顺利进入系统，请先冷静下来：解决此类问题有一个万能的命令`adb wait-for-device shell magisk --remove-modules`，此条指令将会在手机启动过程中生效。

如果没有安装救砖模块，也可以在 cache 目录下面手动建立一个 disable_magisk 文件，禁用掉进系统，进了系统再把插件删了。参考 [这篇帖子](https://www.v2ex.com/t/567090)

在后面模块那节中也有详细叙述。

### **MTK恢复**

如果移除模块仍然无法开机，刷入系统备份（上文MTK提到了）。

自救命令，使用mtkclient写入备份的镜像
`python mtk wl out`



## **面具 Ramdisk 为「否」的机型？**"
    
1. 下载当前系统的全量包，如果你使用了第三方 Recovery，那么 recovery.img 就是这个第三方的镜像。提取 recovery.img **或者** MTK 中执行 `python mtk r recovery recovery.img`，备份，然后传到手机上
2. 修改镜像：打开面具，在选择修补文件后，会多出一个「Recovery Mode」的选项。记得勾选
3. 刷入镜像：使用的命令是 `fastboot flash recovery <修改后的 recovery.img 路径>` **或者**  `python mtk w recovery <修改后的 recovery.img 路径>`

这几步完成后，重启手机。和修改 boot.img 不同的是，我们需要立即按下设备进入 Recovery 的组
合键，这样才能挂载 Magisk 。这是因为我们是通过修改 recovery.img 的方式挂载 Magisk 的，只有在按下组合键的情况下，设备才会启动 recovery 分区，从而实现 Magisk 的挂载。

按下组合键后，设备不会进入 Recovery 模式，而是会闪屏过后直接进入一个有 Magisk 的系统。每一次重启都要这样做才能挂载 Magisk。进入系统后就没有特别需要注意的问题了。

而想要进入真正的 Recovery ，我们需要在按下组合键后的闪屏界面长按音量 + 键。





[^13]:**[通过 ADB 给手机刷入第三方 Recovery](https://blog.linioi.com/posts/8/)**

[^21]:[底层刷机教程/全解析](https://wiki.pchelper666.com/%E5%BA%95%E5%B1%82%E5%88%B7%E6%9C%BA%E6%95%99%E7%A8%8B)


