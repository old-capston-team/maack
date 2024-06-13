import WebView from "react-native-webview";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface MusicViewProps {
  ref: React.Ref<WebView>;
  url: string;
  onLoaded: () => void;
}

const MusicView = forwardRef((props: MusicViewProps, ref) => {
  const webviewRef = useRef<WebView>();

  const html = `
<!DOCTYPE html>
<html lang="ko-KR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>music</title>
  </head>
  <body>
    <div id="osmdContainer" style="overflow: auto;"/>
    <script src="https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/releases/download/1.8.8/opensheetmusicdisplay.min.js"></script>
    <script>
      let osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdContainer");
      let cursor;
      let padding;

      osmd.setOptions({
        backend: "svg",
        drawTitle: true,
        // drawingParameters: "compacttight" // don't display title, composer etc., smaller margins
      });
      osmd
        .load("${props.url}")
        .then(
          function() {
            osmd.render();
            cursor = osmd.cursor;
            cursor.CursorOptions.follow = false;
            cursor.show();
            padding = cursor.cursorElement.getBoundingClientRect().top;
            window.ReactNativeWebView.postMessage("loaded");
          }
        );

      function scrollToCursor() {
        const container = document.getElementById("osmdContainer");
        const cursorElement = cursor.cursorElement;

        const cursorRect = cursorElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const moveDist = window.scrollY + cursorRect.top - padding;
        window.scrollTo({top: moveDist, left: 0, behavior: 'smooth'});
      }
      window.addEventListener('message', (event) => {
        const action = JSON.parse(event.data);
        if (action.type === 'jump') {
          const noteIndex = action.payload;
          cursor.reset();
          
          for (let i = 0; i < noteIndex; i++) {
            cursor.next();
          }
          scrollToCursor();
        } else if (action.type === 'reset') {
          cursor.reset();
          scrollToCursor();
        }
      })
    </script>
  </body>
</html>
  `;

  function jumpTo(noteIndex: number) {
    webviewRef.current.postMessage(
      JSON.stringify({ type: "jump", payload: noteIndex }),
    );
  }

  function reset() {
    webviewRef.current.postMessage(JSON.stringify({ type: "reset" }));
  }

  useImperativeHandle(ref, () => ({
    jumpTo,
    reset,
  }));

  return (
    <WebView
      ref={webviewRef}
      onMessage={(event) => {
        if (event.nativeEvent.data === "loaded") {
          props.onLoaded();
        }
      }}
      style={{
        flex: 3,
        justifyContent: "center",
        width: 1000,
        borderWidth: 1,
        borderColor: "#aaaaaa",
        borderRadius: 8,
      }}
      source={{ html: html }}
    />
  );
});

export default MusicView;
