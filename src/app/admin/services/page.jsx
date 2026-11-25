"use client";

import React, { useEffect, useState } from "react";

import {
  getServiceError,
  useService,
  useServices,
  useUpdateService,
  useUpdateServiceItem,
} from "@/app/api/hooks/services/useService";

const EMPTY_SERVICE_FORM = {
  slug: "",
  title: "",
  tagline: "",
  bannerImage: "",
  metaTitle: "",
  metaDescription: "",
  introHtml: "",
};

const EMPTY_ITEM_FORM = {
  title: "",
  description: "",
  contentHtml: "",
};

const inputBase =
  "w-full rounded-lg border border-blackk/15 bg-white px-4 py-3 text-base text-blackk placeholder:text-blackk/40 transition-colors focus:border-bluee focus:outline-none focus:ring-2 focus:ring-bluee/20";

const toSlug = (val = "") =>
  val
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

function Field({ id, label, hint, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-blackk"
      >
        <span>{label}</span>
        {hint && <span className="text-xs font-normal text-blackk/50">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

const AdminServicesPage = () => {
  const {
    data: servicesData,
    isLoading: isLoadingList,
    error: listError,
  } = useServices();

  const services = Array.isArray(servicesData) ? servicesData : [];

  const [selectedSlug, setSelectedSlug] = useState("");
  const [activeItemSlug, setActiveItemSlug] = useState("");

  const [serviceForm, setServiceForm] = useState(EMPTY_SERVICE_FORM);
  const [itemForm, setItemForm] = useState(EMPTY_ITEM_FORM);
  const [statusBanner, setStatusBanner] = useState(null);

  // Pehli category default select karein jab list load ho
  useEffect(() => {
    if (!selectedSlug && services.length > 0) {
      setSelectedSlug(services[0].slug);
    }
  }, [selectedSlug, services]);

  // Selected category ka full data + sub-services fetch karein
  const {
    data: detailData,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useService(selectedSlug);

  const currentService = detailData?.service ?? detailData ?? null;
  const subItems = Array.isArray(currentService?.items) ? currentService.items : [];

  // Jab category badle ya detail update ho, form sync karein
  useEffect(() => {
    if (!currentService) return;

    setServiceForm({
      slug: currentService.slug ?? "",
      title: currentService.title ?? "",
      tagline: currentService.tagline ?? "",
      bannerImage: currentService.bannerImage ?? "",
      metaTitle: currentService.metaTitle ?? "",
      metaDescription: currentService.metaDescription ?? "",
      introHtml: currentService.introHtml ?? "",
    });

    const items = Array.isArray(currentService.items) ? currentService.items : [];
    const matchingItem =
      items.find((it) => it.slug === activeItemSlug) || items[0] || null;

    if (matchingItem) {
      setActiveItemSlug(matchingItem.slug);
      setItemForm({
        title: matchingItem.title ?? "",
        description: matchingItem.description ?? "",
        contentHtml: matchingItem.contentHtml ?? "",
      });
    } else {
      setActiveItemSlug("");
      setItemForm(EMPTY_ITEM_FORM);
    }
  }, [currentService, activeItemSlug]);

  const {
    mutate: updateService,
    isPending: isSavingService,
    error: updateServiceError,
    reset: resetServiceMutation,
  } = useUpdateService();

  const {
    mutate: updateServiceItem,
    isPending: isSavingItem,
    error: updateItemError,
    reset: resetItemMutation,
  } = useUpdateServiceItem();

  const handleSelectCategory = (e) => {
    const nextSlug = e.target.value;
    setSelectedSlug(nextSlug);
    setActiveItemSlug("");
    setStatusBanner(null);
    resetServiceMutation();
    resetItemMutation();
  };

  const handleSelectSubItem = (item) => {
    setActiveItemSlug(item.slug);
    setItemForm({
      title: item.title ?? "",
      description: item.description ?? "",
      contentHtml: item.contentHtml ?? "",
    });
    setStatusBanner(null);
    resetItemMutation();
  };

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setServiceForm((prev) => ({
      ...prev,
      [name]: name === "slug" ? toSlug(value) : value,
    }));
    if (statusBanner) setStatusBanner(null);
    if (updateServiceError) resetServiceMutation();
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemForm((prev) => ({ ...prev, [name]: value }));
    if (statusBanner) setStatusBanner(null);
    if (updateItemError) resetItemMutation();
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlug) return;

    const normalizedSlug = toSlug(serviceForm.slug) || selectedSlug;

    updateService(
      {
        slug: selectedSlug,
        payload: {
          ...serviceForm,
          slug: normalizedSlug,
        },
      },
      {
        onSuccess: (updated) => {
          const nextSlug = updated?.slug || normalizedSlug;
          if (nextSlug && nextSlug !== selectedSlug) {
            setSelectedSlug(nextSlug);
          }
          setStatusBanner({
            type: "success",
            text: `Category "${updated?.title || serviceForm.title}" updated (slug: ${nextSlug}).`,
          });
        },
      }
    );
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlug || !activeItemSlug) return;

    updateServiceItem(
      {
        slug: selectedSlug,
        itemSlug: activeItemSlug,
        payload: itemForm,
      },
      {
        onSuccess: (updatedItem) => {
          setStatusBanner({
            type: "success",
            text: `Sub-service "${updatedItem?.title || itemForm.title}" updated successfully.`,
          });
        },
      }
    );
  };

  const combinedError =
    listError || detailError || updateServiceError || updateItemError;

  return (
    <main className="min-h-screen bg-grayy px-5 py-10 font-sans text-blackk md:py-14 xl:px-8 2xl:px-12">
      <div className="mx-auto max-w-[1600px] space-y-8">
        {/* Top Header + Category Selector */}
        <div className="flex flex-col justify-between gap-5 rounded-3xl bg-white p-6 sm:p-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-bluee">
              Admin &bull; Services
            </p>
            <h1 className="mt-1.5 text-3xl font-medium tracking-tight md:text-4xl">
              Edit Services &amp; Sub-Services
            </h1>
            <p className="mt-2 text-base text-blackk/65">
              Update service category details, URL slugs, SEO fields, and sub-service content.
            </p>
          </div>

          <div className="w-full lg:w-80">
            <label
              htmlFor="service-category"
              className="mb-1.5 block text-sm font-medium text-blackk"
            >
              Select Service Category
            </label>
            <select
              id="service-category"
              value={selectedSlug}
              onChange={handleSelectCategory}
              disabled={isLoadingList || services.length === 0}
              className={inputBase}
            >
              {isLoadingList && <option value="">Loading services...</option>}
              {!isLoadingList && services.length === 0 && (
                <option value="">No services available</option>
              )}
              {services.map((srv) => (
                <option key={srv.slug} value={srv.slug}>
                  {srv.number ? `${String(srv.number).padStart(2, "0")} — ` : ""}
                  {srv.title || srv.slug}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status / Error Banner */}
        <div aria-live="polite" className="empty:hidden">
          {combinedError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {getServiceError(combinedError)}
            </div>
          )}
          {!combinedError && statusBanner && (
            <div className="rounded-lg border border-bluee/20 bg-white px-4 py-3 text-sm font-medium text-bluee">
              {statusBanner.text}
            </div>
          )}
        </div>

        {/* Main Two-Column Editor */}
        {isLoadingDetail ? (
          <div className="rounded-3xl bg-white p-10 text-sm text-blackk/60">
            Loading service details...
          </div>
        ) : !currentService ? (
          <div className="rounded-3xl bg-white p-10 text-sm text-blackk/60">
            Select a service category to start editing.
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: Category Edit Form */}
            <form
              onSubmit={handleServiceSubmit}
              noValidate
              className="space-y-5 rounded-3xl bg-white p-6 sm:p-8 md:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blackk/10 pb-5">
                <div>
                  <h2 className="text-2xl font-medium tracking-tight">Category Settings</h2>
                  <p className="mt-1 text-xs text-blackk/55">
                    Active slug: <span className="font-mono text-bluee">{currentService.slug}</span>
                  </p>
                </div>
                {currentService.number !== undefined && (
                  <span className="rounded-full bg-grayy px-3 py-1 text-xs font-semibold text-blackk/70">
                    #{currentService.number}
                  </span>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="svc-title" label="Service Title">
                  <input
                    id="svc-title"
                    name="title"
                    type="text"
                    value={serviceForm.title}
                    onChange={handleServiceChange}
                    placeholder="Income Tax Services"
                    className={inputBase}
                  />
                </Field>

                <Field id="svc-slug" label="URL Slug" hint="Lowercase, hyphens">
                  <input
                    id="svc-slug"
                    name="slug"
                    type="text"
                    value={serviceForm.slug}
                    onChange={handleServiceChange}
                    placeholder="income-tax"
                    className={`${inputBase} font-mono text-sm`}
                  />
                </Field>
              </div>

              <Field id="svc-tagline" label="Tagline">
                <input
                  id="svc-tagline"
                  name="tagline"
                  type="text"
                  value={serviceForm.tagline}
                  onChange={handleServiceChange}
                  placeholder="Short summary shown on service pages"
                  className={inputBase}
                />
              </Field>

              <Field id="svc-banner" label="Banner Image Path" hint="URL or asset path">
                <input
                  id="svc-banner"
                  name="bannerImage"
                  type="text"
                  value={serviceForm.bannerImage}
                  onChange={handleServiceChange}
                  placeholder="/images/services/income-tax.png"
                  className={inputBase}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="svc-meta-title" label="Meta Title">
                  <input
                    id="svc-meta-title"
                    name="metaTitle"
                    type="text"
                    value={serviceForm.metaTitle}
                    onChange={handleServiceChange}
                    placeholder="SEO page title"
                    className={inputBase}
                  />
                </Field>

                <Field id="svc-meta-desc" label="Meta Description">
                  <input
                    id="svc-meta-desc"
                    name="metaDescription"
                    type="text"
                    value={serviceForm.metaDescription}
                    onChange={handleServiceChange}
                    placeholder="SEO summary for search engines"
                    className={inputBase}
                  />
                </Field>
              </div>

              <Field id="svc-intro-html" label="Intro HTML">
                <textarea
                  id="svc-intro-html"
                  name="introHtml"
                  rows={5}
                  value={serviceForm.introHtml}
                  onChange={handleServiceChange}
                  placeholder="<p>Enter introductory HTML...</p>"
                  className={`${inputBase} font-mono text-sm resize-y`}
                />
              </Field>

              <button
                type="submit"
                disabled={isSavingService}
                className="w-full rounded-lg bg-bluee px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blackk focus:outline-none focus-visible:ring-2 focus-visible:ring-yelloww focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSavingService ? "Saving Category..." : "Save Category"}
              </button>
            </form>

            {/* Right: Sub-Service Item Edit Form */}
            <form
              onSubmit={handleItemSubmit}
              noValidate
              className="space-y-5 rounded-3xl bg-white p-6 sm:p-8 md:p-10"
            >
              <div className="border-b border-blackk/10 pb-5">
                <h2 className="text-2xl font-medium tracking-tight">
                  Sub-Services ({subItems.length})
                </h2>
                <p className="mt-1 text-xs text-blackk/55">
                  {activeItemSlug ? (
                    <>
                      Locked item slug:{" "}
                      <span className="font-mono text-bluee">{activeItemSlug}</span>
                    </>
                  ) : (
                    "No sub-service selected"
                  )}
                </p>
              </div>

              {/* Sub-Service Pills */}
              {subItems.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {subItems.map((item) => {
                    const isSelected = item.slug === activeItemSlug;
                    return (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => handleSelectSubItem(item)}
                        className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors ${
                          isSelected
                            ? "bg-bluee text-white"
                            : "bg-grayy text-blackk/75 hover:text-blackk"
                        }`}
                      >
                        {item.title || item.slug}
                      </button>
                    );
                  })}
                </div>
              )}

              {activeItemSlug ? (
                <>
                  <Field id="item-title" label="Sub-Service Title">
                    <input
                      id="item-title"
                      name="title"
                      type="text"
                      value={itemForm.title}
                      onChange={handleItemChange}
                      placeholder="GST Return Preparation and Filing"
                      className={inputBase}
                    />
                  </Field>

                  <Field id="item-description" label="Description">
                    <textarea
                      id="item-description"
                      name="description"
                      rows={3}
                      value={itemForm.description}
                      onChange={handleItemChange}
                      placeholder="Short description of this sub-service..."
                      className={`${inputBase} resize-y`}
                    />
                  </Field>

                  <Field id="item-content-html" label="Content HTML">
                    <textarea
                      id="item-content-html"
                      name="contentHtml"
                      rows={7}
                      value={itemForm.contentHtml}
                      onChange={handleItemChange}
                      placeholder="<p>Detailed sub-service HTML content...</p>"
                      className={`${inputBase} font-mono text-sm resize-y`}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={isSavingItem}
                    className="w-full rounded-lg bg-bluee px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blackk focus:outline-none focus-visible:ring-2 focus-visible:ring-yelloww focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSavingItem ? "Saving Sub-Service..." : "Save Sub-Service"}
                  </button>
                </>
              ) : (
                <div className="rounded-2xl bg-grayy p-6 text-sm text-blackk/60">
                  Is category ke andar koi sub-service item nahi mila.
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminServicesPage;