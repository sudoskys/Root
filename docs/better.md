

因为在Google加强安全性之前，SuperSU 一直有效，直到 Android Marshmallow 出现。修改系统分区会向尝试检测根目录的应用发送红色标记。

Google SafetyNet是一个用于监视系统的API，如果检测到篡改，它将阻止某些应用程序运行。您不能将Google Pay或Netflix与SuperSU一起使用。修改系统后，用户不会获得任何 OTA（Over The Air Updates， 无线下载 ）更新 。

所以现在，只讲 Magisk

## **升级系统时 Magisk 的保留**


安装了 Magisk 后记得关掉系统的自动更新。有更新的时候，写点卸载 Magisk > 还原原厂镜像，不重启。就能正常进行 OTA。A/B 分区的设备可以保留 Magisk 更新。 

如果没有第三方rec的情况下，有两种办法[^23]

1. 如果你是vab机型，不知道你是不是vab机型的话，去面具里面点安装，看看有没有安装到未使用槽位的选项，有就是vab机型，没有则不是，vab机型接着往下看

2. 点击系统更新，在下载完升级包以后，不要立马点安装或者重启，这个时候打开面具，关闭所有模块，点安装到未使用槽位，安装好以后提示你重启不要去点，打开系统更新，点重启或者安装，重启手机即可成功

再说说有第三方rec的方法

1. twrp为例，下载全量升级包，先关闭所有模块，去rec设置里面勾选升级后重装twrp，升级后用Magisk修补boot等选项，点安装，选择升级包以后把这三个勾都打勾升级即可开机拥有权限（所有需要打勾的参考下图）有些机型可能无法直接去修补，自行测试吧，有一定风险损失数据，如果不愿意冒险就选择另一种方法

2. 也可以只勾选重装twrp，升级好了之后再刷入面具的卡刷包就好了，有些twrp自带面具的，直接去高级里面安装Magisk就可以了。


目前各大品牌的旗舰手机均采用A/B架构（即同时有两套系统共存、其中一个作为备份、共用一份用户数据）。这就为我们升级系统提供了极大的便利。当我们安装更新后，在重启手机以前，新的系统将作为备份系统存在，这时我们可以利用现有系统仍保留的root权限修改备份系统的分区，刷入 Magisk 。




