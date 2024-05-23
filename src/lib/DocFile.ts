import {readFileSync, writeFileSync} from "fs";
import {DocData, BotOutput} from "./types";
import {join} from "path";

class DocFile {
    private docData: DocData;

    constructor(docData: DocData) {
        this.docData = docData;
    }

    get data(): DocData {
        return this.docData;
    }

    update(botOutput: BotOutput) {
        this.docData = {
            ...this.docData,
            ...botOutput,
            updatedDate: new Date().toISOString(),
        }
    }

    save() {
        if(!this.docData.updatedDate) return;
        writeFileSync(this.docData.path, this.descriptionWithDate(), 'utf-8');
    }

    static load(docsDir: string, patternId: string): DocFile {
        const filePath = join(docsDir, `${patternId}.md`);
        return new DocFile({
            patternId,
            path: filePath,
            shortDescription: patternId.replace(/[-_]/g, ' '),
            description: readFileSync(filePath, 'utf-8')
        });
    }

    private descriptionWithDate(): string {
        const description = this.docData.description.trim();
        const footer = `<!-- Codacy PatPatBot reviewed: ${this.docData.updatedDate} -->`
        return `${description}\n\n${footer}\n`;
    }
}

export default DocFile;
