import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { RotateCcw } from "lucide-react";

const ResetButton = ({ handleReset }) => {
  return (
    <Button variant="ghost" onClick={handleReset}>
      <RotateCcw size={20} />
    </Button>
  );
};

export default ResetButton;
