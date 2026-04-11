import {useModal} from "../hooks/useModal";

const ConfirmModal = ({message, onConfirm, onCancel}) => {
  const cancelButtonRef = useModal(true, onCancel);

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-content" onClick={(e) => e.stopPropagation()}>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button
            onClick={onCancel}
            className="confirm-btn confirm-btn--cancel"
            ref={cancelButtonRef}
          >
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-btn confirm-btn--delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
