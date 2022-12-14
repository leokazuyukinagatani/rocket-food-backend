import { Router } from "express";
import { ImagesController } from "../controllers/ImagesController";

const imagesRoutes = Router();
const imagesController = new ImagesController();

imagesRoutes.delete("/:id", imagesController.delete);
imagesRoutes.put("/", imagesController.update);
imagesRoutes.get("/:id", imagesController.show);
imagesRoutes.post('/', imagesController.create);
imagesRoutes.get('/', imagesController.index);

export { imagesRoutes };
