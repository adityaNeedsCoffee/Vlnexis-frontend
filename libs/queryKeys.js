export const contactKeys = {
  all: ["contact"],
  send: () => [...contactKeys.all, "send"],
};



export const serviceKeys = {
  all: ["services"],
  list: () => [...serviceKeys.all, "list"],
  summaries: () => [...serviceKeys.all, "summaries"],
  detail: (slug) => [...serviceKeys.all, "detail", slug],
};
 

export const userKeys = {
  all: ["users"],
  me: () => [...userKeys.all, "me"],
  list: () => [...userKeys.all, "list"],
};