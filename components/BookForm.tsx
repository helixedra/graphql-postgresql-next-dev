"use client";
import { useState } from "react";

interface BookFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: BookFormData) => void;
  initialData?: BookFormData;
}

interface BookFormData {
  title: string;
  author: string;
  isbn?: string;
  publicationYear?: number;
  genre?: string;
  publisher?: string;
  pageCount?: number;
  language?: string;
  price?: number;
  inStock?: boolean;
}

export default function BookForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>(
    initialData || {
      title: "",
      author: "",
      isbn: "",
      publicationYear: undefined,
      genre: "",
      publisher: "",
      pageCount: undefined,
      language: "",
      price: undefined,
      inStock: true,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    let parsedValue: string | number | boolean = value;

    if (type === "number") {
      parsedValue = value === "" ? "" : Number(value);
    } else if (type === "checkbox") {
      parsedValue = (e.target as HTMLInputElement).checked;
    }

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Book" : "Add New Book"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Title *
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Author *
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              ISBN
              <input
                type="text"
                name="isbn"
                value={formData.isbn || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Publication Year
              <input
                type="number"
                name="publicationYear"
                value={formData.publicationYear || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Genre
              <input
                type="text"
                name="genre"
                value={formData.genre || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Publisher
              <input
                type="text"
                name="publisher"
                value={formData.publisher || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Page Count
              <input
                type="number"
                name="pageCount"
                value={formData.pageCount || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Language
              <input
                type="text"
                name="language"
                value={formData.language || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Price
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                step="0.01"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center text-sm font-medium mb-1">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="mr-2"
              />
              In Stock
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
