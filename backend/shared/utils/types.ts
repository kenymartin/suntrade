type ACTION = {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
};
type ROLE = { Text: string; Value: number; isActive: boolean; Action: ACTION };

const roles: ROLE[] = [
  // **customer**
  {
    Text: "Customer",
    Value: 100,
    isActive: true,
    Action: { canView: true, canEdit: false, canDelete: false },
  },
  {
    Text: "Sales",
    Value: 200,
    isActive: true,
    Action: { canView: true, canEdit: false, canDelete: false },
  },
  {
    Text: "Engineering",
    Value: 300,
    isActive: true,
    Action: { canView: true, canEdit: false, canDelete: false },
  },
  {
    Text: "Production",
    Value: 400,
    isActive: true,
    Action: { canView: true, canEdit: false, canDelete: false },
  },
  {
    Text: "Manufacturing",
    Value: 500,
    isActive: true,
    Action: { canView: true, canEdit: false, canDelete: false },
  },
  {
    Text: "SuperAdmin",
    Value: 600,
    isActive: true,
    Action: { canView: true, canEdit: true, canDelete: true },
  },
  {
    Text: "Admin",
    Value: 700,
    isActive: true,
    Action: { canView: true, canEdit: false, canDelete: false },
  },
];
