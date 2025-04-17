export interface IUser {
  name: string;
  email: string;
  role: string;
  photo: string;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ApiResponse {
  data: object;
  success: boolean;
  message: string;
}

export interface ILoginResponse {
  status: string;
  access_token: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

export interface IMarcacoes {
  prestadorCodigo: number;
  prestadorNome: string;
  utenteCodigo: string;
  utenteNome: string;
  dataI: string;
  dataF: string;
  marcacaoNumero: string;
}

export interface IMarcacaoRegist {
  prestadorCodigo: number;
  prestadorNome: string;
  entidadeCodigo: number;
  utenteCodigo: string;
  socioCodigo: string;
  utenteNome: string;
  utenteAbreviatura: string;
  servicoCodigo: string;
  servicoDescricao: string;
  tipoEntidade: string;
  dataI: string;
  dataF: string;
  marcacaoNumero: string;
  motivoAnul: string;
}

export interface IResumoMes {
  dia: number;
  feriado_Descricao: string;
  corRGBDoDia: string;
  dataDia: string;
  intervaloDisponivelNoDia: number;
}

export interface IMeeting {
  id: string;
  name: string;
  imageUrl: string;
  startDatetime: string;
  endDatetime: string;
}

export interface INewAppointment {
  marcacaoNumero: string;
  marcacaoData: string;
  accao: string;
  tipoEntidade: string;
  utenteCodigo: number;
  socioCodigo: number;
  entidadeCodigo: number;
  prestadorCodigo: number;
  servicoCodigo: string;
  motivoAnul: string;
}

export interface IClient {
  code: string;
  name: string;
  medicCode: number;
  allowRegist: boolean;
}

export interface IEntInd {
  tipoEntidade: string;
  codigo: number;
  codigoEntInd: number;
  nome: string;
  numUtente: string;
  nif: string;
  email: string;
  codPostal: string;
  morada: string;
}

export interface IServices {
  servico_Codigo: string;
  servico_Descricao: string;
  servico_Abreviatura: string;
}

export interface ISearchUsersProps {
  onUserSelected: (value: number) => void;
}

export interface ISearchServicesProps {
  onServiceSelected: (value: string) => void;
  serviceSelected: string;
}

export interface IMarcacao {
  id: string;
  marcacaoNumero: string;
  dataI: string;
  dataF: string;
  tipoEntidade: string;
  utenteCodigo: string;
  utenteNome: string;
  utenteAbreviatura: string;
  linhaConfigForeColor: string;
  linhaConfigBackColor: string;
  alocado: string;
  permiteInserir: boolean;
  permiteEditar: boolean;
  permiteRemover: boolean;
}


export interface IEspecialidade{
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  allowAppointement: string;
  appointementText: string;
  specialityTypeCode: string;
  specialityTypeDescription: string;
}