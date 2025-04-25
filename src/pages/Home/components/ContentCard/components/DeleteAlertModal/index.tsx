import Button from '../../../../../../components/Button';
import Modal from '../../../../../../components/Modal';

interface DeleteAlertModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteAlertModal = ({
  isOpen,
  isLoading = false,
  onDelete,
  onClose,
}: DeleteAlertModalProps) => {
  return (
    <Modal isOpen={isOpen}>
      <div className="flex flex-col gap-8 p-4 md:min-w-[660px]">
        <span className="text-[1.375rem] font-bold text-[#000000] md:whitespace-nowrap">
          Are you sure you want to delete this item?
        </span>

        <div className="flex justify-end gap-4">
          <Button title="Cancel" onSubmit={onClose} typeButton="cancel" />

          <Button
            title="Delete"
            onSubmit={onDelete}
            typeButton="delete"
            isLoading={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAlertModal;
