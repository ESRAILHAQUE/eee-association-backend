import { Request, Response } from "express";
import { homepageService } from "./homepage.service";

export const homepageController = {
  async getSettings(req: Request, res: Response) {
    try {
      const settings = await homepageService.getSettings();
      res.json({ success: true, data: settings });
    } catch (error) {
      console.error("[HomepageController] getSettings error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  async updateSettings(req: Request, res: Response) {
    try {
      const updated = await homepageService.updateSettings(req.body);
      res.json({ success: true, data: updated, message: "Homepage settings updated successfully" });
    } catch (error) {
      console.error("[HomepageController] updateSettings error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },
};
