interface IUsuario {
  id: string;
  documento: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha?: string;
  telefone: string;
  endereco: string | null;
  funcao: string;
  account_role: string;
  internal_role: string;
  ativo: boolean;
  conta_id: string;
  created_at: Date;
  updated_at: Date | null;
}

export default IUsuario;
