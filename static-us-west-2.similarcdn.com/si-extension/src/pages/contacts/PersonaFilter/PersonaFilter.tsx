import React, { useState, MouseEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SWReactIcons } from '@similarweb/icons';
import { usePersonasQuery } from '../../../features/persona/personasQuery/usePersonasQuery';
import { PersonaTooltip } from './PersonaTooltip';
import { useAppState } from '../../../AppStateProvider';
import { appStore } from '../../../services/appStore';
import { NewPersona, Persona, createPersona } from '../../../domain/persona';
import { PersonaModal } from './PersonaModal';
import { usePersonaFilterTracking } from './usePersonaFilterTracking';
import { StyledDropdownButton } from '../../../components/Dropdown/styles';
import {
  StyledFilterContainer,
  StyledCreateOption,
  StyledEditButton,
  StyledSharedIcon,
  StyledPersonaOption,
  StyledCreateOptionDescription,
  StyledSeparator,
  StyledPersonaDropdown,
} from './styles';

export const PersonaFilter = ({ isDisabled }: { isDisabled?: boolean }) => {
  const {
    contactFilters: { persona: selectedPersona },
  } = useAppState();
  const [isOpened, setIsOpened] = useState(false);
  const [persona, setPersona] = useState<Persona | NewPersona | null>(null);
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();

  const { data: personas = [] } = usePersonasQuery();

  const { handleTrackOnOpen, handleTrackOnCreate, handleTrackOnEdit, handleTrackOnPersonaSelect } =
    usePersonaFilterTracking(personas);

  const handleClick = () => {
    setIsOpened(true);
    handleTrackOnOpen();
  };
  const handleCloseDropdown = useCallback(() => {
    setIsOpened(false);
  }, []);

  const filteredPersonas = personas.filter((persona) => persona.name.toLowerCase().includes(searchText.toLowerCase()));

  const handleClickOnIcon = (event: MouseEvent<HTMLDivElement>): void => {
    if (!selectedPersona) return;

    event.stopPropagation();
    appStore.setContactsPersona(undefined);
  };

  const handleClickOnCreate = () => {
    setIsOpened(false);
    setPersona(createPersona());
    handleTrackOnCreate();
  };

  const handleClickOnEdit = (event: MouseEvent, persona: Persona) => {
    event.stopPropagation();
    setIsOpened(false);
    setPersona(persona);
    handleTrackOnEdit(persona);
  };

  const handlePersonaSelect = (persona: Persona) => {
    appStore.setContactsPersona(persona);
    setIsOpened(false);
    handleTrackOnPersonaSelect(persona);
  };

  return (
    <StyledFilterContainer data-automation="PersonaFilter">
      <StyledDropdownButton
        onClick={handleClick}
        isSelected={!!selectedPersona}
        isActive={isOpened}
        disabled={isDisabled}
      >
        {selectedPersona ? selectedPersona.name : t('contacts.persona.empty')}
        <div onClick={handleClickOnIcon}>
          <SWReactIcons iconName={selectedPersona ? 'clear' : isOpened ? 'chev-up' : 'chev-down'} size="xs" />
        </div>
      </StyledDropdownButton>
      <StyledPersonaDropdown
        isOpened={isOpened}
        onClose={handleCloseDropdown}
        onCloseFinish={() => setSearchText('')}
        searchProps={
          personas.length === 0
            ? undefined
            : {
                placeholder: t('contacts.persona.search') || '',
                value: searchText,
                onChange: (e) => setSearchText(e.target.value),
              }
        }
      >
        <StyledCreateOption onClick={handleClickOnCreate}>
          <SWReactIcons iconName="add" size="sm" />
          {t('contacts.persona.create_option')}
          <StyledCreateOptionDescription>
            {t('contacts.persona.create_option_description')}
          </StyledCreateOptionDescription>
        </StyledCreateOption>
        {personas.length !== 0 && <StyledSeparator />}
        {filteredPersonas.map((persona) => (
          <PersonaTooltip persona={persona} key={persona.id}>
            <StyledPersonaOption
              isSelected={persona.id === selectedPersona?.id}
              onClick={() => handlePersonaSelect(persona)}
            >
              {persona.name}
              {persona.isShared && <StyledSharedIcon iconName="similar-icon" size="xs" />}
              {!persona.isShared && (
                <StyledEditButton onClick={(e) => handleClickOnEdit(e, persona)}>
                  <SWReactIcons iconName="settings" size="sm" />
                </StyledEditButton>
              )}
            </StyledPersonaOption>
          </PersonaTooltip>
        ))}
      </StyledPersonaDropdown>
      <PersonaModal persona={persona} onClose={() => setPersona(null)} />
    </StyledFilterContainer>
  );
};
