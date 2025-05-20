// Ce modèle permet de recherche un groupe
export class JoinAGroup{
    groupName?: string ;
    groupType?: 'Privé' | 'Restreint' | 'Public' | 'Tout';
    groupLanguages?: string[] ;
    groupCategories?: string[]
}