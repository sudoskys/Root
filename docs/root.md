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

这里你可以看一下首页的链接支持

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
    ⚠️ **你所用到的镜像(提取或修改)都要在电脑上留存副本！否则变砖警告！**


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

### Magisk刷入[^44]

先下载Magisk到你的电脑设备，接着重启至你所使用的第三方 Recovery

```
adb reboot recovery
```

选择 `Apply update Apply from ADB` 以启动 ADB Sideload 模式，刷入 Magisk

``
adb sideload Magisk-xxx.apk
``
>将 Magisk-xxx.apk 替换为你所下载的文件名

完成后，在 Recovery 中重启手机至系统.

最后，安装 Magisk Manager
```
adb install Magisk-xxx.apk
```
打开手机上新增的 Magisk 应用，若下方的 超级用户 和 模块 菜单能够点击，就代表已经成功获取了 Root 权限.


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

### 备份 Root 后的手机字库（分区）

!!! tip 
    你可以使用mtk工具备份各个分区。

使用如下命令备份手机全部镜像，以便可以在手机变砖时进行自救。
`python mtk rl out`

自救命令，使用mtkclient写入备份的镜像
`python mtk wl out`

!!! tip
    **这个步骤如果备份用户数据会耗费8小时，你可以备份到userdata时中断并删除 usedata.img。**
    **然后将项目目录下的out文件夹复制出来，防止后续覆盖，还有就是一定不要输错命令！！！！！！！**


