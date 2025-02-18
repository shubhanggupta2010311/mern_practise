import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record";

const router = express.Router();

router.get(
  "/getAllByUserID/:userId",
  async (req: Request, res: Response): Promise<any> => {
    const userId = req.params.userId;
    try {
      console.log(`Fetching records for userId: ${userId}`);
      const records = await FinancialRecordModel.find({ userId: userId });
      if (records.length === 0) {
        return res.status(404).send(`No records found for user ID: ${userId}`);
      }
      res.status(200).send(records);
    } catch (err) {
      console.error(`Error fetching records for user ID: ${userId}`, err);
      res.status(500).send(`Error fetching records for user ID: ${userId}`);
    }
  }
);

router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(200).send(savedRecord);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );

    if (!record) return res.status(404).send();

    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
