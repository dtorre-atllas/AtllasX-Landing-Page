import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./app/App";
export { pageMeta } from "./app/site/Pages";
export function render(path: string) {
  return renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  );
}
