// Ce modèle permet de recherche un groupe
export class SearchAGroup{
    groupName?: string ;
    groupType?: 'Privé' | 'Restreint' | 'Public' | 'Tout';
    groupLanguages?: string[] ;
    groupCategories?: string[]
}