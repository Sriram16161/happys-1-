import { OpportunityList } from '../../../domain/list';

export interface SaveDomainToListRepository {
  createList(name: string): Promise<string>;
  saveDomainToList({ id, domain }: { id: string; domain: string }): Promise<void>;
  notifySaveToListSucceed(): void;
  notifySaveToListFailed(): void;
  addListToRepository(list: OpportunityList): void;
  updateListAndCount({ id, domain }: { id: string; domain: string }): void;
}

export type SaveDomainToListUseCase = ({ list, domain }: { list: OpportunityList; domain: string }) => Promise<void>;

export const makeSaveDomainToListUseCase =
  (repository: SaveDomainToListRepository): SaveDomainToListUseCase =>
  async ({ list, domain }) => {
    const { id: existingListId, name } = list;
    try {
      let id = existingListId;
      if (!id) {
        const newListId = await repository.createList(name);
        if (newListId) {
          id = newListId;
          repository.addListToRepository({ id, name, domains: [domain] });
        } else {
          throw new Error('Failed to create list');
        }
      }
      await repository.saveDomainToList({ id, domain });
      repository.updateListAndCount({ id, domain });
      repository.notifySaveToListSucceed();
    } catch (error) {
      repository.notifySaveToListFailed();
    }
  };
