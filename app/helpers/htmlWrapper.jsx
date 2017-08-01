export function staticHTMLWrapper(
  reactDom,
  scriptPath,
  initialState,
  css,
) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Pluto | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <style type="text/css">${css}</style>
      </head>
      <body>
        <script>window.__INITIAL_STATE__=${initialState}</script>
        <div id="react-app">
          ${reactDom}
        </div>
        <script src="${scriptPath}"></script>
      </body>
    </html>
  `;
}
