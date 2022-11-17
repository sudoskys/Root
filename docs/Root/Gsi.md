# Gsi 通用系统镜像

- 一台 Root 的安卓 ？ 以上的手机
- 一双手
- 电脑

本节适合有刷机经验的同学。[^48]

如果在酷安，XDA等论坛翻了半天，却发现只有原厂救砖包，说明你的机型可能过于冷门，以至于没有开发者愿意专门为这个机型做刷机包，可以试一下 通用系统镜像。(见术语解释)

[^46]

[^47]

[^49]


## 备份 Persist

Persist 分区中储存了诸如指纹模块等的校准信息，这些信息每部设备都是不同的，如果你是已经 Root 的设备，建议备份一份，以备不时之需。如果你还没有Root,可以按照线刷教程先修补boot再刷入取得权限。

具体操作如下。
```
adb shell
su # 获取 root 权限，请在手机上确认
dd if=/dev/block/bootdevice/by-name/persist of=/sdcard/persist.img
# 此时按两次 Ctrl + D，退出 adb shell
adb pull /sdcard/persist.img
```

**长期保存，避免丢失**


## 支持查询

首先，你需要确认设备是否支持project treble，下载并打开[treble check](https://play.google.com/store/apps/details?id=com.kevintresuelo.treble)

**只有 Project Treble 通过检测，此手机才可以刷 gsi 镜像包。**

如果 Seamless System Updates 结果显示 A/B 即表明你应该选择的通刷包后缀名为 A/B 或者 AB ，若显示 A only，即表明你应该选择的通刷包后缀名为 A 或者 A only。但是如果最下面的 system-as-root 显示 支持，那么不管你的设备是否支持ab分区，都必须刷入标注为ab的包。


## Cpu 架构

将手机链接电脑，在 shell 进入 adb 环境，接着上网查找你所使用手机的 Cpu 架构或者输入指令：

```
adb shell getprop ro.product.cpu.abi
```

如过架构是`arm64-v8a`，那么你应该去找 ARM64 的包，如果是`armeabi-v7a`，那么你应该去寻找 ARM32 的包。

a-only和a/b的gsi不通用。


## 寻找镜像

查阅 [通用镜像列表](https://github.com/phhusson/treble_experimentations/wiki/Generic-System-Image-%28GSI%29-list)，也可以去 XDA 论坛或者问一下刷机群里的人。

??? help "啊不想动怎么办"
    呃.... 如果不会找的话，推荐换个流行的手机（？）或者（￥-5）请人找吧～

!!! tip
    在XDA查找gsi包，需要查看最前面的标签是`gsi`，`Treble`或`Project Treble`，而不是 `rom`

    一般`gsi`的格式是：`系统名 系统版本 编译日期 作者 CPU架构 分区类型 官方与否`
    其中后面带有`gapps`字样的刷机包，表明其内置了谷歌服务。


## 刷入镜像

主要任务是刷写 system 分区，所以 fastboot 和 twrp 都可以做到。刷入 GSI 前，可以先刷入 Magisk，便于之后的操作。[^49]

!!! danger

    刷写Gsi 双清擦除用户数据（data和cache）

    Data 分区的强制加密要关掉

    刷 GSI 之前先刷底包，使用官方稳定ROM作为底包，不要使用开发版和任何官改版
    
    需要刷入同等级的gsi

    应该进入 fastboot 使用 fastboot 指令刷，如果有 第三方rec 就下专包卡刷

### 停用AVB验证

**刷入vbmeta.img停用AVB验证**

Android 10引入了 启动时验证 (AVB)，在刷写 GSI之前，需要先下载并刷入 vbmeta.img 以停用 AVB，vbmeta.img一般包含会随gsi镜像一起发布。

如果你是安卓 10 以上，请刷入从底包中提取的vbmeta文件，防止无法进入系统。

```
fastboot --disable-verification flash vbmeta vbmeta.img
```

!!! info
    此步骤用于停用 Verified Boot 分区验证，只需执行一次
    如果已经安装了 Magisk，可以跳过本步骤，但未来要一直安装着 Magisk，否则 system 分区通不过校验可能会被禁用，需要重刷

### 还原原厂Recovery

请确保你的设备正在使用的是**原厂的rec**，目的是可以启动 `fastbootd` (一些twrp会阻止它...见[这里](https://forum.xda-developers.com/t/fastboot-flash-system-partition-not-found.3992977/#post-84653227))。

或者使用 twrp 里的 用户空间`fastboot` 也可以，如果twrp有这个功能可以不用刷回 recovery。

??? tip "刷写system分区，关于Twrp问题"

    [官方文档](https://source.android.com/docs/core/bootloader/fastbootd?hl=zh-cn)

    为支持 fastbootd，引导加载程序必须实现一个新的启动控制块 (BCB) 命令：boot-fastboot。如需进入 fastbootd 模式，引导加载程序应将 boot-fastboot 写入 BCB 消息的命令字段，并保持 BCB 的 recovery 字段不变（以重启中断的恢复任务）。status、stage 和 reserved 字段也保持不变。引导加载程序在 BCB 命令字段中发现 boot-fastboot 时，会加载并启动到恢复映像。然后，recovery 会解析 BCB 消息并切换到 fastbootd 模式。
   
    在使用fastbootd的设备上，如果twrp支持 用户空间`fastboot` 可以不用刷回 recovery，但是如果不支持就会发生以下类似报错：
    ```
    fastboot flash system system-arm64-ab-vanilla.img 
    Sending sparse 'system' 1/3 (676429 KB)            OKAY [ 22.9843s]
    Writing sparse 'system' 1/3                        FAILED (remote: 'Partition not found')
    Finished. Total time: 23.050s
    ```
    **但是现在一般都会支持 Fastbootd，所以一般没什么要担心的**


然后，将手机重启至`fastbootd`模式（`fastboot reboot fastboot`）

### 刷写

对于A-only,输入`fastboot flash system system.img`

对于A/B，输入
```shell
fastboot flash system_a GSI.img
fastboot flash system_b GSI.img
```

**具体操作注意看你下载的包的说明。**

刷写完成后，使用`fastboot -w`清除数据，这一步会格式化data注意提前备份）。

在具有较小系统分区的 Android 10 或更高版本设备上，刷写 GSI 时可能会出现以下错误消息

```
    Resizing 'system_a'    FAILED (remote: 'Not enough space to resize partition')
    fastboot: error: Command failed
```

如果出现这种情况，你可以使用以下命令删除产品分区并为系统分区释放空间。这可以为刷写 GSI 提供额外的空间：

```shell
fastboot delete-logical-partition product_a
```

后缀 _a 应与 system 分区的槽位 ID 匹配，例如本示例中的 system_a。

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


## 动态分区

Android10开始引入了动态分区（Dynamic Partitions），把原来的system , vendor , product还有odm分区整合到了一起。

如果你想简单点或者不想向下看，可以使用 https://github.com/VegaBobo/DSU-Sideloader


### 使用动态系统更新（DSU)

[官方文档](https://source.android.google.cn/docs/core/ota/dynamic-system-updates?hl=zh-cn)

安卓10正式版及以上，可以在开发者选项中Feature flags > settings_dynamic_system 中启用该功能。国内系统UI大多隐藏了，可以尝试用下面的adb 命令开启.

```
adb shell setprop persist.sys.fflag.override.settings_dynamic_system true
```


### 安装前的准备

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


### 安装操作

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


### 系统升级

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


### SafetyNet[^49]

SafetyNet 的修复根据不同 ROM 分成几种情况.

**PixelExperience ROM** 已经模拟了设备信息，只需在 Magisk DenyList 对 Play Services 隐藏即可。

**Lineage OS** 可能由于自带了 `su`，我没能成功通过 Basic integrity 测试（可能要自己修改 ROM 了）。

**Android 13 GSI** 需要 [MagiskHidePropsConf](https://github.com/Magisk-Modules-Repo/MagiskHidePropsConf) + [Universal SafetyNet Fix](https://github.com/kdrag0n/safetynet-fix) + Magisk DenyList，其中 MagiskHidePropsConf 设置成 MIUI 系统的 fingerprint，外加将 `ro.build.version.security_patch` 设置成 MIUI 系统对应版本的值（可以用 7z 打开线刷包的 `system.img`，在 `system/build.props` 里找到）。

**Magisk DenyList 配置方法**

1.  打开 Magisk，设置里选择 Hide the Magisk app
2.  打开 Magisk，设置里启用 Zygisk 及 Enforce DenyList
3.  进入 Configure DenyList，找到 Google Play services，只需勾选 `com.google.android.gms` 及 `com.google.android.gms.unstable` 两项。
4.  进入设置，清除 Google Play services 及 Google Play Store 的数据。


### DRM[^49]

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


