export class FlashcardPayload {
    constructor(private frontContent: string, private backContent: string) {
        this.frontContent = frontContent;
        this.backContent = backContent;
    }
    getFrontContent() {
        return this.frontContent;
    }
    getBackContent() {
        return this.backContent;
    }
}