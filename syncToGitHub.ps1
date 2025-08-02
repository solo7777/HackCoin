# syncToGitHub.ps1
     Set-Location -Path "D:\HackCoin"
     git pull origin main
     git add .
     $commitMessage = "Оновлення проєкту: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
     git commit -m $commitMessage
     git push origin main
     Write-Output "Зміни синхронізовано з GitHub"