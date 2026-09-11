// Demo accounts for local/offline development and RBAC testing.
// Replace entirely once M3's real /auth/login endpoint is wired in.
export const mockUsers = {
  authority1: { password: 'raahat', role: 'authority', name: 'A. Sharma', title: 'Authority Officer' },
  admin1: { password: 'raahat', role: 'authority', name: 'S. Verma', title: 'Admin' },
  victim1: { password: 'raahat', role: 'victim', name: 'Victim User', title: 'Victim' },
  counsellor1: { password: 'raahat', role: 'counsellor', name: 'Counsellor User', title: 'Counsellor' },
};
