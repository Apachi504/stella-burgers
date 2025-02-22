import React, {useState, useCallback } from 'react'
import {TModal} from "./type";

export const useModal = (): TModal => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = useCallback(() => { setIsModalOpen(true) }, []);
    const closeModal = useCallback(() => { setIsModalOpen(false) }, []);
    return {
        isModalOpen,
        openModal,
        closeModal
    }
}