不支持的话，只能按[这篇文章](https://sspai.com/post/53075)的方法 OTA 之后重新刷一次 Magisk。

[文章：AB分区保留面具升级系统](https://mi.fiime.cn/Dtech/65.html)

### **具体步骤**

关闭系统自动更新。设置-系统-开发者选项。

下载更新并安装更新。此时会提示检测到root需要下载全量包，为正常现象。

!!! warning
    待其安装好后，千万不要重启，否则你Magisk就没了，又得重装一遍。

这时候打开Magisk Manager。卸载-还原原厂镜像。安装-安装-安装到未使用的槽位（OTA后）。

接着按提示重启即可。重启完成后系统应该是新系统，Magisk应该还在。

[Redmi K50 ROOT刷Magisk（面具）教程](https://zhuanlan.zhihu.com/p/507103088)



## 突发救砖

---

1. 刷机包与手机自带的BOOT版本不匹配，这个时候只需要从ROM包里提取boot.img文件单刷，然后再重新刷机就好了。
2. 刷完后卡在第一屏或重启，可以进 RECOVERY 里面，双WIPE (**清除手机数据) 之后再刷机就可以解决问题**，一些ROM包会提示不用WIPE，但如果你出现上述情况，也可以双WIPE试试。
3. 如果你实在不行了，那么准备好保存好的原始 boot.img 和 vbmeta.img 刷入。

!!! note
    因为未知原因导致安装失败也不要怕，操作中你应该保留了一份原来的镜像，按照最后一步的方法将原来的镜像重新刷回去就能正常开机。**

### 防护策略

- 安装 MM管理器 或 自动神仙救砖 插件
- 备份 Root 后的系统

移除模块重新开机

而如果你因为安装了未知模块而翻车无法顺利进入系统，请先冷静下来：解决此类问题有一个万能的命令`adb wait-for-device shell magisk --remove-modules`，此条指令将会在手机启动过程中生效。

### **MTK恢复**

如果移除模块仍然无法开机，刷入系统备份（上文MTK提到了）。

自救命令，使用mtkclient写入备份的镜像
`python mtk wl out`



## 系统分区解锁

现在几乎所有手机都不能动 system.

需要安装模块才能修改 system.




## 小米刷原生

刷机有风险 如果不会刷还请不要刷

### 刷底包

首先要解锁手机BL锁 。

解锁完下载MIUI系统底包 必须要和类原生安卓版本一样 安卓9=安卓9 安卓10=安卓10请前往官网或者mi.fiime.cn下载相对应的系统底包，然后参考上面的教程刷第三方REC。

刷完第三方rec会自动进入 进去之后把下载好的底包移动到手机里面进入清除 把按钮滑到右边 双清完再刷系统点击安装 选择下载好的底包 有个滑动按钮 滑到右边就开始刷了 记住 钩子不要勾

### 通用教程

刷完底包后请不要清除任何东西

请直接刷完底包接着刷原生ROM包

刷完，返回主页面 。

进入清除 格式化Data分区 。输入yes 三清就可以重启手机了。

**注意:如果不格式化DATA可能导致卡开机动画且无法连接电脑读盘**

三清:Dalvik/ART CacheCacheData刷机前基本上必选三清！目的是新系统的兼容性达到最佳。

进入系统如果有谷歌验证的话 过不了，建议格frp锁。

[如何跳过Google开机设置/验证/向导](https://atmb.top/guide/advanced/jump_google/)

> 或者刷入[https://mi.fiime.cn](https://mi.fiime.cn/) 的跳过包？
> 


💡 第三方rec需要选择和安卓版本一样的包如果无限重启REC 请尝试刷入一次



## 隐藏 Root


!!! warning
    Riru 已经停止维护，所以本节只讲 Zygisk



****ROOT目前主流的检测方法****

1、检查常用目录是否存在su

2、使用which命令查看是否存在su

3、主动申请root权限

4、执行busybox

5、访问私有目录，如/data目录，查看读写权限

6、读取build.prop中关键属性，如ro.build.tags和ro.build.type

7、检查市面主流的模拟器

8、检测frida、xposed等Hook框架的特征

!!! tip "注意"
    本节内容部分都是 @MiaoHan 的 酷安专栏内容。


### 开启 Zygisk 的面具

如果你现在用的阿尔法(Alpha)版面具，开了 MagiskHide 功能，要先关闭 MagiskHide 功能，然后开启Zygisk才能用本期教程的方案。(Hide不是过时了吗？)

**不管哪一个版本，只开启Zygisk，不要开启遵守排除列表！**

开启Zygisk后要重启手机，Zygisk才能生效。


**如果**你每次打开面具，它都会提示“检测到不属于Magisk的su文件”，对于这种情况，你一定要安装一个名为“隐藏系统root”的面具模块，文件包里有，或者删除system\xbin目录下一个名为“su”的文件。我建议你安装模块，不建议你删除su文件。因为个别系统System只读，删不掉此文件。个别系统删掉开机也会自动恢复。

!!! danger
    **如果没提示这个，不要试图安装“隐藏系统root”模块。**

刷了这个“隐藏系统root”模块，会导致Momo提示找到Magisk，但是影响不大，更不会影响隐藏root。我个人建议，如果不是强迫症，建议不要在意这个了。如果你是MIUI开发版系统，比较在意Momo的提示，想让Momo不提示找到Magisk，那么你需要重刷一遍当前开发版系统(重刷系统这一步是为了关闭系统自带的root)。重刷完不要打开系统自带的root，不能用面具接管系统root的方式刷面具，你应该用第三方recovery或者修补boot的方式刷入面具。

### 面具随机包名

面具设置里，找到“隐藏Magisk应用”选项点开，会跳出一个对话框。这个对话框里已经有默认名称“Settings”，你可以把它删掉并输入你喜欢的名字。比如我输入MiaoHan，点确定就不用管它了，它最后会自动跳转到新生成的面具界面里。期间无论跳转什么界面，你只需要点确定或者允许就行了。面具随机包名成功后，会看到原来的面具消失，桌面出现新生成的面具“MiaoHan”。如果随机包名失败或者“隐藏Magisk应用”一直转圈圈，那么你需要使用代理隧道。

!!! help
    如果面具随机包名后，出现 “ 还原Magisk 应用”的提示，重启一下手机就好了。**不用点安装，只需重启一遍手机。**

### SHamiko

一个面具模块，可以在面具开启Zygisk的情况下，实现类似于MagiskHide的隐藏root效果，可以对应用隐藏Magisk、Zygisk本身和二进制文件“su”。你可以把它简单理解为，就是隐藏root的模块。


### 安装 Momo APP检查情况

打开面具，右上角点击齿轮进入面具设置界面。在面具设置界面下滑找到配置排除列表选项，点配置排除列表选项进入排除列表界面。在“Shamiko”模块的加持下，理论上你在排除列表勾选哪个应用，哪个应用就检测不到root。

建议在面具排除列表勾选应用(即对应用隐藏root)后，最好检查一下应用是否在后台运行。如果是在后台运行，你最好结束一下，再打开应用。如果不是在后台运行，你就可以直接打开应用。**注意彻底结束进程**

当面具排除列表勾选Momo后，打开Momo可以看到Momo已经不再提示找到可执行程序“su”、Magisk、Zygisk，说明“Shamiko”模块配合面具排除列表隐藏root是有效的。接下来我们如法炮制，在排除列表勾选那些检测到root后无法运行或者闪退的应用，比如银行类、金融类、游戏类应用。这样它们就检测不到root，也就可以正常运行了。


### 用排除列表对 ZFB 隐藏root

玩机的朋友可能会知道，当root后ZFB可能会无法刷脸，归根结底还是因为ZFB检测到了root。我们需要对ZFB隐藏root，相关步骤如下：

进入面具排除列表，然后右上角搜索找到ZFB，点击ZFB图标把它展开如图四，这里面显示的一条条都是ZFB的进程。当我们勾选ZFB的所有进程，ZFB就检测不到root了，也就是对ZFB隐藏root了。不用一个个点，展开后点ZFB右边的方框即可全部勾选这些进程。把这些进程全部勾选后，如图六，可以看到ZFB上面的进度条全满。这个进度条表示里面的进程有没有全部勾选，如果没有全部勾选，进度条就不会全满。就像图七图八进度条不全满，里面的进程就没有全部勾选，这样是不行的。必须全部勾选里面的进程，才能完全隐藏root。

非必需操作：排除列表勾选完ZFB后，退出面具。然后长按桌面的ZFB图标，ZFB图标上会出现“应用信息”四个字，点“应用信息”进入“应用信息”界面。如果你是显示图一那样，你就直接去打开ZFB，也不用点“结束运行”。如果你是显示图二那样，就点一下“结束运行”，然后再去打开ZFB。

好了，不出意外的话，当排除列表勾选ZFB后，打开ZFB就会发现刷脸功能又可以使用了。

### 排除列表对手机管家隐藏root(MIUI系统专属)

如果你是MIUI系统的用户，对ZFB或者薇信以及其他金融类应用隐藏root后，用它们ZF时可能会弹出以下提醒。

当看到以上提醒，一些朋友可能会觉得，你这方案不行啊。SHamiko模块生效了，也在排除列表勾选了ZFB所有进程，居然还会提示手机已被root。其实这真不是ZFB检测到了root，而是MIUI系统的系统应用“手机管家”检测到了root，发出的弹窗提醒。至于为什么会弹窗这个，因为你排除列表没勾选手机管家啊！

进入面具排除列表，然后右上角搜索手机管家，大概率都会搜索不到，主要是方法不对，以下教大家查找手机管家的正确方法。

![Untitled](https://s1.328888.xyz/2022/08/13/TGDNR.png)



??? help "**Momo提示找到Magisk解决方法**"

    安装了“Shamiko”模块，并且“Shamiko”模块也生效了(显示笑脸)，排除列表也勾选了Momo的所有进程，打开Momo还是提示找到Magisk。
    
    **解决方法**
    (1)去面具模块界面，检查有没有安装“隐藏系统root”模块。如果是安装了“隐藏系统root”模块，那就不要解决Momo提示找到Magisk了。因为就是这个模块，导致Momo提示找到Magisk。但是你又不能停用这个模块，停用它你就更加隐藏不了root。

    关于“隐藏系统root”这个模块的作用，我发现许多人对这个模块的作用存在很大误解。

    如果你每次打开面具时，它都会提示“检测到不属于Magisk的su文件”，那么你需要安装这个“隐藏系统root”模块，如果你打开面具没提示这个，就不能安装也不要安装。

    (2)去面具模块界面，检查有没有安装“隐藏系统root”模块。如果没安装这个模块，那说明是其他模块导致Momo提示找到Magisk。

    怎么排查是哪个面具模块引起Momo找到Magisk呢？我建议停用除“SHamiko”以外的所有模块，即“SHamiko”模块你不要停用，其余模块全部停用。PS:停用的面具模块，主要包括字体模块、桌面模块、调节音质、优化触控、停用温控、开启高刷、调整扬声器马达、开启快充等等这一类优化模块。

    停用后重启手机打开Momo再看看，如果停用面具模块解决了Momo找到Magisk的问题，那么我建议大家重新启用面具模块时，一个一个或者两个两个来启用。每启用一个或者两个，就重启下手机打开Momo再看看。直到Momo再次提示找到Magisk，就可以知道是哪个模块引起的了。知道是哪个模块引起的，就把哪个模块移除不用就行了。


??? help "**Momo提示找到二进制文件“su”解决方法**"

    安装了“Shamiko”模块，并且“Shamiko”模块也生效了(显示笑脸)，排除列表也勾选了Momo的所有进程，特定用户也安装了“隐藏系统root”模块，打开Momo还是提示找到二进制文件“su”。
    
    
    **解决方法**
    我建议停用除“SHamiko”以外的所有模块，即“SHamiko”模块你不要停用，剩余模块全部停用。如果你是安装了“隐藏系统root”模块的特定用户，那么你就停用除“隐藏系统root、SHamiko”以外的所有模块。即这两个SHamiko模块和隐藏系统root模块你不要停用，剩余模块全部停用。

    停用后重启手机打开Momo再看看，如果停用面具模块解决了Momo找到二进制文件“su”的问题，那么我建议大家重新启用面具模块时，一个一个或者两个两个来启用。每启用一个或者两个，就重启下手机打开Momo再看看。直到Momo再次提示找到二进制文件“su”，就可以知道是哪个模块引起的了。知道是哪个模块引起的，就把哪个模块移除不用就行了。

??? help "**Momo提示找到Zygisk的解决方法**"

    安装了“Shamiko”模块，并且“Shamiko”模块也生效了(显示笑脸)，排除列表也勾选了Momo的所有进程，打开Momo还是提示找到Zygisk。
    
    **解决方法**
    如果你隐藏应用列表的生效应用里选择了Momo，那么你应该取消对Momo的隐藏。Momo不会检测应用列表，你对Momo隐藏应用列表反而会导致Momo检测到Zygisk。

     如果隐藏应用列表生效应用里没选择Momo，Momo还是提示发现Zygisk。那么一般可能是因为面具版本太低或者Shamiko版本太低，总之发现Zygisk这个不太好解决。有时候你升级Momo版本，(升级后的Momo)就有可能发现Zygisk；或者你升级面具版本，也有可能导致Momo发现Zygisk。

     >0.5.2版本的Shamiko模块是配合25.1以上版本的面具，才能对Momo隐藏Zygisk。想让Momo检测不到Zygisk，你可以升级面具版本到最新25.2。
     
     启用“Shamiko”白名单模式后，你手机里安装的所有应用(也包括系统应用)都检测不到root了。你不用再像第(一)期教程中的那样，想对哪个应用隐藏root，还必须得在面具排除列表勾选哪个应用才行。启用白名单模式后，你可以跟排除列表繁琐的勾选步骤说再见了，不用再去配置排除列表了。

??? help "还不行？停用部分面具模块"

    适用场景：
    也安装了“Shamiko”模块，并且“Shamiko”模块也生效了(显示笑脸)，排除列表也勾选了Momo的所有进程，打开Momo还是提示找到Magisk，或者找到二进制文件“su”，或者找到Zygisk。进而打开银行类金融类游戏类应用提示root无法运行，或者功能不正常。

    原因分析：这种情况不是因为“Shamiko”模块失效了，而是你们装了太多系统优化类面具模块。部分系统优化类面具模块，让你们手机不再纯净，破坏了系统的完整性，让设备处于被修改的状态。进而导致“Shamiko”模块隐藏失效，Momo从而找到以下三个提示。而我从来不用系统优化类面具模块，只用寥寥可数的几个模块(还不是系统优化类)，所以可以很容易的过掉Momo以下三个提示。


### **“Shamiko”白名单模式**

**需要注意的事项**

既然SHamiko白名单模式比黑名单模式有优势，那是不是可以不加分辨的启用白名单模式呢？还真不是这样的，在决定使用白名单模式前，我建议你知道一些注意事项：

⑴白名单模式存在一些较为严重的Bug

部分机型启用“Shamiko”白名单模式后，打开一些应用会闪退，并且部分应用自带的浏览器打不开网页。还有就是，开启白名单模式会造成手机性能的损耗，不过这点感知不强。

⑵新安装应用无法获取root权限

有些酷友不明白这句话的意思，我给大家详细解释一下：首先打开面具，进入超级用户界面，可以看到你授权过root的应用。当你启用“Shamiko”白名单模式后，也只有超级用户界面的应用能获取root了。你新安装的(需要root的)应用，以及你之前你没打开过(需要root)的应用，都获取不了root。我举个例子：比如你启用“Shamiko”白名单模式后，安装搞机助手(搞机助手需要root才能运行)，那么搞机助手就会获取不了root，进而无法运行。

**“Shamiko”白名单模式的隐藏root方案**

> 面具启用随机包名+开启Zygisk+遵守排除列表(不能开)+安装“SHamiko”模块+启用“Shamiko”白名单模式+安装“隐藏系统root”模块(特定用户安装)→若无效→停用或移除部分面具模块
> 

“ Shamiko”白名单模式跟黑名单模式一样，也需要关闭遵守排除列表，“Shamiko”模块才能生效。

关于特定用户的安装“隐藏系统root”模块还是得再讲一下。如果你每次打开面具，它都会提示“检测到不属于Magisk的su文件”，那么你一定要安装一个名叫“隐藏系统root”的面具模块。如果没提示这个，你不能安装，也没必要安装。

PS：这个“隐藏系统root”模块文件包里就有，下载后在面具里刷入即可。刷完记得重启手机

**启用“SHamiko”白名单模式的方法**

既然要启用“Shamiko”白名单模式，首先要学会判断当前“Shamiko”模块是处于哪种模式？如何判断呢？我们要看“Shamiko”的模块描述。首先我们打开面具进入模块界面，可以看到“Shamiko”笑脸正在工作。如果“Shamiko”的模块描述里显示的是“blacklist mode”，说明“Shamiko”处于黑名单模式，正在以黑名单模式运行；如果“Shamiko”的模块描述里显示的是“whitelist mode”，说明“Shamiko”处于白名单模式，正在以白名单模式运行。

正常情况下，你的“Shamiko”模块描述里都应该显示“blacklist mode”，因为这是“Shamiko”模块的默认工作方式。

**如何切换为“Shamiko”白名单模式呢？**

有以下两种方法：

⑴安装一个名叫“Shamiko”的软件

这是个APP应用，我置顶评论的链接里就有下载。这是咱们酷安某位大佬开发的软件，我不知道是哪个大佬开发的，如果有知道的兄弟麻烦告诉我下。这个软件可以一键开启和关闭“Shamiko”黑名单模式，非常的方便，使用方法也很简单。

首先确保“Shamiko”模块处于黑名单模式，然后下载和安装这个“Shamiko”软件。安装后打开，会有超级用户弹窗提示“Shamiko”软件要申请root权限，你点允许。给完“Shamiko”软件root权限后，打开中间那个“whitelist mode”选项，“Shamiko”模块就切换为白名单模式了。这时你进面具里，就会发现“Shamiko”模块已经处于“whitelist mode(白名单模式)”了，甚至不用重启手机，立即生效。切换回“blacklist mode(黑名单模式)”也很简单，关闭“whitelist mode”选项就行了。切换回也是不用重启手机，立即生效。

PS：无论“Shamiko”模块是从黑名单模式切换为白名单模式，还是从白名单模式切换回黑名单模式。用这个“Shamiko”软件切换后无论关机还是重启，都会一直有效哦。还有这个“Shamiko”软件也不用保持后台运行，用完你可以在最近任务卡片里划掉它。

⑵用MT管理器新建“whitelist”空文件

首先确保“Shamiko”模块处于黑名单模式，打开MT管理器，点左上角三条横杠，进根目录。此时MT管理器若申请root权限你要点允许，否则无法访问根目录下的文件夹。给MT管理器root权限后，按/data/adb/shamiko的路径点进去， 在shamiko文件夹里建一个名为whitelist文件。文件名不好记，大家复制粘贴就好了。当文件建完也不用重启，“Shamiko”就启用了“whitelist mode(白名单模式)”。切换回“blacklist mode(黑名单模式)”也很简单，用MT管理器删除whitelist文件就行了。切换回也是不用重启手机，立即生效。

PS：大家还记得我这篇教程第二部分讲的内容吗？当你开启“Shamiko”白名单模式后，你新安装的(需要root的)应用，以及你之前你没打开过(需要root)的应用，都获取不了root。当你现在“Shamiko”处于白名单模式，遇到新安装的应用申请不了root时，你可以先关闭白名单模式。关闭后白名单模式后，在黑名单模式下打开所需要root的应用，让它申请一遍root。然后再用“Shamiko”软件或者MT管理器打开“Shamiko”白名单模式。

**测试“Shamiko”白名单模式隐藏root效果**

当我们启用“Shamiko”模块白名单模式后，如何判断它有没有隐藏root的效果呢？还是需要用上我们强大的“Momo”APP了。PS：Momo是一个检测设备是否root的应用！如果打开Momo，Momo提示找到可执行程序“su”、Magisk、Zygisk说明检测到了root；如果打开Momo，Momo没有提示找到可执行程序“su”、Magisk、Zygisk说明隐藏root有效或者未root。

如果你是从“Shamiko”黑名单模式切换为白名单模式的，我建议先去排除列表取消对Momo的勾选，再打开Momo看看检测结果。因为这样做，有助于判断“Shamiko”白名单模式是否有效隐藏root。当你排除列表取消对Momo的勾选，再次打开Momo，Momo依旧没有提示找到可执行程序“su”、Magisk、Zygisk说明白名单模式隐藏root是有效的。

当确定“Shamiko”白名单模式隐藏root有效后，我们可以打开任何因为root打不开的银行类、金融类、游戏类应用。记住，你现在是白名单模式了，不需要用排除列表勾选了。若你切换回黑名单模式，一定要在排除列表勾选要隐藏root的应用。

**如果隐藏无效就停用面具模块**

适用场景：
也安装了“Shamiko”模块，并且“Shamiko”模块也生效了(显示笑脸)，模块描述里也显示的是“whitelist mode(白名单模式)”，打开Momo还是提示找到Magisk，或者找到二进制文件“su”，或者找到Zygisk。进而打开银行类金融类游戏类应用提示root无法运行，或者功能不正常。

原因分析：这种情况不是因为“Shamiko”模块白名单模式失效了，而是你们装了太多系统优化类面具模块。部分系统优化类面具模块，让你们手机不再纯净，破坏了系统的完整性，让设备处于被修改的状态。进而导致“Shamiko”模块隐藏失效，Momo从而找到以下三个提示。而我从来不用系统优化类面具模块，只用寥寥可数的几个模块(还不是系统优化类)，所以可以很容易的过掉Momo以下三个提示。


### 隐藏应用列表

隐藏应用列表完全没有隐藏root的作用。

银行类金融类游戏类应用，检测设备环境的优先级永远是先检测root，然后再检测应用列表或者不检测应用列表。大部分应用都不检测应用列表。

但是可以隐藏你的模块应用，隐藏 LSPosed 相关特征.

[^23]:保留root去更新系统 https://www.coolapk.com/feed/37647626

[^8]:**Root隐藏教程**：[图文分享 - 酷安 (coolapk.com)](https://www.coolapk.com/feed/37950576)

[^14]:****小米如何刷入第三方Recovery**** [https://zhuanlan.zhihu.com/p/428730333](https://zhuanlan.zhihu.com/p/428730333)