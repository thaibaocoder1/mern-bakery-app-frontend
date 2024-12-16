import { getEndpointBackend } from "@/utils/get-url";

export const displayImage = (imageUrl: string, id: string, nameFolder: string = "images") =>
  imageUrl ? `${getEndpointBackend()}/${nameFolder}/${id}/${imageUrl}` : "https://placehold.co/400";
