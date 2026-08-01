# Fenovera Dev Server — pure-PowerShell HttpListener
# Usage: double-click or run in PowerShell. No Node.js required.
#
# NOTE: PowerShell HttpListener requires one of:
#   - Run as Administrator, OR
#   - A prior `netsh http add urlacl url=http://127.0.0.1:8765/ user=<YOU>`
#   If it fails with an access error, right-click → "Run as Administrator".

$port = 8765
$root = $PSScriptRoot          # always the folder containing this script

$mimeTypes = @{
    '.html'  = 'text/html; charset=utf-8'
    '.css'   = 'text/css; charset=utf-8'
    '.js'    = 'application/javascript; charset=utf-8'
    '.png'   = 'image/png'
    '.jpg'   = 'image/jpeg'
    '.jpeg'  = 'image/jpeg'
    '.svg'   = 'image/svg+xml'
    '.woff2' = 'font/woff2'
    '.woff'  = 'font/woff'
    '.ico'   = 'image/x-icon'
    '.webp'  = 'image/webp'
    '.json'  = 'application/json'
    '.txt'   = 'text/plain; charset=utf-8'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
} catch {
    Write-Host "ERROR: could not start listener — $_" -ForegroundColor Red
    Write-Host "Try running PowerShell as Administrator." -ForegroundColor Yellow
    Read-Host "Press Enter to close"
    exit 1
}

Write-Host ""
Write-Host "  Fenovera dev server" -ForegroundColor Cyan
Write-Host "  Serving : $root" -ForegroundColor Gray
Write-Host "  URL     : http://127.0.0.1:$port/" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Press Ctrl+C to stop." -ForegroundColor Gray
Write-Host ""

try {
    while ($listener.IsListening) {
        $ctx  = $listener.GetContext()
        $req  = $ctx.Request
        $resp = $ctx.Response

        $urlPath = $req.Url.AbsolutePath
        if ($urlPath -eq '/' -or $urlPath.EndsWith('/')) {
            $urlPath = $urlPath.TrimEnd('/') + '/index.html'
        }

        $rel  = $urlPath.TrimStart('/').Replace('/', '\')
        $file = Join-Path $root $rel

        if (Test-Path $file -PathType Leaf) {
            $ext = [IO.Path]::GetExtension($file).ToLower()
            $resp.ContentType    = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { 'application/octet-stream' }
            $resp.StatusCode     = 200
            $bytes               = [IO.File]::ReadAllBytes($file)
            $resp.ContentLength64 = $bytes.Length
            $resp.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "  200 $urlPath" -ForegroundColor Green
        } else {
            $resp.StatusCode = 404
            $resp.ContentType = 'text/plain; charset=utf-8'
            $b = [Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $resp.ContentLength64 = $b.Length
            $resp.OutputStream.Write($b, 0, $b.Length)
            Write-Host "  404 $urlPath" -ForegroundColor DarkYellow
        }

        $resp.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    Write-Host "`nServer stopped." -ForegroundColor Yellow
}
