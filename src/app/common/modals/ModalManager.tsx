import { LoginForm } from "@/features/auth/LoginForm.tsx"
import { useAppSelector } from "@/app/store/store.ts"

export const ModalManager = () => {
  const modalLookup = {
    LoginForm,
  }
  const { type, data, open } = useAppSelector((state) => state.modals)
  let renderModal

  if (open && type) {
    const ModalComponent = (modalLookup as any)[type]
    renderModal = <ModalComponent data={data} />
  }
  return <span>{renderModal}</span>
}
