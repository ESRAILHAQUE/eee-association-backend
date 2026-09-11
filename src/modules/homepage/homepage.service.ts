import { prisma } from "../../database";

export const homepageService = {
  /**
   * Fetch the homepage settings. Since it's a singleton,
   * it returns the first record or creates one if it doesn't exist.
   */
  async getSettings() {
    let settings = await prisma.homepageSetting.findFirst();
    if (!settings) {
      settings = await prisma.homepageSetting.create({
        data: {
          hero: [],
          achievements: [],
          clubs: [],
          events: [],
        },
      });
    }
    return settings;
  },

  /**
   * Update the homepage settings
   */
  async updateSettings(data: {
    hero?: any;
    achievements?: any;
    clubs?: any;
    events?: any;
  }) {
    const current = await this.getSettings();
    return prisma.homepageSetting.update({
      where: { id: current.id },
      data,
    });
  },
};
