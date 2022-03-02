import { Router } from "express";

import {
  createAsset,
  deleteAsset,
  listAssets,
  retrieveAsset,
  updateAsset,
} from "../controllers/assetController";
import ensureAuth from "../middlewares/auth";

const assetRouter = Router();

assetRouter.post("/:unit_id/create", ensureAuth, createAsset);
assetRouter.get("/", ensureAuth, listAssets);
assetRouter.put("/:asset_id", ensureAuth, updateAsset);
assetRouter.delete("/:asset_id", ensureAuth, deleteAsset);
assetRouter.get("/:asset_id", ensureAuth, retrieveAsset);

export default assetRouter;
