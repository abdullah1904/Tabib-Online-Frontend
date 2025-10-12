import { addToast } from "@heroui/react"

export const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    if (type == 'success') {
        addToast({
            title: message,
            color: 'success',
            closeIcon: true,
            timeout: 3000,
        })
    }
    else if (type == 'error') {
        addToast({
            title: message,
            color: 'danger',
            closeIcon: true,
            timeout: 3000,
        })
    }
    else if (type == 'warning') {
        addToast({
            title: message,
            color: 'warning',
            closeIcon: true,
            timeout: 3000,
        })
    }
}
