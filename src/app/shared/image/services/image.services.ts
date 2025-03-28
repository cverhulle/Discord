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
    }

    // Méthode pour récupérer la dernière valeur émise par le subject liée à l'image du post.
    getValueOfImageToSend(): File | null {
        return this.imageToSendSubject.getValue()
    }

    // Cette méthode reçoit en argument l'event du clic sur une image dans les dossiers du PC. Elle en retourne le fichier de l'image ou null.
    getImageToSend(event: Event): File | null{
        // On récupère l'élément "target" de l'event.
        const target = event.target as HTMLInputElement
        if(target.files) {
        // On récupère l'image dans l'attribut files de target.
            return target.files[0]
        }
        // On retourne null s'il n'y a pas d'image trouvée.
        return null
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