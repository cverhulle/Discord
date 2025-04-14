export class CreateGroupForm {
    groupName!: string;
    groupDescription!: string;
    groupType!: string;
    groupPassword!: string;
    groupConfirmPassword!: string;
    groupLanguages!: string[];
    groupCategories!: string[];
    groupLogo!: File | null;
  }