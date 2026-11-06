import { handler as updateMenuView } from "./updateMenuView.js";
import { handler as postUi } from "./postUi.js";
import { handler as postProjectView } from "./postProjectView.js";
import { handler as updateCarouselView } from "./updateCarouselView.js";
import { handler as updateProjectView } from "./updateProjectView.js";
import { handler as postProjectForm } from "./postProjectForm.js";
import { Logger } from "../src/weber-profile-utility/Logger.js";
export const event = async (e) => {
  document.body.style.cursor = "wait !important";
  const type = e.type;
  const [tag] = e.composedPath();
  const tagName = tag.tagName.toLowerCase() || "document";
  const id = tag.id || "app";
  const route = `${type}:/${tagName}/${id}`;

  const router = {
    "load:/ui/post": async () => await postUi(e),
    "click:/button/hamburger": async () => await updateMenuView(e),
    "click:/button/project": async () => await postProjectView(e),
    "click:/button/next": async () => await updateCarouselView(e),
    "click:/button/prev": async () => await updateCarouselView(e),
    "click:/span/next": async () => await updateCarouselView(e),
    "click:/span/prev": async () => await updateCarouselView(e),
    "click:/select/rest": async () => await updateProjectView(e),
    "click:/select/endpoint": async () => await updateProjectView(e),
    "click:/button/body": async () => await updateProjectView(e),
    "submit:/form/project-form": async () => await postProjectForm(e),
  };

  try {
    // if (type !== "mouseout") console.log(route);
    if (router[route])
      await router[route]();
  } catch (err) {
    // const err = error.toJSON()
    Logger.emit("error", {
      message: `Unhandled route failure: ${err.message || err}`,
      meta: { route, error: err },
    });

    console.trace(err);
  }
};
