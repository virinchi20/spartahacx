import Dashboard from "./index";
import WebcamCapture from "@/components/WebcamCapture";

export default function WebCapture() {
  return (
    <Dashboard>
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Scan Your Items
          </h1>
          <WebcamCapture />
        </div>
      </div>
    </Dashboard>
  );
}
