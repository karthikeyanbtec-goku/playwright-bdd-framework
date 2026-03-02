import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface Mapping {
    pattern: string;
    tags: string;
}

interface TestMapping {
    mappings: Mapping[];
    defaultTags: string;
}

function getChangedFiles(): string[] {
    try {
        // Get changed files compared to main/master or current branch changes
        const diff = execSync('git diff --name-only origin/main...HEAD || git diff --name-only HEAD').toString();
        return diff.split('\n').filter(file => file.trim().length > 0);
    } catch (error) {
        console.warn('Could not determine git diff, falling back to default tags.');
        return [];
    }
}

function resolveTags(changedFiles: string[], mappingData: TestMapping): string {
    const selectedTags = new Set<string>();

    if (changedFiles.length === 0) {
        return mappingData.defaultTags;
    }

    for (const file of changedFiles) {
        for (const entry of mappingData.mappings) {
            const regex = new RegExp(entry.pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
            if (regex.test(file)) {
                selectedTags.add(entry.tags);
            }
        }
    }

    if (selectedTags.size === 0) {
        return mappingData.defaultTags;
    }

    return Array.from(selectedTags).join(' or ');
}

async function run() {
    const mappingPath = path.resolve(__dirname, '../../test-mapping.json');
    if (!fs.existsSync(mappingPath)) {
        console.error('Mapping file not found at:', mappingPath);
        process.exit(1);
    }

    const mappingData: TestMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    const changedFiles = getChangedFiles();
    const tags = resolveTags(changedFiles, mappingData);

    console.log(`::set-output name=tags::${tags}`);
    console.log(`Selected Tags: ${tags}`);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
