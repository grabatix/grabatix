/** @format */

import React, { useState, useEffect, useReducer } from 'react'
import { callApi } from '../utils/fetch-helpers'

const useFileUpload = ({ fileInputRef, formRef, endpoint }) => {
  const MAX_UPLOAD_SIZE = 1020 * 1024,
    UPLOAD_TIMEOUT = 30000

  const ACTIONS = {
    INITIAL: `INITIAL`,
    DRAGGING: `DRAGGING`,
    DRAGGED: `DRAGGED`,
    DROPPED: `DROPPED`,
    UPLOADING: `UPLOADING`,
    UPLOADED: `UPLOADED`,
    ERROR: `ERROR`,
    ADD_FILE: `ADD_FILE`,
    SET_SUPPORT: `SET_SUPPORT`,
    ADD_SRC: `ADD_SRC`,
  }

  const STATES = {
    INITIAL: {
      dragSupported: true,
      file: null,
      imgSrc: ``,
      disabled: true,
      dragging: false,
      dropped: false,
      uploading: false,
      loaded: false,
      error: ``,
    },
    DRAGGING: {
      disabled: true,
      dragging: true,
      dropped: false,
      uploading: false,
      loaded: false,
      error: ``,
    },
    DRAGGED: {
      disabled: false,
      dragging: false,
      dropped: false,
      uploading: false,
      loaded: false,
    },
    DROPPED: {
      disabled: false,
      dragging: false,
      dropped: true,
      uploading: false,
      loaded: false,
      error: ``,
    },
    UPLOADING: {
      disabled: true,
      dragging: false,
      dropped: true,
      uploading: true,
      loaded: false,
      error: ``,
    },
    UPLOADED: {
      disabled: true,
      dragging: false,
      dropped: false,
      uploading: false,
      loaded: true,
      error: ``,
    },
    ERROR: {
      disabled: true,
      dragging: false,
      dropped: false,
      uploading: false,
      loaded: false,
    },
  }

  const reducer = (state, action) => {
    const { type = ACTIONS.INITIAL, payload } = action
    switch (type) {
      case ACTIONS.SET_SUPPORT:
        return { ...state, dragSupported: payload.dragSupported }
      case ACTIONS.ADD_FILE:
        return { ...state, file: payload.file, ...STATES.DROPPED }
      case ACTIONS.ADD_SRC:
        return { ...state, imgSrc: payload.imgSrc }
      case ACTIONS.INITIAL:
      case ACTIONS.DRAGGING:
      case ACTIONS.DRAGGED:
      case ACTIONS.DROPPED:
      case ACTIONS.UPLOADING:
      case ACTIONS.UPLOADED:
        return { ...state, ...STATES[type] }
      case ACTIONS.ERROR:
        return { ...state, error: payload.error, ...STATES[type] }
      default:
        return { ...state }
    }
  }
  const [hookState, dispatch] = useReducer(reducer, STATES.INITIAL)
  const handleFileSelection = e => {
    if (e.target.files[0].size > MAX_UPLOAD_SIZE) {
      return dispatch({ type: ACTIONS.ERROR, payload: { error: `Max File Size Exceeded` } })
    }
    dispatch({ type: ACTIONS.ADD_FILE, payload: { file: e.target.files[0] } })
  }
  let fetchTimeout
  const handleFileUpload = async e => {
    e.preventDefault()
    dispatch({ type: ACTIONS.UPLOADING })
    const controller = new AbortController()
    const { signal } = controller
    fetchTimeout = setTimeout(() => {
      controller.abort()
    }, UPLOAD_TIMEOUT)
    const fd = new FormData()
    fd.append(`image`, hookState.file, hookState.file.name)
    try {
      const res = await callApi(endpoint, { body: fd, method: `POST`, signal })
      console.log(res)
      clearTimeout(fetchTimeout)
      dispatch({ type: ACTIONS.UPLOADED })
    } catch (err) {
      clearTimeout(fetchTimeout)
      console.error(err)
      dispatch({ type: ACTIONS.ERROR, payload: { error: err.message } })
    }
  }
  const handleFileDrop = file => {
    if (file.size > MAX_UPLOAD_SIZE) {
      return dispatch({ type: ACTIONS.ERROR, payload: { error: `Max File Size Exceeded` } })
    }
    dispatch({ type: ACTIONS.ADD_FILE, payload: { file } })
  }
  const handleDrag = e => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDragIn = e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      dispatch({ type: ACTIONS.DRAGGING })
    }
  }
  const handleDragOut = e => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: ACTIONS.DRAGGED })
  }
  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files.length > 1) {
        return dispatch({ type: ACTIONS.ERROR, payload: { error: `Max Number of Files: 1` } })
      }
      handleFileDrop(e.dataTransfer.files[0])
      fileInputRef.current.files = e.dataTransfer.files
      e.dataTransfer.clearData()
    }
    dispatch({ type: ACTIONS.DROPPED })
  }

  useEffect(() => {
    const form = formRef.current
    if (`draggable` in form || (`ondragstart` in form && `ondrop` in form)) {
      form.addEventListener(`drag`, handleDrag)
      form.addEventListener(`dragstart`, handleDrag)
      form.addEventListener(`dragover`, handleDragIn)
      form.addEventListener(`dragenter`, handleDragIn)
      form.addEventListener(`dragleave`, handleDragOut)
      form.addEventListener(`dragend`, handleDragOut)
      form.addEventListener(`drop`, handleDrop)
    } else {
      dispatch({ type: ACTIONS.SET_SUPPORT, payload: { dragSupported: false } })
    }
    const fileInput = fileInputRef.current
    fileInput.addEventListener(`change`, handleFileSelection)

    return () => {
      const form = formRef.current
      if (hookState.dragSupported) {
        form.removeEventListener(`drag`, handleDrag)
        form.removeEventListener(`dragstart`, handleDrag)
        form.removeEventListener(`dragover`, handleDragIn)
        form.removeEventListener(`dragenter`, handleDragIn)
        form.removeEventListener(`dragleave`, handleDragOut)
        form.removeEventListener(`dragend`, handleDragOut)
        form.removeEventListener(`drop`, handleDrop)
      }
      const fileInput = fileInputRef.current
      fileInput.removeEventListener(`change`, handleFileSelection)
    }
  }, [])

  useEffect(() => {
    if (hookState.file && typeof FileReader !== `undefined`) {
      const reader = new FileReader()
      reader.onload = (function () {
        return function (e) {
          dispatch({ type: ACTIONS.ADD_SRC, payload: { imgSrc: e.target.result } })
        }
      })(hookState.file)
      reader.readAsDataURL(hookState.file)
    }
  }, [hookState.file])

  useEffect(() => {
    if (
      hookState.loaded ||
      hookState.error === `Cannot Find Company` ||
      hookState.error === `DB Error` ||
      hookState.error === `The user aborted a request`
    ) {
      setTimeout(() => {
        formRef.current.reset()
        dispatch({ type: ACTIONS.INITIAL })
      }, 5000)
    }
  }, [hookState.loaded, hookState.error])

  return {
    hookState,
    handleFileUpload,
  }
}

export default useFileUpload
