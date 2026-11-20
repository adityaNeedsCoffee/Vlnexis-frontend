import axiosInstance from "../../../../config/axiosConfig";

// Backend response ko safe tareeke se unwrap karta hai
const unwrap = (body) => body?.data ?? body;

export const newsService = {
  /**
   * Latest news articles (GDELT se, backend cache ke saath)
   * @param {string} topic - "business" | "fdi" | "gst" | "startup"
   * @returns {Promise<Array<{ title: string, url: string, domain: string, date: string, image: string|null }>>}
   */
  getLatest: async (topic = "business") => {
    const { data } = await axiosInstance.get("/news", { params: { topic } });
    const body = unwrap(data);

    // Backend { source, articles } bhejta hai, hume sirf articles chahiye
    return body?.articles ?? [];
  },
};