# 深刷

## 准备

- 电脑
- 一台安卓 ？ 以上的手机
- 一根良好的数据线

## Sony Xperia XZ1 强刷

按照 [Sony Xperia XZ1 （G8342） 强刷教程](https://www.himiku.com/archives/flashing-xperia-xz1.html)

## 高通9008

**理论上高通处理器都可以用这个方法**

!!! info "用这个方法必须要满足两个最基本条件"

    1.能找到 QPST 专用刷机包
    2.确认手机能进9008端口

*💡 高通 QPST 线刷其实就是利用高通芯片自带的9008端口，将手机系统内的所有分区的镜像文件，直接刷写手机。这个刷机方式比 REC卡刷 和 fastboot 线刷，更底层、高效、强大。这种方式，不需要进入手机的任何分区，就可以直接刷写手机固件。*

!!! note
    高通的 QPST线刷模式，因联机之后端口名字叫Qualcomm HS-USB QDLoader 9008 (COMx)而得名。
    
    该模式下，用户可通过QPST及其衍生工具（本质为QPST命令行调用）直接对手机的Flash芯片进行读写操作，而不需要解锁Bootloader。
    
    常见刷机工具有QPST，MiFlash（Pro）等工具，刷机包中一般会有一个分区表xml文件。以及一个eif文件。XML文件命名一般为Rawprogram（数字）.XML和Patch（数字）.XML,EIF文件一般命名为prog_存储芯片类型（比如UFS和EMMC）*firehose*(SOC型号，比如MSM8998或者SDM855)_（内存类型，一般是DDR）.eif，只要带有这两个文件的，一般都是高通支持9008的刷机包。
    
    进入9008模式，高通略为麻烦。MSM8994及以前的SoC，可以通过Fastboot命令直接进入9008模式：`adb reboot edl`
    
    

此方案无需改线，无需触点短接等操作，但需要电脑进行操作。

首先去下载 [高通的线刷工具](https://qpsttool.com/category/download) ，一般下载最新版本的即可。

运行该线刷工具，需要电脑识别到端口9008，在电脑设备管理器中可以找到，如果没有反应需要电脑安装 [9008的驱动](https://www.aliyundrive.com/s/KTLkyyjTsDB)

接着下载官方固刷包进行刷入即可。

💡 按住手机上下音量+电源调试手机进入9008模式，其次电脑识别到9008端口

### 刷包成功后出现的几种情况

1. 数据线自动断开链接，手机充电灯亮起-----刷写成功

2. 无反应！------换包刷写，或试另一种刷写方式


## MTK联发科

!!! note
    联发科的底层刷机模式没有高通那么麻烦。该模式在 MTK 内部被称为 MTK in-house developed loader。MTK 的该模式与高通略有不同，该模式具有帮助系统寻找Uboot的功能。该模式除了具有启动功能之外，还具有下载功能。首先还是需要明确的是mtk芯片都有一个boot rom，如果没有这个rom，那么程序是无法被下载到 Nand Flash中的，然后此时的Flash上是为空的，没有任何数据的。系统在上电之后它会检测是启动模式还是下载模式，如果是下载模式，它会初始化一个usb的串口，将Preloader加载到内部的SRAM中，跳转到Preloader中去执行，初始化好Flash和外部RAM之后，依次将preloader、lk、kernel、android下载到nand flash中去。刷机工具是SP Flash Tools ，需要验证的对应的DA文件，或者 MTKclinet


### 准备 MTK 工具/工具箱

MTk 工具依赖安卓的一种漏洞来实现 Root ，提取 boot.img

!!! warning
    **天矶920 以后的设备不受此方法支持！（天矶1200仍旧支持）**

先在 [GitHub - bkerler/mtkclient: Inofficial MTK reverse engineering and flash tool](https://github.com/bkerler/mtkclient) 下载源代码，解压到 mtkclient-main 文件夹。

MTK 提供不同平台的版本，但是依赖 Python，所以你需要从文件包或从 [Download Python |Python.org](https://www.python.org/downloads/) 安装Python（**确保安装时勾选 ADD PYTHON to PATH**），并使用 `pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple` 配置国内镜像源。


### 初始化

这里以Windows系统为演示系统。乌班图参考 [这里](https://zhuanlan.zhihu.com/p/452973221)

在 mtkclient-main 文件夹下右键打开命令行。
执行 `python setup.py install` 自动安装依赖。

🛠 下面每执行一次命令，都需要重复关机状态下 “插上USB同时按住音量加减及开机键，待到看到命令行变成这个后就松手”步骤。

!!! danger "温馨提示"
    **一定不要输错命令**

输入 `python mtk rl out` ，备份手机全部分区。如果后面失败了，使用`python mtk wl out`可以刷回原状态。

这个步骤如果备份用户数据会耗费很长时间。如果**不在乎用户数据**，你可以备份到 `userdata` 时中断并删除 `usedata.img`。

!!! warning
    备份完毕后，镜像在 `out` 文件夹，最好将项目目录下的out文件夹复制出来，防止后续覆盖。

### 强解 Bootloader

如果你OEM已经解锁且Bl也已经解锁的，请跳过这步。

如果你没有获取到深度测试或者官方解锁的，可以用 `python mtk da seccfg unlock` 尝试解锁，风险自担，**这一步会清除你手机的全部数据，请注意**

强解后请重置手机，输入 `python mtk reset` 重置。（**如果是MTK 可以不清除设备所有数据**）完毕后长按开机键开机，开机第一屏会有提示，按一下开机键即可解决，因为重置过手机，所以第一次开机时间会有点长，耐心等待即可。

待到开机后，设置中打开开发者选项就可以看到OEM解锁选项变灰，出现一行小字引导加载程序已解锁。开机前会有一段英文提示，即为解锁成功（可以用 `fastboot oem lks` 验证，返回 0 代表解锁成功）。

附：重新锁回 Bootloader 使用 `python mtk da seccfg lock` ，有 99% 砖机可能。

### 提取boot&vbmeta

使用如下命令，提取手机中的 boot 和 vbmeta.img 镜像

`python mtk r boot,vbmeta boot.img,vbmeta.img`

手机关机，待到关机完成，插上USB同时按住音量加减及开机键待到看到命令行提取的数字闪动后，松手。

提取完毕后，boot与vbmeta 的镜像文件会在目录中，**务必备份到其他的文件夹**。

准备好 boot.img 后，打开最新的 `Magisk` ，点击 `Magisk` 后边的`安装`，选择安装方式为 `选择并修改一个文件` ，从电脑端复制 `boot.img` 文件到手机并选中该文件，点击`开始` ，仔细阅读修改结果并从结果中复制patch后的文件（一般在 `Download` 文件夹下，文件名类似`magisk_patched-24100_gk0te.img`）到电脑。

!!! help "AVB验证"
    **安卓10及以上需勾选 vbmeta 选项**
    
    有些机型刷入修改的 boot 后可能会由于 vbmeta.img 的验证导致设备无法启动 ，可尝试保持 boot镜像 中的 vbmeta ,此选项在最新版面具中已支持。

有的手机没有 vbmeta 分区会有提示，忽视它。

**准备修补后的镜像**，重命名为`boot.patched`，放入项目根目录。

执行命令刷入，重启手机，安装面具即可发现 Root 成功。

`python mtk w boot,vbmeta boot.patched,vbmeta.img.empty`


### 备份 Root 后的手机字库（分区）

!!! tip 
    你可以使用mtk工具备份各个分区。

- 备份命令

`python mtk rl out` 即备份所有分区到 out 文件夹。

- 自救命令

`python mtk wl out` 即将 out 文件夹镜像写入所有分区。

!!! tip
    注意覆盖。

    注意 userdata 可能会很大，包含你的用户数据(音乐图片之类全部)。


!!! help
    🛠 如果在解锁中遇到问题请先去 [https://github.com/bkerler/mtkclient/issues](https://github.com/bkerler/mtkclient/issues) ，搜索遇到的问题，如果是新的bug欢迎向作者反馈。需注明机型和提供相应的preloader。
    
    如果不自信，可以花钱购买**靠谱的**刷机服务。



