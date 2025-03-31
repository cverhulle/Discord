import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class ImageService {

    // Observable pour gérer l'image à envoyer dans le post.
    private imageToSendSubject = new BehaviorSubject<File | null>(null)
    imageToSend$ = this.imageToSendSubject.asObservable();

    // Méthode pour modifier le statut de l'observable imageToSend.
    setImageToSend(file : File | null): void {
        this.imageToSendSubject.next(file)
        this.setValueOfImageToSendUrl()
    }

    // Méthode pour récupérer la dernière valeur émise par le subject liée à l'image du post.
    getValueOfImageToSend(): File | null {
        return this.imageToSendSubject.getValue()
    }

    // Cette méthode reçoit en argument l'event du clic sur une image dans les dossiers du PC. Elle en retourne le fichier de l'image ou null.
    getImageToSend(event: Event): void {
        // On récupère l'élément "target" de l'event.
        const target = event.target as HTMLInputElement
        if(target.files) {
        // On récupère l'image dans l'attribut files de target.
            this.setImageToSend(target.files[0])
            
        }
    }

    // Subject et Observable pour gérer si l'image, dans un Post en cours de modification, est supprimé
    private deleteImageInModifiedPostSubject = new BehaviorSubject<boolean>(false)
    deleteImageInModifiedPost$ = this.deleteImageInModifiedPostSubject.asObservable()

    // Méthode pour modifier l'état du subject deleteImageInModifiedPostsubject
    setDeleteImageInModifiedPost(state : boolean): void {
        this.deleteImageInModifiedPostSubject.next(state)
    }

    // Méthode pour récupérer la valeur de deleteImageInModifiedPostSubject
    getValueOfDeleteImageInModifiedPost(): boolean {
        return this.deleteImageInModifiedPostSubject.getValue()
    }



    // Subject et Observable pour gérer l'affichage de l'image à envoyer dans la prévisualition.
    private imageToSendUrlSubject = new BehaviorSubject<string | null>(null)
    imageToSendUrl$ = this.imageToSendUrlSubject.asObservable()

    // Méthode pour convertir l'image à envoyer sous la forme d'une URL en retournant une promesse.
    getDataUrl(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    // Méthode pour gérer les émissions de imageToSendUrlSubject.
    setValueOfImageToSendUrl(): void{
        const file = this.imageToSendSubject.getValue()
        if (file) {
            this.getDataUrl(file)
                .then(url => {this.imageToSendUrlSubject.next(url)})
                .catch(error => 
                    {
                        console.log('Erreur')
                        this.imageToSendUrlSubject.next(null)
                });
        } else {
            this.imageToSendUrlSubject.next(null)
        }
    }

    // Subject et Observable pour gérer l'opacité du bandeau de prévisualisation de l'image
    private opacityPreviewSubject = new BehaviorSubject<number>(1)
    opacityPreview$ = this.opacityPreviewSubject.asObservable()

    // Méthode pour modifier l'opacité du bandeau
    setValueOfOpacity(): void {
        const currentOpacity = this.opacityPreviewSubject.getValue()
        const newOpacity = currentOpacity === 1 ? 0.5 : 1
        this.opacityPreviewSubject.next(newOpacity)
    }



    // Cette méthode permet de sauvegarder l'image, en argument, dans le backend.
    private uploadImage(image: File): void {

        // On crée une instance XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // On crée un objet FormData pour encapsuler les données à envoyer.
        const formData = new FormData();
        
        // On ajoute le fichier au FormData sous le nom 'image'
        formData.append('image', image, image.name);
        
        // On "ouvre" la requête HTPP.
        xhr.open('POST', 'http://localhost:3000/api/upload', true);

        // On envoie le formData au serveur.
        xhr.send(formData); 
        
        // On définit la réponse lorsque la requête est terminée avec succès
        xhr.onload = () => {
            if (xhr.status === 201) {
                console.log("L'image est correctement envoyée", JSON.parse(xhr.responseText));
            } else {
                console.error("Erreur lors de l'enregistrement de l'image", xhr.responseText);
            }
        };

        // On définit la réponse lorsque la requête retourne une erreur.
        xhr.onerror = () => {
            console.error('La requête a échoué'); 
        };
    }


}