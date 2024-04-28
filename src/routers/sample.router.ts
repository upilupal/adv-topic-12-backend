import { Router } from "express";
import { sampleController } from "../controllers/sample.controller";
import { validateSample } from "../middleware/sample.validator";
import { uploader } from "../middleware/uploader";

export class SampleRouter {
  private sampleController: sampleController;
  private router: Router;
  constructor() {
    this.sampleController = new sampleController();
    this.router = Router();
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.get("/", this.sampleController.getSampleData);
    this.router.post("/", validateSample, this.sampleController.createSampleData);
    this.router.post("/single-upload", uploader("IMG", "/images").single("file"), this.sampleController.addNewImage);
    this.router.post("/multiple-upload", uploader("PIC", "/images").array("files", 2), this.sampleController.addNewImages);
    this.router.post("/send-email", this.sampleController.sendEmail);
  }

  getRouter() {
    return this.router;
  }
}