!!! help
    🛠 如果在解锁中遇到问题请先去 [https://github.com/bkerler/mtkclient/issues](https://github.com/bkerler/mtkclient/issues) ，搜索遇到的问题，如果是新的bug欢迎向作者反馈。需注明机型和提供相应的preloader。还有就是花钱请人救砖。




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


### 华为深刷救砖[^43]

这里还是酷安@某贼的教程

[华为线刷工具](https://miao202.lanzouj.com/ihGpU09qfebg)

[华为解锁相关驱动与工具](https://miao202.lanzouj.com/igAzW09qew7e)

!!! info
    华为官方包一般是一个压缩包的形式，我们需要解压使用。
    解压后里面还可能有若干层压缩包，需要继续解压，直到解压出UPDATE.APP（大包）和update_sd_XXX-XXXX_XXX_cn.app（小包,只需要解压对应你手机型号的就好。EMUI4及以前的系统包是没有小包的，只有一个大包。


首先将手机连接电脑,打开短接图查看器，搜索你的手机,然后点击查看相应短接图（如果你的手机已经处于深刷，则可以免去拆机这一步）。

!!! help
    有些图不是短接图。一般注明一个或两个点位的是短接图。

如果图上标出的是两个点，就用镊子短接这两个点，如果只有一个就短接这个点和旁边的保护罩（或者悬空也可以）,然后手机会黑屏进入深刷模式，电脑任务管理器会显示端口（如果显示的是未知设备USB_SER，就说明驱动没有安装好）。

然后镊子可以松开了。打开华为线刷工具，首次打开可能弹登陆框，关掉重开就好了。


右侧切换到救砖写底层选项卡，选择你的处理器类型（一定不要选错），点击下方开始。然后会自动写入临时解锁的底层。

完成后手机会自动重启到Fastboot模式，设备管理器显示Android Bootloader Interface或Android Sooner Single ADB Interface设备。

然后切换到线刷降级选项卡，点击右下方“...”按钮选择你下载的官方包的大包（UPDATE.APP），端口选项改成Fastboot。


点击开始后,前面几个分区会失败，后面的都会成功。刷的时间也很长，请耐心等待，刷好后手机会自动重启。

但是这样一般是不能开机的，长按电源键，音量加和音量减三键，重启到升级模式（手机显示正在安装升级包5%），在线刷工具里选择配套的小包，端口改成自动（Auto） 点击开始。刷入完成后重启手机一般就可以正常开机了。

如果刷入失败或成功但仍然不能正常开机，可以在官方Recovery里恢复出厂，或者在eRecovery下载最新包恢复，或者进Fastboot连接电脑华为助手修复系统。某些用华为设备魔改的学习系统也可以用此方法刷回正常官方系统。

!!! info
    在BL锁已经解锁的情况下，可以尝试线刷关键分区 system，boot，recovery，cust 实现救砖。

[其他方法](https://www.coolapk.com/feed/26205215?shareKey=MzUxMDU3ODVmMjY0NjEwZDQ5M2M~&shareUid=3463951&shareFrom=com.coolapk.market_11.3)


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


## Gsi？？

本节适合有刷机经验的同学。[^48]

如果在酷安，XDA等论坛翻了半天，却发现只有原厂救砖包，说明你的机型可能过于冷门，以至于没有开发者愿意专门为这个机型做刷机包，可以试一下 通用系统镜像。(见术语解释)

[^46]

[^47]

[^49]

### 备份


Persist 分区中储存了诸如指纹模块等的校准信息，这些信息每部设备都是不同的，如果你是已经Root的设备，建议备份一份，以备不时之需。如果你还没有Root,可以按照线刷教程先修补boot再刷入取得权限。

```
adb shell
su # 获取 root 权限，请在手机上确认
dd if=/dev/block/bootdevice/by-name/persist of=/sdcard/persist.img
# 此时按两次 Ctrl + D，退出 adb shell
adb pull /sdcard/persist.img
```
长期保存，避免丢失

### 怎么查

首先，需要确认你的设备是否支持project treble，你需要下载一个[treble check](https://play.google.com/store/apps/details?id=com.kevintresuelo.treble)

打开软件，查看检测结果。

只有当 Project Treble 通过检测才表明此手机可以刷 gsi 镜像包。

如果 Seamless System Updates 结果显示 A/B 即表明你应该选择的通刷包后缀名为 A/B 或者 AB ，若显示 A only，即表明你应该选择的通刷包后缀名为 A 或者 A only。但是如果最下面的 system-as-root 显示 支持，那么不管你的设备是否支持ab分区，都必须刷入标注为ab的包。



### 查一下架构


将手机接入电脑，在 shell 进入 adb 环境(前面有讲环境配置)，接着输入指令：

```
adb shell getprop ro.product.cpu.abi
```

或者.... 上网查找你所使用手机的 Cpu 架构

如过架构是`arm64-v8a`，那么你应该去找 ARM64 的包，如果是`armeabi-v7a`，那么你应该去寻找 ARM32 的包。


### 找？

我贴了一个 `通用镜像列表` 在首页，也可以去 XDA 论坛或者问一下刷机群里的人。

??? help "不会..."
    呃.... 如果不会找的话，推荐换个流行的手机（？）或者（￥-5）请人找。

!!! tip
    在XDA查找gsi包，需要查看最前面的标签是`gsi`，`Treble`或`Project Treble`，而不是 `rom`
    一般`gsi`的格式：系统名 系统版本 编译日期 作者 CPU架构 分区类型 官方与否
    后面带有`gapps`字样的刷机包，表明其内置了谷歌服务。

### 刷入..

先双清。

刷入 GSI 前，可以先刷入 Magisk，便于之后的操作。[^49]

!!! danger

    Data分区的强制加密要关掉

    刷GSI之前先刷底包，使用官方稳定ROM作为底包，不要使用开发版和任何官改版，若以安卓9为底包，不能刷入安卓8的gsi，需要刷入同等级的gsi

    a-only和a/b的gsi不通用
    
    刷 `gsi` 从准备刷入到开机完成前都不可以刷任何东西，twrp都不可以。
    
    刷`gsi`不应该用`twrp`刷。应该进入fastboot使用fastboot指令刷，如果有第三方rec就下专包卡刷。

    刷完系统后记得双清（data和cache）


!!! tip
    Android 10引入了 启动时验证 (AVB)，在刷写 GSI之前，先下载并刷入vbmeta.img以停用 AVB，vbmeta.img一般包含会随gsi镜像一起发布。

**刷入vbmeta.img停用AVB验证**

刷入从底包中提取的vbmeta文件，否则会卡米

```
fastboot --disable-verification flash vbmeta vbmeta.img
```

!!! info
    此步骤用于停用 Verified Boot 分区验证，只需执行一次
    如果已经安装了 Magisk，可以跳过本步骤，但未来要一直安装着 Magisk，否则 system 分区通不过校验可能会被禁用，需要重刷

**还原官方recovery**


首先，你需要确保你的设备正在使用的是**原厂的rec**，目的是可以启动fastbootd，或者使用twrp里的用户空间fastboot也可以，注意如果twrp有这个功能可以不用刷回 recovery。


然后呢，将手机重启至fastbootd模式（`fastboot reboot fastboot`）


输入`fastboot flash system system.img`，刷写完成后，使用`fastboot -w`清除数据，这一步会格式化data,防止加密（注意提前备份）。

**重启**
```

fastboot reboot recovery
```
进入 Recovery 后，按提示操作清除数据并重启系统。
!!! tip
   刷入不同类型 ROM 或版本降级时必须清除数据，否则无法进入系统。
   
开机，但是如果开机时发现双清了还是不断重启！这个时候就可以考虑更换一个 gsi 包了，或者是底包的问题，恢复至官方系统，升级一下试试？

!!! info
    刷了gsi收不到短信 但是电话和流量都能用，是votle问题

### 动态分区？

Android10开始引入了动态分区（Dynamic Partitions），把原来的system , vendor , product还有odm分区整合到了一起。

#### 使用动态系统更新（DSU)

安卓10正式版及以上，可以在开发者选项中Feature flags > settings_dynamic_system 中启用该功能。国内系统UI大多隐藏了，可以尝试用下面的adb 命令开启.

```
adb shell setprop persist.sys.fflag.override.settings_dynamic_system true
```

#### 安装前的准备

通过DSU安装的GSI需要是可直接刷写的raw格式镜像，在开始前先检查你的镜像是不是raw格式
linux或者mac系统可以用`file system.img`命令查看

```
file system.img
system.img: Linux rev 1.0 ext2 filesystem data, UUID=91180515-3f1c-501d-888d-6f81f7ca3301 (extents) (large files) (huge files)
```

若返回值是这样的就是raw格式
若为稀疏格式（simg），可以使用以下命令把system镜像转为raw格式镜像

```
simg2img system.img system_raw.img
```
!!! tip
    一般gsi镜像都是simg格式，先检查转换

#### 安装操作

**将镜像打包为gz格式**

```
gzip -c system_raw.img > system_raw.gz
```
!!! tip
    也可以直接用压缩工具压缩为gzip压缩包


**用adb推到手机内置储存**
 
 ```
adb push system_raw.gz /storage/emulated/0/Download/
 ```

#### 系统升级

建议非必要不升级。升级前务必备份好所有数据，升级后有可能无法开机，需要清数据重刷。



**安装动态系统更新**

复制后一起执行。
```
adb shell am start-activity \
    -n com.android.dynsystem/com.android.dynsystem.VerificationActivity  \
    -a android.os.image.action.START_INSTALL    \
    -d file:///storage/emulated/0/Download/system_raw.gz  \
    --el KEY_SYSTEM_SIZE $(du -b system_raw.img|cut -f1)  \
    --el KEY_USERDATA_SIZE 8589934592	
```

!!! tip
    这里第五行的$(du -b system_raw.img|cut -f1)可直接用 system_raw.img 的大小代替，不然用windows刷会报错

    大小使用 `ls -la`看

    比如`system_raw.img`的大小为`2370265088`
    ```
    adb shell am start-activity \
    -n com.android.dynsystem/com.android.dynsystem.VerificationActivity  \
    -a android.os.image.action.START_INSTALL    \
    -d file:///storage/emulated/0/Download/system_raw.gz  \
    --el KEY_SYSTEM_SIZE 2370265088  \
    --el KEY_USERDATA_SIZE 2370265088
    ```

然后你就会看到状态栏有正在安装的动态更新的提示，安装完重启进入第二个系统

小米10出厂安卓10，必然是支持DSU的，你可以用此方法尝试安装phh的aosp gsi。






??? help "修复 GSI 可能存在的基础问题"
    **修复自动亮度失效**
    1.  下载 [framework-res\_\_auto\_generated\_rro.apk](https://drive.google.com/open?id=1DF-v-gwG1rQT-SbAZQYlTwFZFcOPKI9U)
    2.  用re管理器将其复制到 vendor/overlay 文件夹
    3.  修改 overlay 文件夹权限为 `rwxr-xr-x`
    4.  手机打开 Termux 输入以下命令
    ```
    mount -o remount -w /vendor chcon u:object_r:vendor_overlay_file:s0 /vendor/overlay;chcon u:object_r:vendor_overlay_file:s0 /vendor/overlay/framework-res__auto_generated_rro.apk
    ```

    **修复扬声器失真**
    1.  手机下载 Root Explorer
    2.  删除两个文件夹
        > /system/vendor/lib/soundfx  
        > /system/vendor/lib64/soundfx
        
    3.  改变 vendor 文件夹的权限为 `rw-r--r--`
    4.  重启手机
    上面的内容来自  [^48]
    下面的内容来自 https://dev.moe/2716 [^49]
    **修复屏幕状态栏圆角**

    adb 输入以下命令(最后的数字根据自己喜好任意修改):
    ```
    adb shell settings put secure sysui_rounded_content_padding 20
    ```
    
    **开启 120 Hz**
    ```
    adb shell settings put system min_refresh_rate 120
    adb shell settings put system peak_refresh_rate 120
    ```

    如果设置里有 Phh Treble Settings 的话，也可以在里面直接改（Misc features -> Force FPS）。

    **移除屏幕锐化**
    https://dev.moe/wp-content/uploads/2022/06/Remove-screen-sharpening-Mi-Pad-5-Pro.zip

    **修复音频**
    https://dev.moe/wp-content/uploads/2022/06/GSI-Audio-Stutter-Fix-Mi-Pad-5-Pro-elish.zip

    https://forum.xda-developers.com/t/run-an-gsi-on-your-mi-pad-5.4352591/page-9#post-86447857

    **修复任务栏**
    https://github.com/Coxxs/hide-tablet-taskbar


#### SafetyNet[^49]

SafetyNet 的修复根据不同 ROM 分成几种情况.

**PixelExperience ROM** 已经模拟了设备信息，只需在 Magisk DenyList 对 Play Services 隐藏即可。

**Lineage OS** 可能由于自带了 `su`，我没能成功通过 Basic integrity 测试（可能要自己修改 ROM 了）。

**Android 13 GSI** 需要 [MagiskHidePropsConf](https://github.com/Magisk-Modules-Repo/MagiskHidePropsConf) + [Universal SafetyNet Fix](https://github.com/kdrag0n/safetynet-fix) + Magisk DenyList，其中 MagiskHidePropsConf 设置成 MIUI 系统的 fingerprint，外加将 `ro.build.version.security_patch` 设置成 MIUI 系统对应版本的值（可以用 7z 打开线刷包的 `system.img`，在 `system/build.props` 里找到）。

**Magisk DenyList 配置方法**

1.  打开 Magisk，设置里选择 Hide the Magisk app
2.  打开 Magisk，设置里启用 Zygisk 及 Enforce DenyList
3.  进入 Configure DenyList，找到 Google Play services，只需勾选 `com.google.android.gms` 及 `com.google.android.gms.unstable` 两项。
4.  进入设置，清除 Google Play services 及 Google Play Store 的数据。

#### DRM[^49]

DRM 方面，Widevine 无需任何操作，保持在 L1，修复 Safetynet 后即可直接观看 Disney+。

Netflix 可能多了一套验证，默认会是 L3，以下操作后可以恢复到 L1：

1.  确保 SafetyNet 已通过
2.  将 Netflix 添加到 DenyList 列表
3.  用 Magisk 模块在 `build.prop` 添加一行 `ro.netflix.bsp_rev=Q8250-19134-1`
    -   该值仅适用于小米平板 5 Pro
    -   Magisk 模块写法非常简单，可以参考上面的「移除屏幕锐化」模块
    -   修改 `build.prop` 后需要清除 Netflix 应用数据重新登录
    -   该修改[已合并至上游](https://github.com/phhusson/device_phh_treble/pull/313/files)，一段时间后的新版 ROM 可能已经自带了
    -   Dev.moe:感谢几位朋友的帮助！



## Sony Xperia XZ1 强刷


按照 [Sony Xperia XZ1 （G8342） 强刷教程](https://www.himiku.com/archives/flashing-xperia-xz1.html)


## 华为机型简单介绍

请先根据前一节内容慎重考虑华为 Root 。

而且需要解锁 Bootloader 。


!!! info
    华为的EMUI9以上魔改了分区，修补boot没有什么用,需要刷入第三方 rec

具体过程你需要读[这篇文档](https://zhuanlan.zhihu.com/p/435008942)

去年华为关闭了官网上的ROM下载通道，你可以去万维论坛或者 [Huawei Firm Finder](https://professorjtj.github.io/)


## **面具 Ramdisk 为「否」的机型？**"
    
1. 下载当前系统的全量包，如果你使用了第三方 Recovery，那么 recovery.img 就是这个第三方的镜像。提取 recovery.img **或者** MTK 中执行 `python mtk r recovery recovery.img`，备份，然后传到手机上
2. 修改镜像：打开面具，在选择修补文件后，会多出一个「Recovery Mode」的选项。记得勾选
3. 刷入镜像：使用的命令是 `fastboot flash recovery <修改后的 recovery.img 路径>` **或者**  `python mtk w recovery <修改后的 recovery.img 路径>`

这几步完成后，重启手机。和修改 boot.img 不同的是，我们需要立即按下设备进入 Recovery 的组
合键，这样才能挂载 Magisk 。这是因为我们是通过修改 recovery.img 的方式挂载 Magisk 的，只有在按下组合键的情况下，设备才会启动 recovery 分区，从而实现 Magisk 的挂载。

按下组合键后，设备不会进入 Recovery 模式，而是会闪屏过后直接进入一个有 Magisk 的系统。每一次重启都要这样做才能挂载 Magisk。进入系统后就没有特别需要注意的问题了。

而想要进入真正的 Recovery ，我们需要在按下组合键后的闪屏界面长按音量 + 键。



## 备份完整字库数据(分区)[^15]


手机的字库指的是手机硬件(类比硬盘+Bios)，但是我们这里讲的是里面的数据啦。

我们说的64GB，128GB，256GB等等，这个就是说的主板的储存容量，也就是字库。某个分区的数据损坏，好听的说法是分区数据坏了，难听的说法是字库损坏了。


### 有必要吗？

有人会说，不是有9008吗？有必要备份完整字库吗？有必要。

假如一个手机所有分区加起来有100个，9008大概会刷写30个左右，剩下的70个不会刷写。

那么这个70个当中有某个分区数据损坏了，9008是无法救砖的，必须返厂，用工厂售后（非卖手机的那种售后）的工厂包，方可救砖。当然，如果这个工厂包，没有刷写完100个分区的话，基本上也是无法救砖的。

如果你是频繁刷机的玩家，比如你刷Gsi(通用系统镜像)把基带刷丢了怎么办？或者装了格机模块被格式化全分区数据了怎么办？

所以，Root后第一件事，就是备份完整字库，以防不测。

基带丢失，其实也就是基带分区的数据损坏了，只需要刷入正常的分区镜像就可以修复。但是，基带分区究竟是哪一个我们不得而知，所以需要备份完整的分区。

### 如何备份？

你可以去下载 [这个分区备份软件](https://www.coolapk.com/apk/com.example.ourom) 或者在 **[搞机助手](https://gjzsr.com/)** 等等中备份你的手机分区镜像或者打包当前系统ROM,到时候用线刷工具/深刷工具救回来。

!!! info
    如果救回来基带未知，可以试试官方线刷包单刷 persist.img


**高通机型备份字库**

安装个MT管理器，使用root权限执行【高通字库备份.sh】即可。备份的文件在/sdcard/Rannki目录中。

**高通机型还原字库**

提前把之前备份好的Rannki文件夹，复制到 `/sdcard/Rannki`，安装个MT管理器，使用root权限执行【高通字库还原.sh】即可。

**MTK 机型备份字库**

安装个MT管理器，使用root权限执行【MTK字库备份.sh】即可。备份的文件在/sdcard/Rannki目录中。

**MTK 机型还原字库**

提前把之前备份好的Rannki文件夹，复制到 `/sdcard/Rannki`，安装个MT管理器，使用root权限执行【MTK 字库还原.sh】即可。

字库备份还原，解决的不只是基带问题，

是：除硬盘物理损坏外的所有问题，解决率为100％。

**以上如何防止掉基带教程由酷安 Rannki 原创**



??? note "详细叙述"
    
    
    **UFS闪存手机**
    
    主板一般被分成了6个硬盘，即**sda，sdb，sdc，sdd，sde，sdf。**
    
    所以，主板设备代码分别是：`/dev/block/sda，/dev/block/sde，/dev/block/sdc，/dev/block/sdd，/dev/block/sde，/dev/block/sdf`
    
    备份分区的代码举例：`dd if=/dev/block/sda1 of=/sdcard/1.img,dd if=/dev/block/sda2 of=/sdcard/2.img`等等等等............................
    
    还原分区的代码举例：`dd if=/sdcard/1.img of=/dev/block/sda1,dd if=/sdcard/2.img of=/dev/block/sda2` 等等等等............................
    
    **Emmc闪存手机**
    
    主板设备代码：**/dev/block/mmcblk0**
    
    备份分区的代码举例：`dd if=/dev/block/mmcblk0p1 of=/sdcard/1.img,dd if=/dev/block/mmcblk0p2 of=/sdcard/2.img`等等等等............................
    
    还原分区的代码举例：`dd if=/sdcard/1.img of=/dev/block/mmcblk0p1,dd if=/sdcard/2.img of=/dev/block/mmcblk0p2`等等等等............................
    
    当然，像 system 分区， vendor 分区，userdata 分区，super 分区，这些分区就没必要进行备份还原了。
    
    查看分区信息的命令：
    
    先安装busybox的面具模块：链接: `pan.baidu.com/s/1hFQr0nvXprzcz2gyQxtFzQ` 提取码: `y61r`
    
    然后终端命令：`busybox fdisk /dev/block/sda` 回车，然后再输入p回车，就可以看到sda这块硬盘的所有分区信息了。adb,adc,add,ade,adf
    
    同理,emmc闪存手机的命令是：busybox fdisk /dev/block/mmcblk0回车，再输入p回车，就能看到所有分区信息了。
    

如果你的手机已经出现问题，且没有备份完整字库。
需要去售后换主板(-300)，或者找一台同机型的手机，提取完整备份字库刷入救机，是否成功看运气，因为会不会黑砖，这是个待验证的问题。

最好不要使用别人的手机的全字库备份，就算不发生手机黑屏变砖的情况，也会大概率出现 Bootlocker 永久锁定，永久无法再次解锁。

如果刷入另一台同型号手机的基带，两台手机会有相同的串号。

备份的基带，只要不换主板就可以一直用。



[^15]: 告诉大家如何防止掉基带问题 [https://www.coolapk.com/feed/21305538](https://www.coolapk.com/feed/21305538)

[^13]:**[通过 ADB 给手机刷入第三方 Recovery](https://blog.linioi.com/posts/8/)**

[^21]:[底层刷机教程/全解析](https://wiki.pchelper666.com/%E5%BA%95%E5%B1%82%E5%88%B7%E6%9C%BA%E6%95%99%E7%A8%8B)

[^42]:[部分华为麒麟手动获取BL解锁码](https://zhuanlan.zhihu.com/p/397173427)

[^43]:[华为麒麟深刷救砖［变砖绝杀技］](https://www.coolapk.com/feed/26830366?shareKey=N2Q2ZTRjNTU0NjkxNjE1OTBkZDI~&shareUid=3463951&shareFrom=com.coolapk.market_11.4.2)

[^44]:[小米11搞机指南](https://blog.chitang.dev/posts/mi11/)

[^45]:[关于ProjectTreble和AndroidGSI](https://bbs.liuxingw.com/t/9315/2.html)

[^46]:[安卓手机刷入GSI镜像教程](https://www.irom.net/post/9.html)

[^47]:[小白刷机指南——GSI](https://www.bilibili.com/read/cv15133756)


[^48]:[动态分区刷GSI-通用镜像-的正确姿势](https://www.chaptsand.top/posts/da8abb0.html)

[^49]:[小米平板 5 Pro 刷入 GSI Android 教程](https://dev.moe/2716)