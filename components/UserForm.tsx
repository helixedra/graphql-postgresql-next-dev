import React, { useState } from "react";
import ReactDOM from "react-dom";

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formState: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    passwordHash: "",
    firstName: "",
    lastName: "",
    phone: "",
    avatarUrl: "",
    bio: "",
    dateOfBirth: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formState);
    setFormState({
      username: "",
      email: "",
      passwordHash: "",
      firstName: "",
      lastName: "",
      phone: "",
      avatarUrl: "",
      bio: "",
      dateOfBirth: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center">
      <div
        className="bg-white p-6 rounded shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Create User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={formState.username}
            className="border p-2 rounded mb-2 w-full"
            required
            onChange={(e) =>
              setFormState({ ...formState, username: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={formState.email}
            className="border p-2 rounded mb-2 w-full"
            required
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={formState.passwordHash}
            className="border p-2 rounded mb-2 w-full"
            required
            onChange={(e) =>
              setFormState({ ...formState, passwordHash: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="First Name"
            value={formState.firstName}
            className="border p-2 rounded mb-2 w-full"
            onChange={(e) =>
              setFormState({ ...formState, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formState.lastName}
            className="border p-2 rounded mb-2 w-full"
            onChange={(e) =>
              setFormState({ ...formState, lastName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Phone"
            value={formState.phone}
            className="border p-2 rounded mb-2 w-full"
            onChange={(e) =>
              setFormState({ ...formState, phone: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Avatar URL"
            value={formState.avatarUrl}
            className="border p-2 rounded mb-2 w-full"
            onChange={(e) =>
              setFormState({ ...formState, avatarUrl: e.target.value })
            }
          />
          <textarea
            placeholder="Bio"
            value={formState.bio}
            className="border p-2 rounded mb-2 w-full"
            onChange={(e) =>
              setFormState({ ...formState, bio: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={formState.dateOfBirth}
            className="border p-2 rounded mb-2 w-full"
            required
            onChange={(e) =>
              setFormState({ ...formState, dateOfBirth: e.target.value })
            }
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default UserForm;
