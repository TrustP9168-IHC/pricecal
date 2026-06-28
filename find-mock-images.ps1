$html = Get-Content -Path "C:\Users\pumnp\.gemini\antigravity\scratch\price-calculator\search_product_i5.html" -Raw

function FindImage($keyword) {
    # Match the product card block that contains the keyword
    # We will search for image tags and text close to each other
    Write-Host "Searching image for: $keyword"
    
    # Let's find index of keyword
    $index = $html.IndexOf($keyword)
    if ($index -ge 0) {
        # Search backwards and forwards to find the image tag in this product card
        $start = [Math]::Max(0, $index - 1000)
        $len = [Math]::Min($html.Length - $start, 2000)
        $snippet = $html.Substring($start, $len)
        
        if ($snippet -match 'src="(https://ihcupload[^"]+)"') {
            Write-Host "-> Found Image: $($Matches[1])"
            return $Matches[1]
        } else {
            Write-Host "-> No image matched in snippet"
        }
    } else {
        Write-Host "-> Keyword not found in HTML"
    }
    return $null
}

FindImage "12400F"
FindImage "13400F"
FindImage "4060"
FindImage "4070"
FindImage "H610"
FindImage "LPX"
FindImage "SN850X"
