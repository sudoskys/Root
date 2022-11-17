# 术语


## 了解刷机


### 早期

早先的Android手机要想获取Root权限，用户会用本地提权漏洞利用工具来直接Root，这是最原始最纯洁的方式。但是随着厂商对Rom的升级，这些内核的漏洞随时都可能被修补，因此，这种Root方法在时间与空间上都有着很大的局限性。[^33]

过了一段时间，由于手机厂商对硬件的封闭，加上内核补丁修补很完全，这个时候获取Root权限就更难了，这个时候刷机与Root就联合起来了，由于不能从系统内部通过 Exploits 来获取 Root 权限，只能通过修改 Rom 包来达到 Root 的目的，这也是目前很多第三方Rom包自带了Root的原因。

然而手机厂商也不是吃干饭的，手机厂商在 OTA升级 时使用 Recovery 对包签名进行验证来防止用户刷入修改过的包。对于这种情况，只能通过 FastBoot 来线刷了。

>~当然，还有一部分厂商，为了吸引更多用户购买他们的手机，还是在手机中偷偷的留了后门的，比如不锁BootLoader，让用户刷第三方的Recovery，又或是干脆留个以前的漏洞不补，让用户自己来Exploits等等~


### 深刷

深刷就是底层刷机，顾名思义，这是一种从底层刷写手机分区的方式。与正常的线刷卡刷相比，这种方式更为彻底，不仅不需要开机，还可以强行解BL锁。

底层刷机模式常用于使用 卡刷（Recovery下以及一系列使用ADB刷机方式的统称）或者线刷（Bootloader下使用Bootloader命令刷机的方式）刷成砖后救砖的场景下。

按照主流处理器，高通为9008刷机模式，MTK为MTK PreLoader模式，海思麒麟为eRecovery模式（类rec操作）和eDownload模式。

!!! note
    MTK联发科芯片机型的深刷口已经被某米提交修复了，目前 天矶920 以后少有能使用此方法的。

