import { SanityClient } from '@sanity/client';
import { SourceNodesArgs } from 'gatsby';
import { ProcessingOptions } from './normalize';
export declare const sleep: (ms: number) => Promise<unknown>;
/**
 * Queries all documents changed since last build & adds them to Gatsby's store
 */
export default function handleDeltaChanges({ args, lastBuildTime, client, processingOptions, }: {
    args: SourceNodesArgs;
    lastBuildTime: Date;
    client: SanityClient;
    processingOptions: ProcessingOptions;
}): Promise<boolean>;
