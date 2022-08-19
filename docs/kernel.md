 
 
本节为非必须部分，上手需要**一定的知识储备**，如果你**没事**或者**不清楚为什么搞内核**，可以看下一节。


!!! warning
    当你在执行时，因为每个人所使用的系统操作环境不同，很可能会出现不可控的奇怪报错，出现问题提问前请确保严格按照本教程操作。**提问要给出详细信息和测试结果，并参考首页的提问指南**


#### 看前须知

首先，你需要确认你的手机内核是**开源**的。如果不开源，那就不用继续看了。



### 为什么自定义系统内核

我们都知道,安卓使用 Linux 内核，但是系统内核的功能被严重阉割，导致有些东西(例如 Docker)跑不起来。

这时候，我们就需要构建自己的 Linux 内核，来补全这些功能，让我们需要的软件能正常运行。

修改内核能做到的当然不止如此，在安卓上，Linux 内核扮演的角色大致相当与电脑的 BIOS+系统内核，也就是说，你还可以通过修改内核来优化性能，甚至超频。不过这就是后话了。

本教程将以一加8t为例，从头开始构建一个支持 Docker 的内核。其他手机的步骤和这个基本相同。


### 准备

你可以去 [XDA开发者论坛(英文)](https://forum.xda-developers.com) 寻找你手机的内核源码，直接在论坛内搜索你的手机型号即可。这里的内核一般是经过大佬修改的第三方版，带有性能优化或额外功能。本人推荐去这里查找。

如果没有也别沮丧。可能只是还没人做而已。 一般来讲，小米几乎所有手机和一加所有手机的内核都是开源的。

小米开源内核目录[在这里](https://github.com/micode/xiaomi_kernel_opensource)，直接查找你手机的型号即可。

一加开源内核[在这里](https://github.com/orgs/oneplusoss/repositories)，对于初学者，在这个目录找到你手机对应的源码比较难，所以推荐直接谷歌 “一加xx内核源码”。

对于其他品牌，你可以试着谷歌 “你的手机型号+内核源码”。


!!! danger
    **注意内核应该和安卓版本对应**

!!! warning
    有些设备有多个版本的内核可用(例如红米Note7可用的版本有 `4.4`,`4.9`,`4.14`,`4.19`)，这些内核版本和 ROM 是对应的，刷入其他版本会导致**无法开机**，所以你应该记住你当前的内核     版本。

如果能找到(一般内核源码都是放在Github)，那么就可以继续了。


### 准备环境


编译 Linux 内核肯定是需要 Linux 的，目前有如下几种方法

- 实机安装一个 Linux 发行版(比如 Ubuntu)

- 使用 Windows 的 Linux 子系统v2(WSL2)安装一个Linux发行版(推荐 Ubuntu)

- 手机上 Chroot 安装一个 Linux 发行版(推荐 Ubuntu，至于安装，可以使用 [tmoe](https://github.com/2moe/tmoe) 项目)


除非迫不得已，否则我不建议你用手机编译来折磨自己。

如果电脑配置不大行，建议实机安装。

对于如何安装以上的系统不在本文主题内，如果你不懂，可以搜索一下。

本教程以 Ubuntu18.04 为例.

首先，我们要把软件源更换为国内镜像源，在终端输入以下命令:

```bash
sudo sed -i "s@http://.*archive.ubuntu.com@https://mirrors.tuna.tsinghua.edu.cn@g" /etc/apt/sources.list
sudo sed -i "s@http://.*security.ubuntu.com@https://mirrors.tuna.tsinghua.edu.cn@g" /etc/apt/sources.list
sudo apt update
```

以上命令会将软件源更换为清华大学源。然后我们开始安装依赖，在终端输入以下命令:

```bash
sudo apt install -y bc bison build-essential ccache cpio curl flex g++-multilib gcc-multilib git gnupg gperf imagemagick lib32ncurses5-dev lib32readline-dev lib32z1-dev liblz4-tool libncurses5-dev libsdl1.2-dev libssl-dev libwxgtk3.0-dev libxml2 libxml2-utils lzop pngcrush rsync schedtool squashfs-tools xsltproc zip zlib1g-
dev unzip openjdk-8-jdk language-pack-zh-hans python vim
```
在上述命令执行完后，我们需要下载编译器，这里使用clang。

```bash
cd ~ && git clone --depth=1 https://github.com/kdrag0n/proton-clang.git
```

!!! help
    如果克隆很慢，尝试把源地址中的`github.com`改成`hub.fastgit.xyz`。


下载完后，我们在终端输入`vi ~/.bashrc`打开编辑器，按下键盘上的 "Insert" 键，使用方向键滑到文件底部，加上以下代码：

```bash
export PATH="~/proton-clang/bin:$PATH"
export CROSS_COMPILE=aarch64-linux-gnu-
export CROSS_COMPILE_ARM32=arm-linux-gnueabi-
export ARCH=arm64
```

然后按下 “Esc” 键，输入`:wq!`保存退出。

接着输入以下命令 `source ~/.bashrc && clang --version`，它应该有大概长这样的输出(因人而异)：
```
Proton clang version 13.0.0 (https://github.com/llvm/llvm-project b4fd512c36ca344a3ff69350219e8b0a67e9472a)
Target: x86_64-unknown-linux-gnu
Thread model: posix
InstalledDir: /home/proton-clang/bin
```
如果没有，说明某一步操作有问题，你必须回头纠正。


### 准备配置并开始编译

现在环境已经准备好了，我们需要下载我们之前找到的内核源码。

[本教程作为示例所使用的内核源码在这里](https://github.com/flypatriot/crdroid_12_kernel "本教程作为示例所使用的内核源码在这里")

一般内核都使用 Git 源，我们应该通过这种方法下载：
```bash
git clone --depth=1 <源地址>
```
其中 `--depth=1` 表示浅克隆，即不克隆提交记录，因为 Linux 历史悠久，提交记录非常多(比如本教程的示例内核有86万多个提交)如果将他们克隆下来，将会非常慢，最后源码目录也会非常大。

!!! help
    如果克隆很慢，尝试把源地址中的`github.com`改成`hub.fastgit.xyz`。

克隆完成后，进入源码目录。

!!! warning
    本教程的 Docker 支持仅仅是一个例子。你需要在此步做出你想要的修改。

为了实现 Docker 支持，我们需要修改手机内核的默认配置。
进入 `arch/arm64/configs` 使用 `ls` 命令查看一下。一般会有几个文件，还有个`vendor`文件夹。
例：

```
march7th@march7th-pc:~/crdroid_12_kernel/arch/arm64/configs$ ls -al
total 392
drwxr-xr-x 1 march7th march7th    166 Aug 13 06:22 .
drwxr-xr-x 1 march7th march7th    178 Aug 13 05:25 ..
-rw-r--r-- 1 march7th march7th  16736 Aug 13 05:25 defconfig
-rw-r--r-- 1 march7th march7th  13173 Aug 13 05:25 gki_defconfig
-rw-r--r-- 1 march7th march7th 182835 Aug 13 06:22 nethunter_defconfig
-rw-r--r-- 1 march7th march7th 168683 Aug 13 05:25 op8-perf_defconfig
-rw-r--r-- 1 march7th march7th   7579 Aug 13 05:25 ranchu64_defconfig
drwxr-xr-x 1 march7th march7th    468 Aug 13 05:25 vendor
```

可以看到，有一个 `op8-perf_defconfig`。我们的示例手机是一加8T。所以这就是我们要找的默认配置。

!!! help
    如果`arch/arm64/configs`下没有你要的配置，不妨进入`vendor`文件夹一看。

使用文本编辑器打开该文件。在文件底部添加：

```
CONFIG_NAMESPACES=y
CONFIG_NET_NS=y
CONFIG_PID_NS=y
CONFIG_IPC_NS=y
CONFIG_UTS_NS=y
CONFIG_CGROUPS=y
CONFIG_CGROUP_CPUACCT=y
CONFIG_CGROUP_DEVICE=y
CONFIG_CGROUP_FREEZER=y
CONFIG_CGROUP_SCHED=y
CONFIG_CPUSETS=y
CONFIG_MEMCG=y
CONFIG_KEYS=y
CONFIG_VETH=y
CONFIG_BRIDGE=y
CONFIG_BRIDGE_NETFILTER=y
CONFIG_IP_NF_FILTER=y
CONFIG_IP_NF_TARGET_MASQUERADE=y
CONFIG_NETFILTER_XT_MATCH_ADDRTYPE=y
CONFIG_NETFILTER_XT_MATCH_CONNTRACK=y
CONFIG_NETFILTER_XT_MATCH_IPVS=y
CONFIG_NETFILTER_XT_MARK=y
CONFIG_IP_NF_NAT=y
CONFIG_NF_NAT=y
CONFIG_POSIX_MQUEUE=y
CONFIG_DEVPTS_MULTIPLE_INSTANCES=y
CONFIG_NF_NAT_IPV4=y
CONFIG_NF_NAT_NEEDED=y
CONFIG_OVERLAY_FS=y
```

然后保存退出，回到源码目录，执行：

```bash
make CC=clang AR=llvm-ar NM=llvm-nm STRIP=llvm-strip OBJCOPY=llvm-objcopy OBJDUMP=llvm-objdump O=out op8-perf_defconfig
```

加载默认配置。


此时我们已经可以开始编译。不过你可能还想修改一下别的，所以我们执行：
```bash
make CC=clang AR=llvm-ar NM=llvm-nm STRIP=llvm-strip OBJCOPY=llvm-objcopy OBJDUMP=llvm-objdump O=out  menuconfig
```


比如我们还想修改内核名，那我们需要修改这一项：
`General setup -> Local version - append to kernel release`
修改完后，直接 ”Esc“ 保存退出


然后我们开始编译，输入以下命令
```bash
make CC=clang AR=llvm-ar NM=llvm-nm STRIP=llvm-strip OBJCOPY=llvm-objcopy OBJDUMP=llvm-objdump O=out -j$(nproc)
```
`nproc`会输出你 CPU 的线程数，也就是这条命令会让你的系统火力全开。如果你不想让它火力全开，酌情把`$(nproc)`换成一个比你 CPU 的线程数小的数字。

然后便是等待。等他出现`Ready`字样时就说明你成功了。


### 打包并刷入内核


考虑到有些手机并没有可用的第三方 Recovery ，所以我们不使用 Anykernel3 ，而是通过修改boot镜像手动刷入。

终端输入以下命令下载工具：
```
curl https://forum.xda-developers.com/attachments/aik-linux-v3-8-all-tar-gz.5300923/ | tar xzvf -
```


然后我们需要从手机中提取 Boot 镜像，并将其传到电脑上的工具目录内。如何提取镜像在前面 Root 的环节已经提到。

接着:
```
./unpackimg.sh <Boot 镜像文件名>
```
工具目录下会出现一个`split_img`文件夹，其中的` <Boot 镜像文件名>-kernel`就是我们要替换的文件。

编译好的内核在源码目录`out/arch/arm64/boot`目录下。一般来说文件名带有`Image`字样，把它复制到这里，替换掉原来的文件。

然后：
```
./repackimg.sh
```

重新打包内核文件，然后刷入重启。你应该会看到内核变化了。大功告成。
