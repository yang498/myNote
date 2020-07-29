<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# git

## 介绍

1991~2002 年，Linux 内核开源项目有着为数众多的参与者。 但绝大多数的维护工作都花在了提交补丁和保存归档的繁琐事务上
2002 年，整个项目组开始启用一个专有的分布式版本控制系统 BitKeeper 来管理和维护代码
2005 年，开发 BitKeeper 的商业公司与 Linux 内核开源社区的合作关系结束，收回了 Linux 内核社区免费使用 BitKeeper 的权力
这就迫使 Linux 开源社区（特别是 Linus Torvalds）基于使用 BitKeeper 时的经验教训，开发出自己的版本系统 - Git

## 安装

在 [Git 官网](https://git-scm.com/downloads) 下载安装
这里使用命令行的形式，在项目目录中右键选择·Git Bash Here·，而会了命令行形式自然也理解了图形界面操作·Git GUI Here·

### 使用项目托管平台

在项目托管平台上建立账户，例如 GitHub、GitLab 等平台

### 用户信息设置

设置拥有的项目托管平台的用户名和邮件地址

··bash
git config --global user.name "<name>"
git config --global user.email "<email>"
··

然后可以查看账户信息

··bash
git config user.name
git config user.email
··

或查看账户全部信息

··bash
git config --list
··

## 创建项目

### 在项目托管平台创建

在项目托管平台上建立项目，然后点击 clone 按钮即可复制远程项目的 url

··bash
git clone <projectUrl>
··

然后项目就被克隆到本地了

### 将已有的项目托管

在项目托管平台上建立项目（最好和本地项目名称一致），然后点击 clone 按钮即可复制远程项目的 url

··bash
git init
git remote add origin <projectUrl>
git add .
git commit -m "初始化项目"
git push origin master
··

## 常用命令

### 概念

![800](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015120901.png)

!!
Workspace / Working：工作区（本地代码）
Index / Stage：暂存区（已 add）
Repository：本地仓库（已 commit）
Remote：远程仓库（例如 GitHub）
!!

### add

··bash
# 添加当前目录的所有文件到暂存区
git add .

# 添加指定文件到暂存区
git add <file1> <file2> ...

# 添加指定目录到暂存区
git add <dir>
··

### commit

··bash
# 提交暂存区到仓库区
git commit -m "<message>"

# 提交暂存区的指定文件到仓库区
git commit <file1> <file2> ... -m "<message>"

# 提交工作区直接到仓库区（不能提交新的文件）
git commit -am "<message>"

# 使用一次新的 commit 替代上一次，如果代码没变化相当于改写 "<message>"
git commit --amend -m "<message>"
··

### branch

··bash
# 列出所有本地分支
git branch

# 列出所有远程分支
git branch -r

# 列出所有本地分支和远程分支
git branch -a

# 新建一个分支，但依然停留在当前分支
git branch <branchName>

# 切换到指定分支，并更新工作区
git checkout <branchName>

# 新建一个分支，并切换到该分支
git checkout -b <branch>

# 切换到上一个分支
git checkout -

# 合并指定分支到当前分支
git merge <branch>

# 新建分支后 push 代码即可创建对应名称的远程分支

# 删除分支
git branch -d <branchName>

# 删除远程分支
git push <remote> --delete <branchName>
··

### pull / push

··bash
# 拉取远程仓库的变化，并与本地分支合并
git pull <remote> <branch>

# 上传本地指定分支到远程仓库
git push <remote> <branch>

# 强制推送当前分支到远程仓库，即使有冲突
git push <remote> --force
··

### checkout / reset

··bash
# 还原工作区到修改前（时机在 add 之前）
git checkout .

# 还原指定文件到修改前（时机在 add 之前）
git checkout <file>

# 将暂存区的文件移除，不改变工作区（时机在 add 之后）
git reset .

# 将暂存区指定的文件移除，不改变工作区（时机在 add 之后）
git reset <file>

# 重置暂存区与工作区，与上一次 commit 保持一致
git reset --hard

# 重置暂存区与工作区，与指定 commit 保持一致
git reset --hard <commit>
··

### stash

··bash
# 储存工作区并还原到修改前（通常用于切换到其他分支而不想提交）
git stash

# 查看储存记录
git stash list

# 将最近的一次储存还原到工作区
git stash apply

# 将最近的一次储存还原到工作区并删除此存储
git stash pop

# 删除指定的存储
git stash drop <stash@{n}>

# 删除所有存储
git stash clear
··

### tag

给历史中的某一个提交打上标签，以示重要，例如版本号

··bash
# 列出所有tag
git tag

# 新建一个 tag 在当前 commit
git tag <tag>

# 新建一个 tag 在指定校验和（或部分校验和，一般是前 7 位）
git tag <tag> <commit>

# 删除本地 tag
git tag -d <tag>

# 删除远程 tag
git push origin :refs/tags/<tagName>

# 查看 tag 信息
git show <tag>

# 提交指定 tag
git push <remote> <tag>

# 提交所有 tag
git push <remote> --tags

# 新建一个分支，指向某个 tag
git checkout -b <branch> <tag>
··

### status / log 相关

··bash
# 显示有变更的文件
git status

# 精简显示有变更的文件
git status -s

# 显示当前分支的版本历史
git log

# 精简显示 commit 历史
git log --pretty=oneline

# 精简显示 commit 历史并只展示最近的几次
git log --pretty=oneline -<n>

# 显示 commit 历史，以及每次 commit 发生变更的文件
git log --stat

# 搜索提交历史，根据关键词
git log -S <keyword>

# 显示某个文件的版本历史
git log --follow <file>

# 显示所有提交过的用户，按提交次数排序
git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
git blame <file>

# 显示某次提交的元数据和内容变化
git show <commit>

# 显示当前分支的最近几次提交
git reflog
··

### diff

··bash
# 显示暂存区和工作区的差异
git diff

# 显示工作区与当前分支最新 commit 之间的差异
git diff HEAD

# 显示两次提交之间的差异
git diff <first-branch>...<second-branch>

# 显示今天写了多少行代码
git diff --shortstat "@{0 day ago}"
··

### 版本回退

··bash
# 查看提交记录，复制 commit 串
git log --pretty=oneline

# 回到指定版本
git reset --hard <commit>
··

#### 方式一：强制覆盖提交

··bash
git push <remote> --force
··

如果提示拒绝则可能项目被保护了
在项目托管平台上的当前项目中设置（例如 GitLab）：Settings - Repository - Protected Branches - 点击 Unprotect

#### 方式二：重新建立分支

··bash
# 复制临时分支
git checkout -b temp
git push <remote> temp

# 删除主分支
git branch -d master
git push <remote> --delete master

# 新建主分支
git checkout -b master
git push <remote> master

# 删除临时分支
git branch -d temp
git push <remote> --delete temp
··

## .gitignore

.gitignore 文件可以让 Git 不上传哪些文件，比如 node_modules 文件是没必要上传的
在项目的根目录建立这个文件·.gitignore·，写出路径即可，例如：

··bash
README.md # 根目录下的文件
bash/README.md # 文件夹内的文件
*.md # 根目录下的所有 .md 文件
**/*.md # 该项目中所有 .md 文件
!README.md # 不忽略，即逃离 *.md 和 **/*.md 的范围
node_modules/ # 根目录下的 node_modules 文件夹
··

## 常见问题

!!
若当前 git 命令返回的信息过长或出现错误，即不能输入命令的情况下，按·Q·键即可退出
·git add .·半天没反应的话，应该是有大文件，比如 node_modules 文件，用 .gitignore 忽略即可
提示·fatal: Unable to create .git/index.lock': File exists.·错误，在·.git·文件夹内（项目根目录的隐藏文件夹）删除·index.lock·即可
!!

@@
[git 官网](https://git-scm.com)
[git 中文网](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)
@@

&2019/10/13
`
        }
    }
}
</script>
