$keywords = @(
    @{ name = "12400F"; search = "12400F" },
    @{ name = "13400F"; search = "13400F" },
    @{ name = "4060"; search = "4060" },
    @{ name = "4070"; search = "4070" },
    @{ name = "H610"; search = "H610" },
    @{ name = "LPX"; search = "CORSAIR LPX" },
    @{ name = "SN850X"; search = "SN850X" }
)

foreach ($kw in $keywords) {
    try {
        $url = "https://www.ihavecpu.com/product/search/" + [uri]::EscapeDataString($kw.search)
        $r = Invoke-WebRequest -Uri $url -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -TimeoutSec 10 -UseBasicParsing
        
        $html = $r.Content
        if ($html -match 'src="(https://ihcupload[^"]+)"') {
            Write-Host "$($kw.name) Image: $($Matches[1])"
        } else {
            Write-Host "$($kw.name) Image: Not found"
        }
    } catch {
        Write-Host "$($kw.name) Failed: $_"
    }
}
