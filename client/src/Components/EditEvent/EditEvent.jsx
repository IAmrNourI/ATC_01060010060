import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { uploadImageApi, editCardapi } from "../../Network/admin.api";
import toast from "react-hot-toast";

export default function EditEvent() {
  const location = useLocation();
  const {
    id,
    title,
    titleAr,
    description,
    descriptionAr,
    image,
    date,
    category,
    price,
    venue,
  } = location.state || {};

  const [form, setForm] = useState({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    imagePath: "",
    date: "",
    category: "",
    price: "",
    venue: "",
  });

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setForm({
      title: title || "",
      titleAr: titleAr || "",
      description: description || "",
      descriptionAr: descriptionAr || "",
      imagePath: image?.split(/[\\/]/).pop() || "",
      date: date?.split("T")[0] || "",
      category: category || "",
      price: price || "",
      venue: venue || "",
    });
    setUploadSuccess(true);
  }, [location]);

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImageApi(file);
      if (response.status === 200) {
        setForm((prev) => ({ ...prev, imagePath: response.data.image }));
        setUploadSuccess(true);
        toast.success("Image uploaded successfully");
      }
    } catch {
      toast.error("Upload failed");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const dataToSend = {
      title: form.title,
      titleAr: form.titleAr,
      description: form.description,
      descriptionAr: form.descriptionAr,
      image: form.imagePath,
      date: form.date,
      category: form.category,
      price: Number(form.price),
      venue: form.venue,
    };

    setIsLoading(true);
    try {
      const res = await editCardapi(id, dataToSend);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
    setIsLoading(false);
  }

  return (
    <section
      className="d-flex justify-content-center align-items-center pt-120"
      style={{ minHeight: "100vh" }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow rounded w-100"
        style={{ maxWidth: "550px" }}
      >
        <h3 className="mb-4 text-center">Edit Event</h3>

        <div className="mb-3">
          <input
            type="file"
            accept="image/*"
            className="form-control form-control-sm"
            onChange={handleImageChange}
          />
          {uploadSuccess && (
            <small className="text-success d-block mt-1">
              Image: {form.imagePath}
            </small>
          )}
        </div>

        <div className="form-floating mb-3">
          <select
            className="form-select form-select-sm"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Front End">Front End</option>
            <option value="Back End">Back End</option>
            <option value="Mobile Application">Mobile Application</option>
            <option value="Others">Others</option>
          </select>
          <label>Category</label>
        </div>

        {[
          { label: "Title (EN)", key: "title" },
          { label: "Title (AR)", key: "titleAr" },
          { label: "Description (EN)", key: "description" },
          { label: "Description (AR)", key: "descriptionAr" },
          { label: "Date", key: "date", type: "date" },
          { label: "Price", key: "price", type: "number" },
          { label: "Venue", key: "venue" },
        ].map(({ label, key, type = "text" }) => (
          <div className="form-floating mb-3" key={key}>
            <input
              type={type}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={label}
              className="form-control form-control-sm"
              required
            />
            <label>{label}</label>
          </div>
        ))}

        <button
          type="submit"
          className="btn btn-warning w-100 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </section>
  );
}
