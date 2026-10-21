import axiosInstance from "../../../../config/axiosConfig";


const unwrap = (body) => body?.data ?? body;

export const serviceService = {

  getAll: async () => {
    const { data } = await axiosInstance.get("/services");
    return unwrap(data);
  },

  /** Cards ke liye short list (number, slug, title, tagline, bannerImage, itemCount) */
getSummaries: async () => {
  const { data } = await axiosInstance.get("/services", { params: { summary: true } });
  return unwrap(data);
},

  /**
   * Ek category + previous/next navigation
   * @param {string} slug
   * @returns {Promise<{ service: object, previous: object, next: object }>}
   */
  getBySlug: async (slug) => {
    const { data } = await axiosInstance.get(`/services/${encodeURIComponent(slug)}`);
    return unwrap(data);
  },
};