import React, {useRef} from 'react'
import useFileUpload from "../../../../hooks/useFileUpload"
import "./index.css"

const ImageUpload = ({endpoint}) => {
    const dragElRef = useRef();
    const fileInputRef = useRef();
    const uploadBtnRef = useRef();
    const { dragSupported, hookState: { dragging, disabled, dropped, uploading }, img } = useFileUpload(dragElRef, fileInputRef, uploadBtnRef, endpoint)
    return (
        <>
            {
                dragSupported && (
                    <div className="drag-container-outer" ref={dragElRef}>
                        <div className={`drag-container-inner ${dragging && `dragging`}`}>
                            {
                                dropped ? (
                                    <img src={img.src} title={img.name} alt={img.name} className="drag-img"/>
                                ) : (
                                    <div className="drag-text">                         
                                        drop here :)
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
            <div id={`form-field-file`} className={`form-group`}>
                <label htmlFor="file-upload">
                    Select File
                </label>
                <input type="file" ref={fileInputRef} name="file-upload" id="file-upload" disabled={uploading} accept="image/*"/>
            </div>
            <button className="upload-btn" disabled={disabled} ref={uploadBtnRef}>Upload</button>
        </>
    )
}

export default ImageUpload