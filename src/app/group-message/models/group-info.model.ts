// Ce modèle est utilisé pour stocker toutes les informations à stocker pour l'affichage dans le template
export class GroupFormInfo {
    _id!: string;
    groupName!: string;
    groupDescription!: string;
    groupType!: string;
    groupLanguages!: string[];
    groupCategories!: string[];
    groupLogo!: File | null;
}