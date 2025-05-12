import { MembersInGroup } from "./members-in-group.model";

// Ce modèle est utilisé pour stocker toutes les informations à stocker pour l'affichage dans le template
export class GroupFormInfo {
    _id!: string;
    groupName!: string;
    groupDescription!: string;
    groupType!: "Public" | "Privé" | "Restreint";
    groupLanguages!: string[];
    groupCategories!: string[];
    groupLogoPath!: string;
    createdAt!: string;
    creator! : MembersInGroup;
    members!: MembersInGroup[];
}