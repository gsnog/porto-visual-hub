/**
 * Hook de rastreabilidade (audit trail)
 * Prepara o sistema para que o backend sempre saiba quem cadastrou/editou cada registro.
 * 
 * Uso: const { getAuditMetadata } = useAuditTrail();
 * Ao salvar qualquer registro, inclua os metadados retornados:
 *   const metadata = getAuditMetadata();
 *   // metadata = { createdBy, createdAt, updatedBy, updatedAt }
 */

export interface AuditMetadata {
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

// Mock: ID do usuário logado. Será substituído pela integração com auth real.
const CURRENT_USER_ID = '9'; // Pedro Piaes
const CURRENT_USER_NAME = 'Pedro Piaes';

export function useAuditTrail() {
  const getAuditMetadata = (isEdit = false): AuditMetadata => {
    const now = new Date().toISOString();
    return {
      createdBy: isEdit ? '' : CURRENT_USER_ID,
      createdAt: isEdit ? '' : now,
      updatedBy: CURRENT_USER_ID,
      updatedAt: now,
    };
  };

  const getCurrentUserId = () => CURRENT_USER_ID;
  const getCurrentUserName = () => CURRENT_USER_NAME;

  return {
    getAuditMetadata,
    getCurrentUserId,
    getCurrentUserName,
  };
}
