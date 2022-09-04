

这里列举几个常用的模块和相关刷入教程。

Magisk 模块仓库在很早就被官方移除，面具只能通过 zip 文件刷入模块，而 Lsposed 可以通过安装 APP 来启动模块（而不需要重启）。

## 模块仓库？

- https://magisk.suchenqaq.club/
- https://kamiui.ml/E52shuaji/

!!! danger
    安装模块必须审计模块脚本！如果你不会 sh ，那么请从可靠信源下载模块文件或者论坛提问求助/搜索。
    模块的文件地址`/sbin/.magisk/img`，如果你没有这个软链接，可以去 `/data/adb/modules` 查看。
    如果没有安装救砖模块，可以在 `cache` 目录下面建立一个 `disable_magisk` 文件，禁用掉进系统，进了系统再把插件         删了。
    


推荐先装一个救砖模块，这个模块自己搜索上面的仓库

## 模块安装方法


打开 模块 页面，点击 从本地ZIP安装 ，选择模块压缩包文件，然后等待刷入完毕。


## 装模块装砖了

[^40]

### 救砖模块

社区中有一种自动救砖模块可以使用。你可以在首页资源支持的某个仓库下载。

### ADB 保险


Magisk 从2019年其实施了一项故障保险，如果你的 Xposed 使用 Magisk（自从 Oreo 之后就没有使用 Xposed）它会起作用。


**如果启用了 adb 调试**

将不断重复开机的手机关机，用数据线链接手机电脑，打开 ADB 环境(前文已经叙述)

电脑端打开命令行窗口并执行  ``adb wait-for-device shell magisk --remove-modules``

长按电源键开机...


**如果没有启用 adb 调试**

刷入你 原有备份的 boot.img，启用 USB 调试，再刷入 magisk_patched_boot.img，然后运行命令。

这样就算 SystemUI 崩溃，运行这个命令也会删除所有模块。

!!! tip
    先执行再开机

!!! info
    如果你可以刷入 非 root 的 `boot.img` 并启用 USB 调试，就可以在 root 时修复软重启。
    如果在 adb 调试模式之前在引导期间卡住了.....通常这种问题比砖你的 Magisk 模块更严重。


### ADB 命令

打开 CMD 并输入 `adb shell`
    
切换到目录 `cd /data/adb/modules`
    
查找模块 `ls -Ral /data/adb/modules`
    
删除 magisk 模块 `rm -r /data/adb/modules/module_name`

>Adb安全验证被禁用时，所有设备都可以获得授权。

### Twrp

进`twrp`，删除`data/adb/modules`，里面是你的magisk模块。

## 模块什么东东？

面具模块的主要作用是修改系统文件和替换系统文件，但是又不是彻底修改，修改之后可以通过关闭或删除模块恢复原样。
下载好的Magisk模块，可以解压，查看文件结构.[25^]

通常模块安装程序是打包成zip文件的Magisk模块，可以在Magisk应用程序或第三方recovery(如TWRP)中进行刷入。安装程序的文件结构与Magisk模块的文件结构相同(请查看上一部分以获取更多信息)。最简单的Magisk模块安装程序只是一个打包为zip文件的Magisk模块，此外还包含以下文件：

