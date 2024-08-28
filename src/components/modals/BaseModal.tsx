import { Modal, ModalContent, ModalHeader, type ModalProps } from '@nextui-org/modal'

type BaseModalProps = ModalProps & {
  title: string
}
export const BaseModal = ({ isOpen, onOpenChange, title, children, ...rest }: BaseModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center' {...rest}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
        {children}
      </ModalContent>
    </Modal>
  )
}
