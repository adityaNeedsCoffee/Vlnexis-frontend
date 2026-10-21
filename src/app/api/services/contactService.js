import axiosInstance from "../../../../config/axiosConfig";


export const contactService = {
  /**
   * @param {{ name: string, email: string, phone?: string, message: string, website?: string }} payload
   */
  send: async (payload) => {
    const { data } = await axiosInstance.post("/contact", payload);
    return data; 
  },
};