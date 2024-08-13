import { useRef } from "react";
import {ReactCropperElement} from "react-cropper"

interface CropImageDialogProps {
    src: string;
    cropAspectRatio: number;
    onCropped: (blob: Blob | null) => void;
    onClose: () => void;
}

const CropImageDialog = ({ src, cropAspectRatio, onCropped, onClose}: CropImageDialogProps) => {
    const cropperRef = useRef<ReactCropperElement>(null);

    function crop() {
        const cropper = cropperRef.current?.cropper;
        if (!cropper) return;
        cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), "image/webp");
        onClose();
    }
    return (
        <div>CropImageDialog</div>
    )
}

export default CropImageDialog