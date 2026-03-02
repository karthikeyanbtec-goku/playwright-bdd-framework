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
        // Includes staged, unstaged, and untracked changes for more robust local detection
        const commands = [
            'git diff --name-only origin/main...HEAD', // Commits against origin/main
            'git diff --cached --name-only',           // Staged changes
            'git diff --name-only',                  // Unstaged changes
            'git ls-files --others --exclude-standard' // Untracked changes
        ];

        const files = new Set<string>();
        for (const cmd of commands) {
            try {
                const output = execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'] }).toString();
                output.split('\n').filter(f => f.trim().length > 0).forEach(f => files.add(f));
            } catch (e) { /* ignore command failures */ }
        }

        return Array.from(files);
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

function calculateShards(tags: string): number[] {
    // Basic heuristic: @smoke gets 1-2 shards, full suite gets more
    // In a real scenario, this would check total test count per tag
    let count = 2;
    if (tags.includes('@smoke')) count = 2;
    if (tags === '@login or @inventory or @checkout' || tags.includes('or')) count = 5;

    // Return array [1, 2, ..., count] for GHA matrix fromJSON
    return Array.from({ length: count }, (_, i) => i + 1);
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
    const shards = calculateShards(tags);

    console.log(`::set-output name=tags::${tags}`);
    console.log(`::set-output name=matrix::${JSON.stringify(shards)}`);
    console.log(`Selected Tags: ${tags}`);
    console.log(`Dynamic Shards: ${JSON.stringify(shards)}`);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
