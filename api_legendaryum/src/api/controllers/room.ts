import Router from "express";
import { STATUS } from "../util/statusHTTP";
import { checkCreate, checkGetById } from "../middleware/room";
import RoomService from "../services/room";

const router = Router();

const roomServise = new RoomService();
router.post("/create", checkCreate, async (req, res) => {
  try {
    const result = await roomServise.create(req.body);
    return res.status(STATUS.CREATE).json(result);
  } catch (error) {
    if (error instanceof Error) {
      const STATUS_ERROR = error.message === "the name of the room is already in use" ?
        STATUS.BAD_REQUEST : STATUS.ERROR_SERVER
      return res.status(STATUS_ERROR).json({ content: error.message });
    }
  }
});

router.get("/getAll", async (_req, res) => {
  try {
    const result = await roomServise.getAll();
    return res.status(STATUS.OK).json(result);
  } catch (error) {
    if (error instanceof Error)
      return res.status(STATUS.ERROR_SERVER).json({ content: error.message });
  }
});

router.get("/getById/:id", checkGetById, async (req, res) => {
  try {
    const result = await roomServise.getById(
      req.params?.id as unknown as string
    );
    return res.status(STATUS.OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      const STATUS_ERROR = error.message === "not found" ?
        STATUS.NOT_FOUND : STATUS.ERROR_SERVER
      return res.status(STATUS_ERROR).json({ content: error.message });
    }
  }
});

router.delete("/delete/:id", checkGetById, async (req, res) => {
  try {
    const result = await roomServise.delete(
      req.params?.id as unknown as string
    );
    return res.status(STATUS.OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      const STATUS_ERROR = error.message === "not found" ?
        STATUS.NOT_FOUND : STATUS.ERROR_SERVER
      return res.status(STATUS_ERROR).json({ content: error.message });
    }
  }
});

export default router;
