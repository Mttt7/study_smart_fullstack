export class AddFlashcardPayload {
    constructor(private frontContent: string, private backContent: string) {
        this.frontContent = frontContent;
        this.backContent = backContent;
    }
}