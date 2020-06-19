import React, {useRef} from 'react'
import useFileUpload from "../../../../hooks/useFileUpload"
import { FaCloudUploadAlt } from 'react-icons/fa'
import Loading from "../../Loading"
import "./index.css"

const ImageUpload = ({endpoint, title = `Upload Image`}) => {
    const fileInputRef = useRef();
    const formRef = useRef();
    const { hookState: { dragging, disabled, dropped, uploading, loaded, error, dragSupported, file, imgSrc }, handleFileUpload } = useFileUpload({ fileInputRef, formRef, endpoint})
    return (
        <form className="upload-form" ref={formRef} onSubmit={handleFileUpload}>
            { 
                uploading && <Loading />
            }
            <h3>{title}</h3>
            <div className="drag-container-outer">
                <div className={`drag-container-inner${dragging ? ` dragging` : ``}${error ? ` error` : ``}${dropped || loaded || uploading ? ` dropped` : ``}`}>
                    <div id={`form-field-file`} className={`form-group`}>

                        <input type="file" ref={fileInputRef} name="file-upload" id="file-upload" disabled={uploading || loaded} accept="image/png,image/jpeg,image/gif,image/svg+xml,image/webp"/>
                        <label htmlFor="file-upload">
                            <FaCloudUploadAlt style={{fontSize: 36}}/>
                            <br/>
                            { 
                                loaded ? (
                                    <b>File Successfully Loaded!!!</b>
                                ) : (
                                    <>
                                        <b>Select File</b>
                                        {
                                            dragSupported && ` or drag it here.`
                                        } 
                                        {` (Max: 1MB)`}
                                    </>
                                )
                            }
                        </label>
                    </div>
                </div>
            </div>
            <div className="input-error">{error}</div>
            {
                dropped && (
                    <>
                        <div className="img-block">
                            <img src={imgSrc} title={file.name} alt={file.name} className="drag-img"/>
                        </div>
                        <button className="upload-btn" disabled={disabled} type="submit">Upload</button>
                    </>
                )
            }
        </form>
    )
}

export default ImageUpload