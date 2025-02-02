import UploadImage from "@/components/UploadImage";
import Dashboard from "./index";

export default function Scan() {
  return (
    <Dashboard>
      <h1>Scan your Items</h1>
      <div>
      <UploadImage/>
      </div>
    </Dashboard>
  );
}