import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { App } from "./App";

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const chunks: Buffer[] = [];
    let abortRender = () => {};

    output.on("data", (chunk: Buffer) => chunks.push(chunk));
    output.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    output.on("error", reject);

    const renderer = renderToPipeableStream(
      <StaticRouter basename={import.meta.env.BASE_URL} location={url}>
        <App />
      </StaticRouter>,
      {
        onAllReady: () => renderer.pipe(output),
        onError: (error) => {
          abortRender();
          reject(error);
        },
        onShellError: reject,
      },
    );
    abortRender = renderer.abort;
  });
}
