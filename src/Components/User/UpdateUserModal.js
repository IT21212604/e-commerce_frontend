import React from "react";
import "./UpdateUserModal.css"; // You can style the modal using this CSS file

const UpdateUserModal = ({ show, handleClose, userDetails, handleUpdate }) => {
  const [updatedName, setUpdatedName] = React.useState(userDetails.name);
  const [updatedEmail,setUpdatedEmail] = React.useState(userDetails.email); // Make email state read-only

  const handleSave = () => {
    handleUpdate({ name: updatedName, email: updatedEmail });
    handleClose();
  };

  React.useEffect(() => {
    setUpdatedName(userDetails.name);
    setUpdatedEmail(userDetails.email) // Update state if userDetails change
  }, [userDetails]);

  if (!show) {
    return null; // Don't render the modal if 'show' is false
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* <h2>Update User Details</h2> */}
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={updatedEmail}
              readOnly // Make email read-only
            />
          </div>
          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
