import {AxiosError} from 'axios'

export function getErrorMessage(err: unknown): string {
  const axiosErr = err as AxiosError<ApiResponse>
  const data = axiosErr?.response?.data

  if (!data) return (err as Error).message ?? 'Đã có lỗi xảy ra'

  if (data.errors && typeof data.errors === 'object' && !Array.isArray(data.errors)) {
    const messages = Object.values(data.errors as Record<string, string[]>)
      .flat()
    if (messages.length > 0) return messages.join('\n')
  }

  return data.message ?? 'Đã có lỗi xảy ra'
}


interface ApiResponse {
  isSuccess: boolean
  message: string
  errors?: Record<string, string[]> | string | null
}