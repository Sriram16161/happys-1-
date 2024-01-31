import { useState } from 'react';
import { Contact } from '../domain/contact';

type UseContactSearchReturnProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
  filteredContacts: Partial<Contact>[];
};

export const useContactSearch = (contacts: Partial<Contact>[]): UseContactSearchReturnProps => {
  const [searchText, setSearchText] = useState('');
  const searchWords = searchText.toLowerCase().split(' ');

  const hasMatch = (word: string, property?: string) => property && property.toLowerCase().includes(word);

  const filteredContacts = contacts.filter((contact) =>
    searchWords.every(
      (word) =>
        hasMatch(word, contact.name) ||
        hasMatch(word, contact.companyName) ||
        hasMatch(word, contact.title) ||
        hasMatch(word, contact.country)
    )
  );

  return { searchText, setSearchText, filteredContacts };
};
