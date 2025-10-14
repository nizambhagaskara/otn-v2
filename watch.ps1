Write-Output "Starting Tailwind CSS watch process..."
Write-Output "Press Ctrl+C to stop."

npx tailwindcss -i ./css/input.css -o ./css/output.css --watch