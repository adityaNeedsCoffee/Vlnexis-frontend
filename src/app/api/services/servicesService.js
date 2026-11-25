import axiosInstance from "../../../../config/axiosConfig";

const unwrap = (body) => body?.data ?? body;

const SERVICE_EDIT_FIELDS = [
  "slug",
  "title",
  "tagline",
  "bannerImage",
  "metaTitle",
  "metaDescription",
  "introHtml",
];

const ITEM_EDIT_FIELDS = ["title", "description", "contentHtml"];

const pickFields = (body = {}, allowed) =>
  allowed.reduce((acc, key) => {
    if (body[key] !== undefined) acc[key] = body[key];
    return acc;
  }, {});

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

  /**
   * Category edit ke liye (number aur slug backend mein locked hain)
   * @param {string} slug
   * @param {object} payload - { title, tagline, bannerImage, metaTitle, metaDescription, introHtml }
   */
  update: async (slug, payload) => {
    const body = pickFields(payload, SERVICE_EDIT_FIELDS);
    const { data } = await axiosInstance.put(`/services/${encodeURIComponent(slug)}`, body);
    return unwrap(data);
  },

  /**
   * Sub-service item edit ke liye
   * @param {string} slug
   * @param {string} itemSlug
   * @param {object} payload - { title, description, contentHtml }
   */
  updateItem: async (slug, itemSlug, payload) => {
    const body = pickFields(payload, ITEM_EDIT_FIELDS);
    const { data } = await axiosInstance.put(
      `/services/${encodeURIComponent(slug)}/items/${encodeURIComponent(itemSlug)}`,
      body
    );
    return unwrap(data);
  },
};