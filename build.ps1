Write-Output "Start the build process?"
Write-Output "Press any key to continue or Ctrl+C to cancel."
[System.Console]::ReadKey($true) | Out-Null

npx tailwindcss -i ./css/input.css -o ./css/output.css --minify