```update-binary```  下载最新的[module_installer.sh](https://github.com/topjohnwu/Magisk/blob/master/scripts/module_installer.sh)并重命名/复制为```update-binary```

```updater-script```  此文件应仅包含字符串```#MAGISK```

默认情况下，`update-binary` 将检查/设置环境，加载使用的脚本，将模块安装程序的zip解压缩到将要安装模块的位置，最后执行一些琐碎的任务和清理工作，这些工作和清理应满足大多数简单模块的需求。


### BusyBox[^27]

Magisk附带了功能完整的BusyBox二进制文件(包括完全的SELinux支持)。可执行文件位于`/data/adb/magisk/busybox`。

Magisk的 BusyBox 支持运行时切换“ASH独立Shell模式”。这种独立模式意味着，当在BusyBox的灰壳中运行时，每个单独的命令将直接使用 BusyBox 中的 applet，而不管什么被设置为PATH。例如，像ls, rm, chmod这样的命令不会使用 PATH 中的内容(在Android的情况下，默认是`/system/bin/ls`， `/system/bin/rm`，和`/system/bin/chmod`)，而是直接调用内部的BusyBox小程序。这可以确保脚本始终运行在可预测的环境中，并且无论运行在哪个 Android 版本上都始终拥有完整的命令套件。要强制命令不使用BusyBox，您必须调用具有完整路径的可执行文件。

在 Magisk 上下文中运行的每个 shell 脚本都将在 BusyBox 的 `ash shell` 中执行，并启用独立模式。对于与第三方开发人员相关的内容，这包括所有引导脚本和模块安装脚本。

如果你想在 Magisk 以外的地方使用这个“独立模式”功能，有两种方法可以实现:

1. 准备环境变量 ASH_STANDALONE  1

例如: `ASH_STANDALONE=1 /data/adb/magisk/busybox sh <script>`

2. 使用命令行选项切换

`/data/adb/magisk/busybox sh -o standalone <script>`

为了确保所有随后执行的 sh shell 也在独立模式下运行，选项1是首选方法(Magisk 和 Magisk 应用程序内部使用的方法) ，因为环境变量被继承到子进程。


### 文件结构[^24]

```
module.zip
│
├── META-INF
│   └── com
│       └── google
│           └── android
│               ├── update-binary      <--- 你下载的module_installer.sh
│               └── updater-script     <--- 应该只包含字符串"#MAGISK"
│
├── customize.sh                       <--- (可选，稍后会有更多详细信息)
│                                           该脚本将通过update-binary来获取
├── ...
├── ...  /* 模块的其余文件 */
│
```


**module.prop**

```ini
id=Automatic_brick_rescue
name=自动神仙救砖-支持OTA稳定版-等待重启中
version=v210701
versionCode=35
author=奋斗的小青年（原作者 Han|情非得已c）
description=正在等待重启后，测试Magisk开机脚本是否正常执行，来判断自动神仙救砖是否支持您的机型。如果不支持你的机型名称将一直是：自动神仙救砖-等待重启中
updateJson=<url> (optional)
```

**id**：Magisk就是通过这个ID来识别模块，所以ID不能冲突。如果是相同的ID，最后刷入的模块则会替换你之前刷入的模块。发布后不应更改。

!!! tip "ID命名"
    ID的命名是有限制的，很多酷友模块卸载不了，还在模块界面显示问号，很难受。。。就是这个原因导致的。咱看一下magisk的说明:
    ID必须匹配这个正则表达式：^[a-zA-Z][a-zA-Z0-9\._-]+$。
    ✗ a module，✗ 1_module，✗ -a-module
    不要使用中文及中文字符，不然就会发生卸载不了的情况。如果卸载不了的，也可以手动到`/sbin/.magisk/img`文件夹找到相应模块删除。

**versionCode** 必须是一个 integer 整数，用于比较版本。

**updateJson**  应该指向一个 URL，该 URL 下载一个 JSON 来提供信息，以便 Magisk 应用程序可以更新模块

!!! tip
    确保使用 UNIX (LF) 换行类型，而不是 Windows (CR+LF) 或者 Macintosh (CR) .

**Json格式**

```json
{
    "version": string,
    "versionCode": int,
    "zipUrl": url,
    "changelog": url
}
```

### Shell脚本(*.sh)
请阅读启动脚本部分，了解`post-fs-data.sh`与`service.sh`之间的差异。对于大多数模块开发者，`service.sh`如果只需运行启动脚本那便足够了。

所有的模块脚本中，使用`MODDIR=${0%/*}`来获取模块的基本目录信息

!!! danger 
    千万不要在脚本中编码模块目录。

**system.prop**
该文件的格式与build.prop相同。每行包含```[key]=[value]```

**sepolicy.rule**

如果模块需要一些其他的sepolicy补丁，请将这些规则添加到此文件中。 模块安装程序脚本和Magisk的守护进程将确保将此文件复制到magiskinit，它可以读取预初始化的位置，以确保正确插入这些规则。

该文件中的每一行都将被视为策略声明。要详细了解策略声明的格式，请查看magiskpolicy的文档

**system文件夹**
您希望Magisk为您替换/插入的所有文件都应放在此文件夹中。请查看Magic挂载 部分，以了解Magisk如何挂载文件。


### 自定义

如果您需要自定义模块安装过程，则可以选择在安装程序中创建一个名为`customize.sh`的脚本。这个脚本会在所有文件以默认`permissions`和`secontext`应用后，由`update-binary`调用(不是执行！)。如果您的模块包含基于`ABI`的其他文件，或者您需要为某些文件(例如`/system/bin`中的文件)，设置特殊的`permissions/secontext`，这将非常有用。

如果您需要更多的自定义，并且希望自己做所有事情请在`customize.sh`中标注`SKIPUNZIP=1`以跳过提取操作并应用默认`permissions/secontext`。请注意，这样做后，你的`customize.sh`将负责自行安装所有内容。


**`customize.sh`的运行环境**

这个脚本将在启用了“独立模式”Magisk的BusyBox `ash` shell 中运行。为了方便起见，可以使用以下变量和shell函数:

**变量**

- `MAGISK_VER` (string): 当前安装的Magisk的版本字符串 (例如 v20.0)
- `MAGISK_VER_CODE` (int): 当前安装的Magisk的版本代码 (例如 20000)
- `BOOTMODE` (bool): 如果模块当前安装在Magisk Manager中，则为true
- `MODPATH` (path): 你的模块应该被安装到的路径
- `TMPDIR` (path): 一个你可以临时存储文件的路径
- `ZIPFILE` (path): 模块的安装包（zip）的路径
- `ARCH` (string): 设备的C​​PU构架。值可以是arm, arm64, x86, or x64
- `IS64BIT` (bool): 如果$ARCH(上方的ARCH变量)为 arm64或x64，则为true
- `API` (int): 设备的API级别(Android版本)(例如 21为Android 5.0)


可用函数

```
ui_print <msg>
    打印(print)<msg>到控制台
    避免使用'echo'，因为它不会显示在第三方的recovery的控制台中。

abort <msg>
    打印错误信息<msg>到控制台并终止安装
    避免使用'exit'，因为它会跳过终止的清理步骤

set_perm <文件名> <所有者> <用户组> <文件权限> [上下文]
    如果 [上下文] 没有设置，则默认为"u:object_r:system_file:s0"
    该函数是以下命令的简写:
       chown 所有者.用户组 文件名
       chmod 权限 文件名
       chcon 上下文 文件名

set_perm_recursive <目录> <所有者> <用户组> <目录权限> <文件权限> [上下文]
    如果 [上下文] 没有设置，则默认为"u:object_r:system_file:s0"
    对于<目录>中的所有文件，它将调用:
       set_perm 文件 所有者 用户组 文件权限 上下文
    对于<目录>中的所有目录(包括自身)，它将调用:
       set_perm 目录 所有者 用户组 目录权限 上下文
```


为了方便起见，还可以在变量名 `REPLACE` 中声明要替换的文件夹列表。

模块安装程序脚本将提取此变量并创建`.replace`文件进行替换。声明示例:

```ini
REPLACE="
/system/app/YouTube
/system/app/Bloatware
"
```

上面的列表将导致创建以下文件: `$MODPATH/system/app/YouTube/.replace和$MODPATH/system/app/Bloatware/.replace`

!!! tip
    使用`Magisk Manager`下载模块时，将使用最新的`module_installer.sh`强制替换`update-binary`，以确保所有安装程序都使用最新的脚本。不要试图在`update-binary`中添加任何自定义逻辑，毫无意义。
    由于历史原因，**请勿**在模块安装程序中添加名为`install.sh`的文件。该文件以前曾被使用过，将被区别对待。
    不要在`customize.sh`末尾使用`exit`。模块安装程序将会自行完成。

### 模块技巧

!!! note "**删除文件**"
  如何自动删除文件？实际使文件删除很复杂(可能，不值得付出努力)。用空文件替换它应该已经足够了！创建一个具有相同名称的空文件，并将其放置在模块内的相同路径中，它将用空文件替换你的目标文件。

!!! note "删除文件夹"
    与上述相同，实际上使文件夹删除是不值得的。用一个空文件夹替换它应该已经足够了！对于模块开发人员来说，一个方便的技巧是将要删除的文件夹添加到customize.sh中的REPLACE列表中。
    
    如果您的模块没有提供相应的文件夹，它将创建一个空文件夹，并自动将.replace添加到该空文件夹中，以便虚拟文件夹可以正确替换/system中的一个文件夹。

### 启动脚本

在Magisk中，您可以以两种不同的模式运行启动脚本: post-fs-data和late_start service模式

- post-fs-data 模式

该模式以`阻塞方式(BLOCKING)`运行。启动会直到所有进程加载完毕后或等待10秒后才继续进行,脚本在安装任何模块之前运行。
允许模块开发者在安装模块之前动态调整其模块。
*该模式在Zygote启动前执行（意味着所有进程已经加载完毕）*


!!! tip 
    仅在必要时在此模式下运行脚本！

- late_start service 模式

该模式以`非阻塞方式(NON-BLOCKING)`运行。此模式下Magisk将会与其他进程并行处理。

**推荐在该模式下运行大多数的脚本.**

在Magisk中，还有两种脚本: `通用脚本`和`模块脚本`.



**通用脚本特性**

- 脚本会被放在`/data/adb/post-fs-data.d或/data/adb/service.d`
- 脚本仅在脚本可执行时执​​行(执行权限， `chmod +x script.sh`)
- 脚本在`post-fs-data.d`中以`post-fs-data` 模式运行，在`service.d`中以`late_start service` 模式运行。
- 模块不应该添加一般脚本，因为它违反封装规则

**模块脚本特性**

- 脚本放置在模块的文件夹中
- 仅在启用了模块的情况下执行
- post-fs-data.sh在post-fs-data 模式下运行，service.sh在late_start service 模式下运行。
- 需要启动脚本的模块应仅使用模块脚本而不是常规脚本

这些脚本将在启用了“独立模式”Magisk的BusyBox ash shell中运行.

### 根目录覆盖系统

由于`/`在`system-as-root`设备上是只读的, 因此Magisk提供了一个覆盖系统，使开发人员可以替换根目录中的文件或添加新的`*.rc`脚本。此功能主要是为自定义内核开发人员设计的。

覆盖文件应放在boot镜像ramdisk的`overlay.d`文件夹中并遵循以下规则:

- `overlay.d`中所有的`*.rc`将在init.rc之后读取并链接
- 现有文件可以被位于相同相对路径的文件替换
- 与不存在的文件对应的文件将被忽略
- 为了在自定义`*.rc`脚本中引用其他文件, 请在`overlay.d/sbin`中添加其他文件。上面的3条规则不适用于此特定文件夹中的所有内容，因为它们将被直接复制到 Magisk 的内部tmpfs目录(该目录始终位于 `/sbin`)。

由于Android 11中的更改​​，不再保证`/sbin` 文件夹存在。这种情况下，Magisk会随机生成`tmpfs`文件夹。在你的`*.rc`脚本中所有的`${MAGISKTMP}`会在`magiskinit`注入到`init.rc`中时，被`Magisk tmpfs`文件夹替换。

**这也可以在Android 11之前的设备上使用**，因为在这种情况下`${MAGISKTMP}`将简单地被替换为`/sbin`，因此最佳实践是在引用其他文件时，不要在*.rc脚本中编码`/sbin`。

下面是一个如何使用自定义`*.rc`脚本设置`overlay.d`的示例:

```sh
ramdisk
│
├── overlay.d
│   ├── sbin
│   │   ├── libfoo.ko      <--- 这两个文件将被复制
│   │   └── myscript.sh    <--- 到Magisk的tmpfs目录
│   ├── custom.rc          <--- 该文件将被注入到init.rc中
│   ├── res
│   │   └── random.png     <--- 该文件将替换/res/random.png
│   └── new_file           <--- 该文件将被忽略，因为
│                               /new_file不存在
├── res
│   └── random.png         <--- 该文件将被替换为
│                               /overlay.d/res/random.png
├── ...
├── ...  /* 其余的initramfs文件 */
│
```

这是一个示例`custom.rc` 配置

```sh
# 使用${MAGISKTMP}引用Magisk的tmpfs目录

on early-init
    setprop sys.example.foo bar
    insmod ${MAGISKTMP}/libfoo.ko
    start myservice

service myservice ${MAGISKTMP}/myscript.sh
    oneshot
```

## 特典:ClashForMagisk

刷入此包即可:[Clash养老版,自带说明](https://t.me/nanie1/48)

[^24]:自制简易Magisk模块教程-辉少菌 https://www.coolapk1s.com/feed/16164846
[^25]:自制简易Magisk模块教程 https://www.coolapk1s.com/feed/37576170
[^27]:MagiskDeveloperGuides https://topjohnwu.github.io/Magisk/guides.html|https://e7kmbb.github.io/Magisk/guides.html
[^40]:[Guide Remove magisk modules without TWRP](https://forum.xda-developers.com/t/guide-remove-magisk-modules-without-twrp.3995677/)
