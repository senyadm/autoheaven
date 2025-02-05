import { PenSquare } from "lucide-react";
import { Button } from "../../ui/button";

interface EditButtonProps {
  saveText: string;
  cancelText: string;
  editText: string;
  disabledState: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}
const EditButton = ({
  saveText,
  cancelText,
  editText,
  disabledState,
  onEdit,
  onCancel,
  onSave,
}: EditButtonProps) => {
  if (disabledState) {
    return (
      <Button
        className="self-end bg-primary-foreground hover:bg-gray-300 text-secondary-foreground border border-gray-300 rounded-md mt-2 "
        onClick={onEdit}
      >
        <PenSquare className="mr-2" size={16} />
        {editText}
      </Button>
    );
  } else {
    return (
      <div className="flex flex-start w-full">
        <Button
          className="bg-white hover:bg-gray-300 text-secondary-foreground border border-gray-300 rounded-md mt-2 mr-2 ml-auto"
          onClick={onSave}
        >
          <PenSquare className="mr-2" size={16} />
          {saveText}
        </Button>
        <Button
          className="bg-whit hover:bg-gray-300 text-secondary-foreground border border-gray-300 rounded-md mt-2 "
          onClick={onCancel}
        >
          <PenSquare className="mr-2" size={16} />
          {cancelText}
        </Button>
      </div>
    );
  }
};

export default EditButton;
