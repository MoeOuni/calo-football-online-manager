import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HistoryButton = () => {
  const navigate = useNavigate();
  return (
    <Button variant={"outline"} size={"icon"} onClick={() => navigate(-1)}>
      <ChevronLeft />
    </Button>
  );
};

export default HistoryButton;
