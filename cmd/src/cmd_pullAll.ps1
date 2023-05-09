# 一键git pull的执行脚本

$dir = Split-Path -Parent $MyInvocation.MyCommand.Definition;
Write-Output "当前文件夹：$dir" ;
Set-Location $dir;
$dirs = Get-ChildItem -Directory -Name;
Write-Output "文件夹数：$($dirs.Count)";
foreach ($dirName in $dirs) {
    Write-Output "=============================================="
    Write-Output "正在执行... $dirName";
    Set-Location $dirName;
    git pull;
    #git log --pretty=format:"%Cred%h %Creset%cn %Cblue%cr %Cgreen%s" --since=1.day  --no-merges
    Set-Location ..;
    if ($dirName -eq "ds-client") {
        $dy = $dirName + "/resource/dy";
        if (Test-Path -Path $dy) {
            Write-Output "==============================================";
            Write-Output "正在执行... $dy";
            Set-Location $dy;
            git pull;
            #git log --pretty=format:"%Cred%h %Creset%cn %Cblue%cr %Cgreen%s" --since=1.day  --no-merges
            Set-Location $dir;
        }
    }
}
Write-Output "==============================================";
Write-Host "按任意键退出..."
[void][System.Console]::ReadKey($true)
Exit-PSHostProcess
# write-host "按任意键继续..."
# [void][System.Console]::ReadKey($true)