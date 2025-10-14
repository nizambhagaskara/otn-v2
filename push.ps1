$commitMsg = Read-Host "Enter commit message: "

git add .
git commit -m $commitMsg
git push origin main