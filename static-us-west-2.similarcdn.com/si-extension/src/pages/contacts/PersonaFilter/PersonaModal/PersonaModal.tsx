import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalProps } from '../../../../components/Modal';
import { NewPersona, Persona, isExistingPersona } from '../../../../domain/persona';
import { useCreatePersonaMutation } from '../../../../features/persona/createPersona/createPersonaMutation';
import { useUpdatePersonaMutation } from '../../../../features/persona/updatePersona/updatePersonaMutation';
import { useDeletePersonaMutation } from '../../../../features/persona/deletePersona/deletePersonaMutation';
import { usePersonaDictionaryQuery } from '../../../../features/persona/usePersonaDictionaryQuery';
import { TextField } from './TextField';
import { SelectField } from './SelectField';
import { ChipsField } from './ChipsField';
import { StyledSectionTitle, SubmitButtonTooltip } from './styles';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export type PersonaModalProps = {
  persona: Persona | NewPersona | null;
  onClose(): void;
};

export const PersonaModal = ({ persona: initialPersona, onClose }: PersonaModalProps) => {
  const { t } = useTranslation();
  const { data: dictionary } = usePersonaDictionaryQuery();
  const [persona, setPersona] = useState(initialPersona);
  const createMutation = useCreatePersonaMutation(onClose);
  const updateMutation = useUpdatePersonaMutation(onClose);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const onDeleteSuccess = () => {
    onClose();
    setIsConfirmDeleteOpen(false);
  };
  const deleteMutation = useDeletePersonaMutation(onDeleteSuccess);

  useEffect(() => {
    setPersona(initialPersona);
  }, [initialPersona]);

  const createPersona = () => {
    if (!persona) return;

    createMutation.mutate(persona);
  };

  const deletePersona = () => {
    if (!persona || !isExistingPersona(persona)) return;

    deleteMutation.mutate(persona);
  };

  const updatePersona = () => {
    if (!persona || !isExistingPersona(persona)) return;

    updateMutation.mutate(persona);
  };

  const getModalProps = (): Omit<ModalProps, 'isOpen' | 'onClose' | 'children'> => {
    if (!persona) return { heading: '', confirmButtonProps: {} };

    const isIncomplete = () => {
      if (!persona.name) return true;

      return (
        persona.departments.length === 0 &&
        persona.seniority.length === 0 &&
        persona.includeTitles.length === 0 &&
        persona.excludeTitles.length === 0
      );
    };

    if (isExistingPersona(persona)) {
      return {
        heading: t('contacts.persona.edit'),
        confirmButtonProps: {
          children: t('contacts.persona.save'),
          onClick: updatePersona,
          disabled: isIncomplete() || deleteMutation.isLoading || updateMutation.isLoading,
          tooltipContent: isIncomplete() ? (
            <SubmitButtonTooltip>{t('contacts.persona.disabled_message')}</SubmitButtonTooltip>
          ) : undefined,
        },
        cancelButtonProps: {
          children: t('common.delete'),
          onClick: () => setIsConfirmDeleteOpen(true),
          tooltipContent: <span style={{ whiteSpace: 'nowrap' }}>{t('contacts.persona.delete')}</span>,
          variant: 'flatDanger',
          disabled: deleteMutation.isLoading || updateMutation.isLoading,
        },
        footerJustifyContent: 'space-between',
      };
    }

    return {
      heading: t('contacts.persona.create'),
      confirmButtonProps: {
        children: t('common.create'),
        onClick: createPersona,
        disabled: isIncomplete() || createMutation.isLoading,
        tooltipContent: isIncomplete() ? (
          <SubmitButtonTooltip>{t('contacts.persona.disabled_message')}</SubmitButtonTooltip>
        ) : undefined,
      },
    };
  };

  return (
    <>
      <Modal
        isOpen={!!initialPersona && !isConfirmDeleteOpen}
        isOverflowScroll
        onClose={onClose}
        onCloseFinish={() => !isConfirmDeleteOpen && setPersona(null)}
        {...getModalProps()}
      >
        <TextField
          label={t('contacts.persona.name')}
          placeholder={t('contacts.persona.name.placeholder')}
          value={persona?.name ?? ''}
          onChange={(name) => setPersona({ ...persona!, name })}
        />
        <SelectField
          label={t('contacts.persona.department')}
          value={persona?.departments ?? []}
          onChange={(departments) => setPersona({ ...persona!, departments })}
          options={dictionary?.departments ?? []}
          placeholder={t('contacts.persona.select_department')}
        />
        <SelectField
          label={t('contacts.persona.seniority')}
          value={persona?.seniority ?? []}
          onChange={(seniority) => setPersona({ ...persona!, seniority })}
          options={dictionary?.seniorityLevels ?? []}
          placeholder={t('contacts.persona.select_seniority')}
        />

        <StyledSectionTitle data-automation="PersonaJobTitle">{t('contacts.persona.job_titles')}</StyledSectionTitle>
        <ChipsField
          value={persona?.includeTitles ?? []}
          label={t('contacts.persona.include.label')}
          onChange={(includeTitles) => setPersona({ ...persona!, includeTitles })}
          placeholder={t('contacts.persona.include.placeholder')}
        />
        <ChipsField
          value={persona?.excludeTitles ?? []}
          label={t('contacts.persona.exclude.label')}
          placeholder={t('contacts.persona.exclude.placeholder')}
          onChange={(excludeTitles) => setPersona({ ...persona!, excludeTitles })}
        />
      </Modal>
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        isLoading={deleteMutation.isLoading}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={deletePersona}
      />
    </>
  );
};
