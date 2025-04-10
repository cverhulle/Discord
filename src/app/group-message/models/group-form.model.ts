export class CreateGroupForm {
    groupName!: string;
    groupDescription!: string;
    groupType!: string;
    groupLanguages!: string[];
    groupCategories!: string[];
    groupLogo!: File | null;
  }