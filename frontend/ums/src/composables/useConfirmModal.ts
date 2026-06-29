import { ref } from 'vue'

type ConfirmAction = () => void | Promise<void>

export function useConfirmModal() {
  const isOpen = ref(false)
  const title = ref('Xác nhận')
  const message = ref('Bạn có chắc chắn muốn thực hiện hành động này?')
  const confirmButtonText = ref('Xác nhận')
  const confirmButtonColor = ref('error')
  let onConfirm: ConfirmAction | null = null

  function open(options: {
    title?: string
    message?: string
    confirmButtonText?: string
    confirmButtonColor?: 'error' | 'primary' | 'neutral'
    onConfirm: ConfirmAction
  }) {
    title.value = options.title || 'Xác nhận'
    message.value = options.message || 'Bạn có chắc chắn muốn thực hiện hành động này?'
    confirmButtonText.value = options.confirmButtonText || 'Xác nhận'
    confirmButtonColor.value = options.confirmButtonColor || 'error'
    onConfirm = options.onConfirm
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    onConfirm = null
  }

  async function confirm() {
    if (onConfirm) {
      await onConfirm()
    }
    close()
  }

  return {
    isOpen,
    title,
    message,
    confirmButtonText,
    confirmButtonColor,
    open,
    close,
    confirm,
  }
}
