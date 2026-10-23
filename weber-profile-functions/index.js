import { handler as updateMenuView } from "./updateMenuView.js";
import { handler as postUi } from "./postUi.js";
export const event = async (e) => {
  document.body.style.cursor = "wait";
  const type = e.type;
  const [tag] = e.composedPath();
  const tagName = tag.tagName.toLowerCase() || "document";
  const id = tag.id || "app";
  const route = `${type}:/${tagName}/${id}`;

  const router = {
    "load:/ui/post": async () => await postUi(e),
    "click:/button/hamburger": async () => await updateMenuView(e)
  }
  
  try {
    // if (type !== "mouseout") console.log(route);
    if (router[route]) await router[route]();
    document.body.style.cursor = "default";
  } catch (err) {
    console.trace(err);
  }
};