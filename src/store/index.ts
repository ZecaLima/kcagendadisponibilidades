import { create } from 'zustand';
import { IClient, IMarcacao, IUser } from '../api/types';

type Store = {
  client: IClient | null;
  authUser: IUser | null;
  requestLoading: boolean;
  requestUpdateAppointmentsDay: boolean;
  toggle: boolean;
  appointmentDate: string;
  appointmentNumber: string;
  appointmentServiceCode: string | undefined;
  appointmentServiceName: string | undefined;
  appointmentAction: string | undefined;
  appointmentUserCode: string;
  appointmentUserName: string | undefined;
  appointmentEntityCode: string;
  appointmentEntityType: string;
  appointment: IMarcacao | null;
  checkedItems: { [key: string]: {nomeColuna: string; checked: boolean} };
  setClient: (client: IClient | null) => void;
  setAppointment: (client: IMarcacao | null) => void;
  setAuthUser: (user: IUser | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  setRequestUpdateAppointmentsDay: (value: boolean) => void;
  setToggle: (toggle: boolean) => void;
  setAppointmentDate: (date: string) => void;
  setAppointmentNumber: (value: string) => void;
  setAppointmentServiceCode: (value: string | undefined) => void;
  setAppointmentServiceName: (value: string | undefined) => void;
  setAppointmentAction: (value: string | undefined) => void;
  setAppointmentUserCode: (value: string | undefined) => void;
  setAppointmentUserName: (value: string | undefined) => void;
  setAppointmentEntityCode: (value: string | undefined) => void;
  setAppointmentEntityType: (value: string | undefined) => void;
  setCheckedItems: (checkedItems: { [key: string]: {nomeColuna: string; checked: boolean} }) => void;
  toggleCheckedItem: (column: string, checked: boolean) => void;
};

const useStore = create<Store>((set) => ({
  client: null,
  appointment: null,
  authUser: null,
  requestLoading: false,
  requestUpdateAppointmentsDay: false,
  toggle: true,
  appointmentDate: '',
  appointmentNumber: '',
  appointmentServiceCode: '',
  appointmentServiceName: '',
  appointmentAction: '',
  appointmentUserCode: '',
  appointmentUserName: '',
  appointmentEntityCode: '',
  appointmentEntityType: '',
  checkedItems: {
    utenteNome: { nomeColuna: 'Nome', checked: true },
    dataF: { nomeColuna: 'Data Final', checked: false },
    marcacaoNumero: { nomeColuna: 'Número', checked: false },
    permiteEditar: { nomeColuna: 'Permite Editar', checked: false },
    permiteRemover: { nomeColuna: 'Permite Remover', checked: false }
  },
  setClient: (client: IClient | null) =>
    set((state) => ({ ...state, client: client })),
  setAppointment: (appointment: IMarcacao | null) =>
    set((state) => ({ ...state, appointment: appointment })),
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  setRequestUpdateAppointmentsDay: (value) =>
    set((state) => ({ ...state, requestUpdateAppointmentsDay: value })),
  setToggle: (value) => set((state) => ({ ...state, toggle: value })),
  setAppointmentDate: (value) =>
    set((state) => ({ ...state, appointmentDate: value })),
  setAppointmentNumber: (value: string) =>
    set((state) => ({ ...state, appointmentNumber: value })),
  setAppointmentServiceCode: (value) =>
    set((state) => ({ ...state, appointmentServiceCode: value })),
  setAppointmentServiceName: (value) =>
    set((state) => ({ ...state, appointmentServiceName: value })),
  setAppointmentAction: (value) =>
    set((state) => ({ ...state, appointmentAction: value })),
  setAppointmentUserCode: (value) =>
    set((state) => ({ ...state, appointmentUserCode: value })),
  setAppointmentUserName: (value) =>
    set((state) => ({ ...state, appointmentUserName: value })),
  setAppointmentEntityCode: (value) =>
    set((state) => ({ ...state, appointmentEntityCode: value })),
  setAppointmentEntityType: (value) =>
    set((state) => ({ ...state, appointmentEntityType: value })),
  setCheckedItems: (items) => set((state) => ({ ...state, checkedItems: items })),
  toggleCheckedItem: (column, checked) =>
    set((state) => ({
      ...state,
      checkedItems: {
        ...state.checkedItems,
        [column]: {
          ...state.checkedItems[column],
          checked
        }
      }
    })),
}));

export default useStore;
