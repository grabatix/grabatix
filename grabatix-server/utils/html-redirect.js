const htmlRedirect = (url) => `
    <html lang="en">
        <head>
        <meta charset="utf-8">
        </head>
        <body>
        <noscript>
            <meta http-equiv="refresh" content="0; url=${url} />
        </noscript>
        </body>
        <script>
        setTimeout(function(){
            window.location.href = ${JSON.stringify(url)}
        }, 0)
        </script>
    </html>`

module.exports = { htmlRedirect }
