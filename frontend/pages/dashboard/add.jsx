import UploadImage from "@/components/UploadImage";
import Dashboard from "./index";

export default function Add() {
  return (
    <Dashboard>
      <h1>Add your Items Here</h1>
      <div>
      <UploadImage/>
      </div>
    </Dashboard>
  );
}