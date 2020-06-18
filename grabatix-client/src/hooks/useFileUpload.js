/** @format */

import React, { useState, useEffect, useReducer } from 'react'
import { callApi } from '../utils/fetch-helpers'

const useFileUpload = (dragElRef, fileInputRef, uploadBtnRef, endpoint) => {
  const INITIAL = `INITIAL`,
    DRAGGING = `DRAGGING`,
    DRAGGED = `DRAGGED`,
    DROPPED = `DROPPED`,
    UPLOADING = `UPLOADING`,
    UPLOADED = `UPLOADED`
  const STATES = {
    INITIAL: {
      disabled: true,
      dragging: false,
      dropped: false,
      uploading: false,
    },
    DRAGGING: {
      disabled: true,
      dragging: true,
      dropped: false,
      uploading: false,
    },
    DRAGGED: {
      disabled: false,
      dragging: false,
      dropped: false,
      uploading: false,
    },
    DROPPED: {
      disabled: false,
      dragging: false,
      dropped: true,
      uploading: false,
    },
    UPLOADING: {
      disabled: true,
      dragging: false,
      dropped: true,
      uploading: true,
    },
    UPLOADED: {
      disabled: false,
      dragging: false,
      dropped: false,
      uploading: false,
    },
  }

  const reducer = (state, action) => {
    const { type } = action
    return { ...STATES[type] }
  }

  const [dragSupported, setDragSupport] = useState(true)
  const [file, selectFile] = useState(null)
  const [fileSrc, setSrc] = useState()
  const [dragCounter, setDragCounter] = useState(0)
  const [hookState, dispatch] = useReducer(reducer, STATES.INITIAL)

  const handleFileSelection = e => {
    selectFile(e.target.files[0])
    dispatch({ type: DROPPED })
  }
  const handleFileUpload = async () => {
    dispatch({ type: UPLOADING })
    const fd = new FormData()
    fd.append(`image`, file, file.name)
    try {
      const res = await callApi(endpoint, { body: fd, method: `POST` })
      console.log(res)
    } catch (err) {
      console.error(err)
    }
    dispatch({ type: UPLOADED })
  }

  const handleFileDrop = file => {
    selectFile(file)
  }

  const handleDrag = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragIn = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragCounter(dragCounter + 1)
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      dispatch({ type: DRAGGING })
    }
  }
  const handleDragOut = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragCounter(dragCounter - 1)
    if (dragCounter === 0) {
      dispatch({ type: DRAGGED })
    }
  }
  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: DROPPED })
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileDrop(e.dataTransfer.files[0])
      fileInputRef.current.files = e.dataTransfer.files
      e.dataTransfer.clearData()
      setDragCounter(0)
    }
  }

  useEffect(() => {
    const el = dragElRef.current
    if (`draggable` in el || (`ondragstart` in el && `ondrop` in el)) {
      el.addEventListener(`dragenter`, handleDragIn)
      el.addEventListener(`dragleave`, handleDragOut)
      el.addEventListener(`dragover`, handleDrag)
      el.addEventListener(`drop`, handleDrop)
    } else {
      setDragSupport(false)
    }
    const fileInput = fileInputRef.current
    fileInput.addEventListener(`change`, handleFileSelection)
    const uploadBtn = uploadBtnRef.current
    uploadBtn.addEventListener(`click`, handleFileUpload)
    return () => {
      if (dragSupported) {
        const el = dragElRef.current
        el.removeEventListener(`dragenter`, handleDragIn)
        el.removeEventListener(`dragleave`, handleDragOut)
        el.removeEventListener(`dragover`, handleDrag)
        el.removeEventListener(`drop`, handleDrop)
      }
      const fileInput = fileInputRef.current
      fileInput.removeEventListener(`change`, handleFileSelection)
      const uploadBtn = uploadBtnRef.current
      uploadBtn.removeEventListener(`click`, handleFileUpload)
    }
  }, [])

  useEffect(() => {
    if (file && typeof FileReader !== `undefined`) {
      const reader = new FileReader()
      reader.onload = (function () {
        return function (e) {
          setSrc(e.target.result)
        }
      })(file)
      reader.readAsDataURL(file)
    }
  }, [file])

  return {
    dragSupported,
    hookState,
    img: {
      src: fileSrc,
      name: file ? file.name : ``,
    },
  }
}

export default useFileUpload
