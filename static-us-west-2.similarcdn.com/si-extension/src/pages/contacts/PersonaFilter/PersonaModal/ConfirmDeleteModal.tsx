import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../components/Modal';
import { StyledConfirmDeleteContent } from './styles';

export type ConfirmDeleteModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  onClose(): void;
  onConfirm(): void;
};

export const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, isLoading }: ConfirmDeleteModalProps) => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      footerJustifyContent="flex-end"
      confirmButtonProps={{
        children: t('contacts.persona.delete_persona'),
        onClick: onConfirm,
        disabled: isLoading,
        variant: 'danger',
      }}
      cancelButtonProps={{
        children: t('common.cancel'),
        onClick: onClose,
        variant: 'flatDark',
        disabled: isLoading,
      }}
    >
      <StyledConfirmDeleteContent data-automation="ConfirmDelete">
        {t('contacts.persona.confirm_delete')}
      </StyledConfirmDeleteContent>
    </Modal>
  );
};
