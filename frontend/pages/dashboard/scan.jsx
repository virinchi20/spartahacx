import UploadImage from "@/components/UploadImage";
import Dashboard from "./index";

export default function Scan() {
  return (
    <Dashboard>
      <h1 style={{marginLeft : '37px', fontSize : '24px'}}>Scan your Items</h1>
      <div>
      <UploadImage/>
      </div>
    </Dashboard>
  );
}