[底层刷机详细内容](https://wiki.pchelper666.com/%E5%BA%95%E5%B1%82%E5%88%B7%E6%9C%BA%E6%95%99%E7%A8%8B)

其中，

Mtk 深刷是适用联发科芯片的底层刷机方法。

高通 9008是适用于高通芯片的底层的联机模式。当机器REC，Fastboot 都被篡改或清除时，唯一能进入还不会被摧毁的就是 紧急Download 模式。由于联机后驱动会显示9008或9007或900e,所以得名 9008深度刷机 。

### OTA

这个词的意思是系统升级哦，不是刷机。OTA 意思是**增量升级**，即在原先系统的基础上增加新功能，比如给手机打补丁。

**手机要正常进系统且未修改才能用**

OTA 不会删除资料和系统的设定。备份资料放的位置要问官方，但通常不需要知道位置，内建备份也有还原功能，还能选择要还原的东西，还原的时候有问题的部分可以选择略过。

有些档案用 patch 的方式处理了, 有些用覆盖的方式 (方法要看制作 OTA 包的工程师方案), 因此如果有档案与预期的不同 (通常是 root 后会删除或修改档案), OTA 会失败。

!!! info
    OTA和刷机有关的点在于，我们可以通过解 OTA 的包进行修补 Boot 获取Root权限。


### 线刷

线刷指使用 Fastboot 模式刷机，因为需要有一个PC机并且USB线要始终链接，得名线刷。

线刷使用 Fastboot 工具，一般流程是直接刷镜像，由 uboot 以直接写入闪存的办法把镜像直接写到闪存对应的分区。

线刷时备份资料可以使用PC端的程式来管理，出问题的话三清之后再选择性恢复，再不行就全部设定和资料重头来过。

>而大家看到的线刷包一般就是包含了 Fastboot 程序和各个系统镜像以及一个可执行的脚本的包，用户直接运行那个脚本，脚本调用 Fastboot 来刷。


### 卡刷 /第三方 REC

!!! tip "Do you know?"
    区别 卡刷包 和 线刷包 最明显的区别是 (卡刷包的文件内容）里有 **Recovery 文件**，而线刷包里有 “FASTBOOT”

卡刷即指使用 `Rcovery` 模式刷机。这个过程一般是在 `recovery` 里进行的，有直接刷镜像的比如 `kernel` 部分，但像 `system` 都是挂载 `system` 分区后再个别的更新里面的文件（差分或者直接覆盖），而不是像线刷那样把整个 `system` 镜像重刷一次。如果是通过打二进制补丁差分更新的话（绝大部分官方 OTA 包的做法），就要求被更新的文件和出厂时一样，否则就会失败，这是 OTA 失败的原因。

具体卡刷应该分两种, 一种是**小的更新包** (一种和 OTA更新包 一样, 结果也一样), 另一种是完整的系统包, 这种通常是把系统的 partition 重新 format 再把资料放上去. (不会动到使用者资料的分区)。

卡刷包有比较复杂些的目录结构，除了用来更新的文件外，也包括一个可执行文件和脚本，但这两个脚本是给recovery来用的，而不是用户。

**Recovery**

当手机系统文件被损坏从而不能正常启动时，我们可以进入recovery小系统对主体系统进行修复。


#### 第三方Recovery

官方的recovery功能较少，一般可以清除缓存，擦除所有数据，刷入官方指定的系统，而不能刷第三方系统，所以就有人做 Recovery 去代替官方 (即第三方Recovery) 的，这样就能刷非官方的ROM了。

第三方Recovery有很多种，最常用的是 `TWRP` ，还有很多基于 `TWRP` 修改的种类，比如 `橙狐Recovery`，`SHRP`，`PBRP`，`奇兔Recovery` 等等。

其实 第三方Recovery 分为CMW和TWRP两种recovery,我们开机进入系统自带Re清除数据时音量上下键操作的界面就是CMW的版本。TWRP就是可以触摸的版本，TWRP的功能更强大。

可以去 TWRP 官网 [Here](https://twrp.me/Devices/) 搜索，或者在 TWRP 官方APP下载，但是速度可能不是很好,也可以去[橙狐官网](https://orangefox.download/zh-CN)找。

如果以上途径都找不到，可以去酷安找你机型的话题，在话题内搜索关键词：`TWRP，rec，橙狐，oringe，pbrp，沥青，shrp。`

!!! info  "**什么是第三方REC？？**"
    Recovery像是一个独立的微型系统，可以不依赖于安卓操作系统主体单独运行。Recovery的中文名是恢复，顾名思义，当手机系统文件被损坏从而不能正常启动时，我们可以进入recovery小系统对主体系统进行修复。可是官方的recovery功能较少，一般可以清除缓存，擦除所有数据，刷入官方指定的系统，而不能刷第三方系统，所以就有人做 Recovery 去代替官方 (即第三方Recovery) 的，这样就能刷非官方的ROM了。像是所有的官改包，第三方是配的包，国际版的包以及原生系统，都是用第三方REC刷入。可以说，有了第三方REC，是你刷机的出发点，想刷什么都可以（当然刷的东西兼容你的设备）有了它，你就可以各种不同的系统，开始真正的刷机之路。但是，大部分的第三方REC不支持OTA升级，也就是说，每次你收到系统更新的时候，都必须要下载完整包更新。


### 软刷

软刷指使用刷机大师，刷机精灵等的第三方刷机软件刷机。现在已经绝迹了吧 :-|


### 厂刷

字面意思，寄回厂家刷机。


## 了解术语[^17]

**内存/运存/闪存/Ram/Rom**

首先**没有运存这种东西**，只有内存。

除了手机外，你把闪存/硬盘/存储空间当内存说都是不对的。

- 内存是什么？

内存是能够直连CPU的高速存储器。内存包括 RAM 和 ROM 两种。

- 外存是什么？

外存是不能直连CPU，需要通过内存中转的低速存储器。电脑的硬盘（HDD），固态硬盘（SSD），手机的存储空间（实际是和固态硬盘使用同样基本技术的闪存），都是外存。

- RAM是什么？

RAM是随机访问存储器（Random Access Memory），暂存正在运行的系统和程序的数据，断电后数据消失。这是对应于某些人所说的“运行内存”的组件。

- ROM是什么？

ROM是只读存储器（Read Only Memory）。但是很多可以读可以写的介质也被称为了ROM。手机的闪存也是可以被称为ROM的，不过称为闪存是更准确的说法，但说闪存不是ROM是错的...

- 闪存是什么？

闪存是最常见的存储芯片。固态硬盘、U盘，手机内的存储空间均使用闪存芯片，但芯片的组织方式和主控有所区别。[^39]

**手机的存储空间到底应该叫什么？**

外存，闪存或存储空间都行。

叫ROM属于错误，叫内存让人无语。

### 各清

- 双清

Dalvik/ART Cache ,Cache 

清除分区以及数据，简称重置手机。

- 三清

Dalvik/ART Cache ,Cache ,Data 

刷机前基本上必选三清，使新系统的兼容性达到最佳。

- 四清

Dalvik/ART Cache ,Cache ,Data ,System 

四清针对版本差异过大的系统,四清后不刷入系统无法进系统(因为系统分区寄掉了)
 
!!! warning  end

     重要！
     四清后不刷入系统无法开机进系统！！只能电脑刷或者储存卡刷。


- 五清

Dalvik/ART Cache ,Cache ,Data ,System ,Internal Storage（内置储存） 
!!! warning  end

    如果选择这个方式，手机内置存储上的东西会被删除，也就不能从手机选择卡刷包了。

- 六清

Dalvik/ART Cache ,Cache ,Data ,System ,Internal Storage（内置储存）,USB OTG.

### 底包

既不是 ROM 也不是 OTA 软件包，它是一组 **低级驱动程序** ，可帮助操作系统完成其想做的任何事情。 它包括调制解调器，蓝牙，引导程序，DSP 等各种内容。支持所有 Snapdragon 和 MTK 设备，包括仅限中国的设备。

底包就相当于一个纯净版或者内核版的系统包，包含基带，字库。

### MTK

Mtk 代指联发科，MTK和高通都是生产手机CPU的厂家。MTK平台和高通平台指的是这两家的操作系统。

!!! info "你知道吗...?"
    [^28]
    联发科机型不建议玩机。
    
    为什么？因为动分区特性，分区 logo, dtbo, boot, vendor_boot 等等在刷机时特别容易翻车。
    
    它大部分时候也不是真砖，但是只能反复一屏重启，也无法进入 Bootloader。不过不让你进 Bootloader 基本也就等于砖了，因为你只能去售后了。（补充:如果只是解锁之后搞下 Magisk、LSPosed 这种，那还是没什么问题的）
    
    如果在以前，这种情况还好，漏洞允许我们深刷绕过小米售后账号权限。现在新机深刷不能自己来不说，联发科他自己的深刷工具对动态分区的支持还不好，如果刷错分区在 B 槽位翻车，很大概率深刷也刷不好，只能换主板。
    
    虽然大佬制作了这些处理器的 TWRP，但并不建议任何没有丰富经验的人刷入使用。GKI2.0 内核的特性导致 dtb 和 内核模块都存在于 vendor_boot 内，而我们的 Recovery 也会被移动到这，一旦官方更新了 vendor_boot 部分，就会导致Rec无法引导进不去系统。这种情况还好，Bootloader 是可以进的，恢复官方的 vendor_boot 即可。
    
    而一旦遇到反复重启到第一屏的情况，就只能去售后深刷。根据最新的测试结果来看，现在单纯刷入大佬制作的 TWRP 理论上不会再遇到这种问题了，但用它来刷包等操作，还是不能保证。
    
    （补充1，由于联发科设备 fastboot boot 命令是不可用的，所以临时启动 twrp 是做不到的，只能通过直接 fastboot flash 刷入分区来使用，因此翻车几率大大增加。）
    
    （补充2，也由于 GKI2.0 的原因，整个 boot 分区只有 kernel，所以理论上为其编译内核只需要使用 android common kernel 合入 mtk 专有 gki 部分，就可以正常开机了）

### 手机分区

此部分内容来自 [^30]

- boot

引导分区：顾名思义，一个负责引导系统的分区。

它包含 Android 的 kernel（内核）和 ramdisk（内存盘）。我们日常启动 Android 系统，就是通过启动 boot 分区的 kernel 并加载 ramdisk，完成内核启动，进入系统。

如果引导分区遭到不当改动，手机通常会无法进入系统，会发生无限重启，卡fastboot，卡第一屏等现象。

- system

系统分区，是一种"组合体",system分区遭到损坏，手机就无法正常开机。

- data&userdata

用户数据分区：用户所有的数据都包含在这个分区当中，也包括内部存储中的数据。

- persist

它不仅保存着用于FRP（factory reset protect）机制的一些信息，例如账号，密码等重要信息，而且还包含 DRM（数字版权管理）相关文件，传感器注册表，对我们的wifi，蓝牙，mac地址来说必不可少。

!!! info
    恢复出厂设置并不能清空persist分区，另外线刷包不包含persist分区，一旦出问题我们需要动手修复。

- modem&radio

基带分区,此分区为手机提供通讯功能。此分区一旦损坏，通讯相关功能大概率会不可用，具体表现为不读 Sim 卡，丢失 imei 等。

!!! help
    Qualcomm（高通）基带分区：fsg、fsc、modemst1、modemst2 可选分区dsp、bluetooth、modem、persist、sec

    Mediatek（MTK）基带分区：nvcfg、nvdata、persist、protect1、protect2、seccfg、nvram分区

    路径：/dev/block/bootdevice/by-name/
    /dev/block/platform/bootdevice/by-name/

- AVB

为了让设备厂商更方便的引入 Verified boot 功能，Google 在 Android O上推出了一个统一的验证启动框架 Android verified boot 2.0.

AVB/DM启动验证分区，主要是为了防止启动镜像（boot.img）被篡改。vbmeta启动效验通常导致MTK机型刷入magisk或者三方Recovery后陷入无限重启的情况。

在部分机型中，可能由于vbmeta.img的验证导致设备无法启动，我们可以去掉这项验证，

```sh
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img 
```
面具 `安装` 功能中也有相关选项。


- recovery

备用引导分区，在boot分区（主引导分区）损坏后，仍可以进入rec分区进行系统的备份和恢复，发挥着相当于电脑 pe 的作用。

- misc

一个非常小的分区，4 MB左右。
这个分区供 recovery 来保存一些关于升级的信息，应对升级过程中的设备掉电重启的状况。

- cache

安卓系统缓存分区，清除此分区不会影响个人数据，缓存将会在日用中重新生成。

- dtbo

控制屏幕刷新率和频率的分区，变更前记得先备份，否则得不偿失。

- splash&logo

存储着安卓开机第一屏图片，fastboot模式下图片，及系统损坏图片等。


### A/B分区

Android从7.0开始引入新的OTA升级方式，A/B System Updates，这里将其叫做A/B系统。

顾名思义，A/B系统就是设备上有A和B两套可以工作的系统（用户数据只有一份，为两套系统共用），可以理解为一套系统分区，另外一套为备份分区。其系统版本可能一样；也可能不一样，其中一个是新版本，另外一个旧版本，通过升级，将旧版本也更新为新版本。当然，设备出厂时这两套系统肯定是一样的。之所以叫套，而不是个，是因为Android系统不是由一个分区组成，其系统包括boot分区的kernel和ramdisk，system和vendor分区的应用程序和库文件，以及userdata分区的数据

A/B系统实现了无缝升级(seamless updates)，有以下特点：出厂时设备上有两套可以正常工作的系统，升级时确保设备上始终有一个可以工作的系统，减少设备变砖的可能性，方便维修和售后。

!!! info  end

    OTA升级在Android系统的后台进行，所以更新过程中，用户可以正常使用设备，数据更新完成后，仅需要用户重启一次设备进入新系统。如果OTA升级失败，设备可以回退到升级前的旧系统，并且可以尝试再次更新升级。


### VAB架构

它又被称为虚拟AB分区。目前出厂安卓11的新机型，**几乎都是VAB架构**。

安卓分区架构发展史为：onlyA，AB，onlyA动态分区，AB动态分区，VAB架构。 所谓的VAB架构，其实就是AB分区，套上了动态分区特性，再解决了AB分区的空间占用问题。

刷机时经常会刷写的分区(system,vendor,boot,recovery等等)。userdata分区就是用户分区，格式化data就是格式化的这个分区。需要注意的是，格式化data和清空data，是两个不同的概念，经常会有小白把这两个概念搞混淆。

格式化data就是把userdata的分区进行格式化操作，就像你格式化U盘一样，是格式化操作。

而清空data，是删除data分区的所有文件及文件夹。当你遇到data挂载不上时，你清空data是没有效果的，这个时候，你需要进行格式化data操作，才能挂载data，所以，这两个不要搞混淆了

官方文档见 [这里](https://source.android.com/devices/tech/ota/virtual_ab)

附 [对Virtual A/B 分区工作方式的进一步探索](https://blog.xzr.moe/archives/30/)

### VAB验证

**验证启动**

验证启动（Verified Boot）是Android一个重要的安全功能，主要是为了访问启动镜像被篡改，提高系统的抗攻击能力，简单描述做法就是在启动过程中增加一条校验链，即 ROM code 校验 BootLoader，确保 BootLoader 的合法性和完整性，BootLoader 则需要校验 boot image，确保 Kernel 启动所需 image 的合法性和完整性，而 Kernel 则负责校验 System 分区和 vendor 分区。

### 通用系统映像(GSI/SGSI)

GSI则是一种可以忽略厂商定制的通用system image(系统映像) GSI代表通用系统映像。你可以将其刷到设备的系统分区。之所以具有通用性，是因为它使用新的标准化硬件API访问硬件（因此它可以在任何启用treble的设备上运行）。

SGSI: Semi-GSI 理论上只支持高通机型，但在部分联发科机型上仍然可以开机（如: begonia) SGSI 在传统 GSI 的制作方法上做了改进，在原 system 不变的条件下提高 boot 和 vendor 的通用性，实际体验上比传统 GSI更好，但在开机率上不如传统 GSI。安卓11后常用 SGSI。

[https://source.android.google.cn/devices/tech/ota/dynamic_partitions/implement](https://source.android.google.cn/devices/tech/ota/dynamic_partitions/implement)

Android 8 引入 Project Treble 后，手机的系统文件和底层的厂商硬件驱动开始分离存放，更新系统时只需要更新系统文件即可。此项举措意在方便厂商加快 Android 大版本更新的步伐，自然也同样方便了第三方 ROM 的开发和更新，而 Android 9 开始，Google更改了要求，所有设备都必须使用[system-as-root]。

GSI/SGSI由此以A-only和A/B进行区分。*在a11及以上已无A-only的GSI/SGSI*

GSI一般有两种类型，一种是erfans工具使用原包做出的gsi，另外一种则是phh-treble GSI。后者的开机率是最高的，vndk支持一般从27-32(Android8.1-12L)。因为他是从源码构建的GSI，phh-treble本来就是一种通用的device tree。

如果您的设备支持sar，可直接刷入AB的gsi/sgsi。如果不支持可在刷AB的GSI/SGSI前刷入makemesar补丁来让不支持sar的设备使用ab的GSI/SGSI


[^45]

它的优点是在机器还没有适配第三方 ROM 的时候，可以提前体验到类原生系统。但是因为没有针对具体机型进行优化，所以会存在部分问题。

贴一个 通用系统镜像的列表:[Generic System Image (GSI) List](https://github.com/phhusson/treble_experimentations/wiki/Generic-System-Image-%28GSI%29-list)


### Project Treble(PT)

方便手机厂商给手机升级系统。

为了解决Android碎片化问题，减少技术支持层面的拖累，谷歌将原本由芯片厂商负责的代码修改工作纳入到Android项目中，绕过芯片厂而直接将打包好处理器适配性的系统发送给手机厂商，从而大大节省时间和研发难度，让手机厂商升级系统的门槛变得更低。

pt的分区又有着不同区别，分别是a-only和a/b。部分机子升级至安卓8.0级以上安卓版本时，部分良心手机厂商的机子会支持pt计划的新分区，叫vendor分区

只要你的手机支持pt，也就能以支持pt的rom为底包，双清刷入gsi，尝鲜类原生，但因为是通用系统镜像，部分机型刷入后可能会有部分传感器丢失的现象，比如指纹，相机不可用，得自己搞定驱动。


### 动态分区

Google在Android 10开始引入了动态分区（Dynamic Partitions） 简单来说，就是把原来的system , vendor , product还有 odm 分区整合到了一起，构成 super 分区 在刷入设备的时候动态调整system等分区的大小


### **Bootloader**[^36]

Bootloader是好几个启动阶段的统称，它与电脑的启动管理器相似，负责启动手机的用户层面操作系统，在手机开机时进行开机自检和初始化手机硬件，并指引手机找到系统分区并启动操作系统。

如果BL被锁定，即使你强行刷了非官方boot，因为BL会校验boot分区的数字签名，所以无法加载Android内核到RAM，也就无法启动 system。

锁定 Bootloader 一方面是为了用户安全（解锁就会发生格式化），另一方面也是为了维护厂商自身利益。

部分厂商对于 Bootloader 采用硬件层面上的熔丝机制，一旦你解锁了就回不到出厂 locked 状态:也就是失去了保修。


![Pic](https://s3.bmp.ovh/imgs/2022/08/16/f010caf0576cf10b.png)


### 字库(就是分区啦！)

字库是硬件，就相当于电脑的硬盘。

功能机时代，很多手机程序、控制信息、字库信息是存储在一个专用芯片里面，芯片中主要部分是字库，所以一些售后和维修人员就习惯把这个存储芯片称做字库芯片。不过，到了智能机时代，这个存储芯片的功能已经远远超越了存储字库这么简单，所以它也远不是“字库”所能概括的，更准确的表述应该为eMMC芯片(embedded MultiMediaCard）。　

简单来说，“字库”(eMMC芯片)就相当于电脑中的BIOS+硬盘，一方面，它里面固化有手机的启动程序、基本输入输出程序、系统设置信息等等；另一方面，它还起到了存储照片、音乐等文件的作用，也就是我们经常提到的手机xxGB存储空间，而且手机的ROM(系统固件)也在这颗芯片当中，由此可见它对于一部手机的重要性。　

与手机一样，“字库”(eMMC芯片)也有相应的分类。

1、原装专用字库，即原厂生产、针对相应型号专门使用的芯片；

2、原装代用字库，同样是由生产，在原装字库货源短缺的情况下，替代原装字库使用的芯片，由于不是专门适用某型号机器的字库芯片，所以在体积上与原装字库存在差异，一般都要稍大一些；

3、其他品牌的字库，例如某芝部分型号的芯片，可以替换原装字库使用。

!!! tip "简单来说"
    字库要是坏了，换主板吧


### ROM包

华为，小米，OPPO等都是安卓手机，但它们的系统又各不相同。这些系统本质上都是基于安卓系统的，他们对安卓系统进行定制，加入自己特有的服务。比如我们看到很多手机出厂就自带APP，这些就是 定制化之后的安卓系统 , 这些安卓系统就叫做ROM包。


### Fastboot/ADB

**Fastboot**

fastboot 主要是用来与bootloader的USB通讯的PC命令行工具，也用来向bootloader传送刷机文件进行文件分区重烧。

开机后它会初始化硬件环境，实现一个小系统，然后和PC通讯，将PC上的刷机包写入至Emmc中，实现刷机。Recovery此时不起作用。


**FastbootD**

据我所知, fastbootd 是用户空间中的 fastboot。

在动态分区手机. `data`, `system`等原来的物理分区, 现在都被放到一个共同的`super`分区下. 这种"虚拟分区"只在用户空间(Android系统里)可见, 也就是说原版fastboot只能识别到整个`super`, 而`super`里的`data`这些却不行.

所以fastbootd 就是动态分区手机的 fastboot(指非动态分区手机的).

![a5nZlt.png](https://s1.328888.xyz/2022/08/13/TGOJ6.png)

[What is FastbootD? How to Boot to FastbootD Mode - DroidWin](https://www.droidwin.com/fastbootd-mode/)

**ADB Android 调试桥 (ADB)**

Android 调试桥 (ADB) 可让您将开发工作站直接连接到 Android 设备进行通信，以便安装软件包并评估更改。

![adb](https://oss-emcsprod-public.modb.pro/wechatSpider/modb_20220420_bc3dbe04-c08f-11ec-8f56-fa163eb4f6be.png)


了解更多：https://source.android.com/docs/setup/build/adb


