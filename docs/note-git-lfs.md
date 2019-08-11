>大二进制文件的版本管理

### 安装
```
git lfs install
```

### 设置
```sh
::<<eof
# 对以jpg为结尾的图片文件进行版本管理
git lfs track "*.jpg"
git add .gitattributes

# 对以png为结尾的图片文件进行版本管理
git lfs track "*.png"
git add .gitattributes

# 对以psd为结尾的图片文件进行版本管理
git lfs track "*.psd"
git add .gitattributes

# 对以mp3为结尾的音频文件进行版本管理
git lfs track "*.mp3"
#*.mp3 filter=lfs -text
git add .gitattributes

# 对以zip为结尾的压缩文件进行版本管理
git lfs track "*.zip"
git add .gitattributes
eof
```

### 使用
```
git add file.png
git commit -m "adding image file"
git push origin master

# 查看帮助
git lfs <command> -h

# 查看变化
#2 方式01
git lfs pointer --file=path/to/file
#2 方式02
cat other/pointer/file | git lfs pointer --file=path/to/file --stdin
#2 方式03
git lfs pointer --file=src/logo.png
```


### 参考
[git-lfs](https://git-lfs.github.com/)
